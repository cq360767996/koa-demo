const router = require('koa-router')();
const shopAccService = require('../service/shopAccService');

router.prefix('/shopAcc');

// 获取所有店铺帐
router.post('/getAll', async (ctx, next) => {
    await shopAccService.getAll(ctx, next);
});

module.exports = router;
