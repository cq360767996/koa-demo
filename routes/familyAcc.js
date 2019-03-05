const router = require('koa-router')();
const familyAccService = require('../service/familyAccService');

router.prefix('/familyAcc');

// 获取所有家庭帐
router.post('/getAll', async (ctx, next) => {
    await familyAccService.getAll(ctx, next);
});

// 获取总页码
router.post('/getTotalPage', async (ctx, next) => {
    await familyAccService.getTotalPage(ctx, next);
});

// 新增
router.post('/add', async (ctx, next) => {
    await familyAccService.insert(ctx, next);
});

// 修改
router.put('/edit', async (ctx, next) => {
    await familyAccService.update(ctx, next);
});

// 删除
router.delete('/delete', async (ctx, next) => {
    await familyAccService.delete(ctx, next);
});

module.exports = router;
