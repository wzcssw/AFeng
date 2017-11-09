var Router = require('koa-router')
var http = require('../utils/http')
var svgCaptcha = require('svg-captcha');

var router = new Router({
    prefix: '/session'
});

router.post('/destroy', function *(next) {
    this.session = {}
    this.body = JSON.stringify({success: true});
});

router.get('/captcha', function *(next) {
    var captcha = svgCaptcha.create();
    this.session.captcha = captcha.text.toUpperCase()
    this.body = captcha.data
});

router.post('/create', function *(next) {
    var result = {success: false,error: "验证码输入错误"}       
    var username = this.request.body.username
    var password = this.request.body.password
    var captcha = this.request.body.captcha
    
    if(captcha == undefined || (captcha.toUpperCase() != this.session.captcha)){
    }else{
        data = yield http.post("/logon",{username: username,password: password})
        if(data){
            if(data.success){
                this.session = {user: data.user }
            }
        }
        result = data
    }
    this.body = JSON.stringify(result);
});

router.get('/current_user', function *(next) {
    var result = {current_user: null}
    if(this.session){
        if("user" in this.session){
            result = this.session.user
        }
    }
    this.body = JSON.stringify(result);
});


module.exports = router.routes();
