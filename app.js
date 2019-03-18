const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const index = require('./routes/index');
const shopAcc = require('./routes/shopAcc');
const familyAcc = require('./routes/familyAcc');
const customer = require('./routes/customer');

const config = require('./config/default');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const staticCache = require('koa-static-cache');
const check = require('./middlewares/check');
const tips = require('./config/tips');
const koaBody = require('koa-body');
// error handler
onerror(app);

// session存储配置
const sessionMysqlConfig = {
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    host: config.database.host,
};

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}));

app.use(async (ctx, next) => {
    let {url = ''} = ctx;
    console.log(url);
    if (url.indexOf('/login') == -1 && ctx.request.req.method != 'GET') { //需要校验登录态 // 不拦截图片数据
        let header = ctx.request.header;
        let loginedtoken = header.token;
        if (loginedtoken) {
            let result = await check.verifyToken(loginedtoken);
            let {uid} = result;
            if (uid) {
                ctx.state = {uid};
                await next();
            } else {
                return ctx.body = tips[1005];
            }
        } else {
            return ctx.body = tips[1005];
        }
    } else {
        await next();
    }
});

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));

// // 缓存
// app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
//   maxAge: 365 * 24 * 60 * 60
// }))
// app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
//   maxAge: 365 * 24 * 60 * 60
// }))

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
    formLimit: '1mb'
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views'));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

// routes
app.use(index.routes(), index.allowedMethods());
app.use(shopAcc.routes(), shopAcc.allowedMethods());
app.use(familyAcc.routes(), familyAcc.allowedMethods());
app.use(customer.routes(), customer.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
