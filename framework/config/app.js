'use strict';

var config 		= config || {};

config.debug 	= true; // Console based logging - Enable/Disable

///////////////////////////////////////////////////
config.environment = config.env = 'development'; //
///////////////////////////////////////////////////

config.development = {
    database: {
        name: 'db_dev_aolf',
        host: 'localhost',
        port: '27017',
        credentials: '' // username:password@
    },
    smtp: {
        username: "username",
        password: "password",
        host: "smtp.gmail.com",
        port: 587,
        ssl: false
	},
    application: {
        port: 8888,
        cookieKey: '8YQM5GUAtLAT34',
    },
    clusters: {
		enabled	: true,
		limit 	: 4
	}
};
 
config.production = {    
    database: {
        name: 'db_prod_aolf',
        host: 'localhost',
        port: '27017',
        credentials: 'admin:password@' // username:password@
    },
    smtp: {
        username: "username",
        password: "password",
        host: "smtp.yourmailserver.com",
        port: 25,
        ssl: false
    },    
    application: {
        port: 80,
        cookieKey: '5SCjWfsTW8ySul',
    },
    clusters: {
		enabled	: true,
		limit 	: 'auto'
	}
};
 
module.exports = config;