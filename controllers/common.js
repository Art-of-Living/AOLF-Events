var mongoose = require("mongoose");
var async = require("async");

/**
 * POST /contact
 */
exports.getRows = function(req, res, next) {
  var where = {};
  var Model = mongoose.model(req.params.collection);
  
  Model.find({$and: [{$or: [{is_deleted: false}, {is_deleted: null}]}, where]}, function(err, results){
	if(err){
	  res.status(400).send(err);
	}
	
	switch(req.params.collection){
		case 'event':
			async.filter(results, function(data, callback) {
				var date = new Date().setHours(0, 0, 0, 0);
				var eventDate = new Date(data.event_end.local).setHours(0, 0, 0, 0);
				
				if(eventDate >= date && eventDate !== undefined){
					callback(true);
				}else{
					callback(false);
				}
			}, function(results, err) {
				res.status(200).send(results);
			});
		break;
		default: 
			res.status(200).send(results);
	}
  })
};

exports.getRow = function(req, res, next) {
  var Model = mongoose.model(req.params.collection);
  var id = req.params.id;
  
  if(!req.params.id){
	res.status(400).send('Id is missing in the url');
  }
  
  var fetchData = {_id : id}
  
  switch(req.params.collection){
		case 'event':
			fetchData = {event_web_series_name : id}
		break
  }
  
  Model.find(fetchData, function(err, results){
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


exports.addRows = function(req, res, next) {
  var data = req.body;
  var Model = mongoose.model(req.params.collection);
  
  var createdData = [];
  async.forEach(data, function(single, callback) {
	Model.create(single, function(err, results){
		if(err){
		  next(err)
		}
		
		createdData.push(results);
		callback();
	})
  },function(err){
	if(err){
		next(err);
	}
	res.status(200).send(createdData);
  })
};
