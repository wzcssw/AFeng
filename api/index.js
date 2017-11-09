var redirect_api = require('./redirect_api');
var session_api = require('./session_api');


module.exports = function (app) {
    app.use(redirect_api);
    app.use(session_api);
}
