'use strict';

var fs = require('fs');
var path = require('path');

var CURRENT_DIR_PATH = path.resolve(__dirname);

global['framework'] = {};
global['framework']['globals'] = {};
module.exports = function() {
	// PROCCESSING - APPLICATION FRAMEWORK SPECIFIC GLOBALS
	fs.readdirSync(CURRENT_DIR_PATH).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file
			if (file === path.basename(__filename)) { return; }
			
			// Load the global file
			var globals = require('./' + file);
			for (var key in globals) {
				if (globals.hasOwnProperty(key)) {
					//console.log(key + " -> " + globals[key]);
					global[key] = globals[key];
					global['framework']['globals'][key] = globals[key];
				}
			}	
		} 
		else {
			return;
		}
	});
	
	// PROCCESSING - APPLICATION SPECIFIC GLOBALS
	fs.readdirSync(APP_PATH_GLOBALS).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file
			if (file === path.basename(__filename)) { return; }
			
			// Load the global file
			var globals = require(path.join(APP_PATH_GLOBALS,file));
			for (var key in globals) {
				if (globals.hasOwnProperty(key)) {
					//console.log(key + " -> " + globals[key]);
					global[key] = globals[key];
					global['framework']['globals'][key] = globals[key];
				}
			}	
		} 
		else {
			return;
		}
	});	
};