var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var request = require('request');

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
  req.assert('message', 'Message cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  
  var Model = mongoose.model('contact');
  Model.create(req.body, function(err, results){
	if(err){
	  next(err);
	}
	
	// Pardot API to save the data;
    request.post({url:'http://www1.artofliving.org/l/23282/2017-10-02/53nsmb', formData: {name : req.body.name, email : req.body.email, message : req.body.message}}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        next(err);
      }
      res.status(200).send({ msg: 'Thank you! Your feedback has been submitted.' });
    });  
  })
};
