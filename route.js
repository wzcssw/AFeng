var controllers = require('./controllers');
var router = require('koa-router')();

router.get('/session/',controllers.session_controller.login);
router.post('/session/create',controllers.session_controller.create);
router.get('/session/destroy',controllers.session_controller.destroy);

module.exports = function (app) {
    app.use(router.routes());
}


