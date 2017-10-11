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
  event_description: {type : String},
  template_id: {type : Schema.Types.ObjectId, ref: 'template', autopopulate: true},
  contact_email: {type : String},
  contact_number: {type : String},
  event_date : {type: Date},
  event_time : {type : Number},
  street_address : {type : String},
  zipcode : {type : String},
  state : {type : String},
  event_id : {type : String}
}, schemaOptions);

eventSchema.plugin(autopopulate);

module.exports = function (app, mongoose) {
	mongoose.model('event', eventSchema);
}


