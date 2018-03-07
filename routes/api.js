// Controllers
var userController = require('../app/controllers/user');
var contactController = require('../app/controllers/contact');
var commonController = require('../app/controllers/common');
var thirdpartyController = require('../app/controllers/thirdparty');

module.exports = function (app) {
	//app.get('/api/addevent/:type', thirdpartyController.addEvent);
	//app.get('/api/content/:collection', commonController.getRows);
	//app.get('/api/content/:collection/:id', commonController.getRow);
	//app.post('/api/content/:collection/:id', commonController.getRow);
	//app.put('/api/content/:collection/:id', commonController.updateRow);
	//app.post('/api/content/:collection', userController.ensureAuthenticated, commonController.addRow);
	//app.post('/api/multiple/:collection', userController.checkAuth, commonController.addRows);
	
	
	app.get('/api/addevent/:type', thirdpartyController.addEvent);
	app.get('/api/content/:collection', commonController.getRows);
	app.get('/api/content/:collection/:id', commonController.getRow);
	app.post('/api/content/:collection/:id', commonController.getRow);
	app.put('/api/content/:collection/:id', commonController.updateRow);
	app.post('/api/content/:collection', userController.ensureAuthenticated, commonController.addRow);
	app.post('/api/multiple/:collection', userController.checkAuth, commonController.addRows);	
}