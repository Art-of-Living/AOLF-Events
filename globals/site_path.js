'use strict';

var path = require('path');

var CURRENT_DIR_PATH 	= path.resolve(__dirname);
var APP_PATH_ROOT 		= path.join(CURRENT_DIR_PATH, '..');

var globals = {
	// APPLICATION SITE ROOT
	APP_PATH_SITE_ROOT 	: APP_PATH_ROOT,
}

module.exports = globals;