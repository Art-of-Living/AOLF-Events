'use strict';

var express = require('express');
var app 	= express();
var server 	= require('http').createServer(app);

////////////////////////////////////////////////////////////////////
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Provider = require('react-redux').Provider;
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var helmet = require('helmet');
var Helmet = require('react-helmet').Helmet;
var RateLimit = require('express-rate-limit');

//var config 		= require(APP_PATH_FRAMEWORK_CONFIG);

// Load environment variables from .env file
dotenv.load();


var colors 	= require('colors');
colors.setTheme({ silly: 'rainbow', input: 'grey', verbose: 'cyan', prompt: 'grey',	info: 'cyan', data: 'grey', help: 'cyan', warn: 'yellow', debug: 'blue', error: 'red', rainbow: 'rainbow', success: 'green', danger: 'red', warning: 'yellow', primary: 'blue', disabled: 'grey' });

var bootstrap = function(isMaster) {
	
	isMaster = isMaster || false;
	
	var http 		= require('http');
	var path 		= require('path');
	
	// Seeting Static Resource Path
	//app.use('/public', express.static(APP_PATH_PUBLIC));
	app.use(express.static(APP_PATH_PUBLIC));
	
	////////////////////////////////////////////////////////////////////
	// Load environment variables from .env file
	//dotenv.load();
	////////////////////////////////////////////////////////////////////
	// ES6 Transpiler
	require('babel-core/register');
	require('babel-polyfill');

	// React and Server-Side Rendering
	var routes = require(path.join(APP_PATH_RESOURCES, 'react/app/routes'));
	var configureStore = require(path.join(APP_PATH_RESOURCES, 'react/app/store/configureStore')).default;
	////////////////////////////////////////////////////////////////////
	// connection with the mongodb
	console.log("process.env.MONGODB", process.env.MONGODB);
	mongoose.connect(process.env.MONGODB || "mongodb://localhost:27017/artofliving");
	mongoose.connection.on('error', function() {
		console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
		process.exit(1);
	});
	////////////////////////////////////////////////////////////////////
	mongoose.connection.once('open', function() {
		require(APP_PATH_MODELS)(app, mongoose);
	});
	////////////////////////////////////////////////////////////////////
	var hbs = exphbs.create({
		defaultLayout: 'main',
		helpers: {
			ifeq: function(a, b, options) {
				if (a === b) {
					return options.fn(this);
				}
				return options.inverse(this);
			},
			toJSON: function(object) {
				return JSON.stringify(object);
			},
			
		},
		layoutsDir: APP_PATH_VIEWS_LAYOUTS,
		//partialsDir: APP_PATH_VIEW_PARTIALS,
		//helpers: require(APP_PATH_VIEW_HELPERS)
	});
	////////////////////////////////////////////////////////////////////
	// views is directory for all template files
	app.set('views', APP_PATH_VIEWS);
	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');
	

	
	app.set('port', process.env.PORT || 3000);
	app.use(compression());
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(expressValidator());
	app.use(cookieParser());
	//app.use(express.static(path.join(__dirname, 'public')));
	app.use(helmet());

	app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 

	var limiter = new RateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes 
		max: 100, // limit each IP to 100 requests per windowMs 
		delayMs: 0 // disable delaying - full speed until the max limit is reached 
	});

	// apply to all requests 
	app.use(limiter);
	
	
/* ----------------------- Used features in the framework --------------------------------*/ // END

	// Authentication for the user
	app.use(function(req, res, next) {
		req.isAuthenticated = function() {
			var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
			try {
				return jwt.verify(token, process.env.TOKEN_SECRET);
			} catch (err) {
				return false;
			}
		};

		if (req.isAuthenticated()) {
			var payload = req.isAuthenticated();
			var Model = mongoose.model('user');

			Model.findById(payload.sub, function(err, user) {
				req.user = user;
				next();
			});
		} else {
			next();
		}
	});

	// Requiring API's for the backend process
	//require('./api')(app);

	// Production error handler
	//if (app.get('env') === 'production') {
		//app.use(function(err, req, res, next) {
			//console.error(err.stack);
			//res.sendStatus(err.status || 500);
		//});
	//});
	//}
	
	////////////////////////////////////////////////////////////////////
	
	
	// Loading Helpers support
	require(APP_PATH_FRAMEWORK_HELPERS)(app);	
	l(('Helpers support initiated successfully!').success);
	
	// Loading Services support
	if(isMaster || !env.concurrency().enabled) {
		require(APP_PATH_FRAMEWORK_SERVICES)(app);
		l(('Services support initiated successfully!').success);
	}
	
	// Loading all Middlewares.
	require(APP_PATH_FRAMEWORK_MIDDLEWARES)(app);
	l(('Middlewares support initiated successfully!').success);
	
	// Loading all Routes.
	require(APP_PATH_FRAMEWORK_ROUTES)(app);
	l(('Routes support initiated successfully!').success);
	
	// React server rendering
	app.use(function(req, res) {
		var initialState = {
			auth: { token: req.cookies.token, user: req.user },
			messages: {},
			url: { baseurl: process.env.BASE_URL }
		};
		
		console.log(initialState);

		var store = configureStore(initialState);

		Router.match({ routes: routes.default(store), location: req.url }, function(err, redirectLocation, renderProps) {
			if (err) {
				res.status(500).send(err.message);
			} else if (redirectLocation) {
				res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
					React.createElement(Router.RouterContext, renderProps)
				));
				const helmet = Helmet.renderStatic();
				const regexp = /{{{baseurl}}}/g;
				const meta = helmet.meta.toString().replace(regexp, process.env.BASE_URL);
				const title = helmet.title.toString();
				
				console.log(store.getState(), APP_PATH_VIEWS + '/layouts/main');

				res.render(path.join(APP_PATH_VIEWS_LAYOUTS, 'main'), {
					html: html,
					head: meta,
					title: title,
					initialState: store.getState(),
					date: { date: new Date() },
					baseurl: process.env.BASE_URL
				});
			} else {
				res.sendStatus(404);
			}
		});
	});	
	
	// Loading Models support.
	//require(APP_PATH_FRAMEWORK_MODELS);	
	
	///////////////////////////////////////////////////
	//var PORT 		= process.env.PORT || (config[config.environment]).application.port || 3000;
	//var PORT 		= process.env.PORT || (config.get(config.get('environment'))).application.port || 3000;
	var PORT 		= process.env.PORT || env.application().port || 3000;
	var APP_KEY 	= process.env.APP_KEY;
	///////////////////////////////////////////////////
	app.set('port', PORT);
	///////////////////////////////////////////////////
	if(!isMaster) {
		server.listen(app.get('port'), function(){	
			//l(('\n------------------------------------------'));
			l(('Nucleus server/cluster started & listening on port: ' + app.get('port')));
			//l(('------------------------------------------\n'));
		});	
	}
}	
module.exports = bootstrap;