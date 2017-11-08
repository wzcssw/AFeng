var Router = require('koa-router')
var http = require('../utils/http')
var filters = require('../filters')

var router = new Router({
    prefix: '/api/user'
});

router.post('/login', function *(next) {
    var name = this.request.body.name;
    var password =  this.request.body.password;
    var result = yield http.post('/api/v1/users/login',{name: name,password: password});

    if(result.success){
        this.session.user = result.user;
        this.session.user.access_token = result.access_token;
    }

    this.body = JSON.stringify(result);
});

router.get('/current',filters.session_filter, function *(next) { // 当前登录用户
    var result = {};
    result.user = this.session.user;
    this.session.user == null ? result.success = false : result.success = true;

    this.body = JSON.stringify(result);
});

router.delete('/logout', function *(next) {
    this.session = null;
    this.body = JSON.stringify({success: true});
});

router.get('/list',filters.session_filter,function *(next) { // 所有用户列表
    var access_token = this.session.user.access_token;
    var page = this.query.page || 1;
    var q = this.query.q || '';
    var result = yield http.get('/api/v1/users/list',{access_token: access_token,page: page,q: q});
    this.body = JSON.stringify(result);
});

router.delete('/delete',filters.session_filter, function *(next) {
    var id = this.query.id;
    var access_token = this.session.user.access_token;
    var result = yield http.delete('/api/v1/users/delete',{id: id,access_token: access_token});
    this.body = JSON.stringify(result);
});

router.put('/update',filters.session_filter, function *(next) {
    var user = this.request.body.user;
    var access_token = this.session.user.access_token;
    var result = yield http.put('/api/v1/users/update',{user: JSON.stringify(user),access_token: access_token});
    this.body = JSON.stringify(result);
});

module.exports = router.routes();
