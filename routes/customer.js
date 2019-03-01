const router = require('koa-router')();
const custService = require('../service/custService');

router.prefix('/customer');

router.post('/getAll', async (ctx, next) => {
    await custService.getAll(ctx, next);
});

module.exports = router;
