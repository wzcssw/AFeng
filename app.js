const app = require('koa')();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session-redis');
const staticCache = require('koa-static-cache')
const config = require('./config');
const path = require('path');
const xtpl = require('xtpl/lib/koa');
const filters = require('./filters')

// 解析post请求
app.use(bodyParser());

app.keys = config.session_redis.key;

///////
app.use(staticCache(path.join(__dirname, 'public'), {
    maxAge: 365 * 24 * 60 * 60 ,
    alias: {'/': '/html/index.html'}
}));

// session
app.use(session({ store: config.session_redis,db: config.session_redis.db}));

// 
app.use(function *(next){
    console.log("ABCDEFG============")
    yield next
});

// 静态文件cache
app.use(staticCache(path.join(__dirname, 'public'), {
    maxAge: 365 * 24 * 60 * 60 ,
    alias: {'/': '/html/index.html'}
}));

// app.on('error', function(err,ctx){
//     console.log('--------  出错了 -----\n\n'
//         + err +'\n\n-------------------------');
// });

//xtemplate 模板渲染
xtpl(app,{
    //配置模板目录，指向工程的view目录
    views: "template"
});

// 引入路由
require('./route')(app);
require('./api')(app);

app.listen(config.port, function(){
    console.log('app has run at port of ' + config.port);
});

