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
  event_description: {type : String, required : true},
  template_id: {type : Schema.Types.ObjectId, ref: 'template', autopopulate: true},
  contact_email: {type : String, required : true},
  contact_number: {type : String, required : true},
}, schemaOptions);

eventSchema.plugin(autopopulate);

module.exports = function (app, mongoose) {
	mongoose.model('event', eventSchema);
}


