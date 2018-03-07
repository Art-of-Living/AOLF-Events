// NOT IN USE - CHECK /BOOTSTRAP.JS TO MAKE CHANGES 
// Authentication for the user
module.exports = function (app) {
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
}