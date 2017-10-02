var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {};

var templateSchema = new mongoose.Schema({
  name: {type : String, required : true},
}, schemaOptions);

module.exports = function (app, mongoose) {
	mongoose.model('template', templateSchema);
}


