const router = require('koa-router')();
let loginService = require('../service/loginService');

// 主页面跳转
router.get('/',async (ctx)=>{
    await ctx.render('index',{
    });
});

// 登陆请求
router.post('/login', async (ctx, next) => {
    await loginService.checkLogin(ctx, next);
});

// 新增用户
router.post('/addUser', async (ctx, next) => {
    await loginService.addUser(ctx, next);
});

// 编辑用户
router.post('/editUser', async (ctx, next) => {
    await loginService.editUser(ctx, next);
});

module.exports = router;
