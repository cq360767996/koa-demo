const router = require('koa-router')();
const custService = require('../service/custService');

router.prefix('/customer');

// 查询所有
router.post('/getAll', async (ctx, next) => {
    await custService.getAll(ctx, next);
});

// 查询总页码
router.post('/getTotalPage', async (ctx, next) => {
    await custService.getTotalPage(ctx, next);
});

// 添加
router.post('/add', async (ctx, next) => {
    await custService.insert(ctx, next);
});

// 修改
router.put('/edit', async (ctx, next) => {
    await custService.update(ctx, next);
});

// 删除
router.delete('/delete', async (ctx, next) => {
    await custService.delete(ctx, next);
});

// 上传
router.post('/upload', async (ctx, next) => {
    await custService.upload(ctx, next);
});

// 根据id获取设计图
router.post('/getDesignById', async (ctx, next) => {
    await custService.getDesignById(ctx, next);
});

// 删除设计图
router.put('/deleteImgs', async (ctx, next) => {
    await custService.deleteImgs(ctx, next);
});

// 获取所有统计数据
router.post('/getAllSt', async (ctx, next) => {
    await custService.getAllSt(ctx, next);
});

// 获取客户售价排行
router.post('/getCustRank', async (ctx, next) => {
    await custService.getCustRank(ctx, next);
});

// 获取客户流量统计
router.post('/getFlowSt', async (ctx, next) => {
    await custService.getFlowSt(ctx, next);
});

// 获取收支统计
router.post('/getInOutSt', async (ctx, next) => {
    await custService.getInOutSt(ctx, next);
});

// 获取年度统计
router.post('/getAnnualSt', async (ctx, next) => {
    await custService.getAnnualSt(ctx, next);
});

module.exports = router;
