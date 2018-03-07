'use strict';

var fs 		= require('fs')
var morgan 	= require('morgan');
var path 	= require('path');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(APP_PATH_FRAMEWORK_STORAGE_LOG, 'access.log'), {flags: 'a'})

module.exports = function (app) {
	var __logger = logger().enabled || false;
	if( __logger ) {
		// Console Morgan Log 
		if( logger().console ) {
			app.use(morgan('combined'));
		}

		// File Morgan Log 
		if( logger().file ) {
			app.use(morgan('combined', {stream: accessLogStream}));
		}
		
		// Console Log Time - Middleware
		if( logger().console ) {
			app.use(function (request, response, next) {
				l('Time:', Date.now());
				next();
			});	
		}
	}
};