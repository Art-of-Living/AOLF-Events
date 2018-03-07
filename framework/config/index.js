'use strict';

// Initialize Language Object
var configs = configs || {};

(function() {
	var fs = require('fs');
	var path = require('path');
	
	fs.readdirSync(APP_PATH_FRAMEWORK_CONFIG).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file.
			if (file === path.basename(__filename)) { return; }
			
			// Load the config file.
			//config[file.substr(0, file.length - 3)] = require('./' + file);
			var config = require(path.join(APP_PATH_FRAMEWORK_CONFIG, file));
			for (var key in config) {
				if (config.hasOwnProperty(key)) {
					//console.log(key + " -> " + config[key]);
					configs[key] = config[key];
				}
			}		
		} 
		else {
			return;
		}
	});
	
	fs.readdirSync(APP_PATH_CONFIG).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file.
			if (file === path.basename(__filename)) { return; }
			
			// Load the config file.
			//config[file.substr(0, file.length - 3)] = require('./' + file);
			var config = require(path.join(APP_PATH_CONFIG, file));
			for (var key in config) {
				if (config.hasOwnProperty(key)) {
					//console.log(key + " -> " + config[key]);
					configs[key] = config[key];
				}
			}		
		} 
		else {
			return;
		}
	});
})();

var get = function(key){
	key = key || false;
	if( key == false ) {
		return '';
	}
	else {
		if(configs.hasOwnProperty(key)) {
			return configs[key];
		}
		else {
			return '';
		}
	}

}

var item = get; // alias

module.exports = {
	get 	: get,
	all 	: configs
};
