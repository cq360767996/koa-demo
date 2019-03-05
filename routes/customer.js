const router = require('koa-router')();
const custService = require('../service/custService');

router.prefix('/customer');

// 查询所有
router.post('/getAll', async (ctx, next) => {
    await custService.getAll(ctx, next);
});

module.exports = router;
