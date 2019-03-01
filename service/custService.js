const custDao = require('../dao/custDao');
const commonService = require('./commonService');

const custService = {
    getAll: async (ctx, next) => {
        let data = ctx.request.body;
        await custDao.getAll(data)
            .then(result => {
                commonService.writeData2Ctx(ctx, result);
            }).catch(err => {
                console.log(err);
            });
    }
}

module.exports = custService
