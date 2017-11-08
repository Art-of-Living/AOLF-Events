var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var schemaOptions = {};

var contactSchema = new mongoose.Schema({
  name: {type : String, required : true},
  email: {type : String, required : true},
  message: {type : String},
  tel: {type : String},
  event_id: {type : Schema.Types.ObjectId, ref: 'event', autopopulate: true}
  
}, schemaOptions);

contactSchema.plugin(autopopulate);

module.exports = function (app, mongoose) {
	mongoose.model('contact', contactSchema);
}
