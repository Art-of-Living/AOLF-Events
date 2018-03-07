// NOT IN USE - CHECK /BOOTSTRAP.JS TO MAKE CHANGES 
// React server rendering
module.exports = function (app) {
	return; 
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
				
				console.log(store.getState());

				res.render('layouts/main', {
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
};