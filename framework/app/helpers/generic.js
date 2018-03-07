var helper = helper || {};

var config 		= require(APP_PATH_FRAMEWORK_CONFIG);

helper.version = function () { 
	return '1.0.0-a1';
}

helper.poweredBy = function () { 
	return {
		label	: 'Powered by',
		url 	: '//www.whateverjs.com',
		name 	: 'whatever.js'
	};
}

helper.log = helper.l = function(){ 
	var __debug = config.get('debug') || false;
	if(__debug) { 
		for(var i = 0; i < arguments.length; i++){
			console.log(arguments[i]);
		} 
	}
};

module.exports = helper;