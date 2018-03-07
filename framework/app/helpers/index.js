'use strict';

var fs = require('fs');
var path = require('path');
var l = function(){ 
	var config 	= require(APP_PATH_FRAMEWORK_CONFIG);
	var __debug = config.get('debug') || false;
	if(__debug) { 
		for(var i = 0; i < arguments.length; i++){
			console.log(arguments[i]);
		} 
	}
};
module.exports = function (app) {
	try {
		var _stats = fs.statSync(APP_PATH_FRAMEWORK_HELPERS);
		fs.readdirSync(APP_PATH_FRAMEWORK_HELPERS).forEach(function (file) {
			if(file.substr(-3) === '.js') {
				// Avoid to read this current file.
				if (file === path.basename(__filename)) { return; }
				
				// Load the helper file.
				var helper = require(path.join(APP_PATH_FRAMEWORK_HELPERS, file));
				for (var key in helper) {
					if (helper.hasOwnProperty(key)) {
						//console.log(key + " -> " + helper[key]);
						//helpers[key] = helper[key];
						global[key] = helper[key];
					}
				}
			} 
			else {
				return;
			}
		});
	}
	catch (e) {
		// Error while trying to import helper support
		l(('Error while trying to import helper or Helpers Missing at ' + APP_PATH_FRAMEWORK_HELPERS).warn);
		l((e.message).verbose);
	}
	
	try {
		var _stats = fs.statSync(APP_PATH_HELPERS);
		fs.readdirSync(APP_PATH_HELPERS).forEach(function (file) {
			if(file.substr(-3) === '.js') {
				// Avoid to read this current file.
				if (file === path.basename(__filename)) { return; }
				
				// Load the helper file.
				var helper = require(path.join(APP_PATH_HELPERS, file));
				for (var key in helper) {
					if (helper.hasOwnProperty(key)) {
						//console.log(key + " -> " + helper[key]);
						//helpers[key] = helper[key];
						global[key] = helper[key];
					}
				}
			} 
			else {
				return;
			}
		});
	}
	catch (e) {
		// Error while trying to import helper support
		l(('Helpers Missing at ' + APP_PATH_HELPERS).warn);
		l((e.message).verbose);
	}
};