'use strict';

var path = require('path');

var CURRENT_DIR_PATH 	= path.resolve(__dirname);
var APP_PATH_ROOT 		= CURRENT_DIR_PATH + '/../../';
var APP_PATH_FRAMEWORK	= path.join(APP_PATH_ROOT, 'framework');

var globals = {
	// APPLICATION ROOT
	APP_PATH_ROOT 							: APP_PATH_ROOT,

	// APPLICATION FRAMEWORK SPECIFIC GLOBALS
	APP_PATH_FRAMEWORK 						: APP_PATH_FRAMEWORK,
	APP_PATH_FRAMEWORK_BOOTSTRAPER			: path.join(APP_PATH_FRAMEWORK, 'bootstrap'),
	APP_PATH_FRAMEWORK_CONFIG 				: path.join(APP_PATH_FRAMEWORK, 'config'),
	APP_PATH_FRAMEWORK_GLOBALS 				: path.join(APP_PATH_FRAMEWORK, 'globals'),

	APP_PATH_FRAMEWORK_ROUTES 				: path.join(APP_PATH_FRAMEWORK, 'routes'),
	
	APP_PATH_FRAMEWORK_MIDDLEWARES 			: path.join(APP_PATH_FRAMEWORK, 'app', 'middlewares'),
	APP_PATH_FRAMEWORK_CONTROLLERS 			: path.join(APP_PATH_FRAMEWORK, 'app', 'globals'),
	APP_PATH_FRAMEWORK_MODELS 				: path.join(APP_PATH_FRAMEWORK, 'app', 'models'),
	APP_PATH_FRAMEWORK_LIBRARIES				: path.join(APP_PATH_FRAMEWORK, 'app', 'libraries'),
	APP_PATH_FRAMEWORK_HELPERS				: path.join(APP_PATH_FRAMEWORK, 'app', 'helpers'),
	APP_PATH_FRAMEWORK_VIEWS 					: path.join(APP_PATH_FRAMEWORK, 'app', 'views'),
	APP_PATH_FRAMEWORK_RESOURCES 						: path.join(APP_PATH_ROOT, 'resources'),
	APP_PATH_FRAMEWORK_LANGUAGES 				: path.join(APP_PATH_FRAMEWORK, 'resources', 'language'),
	APP_PATH_FRAMEWORK_SERVICES 				: path.join(APP_PATH_FRAMEWORK, 'services'),
	
	APP_PATH_FRAMEWORK_PUBLIC					: path.join(APP_PATH_FRAMEWORK, 'public'),
	
	APP_PATH_FRAMEWORK_STORAGE				: path.join(APP_PATH_FRAMEWORK, 'storage'),
	APP_PATH_FRAMEWORK_STORAGE_LOG			: path.join(APP_PATH_FRAMEWORK, 'storage', 'logs'),
	APP_PATH_FRAMEWORK_STORAGE_DATABASE		: path.join(APP_PATH_FRAMEWORK, 'database'),
	APP_PATH_FRAMEWORK_STORAGE_CACHE			: path.join(APP_PATH_FRAMEWORK, 'storage', 'cache'),
}
module.exports = globals;