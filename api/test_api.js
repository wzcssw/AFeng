var Router = require('koa-router');
var http = require('../utils/http');

var router = new Router({
    prefix: '/api/test'
});

router.get('/go', function *(next) {
    var result = yield http.get('/api/v1/users/info',{});
    this.body = JSON.stringify(result);
});



module.exports = router.routes();
