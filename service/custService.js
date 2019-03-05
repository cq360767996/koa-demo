const custDao = require('../dao/custDao');
const commonService = require('./commonService');

const custService = {
    getAll: async (ctx, next) => {
        let data = ctx.request.body;
        let res = [];
        await custDao.getAll(data)
            .then(result => {
                if (data.isNotAll) {
                    res = result;
                    return custDao.getCostAndPay(data);
                } else {
                    commonService.writeData2Ctx(ctx, result);
                }
            }).then(result => {
                for (let i = 0; i < res.length; i++) {
                    let cost = 0, payment = 0;
                    for (let j = 0; j < result.length; j++) {
                        if (result[j].customer_id === res[i].id) {
                            if (result[j].account > 0) {
                                payment += result[j].account;
                            } else {
                                cost += result[j].account;
                            }
                        }
                    }
                    res[i].cost = cost;
                    res[i].payment = payment;
                }
                commonService.writeData2Ctx(ctx, res);
            }).catch(err => {
                console.log(err);
            }).catch(err => {
                console.log(err);
            });
    }
};

module.exports = custService;
