const router = require('koa-router')();
let loginService = require('../service/loginService');

router.post('/login', async (ctx, next) => {
    await loginService.checkLogin(ctx, next);
});

module.exports = router
