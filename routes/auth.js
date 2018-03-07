var userController = require('../app/controllers/user');

module.exports = function (app) {
	//app.put('/account', userController.ensureAuthenticated, userController.accountPut);
	//app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
	//app.post('/signup', userController.signupPost);
	//app.post('/login', userController.loginPost);
	//app.post('/forgot', userController.forgotPost);
	//app.post('/reset/:token', userController.resetPost);
	//app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
	//app.post('/auth/facebook', userController.authFacebook);
	//app.get('/auth/facebook/callback', userController.authFacebookCallback);
	//app.post('/auth/google', userController.authGoogle);
	//app.get('/auth/google/callback', userController.authGoogleCallback);
	
	app.put('/account', userController.ensureAuthenticated, userController.accountPut);
	app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
	app.post('/signup', userController.signupPost);
	app.post('/login', userController.loginPost);
	app.post('/forgot', userController.forgotPost);
	app.post('/reset/:token', userController.resetPost);
	app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
	app.post('/auth/facebook', userController.authFacebook);
	app.get('/auth/facebook/callback', userController.authFacebookCallback);
	app.post('/auth/google', userController.authGoogle);
	app.get('/auth/google/callback', userController.authGoogleCallback);	
}