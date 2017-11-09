module.exports = {
    session_filter: function *(next){
        // if(this.request.url == "/session/destroy" || this.request.url == "/session/create" || this.request.url == "/session/captcha" || this.request.url == "/index.html"){
        if(this.request.url.indexOf("/api") != 0){
            yield next
        }else{
            if("user" in this.session){
                yield next
            }else{
                return this.body = JSON.stringify({success: "false",msg: "未登录"});
            }
        }
        
    }
    
}