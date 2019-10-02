const router = require('koa-router')();
const shopAccService = require('../service/shopAccService');

router.prefix('/shopAcc');

// 获取所有店铺帐
router.post('/getAll', async (ctx, next) => {
    await shopAccService.getAll(ctx, next);
});

// 获取总页码
router.post('/getTotalPage', async (ctx, next) => {
    await shopAccService.getTotalPage(ctx, next);
});

// 新增
router.post('/add', async (ctx, next) => {
    await shopAccService.insert(ctx, next);
});

// 修改
router.put('/edit', async (ctx, next) => {
    await shopAccService.update(ctx, next);
});

// 删除
router.post('/delete', async (ctx, next) => {
    await shopAccService.delete(ctx, next);
});

module.exports = router;
