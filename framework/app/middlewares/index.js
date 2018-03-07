'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (app) {
	fs.readdirSync(APP_PATH_FRAMEWORK_MIDDLEWARES).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file.
			if (file === path.basename(__filename)) { return; }
			
			// Load the middleware file.
			if ( typeof(require(path.join(APP_PATH_FRAMEWORK_MIDDLEWARES, file))) == 'function' ) {
				require(path.join(APP_PATH_FRAMEWORK_MIDDLEWARES, file))(app);
			}
		} 
		else {
			return;
		}
	});
	fs.readdirSync(APP_PATH_MIDDLEWARES).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file.
			if (file === path.basename(__filename)) { return; }
			
			// Load the middleware file.
			if ( typeof(require(path.join(APP_PATH_MIDDLEWARES, file))) == 'function' ) {
				require(path.join(APP_PATH_MIDDLEWARES, file))(app);
			}
		} 
		else {
			return;
		}
	});	
};