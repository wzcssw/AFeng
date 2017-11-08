var Router = require('koa-router')
var http = require('../utils/http')
var filters = require('../filters')

var router = new Router({
    prefix: '/api/redirect'
});

router.post('/', function *(next) {
    var method = this.request.body.method;
    var url = this.request.body.url;
    var data = this.request.body.data;
    if( method == undefined ){
        return this.body = "method 参数缺失"
    }
    if( url == undefined ){
        return this.body = "url 参数缺失"
    }
    if( data == undefined ){
        return this.body = "data 参数缺失"
    }
    // 这里要加空值判断
    var result = yield http.requst(method.toUpperCase(),url,this.request.body);
    this.body = JSON.stringify(result);
});



module.exports = router.routes();
