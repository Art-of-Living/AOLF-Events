var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var request = require('request');
var Sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
var async = require("async");
var fs = require("fs");
var path = require("path");

var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});

/**
 * GET /contact
 */
exports.contactGet = function(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
};


exports.contactEmailVerification = function(req, res, next) {
	var email = req.body.email;
	
    // Briteverify email;
    var checkIfEmailVerified = "https://bpi.briteverify.com/emails.json?address=" + email + "&apikey=016e9e7d-890a-4514-829b-1f97091285fc"
	
	// Checck briteverify API for the email verification
	request.get({ url : checkIfEmailVerified }, function(err, httpResponse, body) {
		if (err) {
			res.status(400).send({ msg: 'There is some error please contact administrate.' });
			next(err);
		}

		var json = JSON.parse(body);
		if(json.status === 'valid' || json.status === 'unknown'){
			res.status(200).send({success : true});
		}else{
			res.status(400).send({ msg: 'Email is not valid.' });
		}
	});	
}

/**
 * POST /contact
 */
exports.contactPost = function(req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('tel', 'Tel cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  
  var dataToInsert = {
	  'email' : req.body.email,
	  'tel' : req.body.tel,
	  'name' : req.body.name,
	  'event_id' : req.body.event._id
  }
  
  var Model = mongoose.model('contact');
  
  // Pardot API details;
  var pardotUrl = 'http://www1.artofliving.org/l/23282/2017-11-06/559j7l';
  
  // Timezone API Url;
  var timeZoneAPI = 'https://timezoneapi.io/api/ip';
  
  var userDetail = {};
  var blank = ''
  
  var userName = req.body.name;
  var parts = userName.split(" "),
      firstName = parts.shift(),
      lastName = parts.shift() || "";
  var emailHTML;
  
  
  var street_address_2 = "";
  if(req.body.event.address.street_address_2 != "" && req.body.event.address.street_address_2 != null){
	var street_address_2 = ', ' + req.body.event.address.street_address_2; 
  }
  		  
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  var date = new Date(req.body.event.event_start.local);

  var start_time = new Date(req.body.event.event_start.local);
  var start_time_hours = start_time.getHours() > 12 ? start_time.getHours() - 12 : start_time.getHours();
  var start_time_minutes = start_time.getMinutes() < 10 ? "0" + start_time.getMinutes() : start_time.getMinutes();
  var start_am_pm = start_time.getHours() >= 12 ? "PM" : "AM";

  var end_time = new Date(req.body.event.event_end.local);
  var end_time_hours = end_time.getHours() > 12 ? end_time.getHours() - 12 : end_time.getHours();
  var end_time_minutes = end_time.getMinutes() < 10 ? "0" + end_time.getMinutes() : end_time.getMinutes();
  var end_am_pm = end_time.getHours() >= 12 ? "PM" : "AM";

  function slugifyUrl (string){
	if(!string) return '';

	return string
		.toString()
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
  }  
  
  async.series([
	function(cb){
		request.get({ url : timeZoneAPI }, function(err, httpResponse, body) {
			if(err){
				res.status(400).send({ msg: 'There is some error please contact administrate.' });
				next(err);
			}
			
			userDetail = JSON.parse(body);
			cb();
		})
	},
	function(cb){		
		// Pardot API to save the data;
		var body = '?email=' + req.body.email + '&terms_of_use=' + blank + '&cname=' + blank + '&country=' + userDetail.data.country + '&state=' + userDetail.data.state + '&district_city=' + userDetail.data.city + '&first_name=' + firstName + '&last_name=' + lastName + '&phone=' + req.body.tel + '&event_date=' + req.body.event.event_start.local + '&form_title=' + blank + '&page_url=' + '/event/' + req.body.event._id + '&event_name=' + req.body.event.event_name + '&zip_code=' + req.body.event.address.zipcode + '&event_id=' + req.body.event._id + '&event_url=' + blank + '&center_state=' + req.body.event.address.state + '&center_country=' + blank + '&event_type=' + blank + '&event_time=' + start_time_hours + ":" + start_time_minutes + start_am_pm  + '&event_address=' + req.body.event.address.street_address_1 + street_address_2 + '&event_contact_name=' + blank + '&event_phone=' + req.body.event.organizers[0].phone + '&rsvp_date=' + start_time_hours + ":" + start_time_minutes + start_am_pm + '&timezone=' + userDetail.data.timezone.id;
		
		request.post({ url : pardotUrl, body : body }, function(err, httpResponse, body) {
			if (err) {
				res.status(400).send({ msg: 'There is some error please contact administrate.' });
				next(err);
			}
			
			cb();
		});
	},
	function(cb){
		// Create data in the database
		Model.create(dataToInsert, function(err, results){
			if(err){
			  res.status(400).send({ msg: 'There is some error please contact administrate.' });
			  next(err);
			}
			
			cb();
		});	
	},
	function(cb){			
		var emailTemplatePath = path.join('public', 'templates', 'email', 'email_template.html');
		
		var eventDate = days[date.getDay()] + ' ' + month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
		var eventTime = 'from ' + start_time_hours + ':' + start_time_minutes + ' ' + start_am_pm + ' To ' + end_time_hours + ':' + end_time_minutes + ' ' + end_am_pm;
		
		var event_address_street = req.body.event.address.street_address_1 + street_address_2;
		var event_address_state = req.body.event.address.city + ', ' + req.body.event.address.state + ' ' + req.body.event.address.zipcode;
		
		var direction_href_walk= 'https://maps.google.com/?saddr=Current+Location&daddr=' + encodeURI(req.body.event.address.street_address_1 + street_address_2 + ' ' + req.body.event.address.city +' ' + req.body.event.address.state + ' ' + req.body.event.address.zipcode + '&dirflg=w');
		var direction_href_drive= 'https://maps.google.com/?saddr=Current+Location&daddr=' + encodeURI(req.body.event.address.street_address_1 + street_address_2 + ' ' + req.body.event.address.city +' ' + req.body.event.address.state + ' ' + req.body.event.address.zipcode + '&dirflg=d');
		var direction_href_transit= 'https://maps.google.com/?saddr=Current+Location&daddr=' + encodeURI(req.body.event.address.street_address_1 + street_address_2 + ' ' + req.body.event.address.city +' ' + req.body.event.address.state + ' ' + req.body.event.address.zipcode + '&dirflg=r');
		var direction_href_cycle= 'https://maps.google.com/?saddr=Current+Location&daddr=' + encodeURI(req.body.event.address.street_address_1 + street_address_2 + ' ' + req.body.event.address.city +' ' + req.body.event.address.state + ' ' + req.body.event.address.zipcode + '&dirflg=b');
		
		var organizers_name = req.body.event.organizers[0].name;
		var organizers_email = req.body.event.organizers[0].email;
		var organizers_phone = req.body.event.organizers[0].phone;
		
		var addEvent_start = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + start_time_hours + ':' + start_time_minutes + ' ' + start_am_pm;
		var addEvent_end = end_time.getMonth() + '/' + end_time.getDate() + '/' + end_time.getFullYear() + ' ' + end_time_hours + ':' + end_time_minutes + ' ' + end_am_pm;
		
		var addEvent_timezone = req.body.event.event_start.timezone;
		var addEvent_description = 'For details, link here: http://' + process.env.BASE_URL + '/' + req.body.event.event_name + '/' + req.body.event.address.state + '/' + req.body.event.address.city + '/' + slugifyUrl(req.body.event.event_name) +  '/' + req.body.event.event_web_series_name + '/' + req.body.event.event_web_id;
		var addEvent_location = req.body.event.address.street_address_1 + street_address_2 + ', ' + req.body.event.address.city + ', ' + req.body.event.address.state + ', ' + req.body.event.address.country + ', ' + req.body.event.address.zipcode;
		
		
		fs.readFile(emailTemplatePath, 'utf8', function(err, html) {
			emailHTML = html.replace(/{userName}/g, firstName);
			emailHTML = emailHTML.replace(/{event_name}/g, req.body.event.event_name);
			emailHTML = emailHTML.replace(/{eventDate}/g, eventDate);
			emailHTML = emailHTML.replace(/{eventTime}/g, eventTime);
			emailHTML = emailHTML.replace(/{event_address_street}/g, event_address_street);
			emailHTML = emailHTML.replace(/{event_address_state}/g, event_address_state);
			emailHTML = emailHTML.replace(/{direction_href_walk}/g, direction_href_walk);
			emailHTML = emailHTML.replace(/{direction_href_drive}/g, direction_href_drive);
			emailHTML = emailHTML.replace(/{direction_href_transit}/g, direction_href_transit);
			emailHTML = emailHTML.replace(/{direction_href_cycle}/g, direction_href_cycle);
			emailHTML = emailHTML.replace(/{organizers_email}/g, organizers_email);
			emailHTML = emailHTML.replace(/{organizers_phone}/g, organizers_phone);
			emailHTML = emailHTML.replace(/{addEvent_start}/g, addEvent_start);
			emailHTML = emailHTML.replace(/{addEvent_end}/g, addEvent_end);
			emailHTML = emailHTML.replace(/{addEvent_timezone}/g, addEvent_timezone);
			emailHTML = emailHTML.replace(/{addEvent_title}/g, req.body.event.event_name);
			emailHTML = emailHTML.replace(/{addEvent_description}/g, addEvent_description);
			emailHTML = emailHTML.replace(/{addEvent_location}/g, addEvent_location);
			emailHTML = emailHTML.replace(/{addEvent_location}/g, addEvent_location);
			emailHTML = emailHTML.replace(/{addEvent_location}/g, addEvent_location);
			emailHTML = emailHTML.replace(/{organizers_name}/g, organizers_name);
			emailHTML = emailHTML.replace(/{BASE_URL}/g, process.env.BASE_URL);			
			cb();
		});
	},
	function(cb){
		// Send email about the cofirmation of the event to the user
		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
		  to: req.body.email,
		  from: 'Anna at The Art of Living <anna.chigo@artofliving.org>',
		  subject: 'Event Confirmation: ' + req.body.event.event_name,
		  html: emailHTML,
		};
		sgMail.send(msg);
		cb();
	}
  
  ],function(err){
	  if(err){
		  next(err);
	  } 
	  res.status(200).send({ msg: 'Thank you! Your feedback has been submitted.' });
  });
};
