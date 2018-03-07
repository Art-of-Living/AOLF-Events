'use strict';

var fs = require('fs');
var path = require('path');

var schedule = require('node-schedule');
// #######################################################################
// schedule.scheduleJob('42 * * * *', function() {
// #######################################################################
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// #######################################################################

global['framework']['services'] 								= {};

global['framework']['services']['framework'] 					= {};
global['framework']['services']['framework']['instant'] 		= {};
global['framework']['services']['framework']['noninstant'] 		= {};

global['framework']['services']['application'] 				= {};
global['framework']['services']['application']['instant'] 	= {};
global['framework']['services']['application']['noninstant'] 	= {};

module.exports = function(app, io) {
	if(service().enabled === true){
		//l(trans('NEUCLIUS_LANGUAGE_SERVICE_ENABLED_STATUS_TRUE').info);
		l('Service support found enabled! Executing configured services (if any)'.info);
		
		// PROCCESSING - APPLICATION FRAMEWORK SPECIFIC GLOBALS
		fs.readdirSync(APP_PATH_FRAMEWORK_SERVICES).forEach(function (file) {
			if(file.substr(-3) === '.js') {
				// Avoid to read this current file
				if (file === path.basename(__filename)) { return; }
				
				// Load the service file
				var service = require(path.join(APP_PATH_FRAMEWORK_SERVICES, file));
				
				if(service.hasOwnProperty('instant') && service.instant === true) {
					// Instant Service Found
					if(service.hasOwnProperty('id') && service.id != '') {
						global['framework']['services']['framework']['instant'][service.id] = {}; 
						global['framework']['services']['framework']['instant'][service.id]['id'] = service.id; 
						global['framework']['services']['framework']['instant'][service.id]['service'] = service; 
						global['framework']['services']['framework']['instant'][service.id]['reference'] = null; 
					}					
				
					if(service.hasOwnProperty('do')) {
						service.do(app, io);
					}			
				}
				else {
					if(service.hasOwnProperty('config') && service.config !== false) {
						// Non-Instant Service Considered
						if(service.hasOwnProperty('id') && service.id != '') {
							global['framework']['services']['framework']['noninstant'][service.id] = {}; 
							global['framework']['services']['framework']['noninstant'][service.id]['id'] = service.id; 
							global['framework']['services']['framework']['noninstant'][service.id]['service'] = service; 
							global['framework']['services']['framework']['noninstant'][service.id]['reference'] = null; 
							global['framework']['services']['framework']['noninstant'][service.id]['data'] = {}; 
						}					

						if(service.hasOwnProperty('do')) {
							global['framework']['services']['framework']['noninstant'][service.id]['reference'] = schedule.scheduleJob(service.config, function(){
								service.do(app, io, global['framework']['services']['framework']['noninstant'][service.id]['data'], function(data){
									global['framework']['services']['framework']['noninstant'][service.id]['data'] = data;
								})
							});
						}
					}
					else {
						if(service.hasOwnProperty('id') && service.id != '') {
							global['framework']['services']['framework']['instant'][service.id] = {}; 
							global['framework']['services']['framework']['instant'][service.id]['id'] = service.id; 
							global['framework']['services']['framework']['instant'][service.id]['service'] = service; 
							global['framework']['services']['framework']['instant'][service.id]['reference'] = null; 
						}					

						// Executed as Instant Service
						if(service.hasOwnProperty('do')) {
							service.do(app, io);
						}			
					}
				}
			} 
			else {
				return;
			}
		});

		// PROCCESSING - APPLICATION SPECIFIC GLOBALS
		fs.readdirSync(APP_PATH_SERVICES).forEach(function (file) {
			if(file.substr(-3) === '.js') {
				// Avoid to read this current file
				if (file === path.basename(__filename)) { return; }
				
				// Load the service file
				var service = require(path.join(APP_PATH_SERVICES, file));
				
				if(service.hasOwnProperty('instant') && service.instant === true) {
					// Instant Service Found
					if(service.hasOwnProperty('id') && service.id != '') {
						global['framework']['services']['application']['instant'][service.id] = {}; 
						global['framework']['services']['application']['instant'][service.id]['id'] = service.id; 
						global['framework']['services']['application']['instant'][service.id]['service'] = service; 
						global['framework']['services']['application']['instant'][service.id]['reference'] = null; 
					}					
				
					if(service.hasOwnProperty('do')) {
						service.do(app, io);
					}			
				}
				else {
					if(service.hasOwnProperty('config') && service.config !== false) {
						// Non-Instant Service Considered
						if(service.hasOwnProperty('id') && service.id != '') {
							global['framework']['services']['application']['noninstant'][service.id] = {}; 
							global['framework']['services']['application']['noninstant'][service.id]['id'] = service.id; 
							global['framework']['services']['application']['noninstant'][service.id]['service'] = service; 
							global['framework']['services']['application']['noninstant'][service.id]['reference'] = null; 
							global['framework']['services']['application']['noninstant'][service.id]['data'] = {}; 
						}					

						if(service.hasOwnProperty('do')) {
							global['framework']['services']['application']['noninstant'][service.id]['reference'] = schedule.scheduleJob(service.config, function(){
								//service.do(app, io);
								service.do(app, io, global['framework']['services']['application']['noninstant'][service.id]['data'], function(data){
									global['framework']['services']['application']['noninstant'][service.id]['data'] = data;
								});
							});
						}
					}
					else {
						if(service.hasOwnProperty('id') && service.id != '') {
							global['framework']['services']['application']['instant'][service.id] = {}; 
							global['framework']['services']['application']['instant'][service.id]['id'] = service.id; 
							global['framework']['services']['application']['instant'][service.id]['service'] = service; 
							global['framework']['services']['application']['instant'][service.id]['reference'] = null; 
						}					

						// Executed as Instant Service
						if(service.hasOwnProperty('do')) {
							service.do(app, io);
						}			
					}
				}
			} 
			else {
				return;
			}
		});
	}
	else {
		l('Service support found disabled! Skiping configured services (if any)'.danger);
	}
};