let loginDao = require('../dao/loginDao');
const tips = require('../config/tips');
const check = require('../middlewares/check');

const loginService = {
    checkLogin: async (ctx, next) => {
        let data = ctx.request.body;
        let {name, password} = data;
        let value = [name, password];
        await loginDao.checkLogin(value)
            .then(result => {
                if (result && result.length > 0) {
                    let val = result[0];
                    let uid = val['id'];
                    let token = check.generateToken({uid});
                    ctx.body = {
                        ...tips[200], data: {token}
                    }
                } else {
                    ctx.body = tips[1006];
                }
            }).catch(err => {
                console.log(err);
                ctx.body = tips[1002];
            });
    }
}

module.exports = loginService
