'use strict';

var path = require('path');

var CURRENT_DIR_PATH 	= path.resolve(__dirname);

var APP_PATH_ROOT 		= path.join(CURRENT_DIR_PATH, '..', '..');

var globals = {
	// APPLICATION SPECIFIC GLOBALS
	APP_PATH_CONFIG 						: path.join(APP_PATH_ROOT, 'config'),
	APP_PATH_GLOBALS 						: path.join(APP_PATH_ROOT, 'globals'),
	
	APP_PATH_ROUTES 						: path.join(APP_PATH_ROOT, 'routes'),
	
	APP_PATH_MIDDLEWARES					: path.join(APP_PATH_ROOT, 'app', 'middlewares'),
	APP_PATH_CONTROLLERS					: path.join(APP_PATH_ROOT, 'app', 'controllers'),
	APP_PATH_MODELS							: path.join(APP_PATH_ROOT, 'app', 'models'),
	APP_PATH_HELPERS						: path.join(APP_PATH_ROOT, 'app', 'helpers'),
	APP_PATH_LIBRARIES						: path.join(APP_PATH_ROOT, 'app', 'libraries'),
	APP_PATH_VIEWS							: path.join(APP_PATH_ROOT, 'app', 'views'),
	APP_PATH_VIEWS_LAYOUTS					: path.join(APP_PATH_ROOT, 'app', 'views', 'layouts'),
	APP_PATH_RESOURCES 						: path.join(APP_PATH_ROOT, 'resources'),
	APP_PATH_LANGUAGES 						: path.join(APP_PATH_ROOT, 'resources', 'language'),
	APP_PATH_SERVICES 						: path.join(APP_PATH_ROOT, 'services'),
	
	APP_PATH_PUBLIC							: path.join(APP_PATH_ROOT, 'public'),
	
	APP_PATH_STORAGE						: path.join(APP_PATH_ROOT, 'storage'),
	APP_PATH_STORAGE_LOG					: path.join(APP_PATH_ROOT, 'storage', 'logs'),
	APP_PATH_STORAGE_DATABASE				: path.join(APP_PATH_ROOT, 'database'),
	APP_PATH_STORAGE_CACHE					: path.join(APP_PATH_ROOT, 'storage', 'cache'),
}
module.exports = globals;