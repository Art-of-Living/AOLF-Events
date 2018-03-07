var helper = helper || {};
var config 		= require(APP_PATH_FRAMEWORK_CONFIG);
var language 	= require(APP_PATH_FRAMEWORK_LANGUAGES);

// LANGUAGE HELPERS
helper.__ = helper.trans = function(){ 
	return config.get('debug') || false;
};
helper.logger = helper.logging = function(){ 
	return config.get('logger') || false;
};

module.exports = helper;