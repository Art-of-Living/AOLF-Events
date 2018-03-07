var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var request = require('request');
var Sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
var async = require("async");
var fs = require("fs");
var path = require("path");
var moment = require("moment");
/* var page = require('webpage').create();   */


exports.addEvent = function(req, res, next) {
	var addEventType = req.params.type;
	
	var addEventURL = "https://www.addevent.com/dir/?client=aSDCejTKazIfGlQnEmey32822&start=start&end=end&title=title&timezone=timezone&service=" + addEventType
	
	
}