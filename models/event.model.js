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

var eventSchema = new mongoose.Schema({
  event_id : {type : String},
  event_web_id : {type : String},
  event_status : {type : String, default : 'active'},
  event_name: {type : String, required : true},
  event_series_name: {type : String, required : true},
  event_web_series_name: {type : String, required : true},
  event_description: {type : String},
  event_capacity: {type : String},
  speaker_name: {type : String},
  additional_details: {type : String},
  template_id: {type : Schema.Types.ObjectId, ref: 'template', autopopulate: true, required : true},
  event_start:{type : Object},
  event_end:{type : Object},
  private_event: {type : Boolean, default : false},
  address:{type : Object},
  location:{type : Object},
  center:{type : Object},
  organizers:{type : Array},
}, schemaOptions);

eventSchema.plugin(autopopulate);

module.exports = function (app, mongoose) {
	mongoose.model('event', eventSchema);
}


