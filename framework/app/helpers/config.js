var helper = helper || {};
var config = require(APP_PATH_FRAMEWORK_CONFIG);

// CONFIG HELPERS
helper.config = config;
helper.debug = helper.debuging = function(){ 
	return config.get('debug') || false;
};
helper.logger = helper.logging = function(){ 
	return config.get('logger') || false;
};

helper.service = function(){ 
	return config.get('service') || false;
};

// CONFIG ENVIRONMENT HELPERS
helper.environment = helper.env = {}
helper.environment.get = helper.environment.current = helper.environment.active = helper.env.get = helper.env.current = helper.env.active = function(){ 
	return config.get(config.get('environment')) || false;
};
helper.environment.title = helper.env.title = function(){ 
	return config.get('environment') || false;
};
helper.environment.database = helper.env.database = function(){ 
	return (config.get(config.get('environment'))).database || false;
};
helper.environment.smtp = helper.env.smtp = function(){ 
	return (config.get(config.get('environment'))).smtp || false;
};
helper.environment.application = helper.env.application = function(){ 
	return (config.get(config.get('environment'))).application || false;
};
helper.environment.clusters = helper.environment.concurrency = helper.env.clusters = helper.env.concurrency = function(){ 
	return (config.get(config.get('environment'))).clusters || false;
};

helper.language = helper.lang = function(){ 
	return config.get('language') || false;
};

module.exports = helper;