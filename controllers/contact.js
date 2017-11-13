var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var request = require('request');
var Sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
var async = require("async");

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
  var pardotUrl = 'http://www1.artofliving.org/l/23282/2017-11-06/559j7l';
  
  // Briteverify email;
  var checkIfEmailVerified = "https://bpi.briteverify.com/emails.json?address=" + req.body.email + "&apikey=016e9e7d-890a-4514-829b-1f97091285fc"
  
  // Timezone API Url;
  var timeZoneAPI = 'https://timezoneapi.io/api/ip';
  
  var userDetail = {};
  var blank = ''
  
  var userName = req.body.name;
  var firstName = userName.split(' ').slice(0, -1).join(' ');
  var lastName = userName.split(' ').slice(-1).join(' ');
  
  async.series([
	function(cb){
		// Checck briteverify API for the email verification
		request.get({ url : checkIfEmailVerified }, function(err, httpResponse, body) {
			if (err) {
				res.status(400).send({ msg: 'There is some error please contact administrate.' });
				next(err);
			}

			var json = JSON.parse(body);
			if(json.status === 'valid' || json.status === 'unknown'){
				cb(null, 'test');
			}else{
				res.status(400).send({ msg: 'Email is not valid.' });
			}
		});	
	},
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
		var body = '?email=' + req.body.email + '&terms_of_use=' + blank + '&cname=' + blank + '&country=' + userDetail.data.country + '&state=' + userDetail.data.state + '&district_city=' + userDetail.data.city + '&first_name=' + firstName + '&last_name=' + lastName + '&phone=' + req.body.tel + '&event_date=' + req.body.event.event_start_date + '&form_title=' + blank + '&page_url=' + '/event/' + req.body.event._id + '&event_name=' + req.body.event.event_name + '&zip_code=' + req.body.event.zipcode + '&event_id=' + req.body.event._id + '&event_url=' + blank + '&center_state=' + req.body.event.state + '&center_country=' + blank + '&event_type=' + blank + '&event_time=' + req.body.event.event_start_time + '&event_address=' + req.body.event.street_address + '&event_contact_name=' + blank + '&event_phone=' + req.body.event.contact_number + '&rsvp_date=' + req.body.event.event_start_time + '&timezone=' + userDetail.data.timezone.id;
		
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
		var date = new Date(req.body.event.event_start_time*1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
		
		var eventDate = new Date(req.body.event.event_start_date); 
		var emailText = '<p>Congrats for signing up for an Introductory Session with The Art of Living.</p><br>'
		emailText += '<p>Here are the details:</p><br>';
		emailText += '<p><strong>' + req.body.event.event_name + '</strong>';
		emailText += '<p>' + eventDate.getDate() + "/" + (eventDate.getMonth()+1)  + "/" + eventDate.getFullYear() + ', ' + formattedTime + '</p>';
		emailText += '<p>' + req.body.event.street_address + ',</p><p>' + req.body.event.state + ',</p><p>' + req.body.event.zipcode + '</p>';
		emailText += '<p>Questions? Contact ' + req.body.event.contact_number + '</p><br>';
		emailText += '<p>If you&#39;d like to invite a friend to join you, <underline>send them this link to RSVP</underline></p><br>';
		emailText += '<p>This free 1-hr class is an introduction to the world-renowned Art of Living Happiness Program, a transformative immersion in powerful breathing techniques and mind mastery.</p><br>';
		emailText += '<p>You&#39;ll get a taste of:</p><br>';
		emailText += '<p>&#10004; <strong>Yogic breathing exercises</strong> - The quickest, most effective way to REDUCE STRESS and experience deep effortless MEDITATION.</p><br>';
		emailText += '<p>&#10004; <strong>Mind mastery</strong> - Get insights on how to stay SKILLFULLY PEACEFUL and positive, even through challenging times</p><br>';
		emailText += '<p>&#10004; <strong>Effortless guided meditation</strong> - See how to fully relax and let go, even if meditation has never "worked for you" before.</p><br>';
		emailText += '<p>We&#39;ll see you there on ' + eventDate.getDate() + "/" + (eventDate.getMonth()+1)  + "/" + eventDate.getFullYear() + '!</p>';
		
		emailText += '<div style="display:inline;" className="map_section--direction-icon">';
		
		emailText += '<a style="margin: 5px 20px 0 0px;padding: 5px;" target="_blank" href="https://maps.google.com/?saddr=Current+Location&daddr=' + encodeURI(req.body.event.street_address + ' ' + req.body.event.city + '  ' + req.body.event.state + ' ' + req.body.event.zipcode + '&dirflg=w') +'")><img style="width:3%;" src="' + process.env.BASE_URL + 'templates/ArtOfLiving/images/man-walking-directions-button.png"></a>';
		
		emailText +='<a style="margin: 5px 20px 0 0px;padding: 5px;" target="_blank" href="https://maps.google.com/?saddr=Current+Location&daddr=' + encodeURI(req.body.event.street_address + ' ' + req.body.event.city +' ' + req.body.event.state + ' ' + req.body.event.zipcode + '&dirflg=d') +'")><img style="width:3%;" src="' + process.env.BASE_URL + 'templates/ArtOfLiving/images/sports-car.png"></a>'
		
		emailText +='<a style="margin: 5px 20px 0 0px;padding: 5px;" target="_blank" href="https://maps.google.com/?saddr=Current+Location&daddr=' + encodeURI(req.body.event.street_address + ' ' + req.body.event.city + ' ' + req.body.event.state + ' ' + req.body.event.zipcode + '&dirflg=r') +'")><img style="width:3%;" src="' + process.env.BASE_URL + 'templates/ArtOfLiving/images/underground.png"></a>'
		
		emailText +='<a style="margin: 5px 20px 0 0px;padding: 5px;" target="_blank" href="https://maps.google.com/?saddr=Current+Location&daddr=' + encodeURI(req.body.event.street_address + ' ' + req.body.event.city + ' ' + req.body.event.state + ' ' + req.body.event.zipcode + '&dirflg=b') +'")><img style="width:3%;" src="' + process.env.BASE_URL + 'templates/ArtOfLiving/images/youth-bicycle.png"></a>';
		
		emailText += '</div>';
		
		console.log(emailText);
		
		// Send email about the cofirmation of the event to the user
		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
		  to: req.body.email,
		  from: 'Anna at The Art of Living <anna.chigo@artofliving.org>',
		  subject: 'Event Confirmation: ' + req.body.event.event_name,
		  html: emailText,
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
