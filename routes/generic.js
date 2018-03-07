var contactController = require('../app/controllers/contact');

module.exports = function (app) {
    //app.get('/contact', contactController.contactGet);
    app.post('/contact', contactController.contactPost);
}