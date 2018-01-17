var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var request = require('request');
var Sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
var async = require("async");
var fs = require("fs");
var path = require("path");
var moment = require("moment");


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
  var pardotUrl = 'https://go.pardot.com/l/23282/2017-11-06/559j7l';
  
  var blank = ''
  
  var userDetail = req.body.userDetail;
  
  var userEmail = req.body.email;
  var userPhone = req.body.tel;
  var userName = req.body.name;
  
  var parts = userName.split(" "),
      firstName = parts.shift(),
      lastName = parts.shift() || "";
	  
  var emailHTML;
  var organizersEmailHTML;
  
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

 
  var emailTemplatePath = path.join('public', 'templates', 'email', 'email_template.html');
  var organizersEmailTemplatePath = path.join('public', 'templates', 'email', 'organizers_email_template.html');
  var checkIfEmailVerified = "https://bpi.briteverify.com/emails.json?address=" + req.body.email + "&apikey=016e9e7d-890a-4514-829b-1f97091285fc";
  
  var addEventStart = (date.getMonth() + 1) + '%2F' + date.getDate() + '%2F' + date.getFullYear() + ' ' + start_time_hours + '%3A' + start_time_minutes + ' ' + start_am_pm;
  var addEventEnd = (end_time.getMonth() + 1) + '%2F' + end_time.getDate() + '%2F' + end_time.getFullYear() + ' ' + end_time_hours + '%3A' + end_time_minutes + ' ' + end_am_pm;
  var addEventTitle = req.body.event.event_name;
  var addEventTimezone = req.body.event.event_start.timezone;
  
  var  addEventApple = 'https://www.addevent.com/dir/?client=aSDCejTKazIfGlQnEmey32822&start=' + addEventStart + '&end=' + addEventEnd + '&title=' + addEventTitle + '&timezone=' + addEventTimezone + '&service=apple';
  var  addEventGoogle = 'https://www.addevent.com/dir/?client=aSDCejTKazIfGlQnEmey32822&start=' + addEventStart + '&end=' + addEventEnd + '&title=' + addEventTitle + '&timezone=' + addEventTimezone + '&service=google';
  var  addEventOutlook = 'https://www.addevent.com/dir/?client=aSDCejTKazIfGlQnEmey32822&start=' + addEventStart + '&end=' + addEventEnd + '&title=' + addEventTitle + '&timezone=' + addEventTimezone + '&service=outlook';
  var  addEventOutlookcom = 'https://www.addevent.com/dir/?client=aSDCejTKazIfGlQnEmey32822&start=' + addEventStart + '&end=' + addEventEnd + '&title=' + addEventTitle + '&timezone=' + addEventTimezone + '&service=outlookcom';
  var  addEventYahoo = 'https://www.addevent.com/dir/?client=aSDCejTKazIfGlQnEmey32822&start=' + addEventStart + '&end=' + addEventEnd + '&title=' + addEventTitle + '&timezone=' + addEventTimezone + '&service=yahoo';
  
  var eventUri = '';
  if(req.body.event.event_type == 'online'){
	  eventUri = process.env.BASE_URL + 'online/event/' + slugifyUrl(req.body.event.event_name) + '/' + req.body.event.event_web_series_name + '/' + req.body.event.event_web_id;
  } else if(req.body.event.event_type == 'inperson'){
	  eventUri = process.env.BASE_URL + slugifyUrl(req.body.event.address.state) + '/' + slugifyUrl(req.body.event.address.city) + '/' + slugifyUrl(req.body.event.event_name) + '/' + req.body.event.event_web_series_name + '/' + req.body.event.event_web_id;
  }
  
  var note = 'This free 60-90 minute session will give you a taste of powerful breathing techniques and easy, effective approach to meditation.\n - Date: ' + eventDate + '\n - Times: ' + eventTime + '\n - Venue: ' + event_address_street + ', ' + req.body.event.address.city + ', ' + req.body.event.address.state + '\n\nLearn more and RSVP at ' + eventUri;
  
  var is_hidden = '';
  if(req.body.event.event_type == 'online'){
	var is_hidden = 'style = "display:none;"';  
  }
  
  var hide_for_inperson = '';
  if(req.body.event.event_type == 'inperson'){
	var hide_for_inperson = 'style = "display:none;"';  
  }
  
  var online_session_url = req.body.event.online_session_url ? req.body.event.online_session_url : '';

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
		var currentUTC = new Date();
		var eventUTC = new Date(req.body.event.event_start.utc);
		
		if(eventUTC < currentUTC){
			res.status(400).send({ msg: 'We are sorry, this event has taken place in past. Please select another date.' });
			next(err);
		}else {
			cb();
		}		
	},
	function(cb){
		// Check briteverify API for the email verification
		request.get({ url : checkIfEmailVerified }, function(err, httpResponse, body) {
			if (err) {
				res.status(400).send({ msg: 'There is some error please contact administrate.' });
				next(err);
			}

			var json = JSON.parse(body);
			if(json.status === 'valid' || json.status === 'unknown'){
				cb();
			}else{
				res.status(400).send({ msg: 'Email is not valid.' });
			}
		});	
	},
	function(cb){		
		// Pardot API to save the data;
		var body = 'country=' + userDetail.country;
			body += '&city=' + userDetail.city;
			body += '&state=' + userDetail.state; 
			body += '&cname=' + blank; 
			body += '&terms_of_use=' + '1'; 
			body += '&email=' + req.body.email; 
			body += '&first_name=' + firstName;
			body += '&last_name=' + lastName; 
			body += '&phone=' + req.body.tel;
			body += '&event_name=' + req.body.event.event_name; 
			body += '&zip_code=' + userDetail.postal; 
			body += '&center_contact_name=' + blank; 
			body += '&center_email=' + req.body.event.center.email; 
			body += '&event_id=' + req.body.event._id; 
			body += '&center_phone=' + blank; 
			body += '&event_url=' + eventUri; 
			body += '&center_state=' + req.body.event.address.state; 
			body += '&center_country=' + req.body.event.address.country; 
			body += '&center_zip=' + blank; 
			body += '&event_email=' + req.body.event.organizers[0].email; 
			body += '&event_contact_name=' + req.body.event.organizers[0].name; 
			body += '&event_phone=' + req.body.event.organizers[0].phone; 
			body += '&rsvp_date=' + start_time_hours + ":" + start_time_minutes + start_am_pm; 
			body += '&event_parent_id=' + req.body.event.event_web_series_name; 
			body += '&location=' + userDetail.timezone.location; 
			body += '&event_start_date=' + req.body.event.event_start.local; 
			body += '&event_end_date=' + req.body.event.event_end.local; 
			body += '&event_start_time=' + start_time_hours + ":" + start_time_minutes + start_am_pm; 
			body += '&event_end_time=' + end_time_hours + ":" + end_time_minutes + end_am_pm; 
			body += '&event_timezone=' + req.body.event.event_start.timezone; 
			body += '&event_address_line_2=' + street_address_2; 
			body += '&event_address_line_1=' + req.body.event.address.street_address_1;  
			body += '&Event_Zip=' + req.body.event.address.zipcode; 
			body += '&Event_State=' + req.body.event.address.state; 
			body += '&Event_City=' + req.body.event.address.city; 
			body += '&Additional_Details=' + req.body.event.additional_details;
			body += '&event_address=' + req.body.event.address.street_address_1 + street_address_2 + ', ' + req.body.event.address.city + ', ' + req.body.event.address.state + ', ' + req.body.event.address.country + ', ' + req.body.event.address.zipcode; 
			
		console.log(body);
		
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
		
		fs.readFile(emailTemplatePath, 'utf8', function(err, html) {
			emailHTML = html.replace(/{firstName}/g, firstName);
			emailHTML = emailHTML.replace(/{userName}/g, userName);
			emailHTML = emailHTML.replace(/{userEmail}/g, userEmail);
			emailHTML = emailHTML.replace(/{{userPhone}}/g, {userPhone});
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
			emailHTML = emailHTML.replace(/{organizers_name}/g, organizers_name);
			emailHTML = emailHTML.replace(/{BASE_URL}/g, process.env.BASE_URL);			
			emailHTML = emailHTML.replace(/{addEventApple}/g, addEventApple);			
			emailHTML = emailHTML.replace(/{addEventGoogle}/g, addEventGoogle);			
			emailHTML = emailHTML.replace(/{addEventOutlook}/g, addEventOutlook);			
			emailHTML = emailHTML.replace(/{addEventOutlookcom}/g, addEventOutlookcom);			
			emailHTML = emailHTML.replace(/{addEventYahoo}/g, addEventYahoo);			
			emailHTML = emailHTML.replace(/{eventUri}/g, encodeURI(eventUri));			
			emailHTML = emailHTML.replace(/{note}/g, encodeURI(note));			
			emailHTML = emailHTML.replace(/{is_hidden}/g, is_hidden);			
			emailHTML = emailHTML.replace(/{hide_for_inperson}/g, hide_for_inperson);			
			emailHTML = emailHTML.replace(/{online_session_url}/g, online_session_url);			
			cb();
		});
	},
	function(cb){			
		
		fs.readFile(organizersEmailTemplatePath, 'utf8', function(err, oHtml) {
			organizersEmailHTML = oHtml.replace(/{firstName}/g, firstName);
			organizersEmailHTML = organizersEmailHTML.replace(/{userName}/g, userName);
			organizersEmailHTML = organizersEmailHTML.replace(/{userEmail}/g, userEmail);
			organizersEmailHTML = organizersEmailHTML.replace(/{userPhone}/g, userPhone);
			organizersEmailHTML = organizersEmailHTML.replace(/{event_name}/g, req.body.event.event_name);
			organizersEmailHTML = organizersEmailHTML.replace(/{eventDate}/g, eventDate);
			organizersEmailHTML = organizersEmailHTML.replace(/{eventTime}/g, eventTime);
			organizersEmailHTML = organizersEmailHTML.replace(/{event_address_street}/g, event_address_street);
			organizersEmailHTML = organizersEmailHTML.replace(/{event_address_state}/g, event_address_state);
			organizersEmailHTML = organizersEmailHTML.replace(/{direction_href_walk}/g, direction_href_walk);
			organizersEmailHTML = organizersEmailHTML.replace(/{direction_href_drive}/g, direction_href_drive);
			organizersEmailHTML = organizersEmailHTML.replace(/{direction_href_transit}/g, direction_href_transit);
			organizersEmailHTML = organizersEmailHTML.replace(/{direction_href_cycle}/g, direction_href_cycle);
			organizersEmailHTML = organizersEmailHTML.replace(/{organizers_email}/g, organizers_email);
			organizersEmailHTML = organizersEmailHTML.replace(/{organizers_phone}/g, organizers_phone);
			organizersEmailHTML = organizersEmailHTML.replace(/{organizers_name}/g, organizers_name);
			organizersEmailHTML = organizersEmailHTML.replace(/{BASE_URL}/g, process.env.BASE_URL);			
			organizersEmailHTML = organizersEmailHTML.replace(/{addEventApple}/g, addEventApple);			
			organizersEmailHTML = organizersEmailHTML.replace(/{addEventGoogle}/g, addEventGoogle);			
			organizersEmailHTML = organizersEmailHTML.replace(/{addEventOutlook}/g, addEventOutlook);			
			organizersEmailHTML = organizersEmailHTML.replace(/{addEventOutlookcom}/g, addEventOutlookcom);			
			organizersEmailHTML = organizersEmailHTML.replace(/{addEventYahoo}/g, addEventYahoo);				
			organizersEmailHTML = organizersEmailHTML.replace(/{eventUri}/g, encodeURI(eventUri));				
			organizersEmailHTML = organizersEmailHTML.replace(/{is_hidden}/g, is_hidden);				
			organizersEmailHTML = organizersEmailHTML.replace(/{hide_for_inperson}/g, hide_for_inperson);				
			organizersEmailHTML = organizersEmailHTML.replace(/{online_session_url}/g, online_session_url);				
			cb();
		});
	},
	function(cb){
		// Send email about the cofirmation of the event to the user
		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
		  to: req.body.email,
		  from: req.body.event.organizers[0].name + ' at The Art of Living <' + req.body.event.organizers[0].email + '>',
		  subject: 'Event Confirmation: ' + req.body.event.event_name,
		  html: emailHTML,
		};
		sgMail.send(msg);
		cb();
	},
	function(cb){
		var organizer = [];
		async.each(req.body.event.organizers, function(org, callback) {
			organizer.push({
				'email' : org.email
			});
			callback();
		}, function(err, result) {
			if( err ) {
				res.status(400).send({ msg: 'There is some error please contact administrate.' });
				next(err);
			} else {				
				// Send email about the cofirmation of the event to the organizers
				const sgMail = require('@sendgrid/mail');
				sgMail.setApiKey(process.env.SENDGRID_API_KEY);
				const msg = {
				  to: organizer,
				  from: 'The Art of Living <events@us.artofliving.org>',
				  subject: 'Event Confirmation: ' + req.body.event.event_name,
				  html: organizersEmailHTML,
				};
				sgMail.send(msg);
				cb();
			}
		});
		
		
	}  
  ],function(err){
	  if(err){
		  next(err);
	  } 
	  res.status(200).send({ msg: 'Thank you! Your feedback has been submitted.' });
  });
};
