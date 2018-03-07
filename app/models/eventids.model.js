var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var schemaOptions = {
  timestamps: true,  
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
};

var eventidsSchema = new mongoose.Schema({
  id : {type : String, default : 'updateEventId'},
  event_web_id : {type : Number, required : true},
  event_web_series_name: {type : Number, required : true},
  
}, schemaOptions);

eventidsSchema.plugin(autopopulate);

module.exports = function (app, mongoose) {
	mongoose.model('eventids', eventidsSchema);
}


