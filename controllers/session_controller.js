var http = require('../utils/http')
var svgCaptcha = require('svg-captcha');

module.exports = {
    login: function *() {
        var captcha = svgCaptcha.create();
        this.session.captcha = captcha.text.toUpperCase()

        var result = yield http.post('/logon',{username: "zhaoyy",password: "zyy1988626x"});
        console.log("RESULT=",result)
        
        yield this.render('login',{"title":"Login","flash_msg":this.session.flash_msg,"captcha": captcha.data});
    },
    create: function *() {
        var username = this.request.body.username
        var password = this.request.body.password
        var captcha = this.request.body.captcha
        
        if(captcha == undefined || (captcha.toUpperCase() != this.session.captcha)){
            this.session = {flash_msg: "验证码输入错误"}
        }else{
            
            if (username=="cheng" && password=="123"){
                this.session = {user: {username: username} }
            }else{
                this.session = {flash_msg: "用户名或密码错误"}
            }
        }
        return this.redirect('/')
    },
    destroy: function *() {
        this.session = {}
        return this.redirect('/session')
    },
}   