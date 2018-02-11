var mongoose = require("mongoose");
var async = require("async");
var request = require("request");
var _ = require('lodash');
var underscore = require('underscore');
var path = require('path');
var fs = require('fs');
var momentz = require('moment-timezone');

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
  var where = req.body.where ? req.body.where : {event_status : 'active'};
  var Model = mongoose.model(req.params.collection);
  
  Model.find({$and: [{$or: [{is_deleted: false}, {is_deleted: null}]}, where]}, function(err, results){
	if(err){
	  res.status(400).send(err);
	}
	
	res.status(200).send(results);
  })
};


function sortJson(arr, prop) {
    return arr.sort(function(a,b) {
        var propA,propB;
        if (prop == "event_start") {
            propA = a['event_start']['local'];
            propB = b['event_start']['local'];
        } else {
            propA = a[prop];
            propB = b[prop];
        }

        if (propA < propB) {
            return -1;
        } else {
            return 1;
        }
    });
}


// function to fetch date/time related details of event 

function formatDate_Time(results,callback){
	var formatedResult = [];
	
	var results = sortJson(results, 'event_start');
	
	async.forEach(results, function(data, cb) {
		var timezone = momentz().tz(data.event_start.timezone).format('z');;
		
		var start_time = momentz.tz(data.event_start.local,data.event_start.timezone);
		var end_time = momentz.tz(data.event_end.local,data.event_start.timezone);
		
		var start_time_hours = start_time.hour() > 12 ? start_time.hour() - 12 : start_time.hour();
		var start_time_minutes = start_time.minute() < 10 ? "0" + start_time.minute() : start_time.minute();
		var start_am_pm = start_time.hour() >= 12 ? "PM" : "AM";
		var start_day = start_time.day();
		var start_month = start_time.month();
		var start_date = start_time.date();
		var start_year = start_time.format('YYYY');
		
		var startDate = { 
			time : start_time,
			time_hours : start_time_hours,
			time_minutes : start_time_minutes,
			am_pm : start_am_pm,
			day : start_day,
			month : start_month,
			date : start_date,
			year : start_year,
			tz : timezone
		}
		
		var end_time_hours = end_time.hour() > 12 ? end_time.hour() - 12 : end_time.hour();
		var end_time_minutes = end_time.minute() < 10 ? "0" + end_time.minute() : end_time.minute();
		var end_am_pm = end_time.hour() >= 12 ? "PM" : "AM";
		var end_day = end_time.day();
		var end_month = end_time.month();	
		var end_date = end_time.date();	
		var end_year = end_time.format('YYYY');	
		
		var endDate = { 
			time : end_time,
			time_hours : end_time_hours,
			time_minutes : end_time_minutes,
			am_pm : end_am_pm,
			day : end_day,
			month : start_month,
			date : end_date,
			year : end_year,
			tz : timezone
		}
		
		data.event_start.date = startDate;
		data.event_end.date = endDate;
		formatedResult.push(data);
		cb();
		
	},function(err){
		if(err) {
			res.status(400).send({ msg: 'There is some error please contact administrate.' });
		}else {
			callback(formatedResult);
		}
	});
}

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
	formatDate_Time(results,function(data){
		res.status(200).send(data);
	});
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

function getNextSequenceValue(flag,callback){	
	var sequenceDocument = mongoose.model('eventids');
	
	sequenceDocument.findOne({id:'updateEventId'},function(err,data){
		
		if(flag) {
			data.event_web_series_name += 1;
		} else{
			data.event_web_id += 1;
		}
		
		data.save(function(err, result){
			if(err){
				next(err)
			}	
			
			callback(result);
		});	
	})
}

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
  
    var createdData = [];
	var allEvents = [];
	
    var createEventTemplate,
		event_web_series_name;
	  
    var organizer = [];	
	var msg = {};
	
	async.series([
		function(cb){
			// Check if event_series_name exists then increment otherwise not;
			Model.findOne({event_series_name: data[0].event_series_name},function(err, result){
				if(err) {
					res.status(400).send(err);
				} 
				
				if(!result || result === null){
					var flag = true;
					getNextSequenceValue(flag ,function(updated){
						event_web_series_name = updated.event_web_series_name
						cb();
					});
				} else {
					event_web_series_name = result.event_web_series_name; 
					cb();
				} 
			})
		},
		function(cb){		
			// Create events from data;
			async.eachSeries(data, function(single, callback) {
				switch(req.params.collection){
					case 'event':
						var event_status = single.event_status ? single.event_status : 'active';
						single.event_status = event_status.toLowerCase()
					break;
				}
				
				Model.findOne({event_id : single.event_id}, function(err, results){
					if(err){
					  res.status(400).send(err);
					}
					
					if(results){
						var updated = _.assign(results, single);
						updated.save(function(err, result){
							if(err){
							  next(err)
							}	
							
							result.updated = true;
							
							allEvents.push(result);
							callback();
						});	
					} else {		
						var flag = false;
						single.event_web_series_name = event_web_series_name;
						
						getNextSequenceValue(flag ,function(updated){
							single.event_web_id = updated.event_web_id
							Model.create(single, function(err, result){
								if(err){
									next(err)
								}	
								
								result.updated = false;
								allEvents.push(result);
								callback();
							});
						});	
					}
				})
		
			},function(err){
				if(err){
					res.status(400).send({ msg: 'There is some error please contact administrate.' });
					next(err);
				}
				
				cb();
			})
		},		
		function(cb){	
			async.each(allEvents, function(singleEvent, callback){
				if(!singleEvent.updated){
					//Check if event type is Online then change the URL of event 
					var urlPart = singleEvent.event_type == 'online' ? 'online/event' : slugifyUrl(singleEvent.address.state) + "/" + slugifyUrl(singleEvent.address.city);
					var longUrl = process.env.BASE_URL + urlPart + "/" + slugifyUrl(singleEvent.event_name) + "/" + singleEvent.event_web_series_name + "/" + singleEvent.event_web_id;
					
					switch(req.params.collection){
						case 'event':								
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
									var shortUrl = JSON.parse(body).shortUrl;
									
									singleEvent.shortUrl = shortUrl
									singleEvent.longUrl = longUrl
									
									singleEvent.save(function (err) {
										if( err ) {
											res.status(400).send({ msg: 'There is some error please contact administrate.' });
											next(err);
										}  
										callback();
									})
							});
						break;
						default:
							callback();				
						break;
					}
				} else {
					callback();
				}	
			}, function(err, result) {							
				if( err ) {
					res.status(400).send({ msg: 'There is some error please contact administrate.' });
					next(err);
				}
				
				cb();
			});
		},
		function (cb){
			underscore.each(allEvents, function(singleEvent){
				createdData.push({
					longUrl : singleEvent.longUrl,
					shortUrl : singleEvent.shortUrl,
					id : singleEvent._id,
					event_id : singleEvent.event_id,
					event_web_id : singleEvent.event_web_id,
					event_web_series_name : singleEvent.event_web_series_name
				});
			});	
			
			cb();
		},
		function (cb){	
			async.each(allEvents[0].organizers, function(org, cbo) {
				
				var chckMail = {
					'email': org.email
				};
				
				if(!underscore.findWhere(organizer,chckMail)){
					organizer.push(chckMail);
				}
				
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
			
			var singleEvent = allEvents[0];
			var urlPart = singleEvent.event_type == 'online' ? 'online/event' : slugifyUrl(singleEvent.address.state) + "/" + slugifyUrl(singleEvent.address.city);
			var	event_title_url = process.env.BASE_URL + urlPart + "/" + slugifyUrl(singleEvent.event_name) + "/" + singleEvent.event_web_series_name;
			
			fs.readFile(emailTemplatePath, 'utf8', function(err, html) {
				createEventTemplate = html.replace(/{BASE_URL}/g, process.env.BASE_URL);
				createEventTemplate = createEventTemplate.replace(/{qrUrl}/g, singleEvent.shortUrl + '.qr');
				createEventTemplate = createEventTemplate.replace(/{eventParentId}/g, singleEvent.event_web_series_name);
				createEventTemplate = createEventTemplate.replace(/{eventUrl}/g, singleEvent.longUrl);
				createEventTemplate = createEventTemplate.replace(/{shortUrl}/g, singleEvent.shortUrl);
				createEventTemplate = createEventTemplate.replace(/{event_title_url}/g, singleEvent.longUrl);
				cb();
			});
		},
		
		function(cb){
			var singleEvent = allEvents[0];
			
			if(!singleEvent.updated){
				var subject =  'Event Created: ' + singleEvent.event_name;
			}else{
				var subject = 'Event Updated: ' + singleEvent.event_name;
			}

			msg = {
			  to: organizer,
			  from: 'Art of Living <events@us.artofliving.org>',
			  subject: subject,
			  html: createEventTemplate,
			};

			cb();
		}
	], function(err){
		if(err){
			res.status(400).send({ msg: 'There is some error please contact administrate.' });
			next(err);
		}
		
		// Send email about the cofirmation of the event to the organizers
		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		var baseURL = process.env.BASE_URL;
		
		if(baseURL.indexOf("localhost") < 0){
			// Send email to organizer to let them know about event;
			sgMail.send(msg);
		}
		
		res.status(200).send(createdData);
	})	
};
