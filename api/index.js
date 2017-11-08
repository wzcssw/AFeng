var redirect_api = require('./redirect_api');
var user_api = require('./user_api');
var test_api = require('./test_api');

module.exports = function (app) {
    app.use(redirect_api);
    app.use(user_api);
    app.use(test_api);
}
