module.exports = {
    session_filter: function *(next){
        if(this.request.url == "/session" || this.request.url == "/session/create"|| this.request.url == "/session/destroy"){
            yield next
        }else{
            if(isEmpty(this.session.user)){
                return this.redirect('/session')
            }else{
                yield next
            }
        }
        
    }
    
}

function isEmpty(obj) { // 判断是否为空对象
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}