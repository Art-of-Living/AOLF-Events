var mongoose = require("mongoose");

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
	res.status(200).send(results);
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
  Model.create(data, function(err, results){
	if(err){
	  res.status(400).send(err);
	}
	
	res.status(200).send(results);
  })
};
