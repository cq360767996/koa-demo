let custDao = require('../dao/custDao');

const custService = {
    getAll: async (ctx, next) => {
        await custDao.getAll()
            .then(result => {
                ctx.body = result;
            }).catch(err => {
                console.log(err);
            });
    }
}

module.exports = custService
