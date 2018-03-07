'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (app, io) {
	
	fs.readdirSync(APP_PATH_ROUTES).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file.
			if (file === path.basename(__filename)) { return; }
			
			// Load the route file.
			require(path.join(APP_PATH_ROUTES, file))(app, io);
		} 
		else {
			return;
		}
	});	
	fs.readdirSync(APP_PATH_FRAMEWORK_ROUTES).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file.
			if (file === path.basename(__filename)) { return; }
			
			// Load the route file.
			require(path.join(APP_PATH_FRAMEWORK_ROUTES, file))(app, io);
		} 
		else {
			return;
		}
	});
};