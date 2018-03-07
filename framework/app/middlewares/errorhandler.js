'use strict';

var errorHandler = require('errorhandler');

module.exports = function (app) {
	app.use(errorHandler({ dumpExceptions: true, showStack: true }));
};