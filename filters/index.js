module.exports = {
    session_filter: function *(next){
        if(this.request.url == "/session" || this.request.url == "/session/create"|| this.request.url == "/session/destroy"){
            yield next
        }else{
            if("user" in this.session){
                yield next
            }else{
                return this.redirect('/session')
            }
        }
        
    }
    
}