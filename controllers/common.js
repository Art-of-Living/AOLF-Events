var mongoose = require("mongoose");
var async = require("async");
var request = require("request");
var _ = require('lodash');
var path = require('path');
var fs = require('fs');

/**
 * POST /contact
 */
exports.updateRow = function(req, res, next) {
  var where = {};
  var Model = mongoose.model(req.params.collection);
  var id = req.params.id;
  
    if (!id) {
        id = req.body.id;
    }
	
    if (req.body.id) {
        delete req.body.id;
    }
	
	var fetchData = {_id : id}
  
	switch(req.params.collection){
		case 'event':
			fetchData = {event_web_id : id}
		break
	}
	
    Model.findOne(fetchData, function (err, result) {
        if (err) {
            res.status(400).send(err)
            return;
        }
		
        if (!result) {
            res.status(400).send(err)
            return;
        }
		
        var updated = _.assign(result, req.body);
		if (!updated) {
            res.status(400).send(err)
            return;
        }
		
        updated.save(function (err) {
            if (err) {
                res.status(400).send(err)
            } else {
				res.status(200).send({msg : 'updated'})
			}
		})
	})
}	
	
exports.getRows = function(req, res, next) {
  var where = req.body.where ? req.body.where : {};
  var Model = mongoose.model(req.params.collection);
  
  Model.find({$and: [{$or: [{is_deleted: false}, {is_deleted: null}]}, where]}, function(err, results){
	if(err){
	  res.status(400).send(err);
	}
	
	res.status(200).send(results);
  })
};

exports.getRow = function(req, res, next) {
  var Model = mongoose.model(req.params.collection);
  var id = req.params.id;
  
  if(!req.params.id){
	res.status(400).send('Id is missing in the url');
  }
  
  var fetchData = {_id : id};
  var sort = {};
  
  switch(req.params.collection){
		case 'event':
			fetchData = {event_web_series_name : id, event_status : 'active'}
			sort = {sort: {local: -1}}
		break
  }
  
  Model.find(fetchData, null, sort, function(err, results){
	if(err){
	  res.status(400).send(err);
	}
	res.status(200).send(results);
  })
};

exports.addRow = function(req, res, next) {
  var data = req.body;
  var Model = mongoose.model(req.params.collection);
  
  Model.create(data, function(err, results){
	if(err){
	  res.status(400).send(err);
	}
	
	res.status(200).send(results);
  })
};

function slugifyUrl (string){
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


exports.addRows = function(req, res, next) {
  var data = req.body;
  var Model = mongoose.model(req.params.collection);
  
  console.log(data);
  
  var createdData = [];
  var createEventTemplate,
	  longUrl,
	  shortUrl,
	  singleEvent;
	  
  var organizer = [];	
  
  async.forEach(data, function(single, callback) {
		
	switch(req.params.collection){
			case 'event':
				var event_status = single.event_status ? single.event_status : 'active';
				single.event_status = event_status.toLowerCase()
			break;
	}
	
	Model.create(single, function(err, result){
		if(err){
		  next(err)
		}	
		
		singleEvent = result;
		
		async.series([
			function(cb){
				switch(req.params.collection){
					case 'event':	
						longUrl = process.env.BASE_URL + slugifyUrl(singleEvent.address.state) + "/" + slugifyUrl(singleEvent.address.city) + "/" + slugifyUrl(singleEvent.event_name) + "/" + singleEvent.event_web_series_name;
						
						request({
							uri: "https://api.rebrandly.com/v1/links",
							method: "POST",
							body: JSON.stringify({
								  destination: longUrl,
								  domain: { fullName: "aolf.us" }
							}),
							
							headers: {
							  "Content-Type": "application/json",
							  "apikey": "1e97469880394afa9057045845eb7f57"
							}},

							function(err, response, body) {
								shortUrl = JSON.parse(body).shortUrl;
								cb();
						});
					break;
				}		
			},
			
			function (cb){
				singleEvent.shortUrl = shortUrl
				singleEvent.longUrl = longUrl
				
				singleEvent.save(function (err) {
				  if( err ) {
						res.status(400).send({ msg: 'There is some error please contact administrate.' });
						next(err);
				  }
				  
				  cb();
				})
			},
			function (cb){		
				organizer = [];			
				async.each(singleEvent.organizers, function(org, cbo) {
					organizer.push({
						'email' : org.email
					});
					
					cbo();
				}, function(err, result) {							
					if( err ) {
						res.status(400).send({ msg: 'There is some error please contact administrate.' });
						next(err);
					} else {												
						cb();
					}
				});
			},
			
			function(cb){		
				var emailTemplatePath = path.join('public', 'templates', 'email', 'create_event_template.html');
				fs.readFile(emailTemplatePath, 'utf8', function(err, html) {
					createEventTemplate = html.replace(/{BASE_URL}/g, process.env.BASE_URL);
					createEventTemplate = createEventTemplate.replace(/{qrUrl}/g, shortUrl + '.qr');
					createEventTemplate = createEventTemplate.replace(/{eventParentId}/g, singleEvent.event_web_series_name);
					createEventTemplate = createEventTemplate.replace(/{eventUrl}/g, longUrl);
					createEventTemplate = createEventTemplate.replace(/{shortUrl}/g, shortUrl);
					cb();
				});
			},
			
			function(cb){
				// Send email about the cofirmation of the event to the organizers
				const sgMail = require('@sendgrid/mail');
				sgMail.setApiKey(process.env.SENDGRID_API_KEY);
				
				const msg = {
				  to: organizer,
				  from: 'Art of Living <events@us.artofliving.org>',
				  subject: 'Event Created: ' + singleEvent.event_name,
				  html: createEventTemplate,
				};
				
				// Send email to organizer to let them know about event;
				sgMail.send(msg);
				
				createdData.push({
					longUrl : longUrl + "/" + singleEvent.event_web_id,
					shortUrl : shortUrl,
					id : singleEvent._id,
					event_id : singleEvent.event_id
				});
				cb();
			}
		], function(err){
			if(err){
				res.status(400).send({ msg: 'There is some error please contact administrate.' });
				next(err);
			}
			
			callback();
		})
	});	
	},function(err){
		if(err){
			res.status(400).send({ msg: 'There is some error please contact administrate.' });
			next(err);
		}
		
		res.status(200).send(createdData);
	})
};
