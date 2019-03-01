let shopAccDao = require('../dao/shopAccDao');
const commonService = require('./commonService');

const shopAccService = {
    getAll: async (ctx, next) => {
        let data = ctx.request.body;
        await shopAccDao.getAll(data)
            .then(result => {
                let balance = 0;
                let len = result.length;
                for (let i = len - 1; i >= 0; i--) {
                    balance += result[i].account;
                    result[i].balance = balance;
                    // 转换时间格式
                    result[i].time = commonService.convertUTCTimeToLocalTime(result[i].time);
                    result[i].time = result[i].time.substring(0, 10);
                }
                commonService.writeData2Ctx(ctx, result);
            }).catch(err => {
                console.log(err);
            });
    }
};

module.exports = shopAccService;
