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
  req.assert('tel', 'Tel cannot be blank').notEmpty();
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
	
	var pardotUrl = 'http://www1.artofliving.org/l/23282/2017-10-02/53nsmb';
	var body =  'email=' + req.body.email + '&firstname=' + req.body.name;
	
	// Pardot API to save the data;
    request.post({ url : pardotUrl, body : body }, function(err, httpResponse, body) {
      if (err) {
        next(err);
      }
	  
      res.status(200).send({ msg: 'Thank you! Your feedback has been submitted.' });
    });  
  })
};
