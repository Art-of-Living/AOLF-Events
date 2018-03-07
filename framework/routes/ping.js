'use strict';

module.exports = function (app) {
    // Ping Route
	app.get('/ping', function(req, res){
		res.status(200).send("pong!");
	});
};