'use strict';

var path = require('path');
var CURRENT_DIR_PATH = path.resolve(__dirname);

var init = function() {
	// Initialize 
	require(path.join(CURRENT_DIR_PATH, 'globals'))();
	return this;
};

var execute = function() {
	// Initiate Clustering
	var config 		= require(APP_PATH_FRAMEWORK_CONFIG);
	var concurrency = config.get(config.get('environment')).clusters.enabled || false;
	
	if(!concurrency){
		logo();
		require(APP_PATH_FRAMEWORK_BOOTSTRAPER)();
	}
	else {
		var cluster 	= require('cluster');  
		var numCPUs 	= require('os').cpus().length;
		
		var webConcurrency 		= process.env.WEB_CONCURRENCY || config.get(config.get('environment')).clusters.limit || 1;

		if( webConcurrency == 'auto') {
			webConcurrency = numCPUs;
		}
		
		var workers	= webConcurrency;

		if (cluster.isMaster) { 
			logo();
			// I'm the master, let's fork !
			for (var i = 0; i < workers; i++) {
				cluster.fork();
			}
			
			require(APP_PATH_FRAMEWORK_BOOTSTRAPER)(cluster.isMaster);
			
			cluster.on('online', (worker) => {
				console.log(`Worker ${worker.process.pid} is alive.`);
			});
			
			cluster.on('exit', (worker, code, signal) => {
				console.log(`Worker ${worker.process.pid} died.`);
			});
			
		} 
		else {
			// I'm a worker, let's spawn the HTTP server
			// (workers can share any TCP connection)
			require(APP_PATH_FRAMEWORK_BOOTSTRAPER)();
		}
		/*
		var fs 		= require('fs');
		var access 	= fs.createWriteStream(path.join(__dirname, 'storage', 'logs', 'framework.access.log'), { flags: 'a' });
		var error 	= fs.createWriteStream(path.join(__dirname, 'storage', 'logs', 'framework.error.log'), { flags: 'a' });

		// redirect stdout / stderr
		process.stdout.pipe(access);
		process.stderr.pipe(error);	
		*/
		process.on('uncaughtException', function(err) {
			//log the error
			console.error(err);	
			
			//let's tell our master we need to be disconnected
			require('forky').disconnect();
			//in a worker process, this will signal the master that something is wrong
			//the master will immediately spawn a new worker
			//and the master will disconnect our server, allowing all existing traffic to end naturally
			//but not allowing this process to accept any new traffic
		});	
	}
};

var logo = function(){
	var _logo = '';
	_logo += ' ------------------------------------------------------------ \n';
	_logo += ' Initializing Framework...\n';
	_logo += ' ------------------------------------------------------------ \n';
	console.log(_logo);
};

module.exports = {
	init : init,
	execute : execute
};				