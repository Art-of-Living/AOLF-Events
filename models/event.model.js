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
  event_name: {type : String, required : true},
  event_series_name: {type : String, required : true},
  event_description: {type : String},
  template_id: {type : Schema.Types.ObjectId, ref: 'template', autopopulate: true, required : true},
  contact_email: {type : String},
  contact_number: {type : String},
  event_start_date : {type: Date, required : true},
  event_end_date : {type: Date, required : true},
  event_start_time : {type : Number, required : true},
  event_end_time : {type : Number, required : true},
  street_address : {type : String},
  zipcode : {type : String},
  state : {type : String},
  event_id : {type : String}
}, schemaOptions);

eventSchema.plugin(autopopulate);

module.exports = function (app, mongoose) {
	mongoose.model('event', eventSchema);
}


