const custDao = require('../dao/custDao');
const commonService = require('./commonService');
const tips = require('../config/tips');
const uuid = require('node-uuid');
const fs = require('fs');
const path = require('path');

const custService = {
    getAll: async (ctx, next) => {
        let data = ctx.request.body;
        let res = [];
        if (data.isNotAll) {
            await custDao.getAll(data)
            .then(result => {
                res = result;
                return custDao.getCostAndPay(data);
            }).then(result => {
                for (let i = 0; i < res.length; i++) {
                    res[i].time = commonService.convertUTCTimeToLocalTime(res[i].time);
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
            });
        } else {
            await custDao.getAll(data).then(result => {
                commonService.writeData2Ctx(ctx, result);
            });
        }
    },
    getTotalPage: async (ctx, next) => {
        let data = ctx.request.body;
        data.isPage = true;
        await custDao.getAll(data).then(result => {
            commonService.writeData2Ctx(ctx, result[0]);
        }).catch(err => {
            throw err;
        });
    },
    insert: async (ctx, next) => { // 添加
        let data = ctx.request.body;
        let {name, phone, sex, addr, price, time} = data;
        let id = uuid.v4().replace(/\-/g, '');
        let params = [id, name, phone, sex, addr, price, time];
        await custDao.insert(params).then(() => {
            commonService.writeData2Ctx(ctx, tips[200]);
        }).catch(err => {
            throw err;
        });
    },
    update: async (ctx, next) => { // 修改
        let data = ctx.request.body;
        let {id, name, phone, sex, addr, price, time} = data;
        let params = [name, phone, sex, addr, price, time, id];
        await custDao.update(params).then(() => {
            commonService.writeData2Ctx(ctx, tips[200]);
        }).catch(err => {
            throw err;
        });
    },
    delete: async (ctx, next) => { // 删除
        let data = ctx.request.body;
        for (let i = 0; i < data.length; i++) {
            await custDao.delete(data[i]).catch(err => {
                throw err;
            });
        }
        commonService.writeData2Ctx(ctx, tips[200]);
    },
    upload: async (ctx, next) => { // 上传
        const file = ctx.request.files.file; // 获取上传文件
        let custId = ctx.request.body.custId;
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let index = file.name.lastIndexOf('.');
        let filesType = file.name.substring(index); // 文件类型
        let filename = uuid.v4().replace(/\-/g, '').substring(0, 6); // 重命名
        let filePath = path.join(__dirname, '../public/data/' + custId); // 目标文件路径
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        // 创建可写流
        const upStream = fs.createWriteStream(filePath + '/' + filename + filesType);
        // 可读流通过管道写入可写流
        await reader.pipe(upStream);
        await custDao.selectById(custId)
            .then(result => {
                if (result.length && result.length === 1) {
                    let designArr = result[0].design ? result[0].design.split('--') : [];
                    console.log(designArr);
                    designArr.push(filename + filesType);
                    let design = designArr.join('--');
                    let params = [design, custId];
                    return custDao.updateDesign(params);
                }
            })
            .then(() => {
                commonService.writeData2Ctx(ctx, tips[200]);
            }).catch(err => {
                throw err;
            });
    },
    getDesignById: async (ctx, next) => { // 根据id获取设计图名
        let data = ctx.request.body;
        await custDao.selectById(data.id).then(result => {
            if (result.length && result.length === 1) {
                let designArr = result[0].design ? result[0].design.split('--') : [];
                let res = designArr.map(val => {
                    return 'data/' + data.id + '/' + val;
                });
                commonService.writeData2Ctx(ctx, res);
            }
        }).catch(err => {
            throw err;
        });
    },
    deleteImgs: async (ctx, next) => { // 批量删除设计图
        let data = ctx.request.body;
        let custId = data.custId;
        let imgName = data.imgName;
        await custDao.selectById(custId).then(result => {
            if (result.length && result.length === 1) {
                let designArr = result[0].design ? result[0].design.split('--') : [];
                for (let j = 0; j < imgName.length; j++) {
                    for (let i = 0; i < designArr.length; i++) {
                        if (designArr[i] == imgName[j]) {
                            designArr.splice(i, 1);
                        }
                    }
                }
                let params = [designArr.join('--'), custId]; // 更新设计图的sql参数
                return custDao.updateDesign(params);
            }
        }).then(() => { // 更新完设计图之后的回调
            imgName.map(val => {
                let filePath = path.join(__dirname, '../public/data/' + custId + '/' + val); // 删除目标文件路径
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
            commonService.writeData2Ctx(ctx, tips[200]);
        }).catch(err => {
            throw err;
        });
    },
    getAllSt: async (ctx, next) => { // 获取所有统计数据
        await custDao.getAllSt().then(result => {
            commonService.writeData2Ctx(ctx, result);
        });
    },
    getCustRank: async (ctx, next) => { // 获取客户售价排行
        let date = ctx.request.body.date;
        await custDao.getCustRank(date).then(result => {
            commonService.writeData2Ctx(ctx, result);
        });
    },
    getFlowSt: async (ctx, next) => { // 获取客户流量统计
        let date = ctx.request.body.date + '';
        let subDate = date.slice(2) + '-';
        let res = [];
        await custDao.getFlowSt(date).then(result => {
            for (let i = 0; i < 12; i++) {
                let month = subDate + (i < 9 ? '0' : "") + (i + 1);
                let obj = {name: month, value: 0};
                let flag = false;
                for (let j = 0; j < result.length; j++) {
                    if (!flag) {
                        flag = month === result[j].name;
                        obj.value = flag ? result[j].value : '0';
                    }
                }
                res.push(obj);
            }
            commonService.writeData2Ctx(ctx, res);
        });
    },
    getInOutSt: async (ctx, next) => { // 获取收支统计
        let data = ctx.request.body;
        await custDao.getInOutSt(data).then(result => {
            commonService.writeData2Ctx(ctx, result);
        });
    },
    getAnnualSt: async (ctx, next) => { // 获取年度统计
        let date = ctx.request.body.date + '';
        let subDate = date.slice(2) + '-';
        let res = [];
        let params = [
            {date: date, isShopAcc: true, isIncome: false}, // 店铺帐支出
            {date: date, isShopAcc: true, isIncome: true}, // 店铺帐收入
            {date: date, isShopAcc: false, isIncome: false}, // 家庭帐支出
            {date: date, isShopAcc: false, isIncome: true} // 家庭帐收入
        ];
        for (let i = 0; i < params.length; i++) {
            await custDao.getAnnualSt(params[i]).then(result => {
                let arr = [];
                for (let i = 0; i < 12; i++) {
                    let month = subDate + (i < 9 ? '0' : "") + (i + 1);
                    let obj = {name: month, value: 0};
                    let flag = false;
                    for (let j = 0; j < result.length; j++) {
                        if (!flag) {
                            flag = month === result[j].name;
                            obj.value = flag ? result[j].value : '0';
                        }
                    }
                    arr.push(obj);
                }
                res.push(arr);
            });
        }
        commonService.writeData2Ctx(ctx, res);
    },
};

module.exports = custService;
