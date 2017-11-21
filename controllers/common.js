var mongoose = require("mongoose");
var async = require("async");
var request = require("request");
var _ = require('lodash');

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
	
	console.log(fetchData);

    Model.findOne(fetchData, function (err, result) {
        if (err) {
            res.status(400).send(err)
            return;
        }
		
        if (!result) {
            res.status(400).send(err)
            return;
        }
		
		console.log(req.body);
		
        var updated = _.assign(result, req.body);
		console.log(updated);
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
  var where = req.body.where;
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
  
  var fetchData = {_id : id}
  
  switch(req.params.collection){
		case 'event':
			fetchData = {event_web_series_name : id, event_status : 'active'}
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
  async.forEach(data, function(single, callback) {
	switch(req.params.collection){
			case 'event':
				single.event_status = single.event_status ? single.event_status : 'active';
			break;
	}
	  
	  
	Model.create(single, function(err, results){
		if(err){
		  next(err)
		}
		
		switch(req.params.collection){
			case 'event':
			
				var longUrl = process.env.BASE_URL + slugifyUrl(results.address.state) + "/" + slugifyUrl(results.address.city) + "/" + slugifyUrl(results.event_name) + "/" + results.event_web_series_name;
				
				request({
					uri: "https://api.rebrandly.com/v1/links",
					method: "POST",
					body: JSON.stringify({
						  destination: longUrl
						, domain: { fullName: "aolf.us" }
					  //, slashtag: "A_NEW_SLASHTAG"
					  //, title: "Rebrandly YouTube channel"
					}),
					headers: {
					  "Content-Type": "application/json",
					  "apikey": "1e97469880394afa9057045845eb7f57"
					}
					}, function(err, response, body) {
						var link = JSON.parse(body);
						createdData.push({
							longUrl : longUrl + "/" + results.event_web_id,
							shortUrl : link.shortUrl,
							id : results._id,
							event_id : results.event_id
						});
						callback();
					});
			break
			default : 
			break
		}
	})
  },function(err){
	if(err){
		next(err);
	}
	res.status(200).send(createdData);
  })
};
