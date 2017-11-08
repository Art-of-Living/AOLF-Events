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
				var date = new Date();
				var eventDate = data.event_end_date;
				if(eventDate => date && eventDate !== undefined){
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
  
  Model.findOne({_id : id}, function(err, results){
	if(err){
	  res.status(400).send(err);
	}
	res.status(200).send(results);
  })
};

exports.addRow = function(req, res, next) {
  var data = req.body;
  var Model = mongoose.model(req.params.collection);
  
  switch(req.params.collection){
	
	case  'event':
		if(data.event_start_time){
			data.event_start_time = Math.round(new Date(data.event_start_time).getTime()/1000)
			data.event_end_time = Math.round(new Date(data.event_start_time).getTime()/1000)
		}
	break;
  }
  
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
	switch(req.params.collection){
		case  'event':
			if(single.event_start_time){
				single.event_start_time = Math.round(new Date(single.event_start_time).getTime()/1000)
				single.event_end_time = Math.round(new Date(single.event_start_time).getTime()/1000)
			}
		break;
	}
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
