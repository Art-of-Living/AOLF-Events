'use strict';

// Initialize Language Object
var languages = languages || {};

(function() {
	var fs 		= require('fs');
	var path 	= require('path');
	var config 	= require(APP_PATH_FRAMEWORK_CONFIG);
	
	var CURRENT_DIR_PATH = path.resolve(__dirname);

	// PROCCESSING - APPLICATION FRAMEWORK SPECIFIC LANGUAGES
	fs.readdirSync(path.join(APP_PATH_FRAMEWORK_LANGUAGES, language().code)).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file
			if (file === path.basename(__filename)) { return; }
			
			// Load the global file
			var languageFile = require(path.join(APP_PATH_FRAMEWORK_LANGUAGES, language().code, file));
			for (var key in languageFile) {
				if (languageFile.hasOwnProperty(key)) {
					//console.log(key + " -> " + language[key]);
					languages[key] = languageFile[key];
				}
			}	
		} 
		else {
			return;
		}
	});
	
	// PROCCESSING - APPLICATION SPECIFIC LANGUAGES
	fs.readdirSync(path.join(APP_PATH_LANGUAGES, language().code)).forEach(function (file) {
		if(file.substr(-3) === '.js') {
			// Avoid to read this current file
			if (file === path.basename(__filename)) { return; }
			
			// Load the global file
			var languageFile = require(path.join(APP_PATH_LANGUAGES, language().code,file));
			for (var key in language) {
				if (languageFile.hasOwnProperty(key)) {
					//console.log(key + " -> " + languageFile[key]);
					languages[key] = languageFile[key];
				}
			}	
		} 
		else {
			return;
		}
	});	
})();
//l(language().code);
var get = function(key){
	key = key || false;
	if( key == false ) {
		return '';
	}
	else {
		if(languages.hasOwnProperty(key)) {
			return languages[key];
		}
		else {
			return '';
		}
	}
}

var __ 		= get;  // alias
var trans 	= get;  // alias

module.exports = {
	__ 		: __,
	trans 	: trans,
	get 	: get,
	all 	: languages
}