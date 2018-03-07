var helper = helper || {};

var config = require(APP_PATH_FRAMEWORK_CONFIG);
var path = require('path');
var fs = require('fs');

var _require = function(ipath, name){
	try {
		stats = fs.statSync(path.join(ipath, name + '.js'));
		return require(path.join(ipath, name));
	}
	catch (e) {
		try {
			stats = fs.statSync(path.join(ipath, name, '/'));
			return require(path.join(ipath, name, '/'));
		}
		catch (e) {
			try {
				stats = fs.statSync(path.join(ipath, name, '/', name + '.js'));
				return require(path.join(ipath, name, '/', name + '.js'));
			}
			catch (e) {
				// Not Found
				return false;
			}
		}
	}
}

helper.load = function(){
	return {
		controller 	: function(name){
			return _require(APP_PATH_FRAMEWORK_CONTROLLERS, name) || _require(APP_PATH_CONTROLLERS, name);
		},
		library 	: function(name, nucleus){
			return _require(APP_PATH_FRAMEWORK_LIBRARIES, name) || _require(APP_PATH_LIBRARIES, name);
		}
	};
};

module.exports = helper;