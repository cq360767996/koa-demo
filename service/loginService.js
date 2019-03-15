const loginDao = require('../dao/loginDao');
const tips = require('../config/tips');
const check = require('../middlewares/check');
const uuid = require('node-uuid');
const commonService = require('./commonService');

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
                    let username = val.user_loginname;
                    let name = val.user_name;
                    let role = val.user_role_id;
                    ctx.body = {
                        ...tips[200], data: {token, username, name, role}
                    };
                } else {
                    ctx.body = tips[1006];
                }
            }).catch(err => {
                console.log(err);
                ctx.body = tips[1002];
            });
    },
    addUser: async (ctx, next) => { // 新增用户
        let data = ctx.request.body;
        let {username, password, name} = data;
        let id = uuid.v4().replace(/\-/g, '');
        let params = [id, username, password, name, 2];
        await loginDao.addUser(params).then(() => {
            commonService.writeData2Ctx(ctx, tips[200]);
        }).catch(err => {
            throw err;
        });
    },
    editUser: async (ctx, next) => { // 编辑用户
        let data = ctx.request.body;
        let {username, password, name} = data;
        let {uid} = check.verifyToken(ctx.request.header.token);
        let params = [username, password, name, uid];
        await loginDao.editUser(params).then(() => {
            commonService.writeData2Ctx(ctx, tips[200]);
        }).catch(err => {
            throw err;
        });
    }
};

module.exports = loginService;
