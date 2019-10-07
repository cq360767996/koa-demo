const shopAccDao = require("../dao/shopAccDao");
const commonService = require("./commonService");
const uuid = require("node-uuid");
const tips = require("../config/tips");

const shopAccService = {
  getAll: async (ctx, next) => {
    let data = ctx.request.body;
    await shopAccDao.getAll(data).then(result => {
      let balance = 0;
      result.map(val => {
        balance += val.account;
        val.balance = balance;
      });
      let res = result.reverse();
      res.map(val => {
        val.time = commonService
          .convertUTCTimeToLocalTime(val.time)
          .substring(0, 10);
      });
      let subRes = res.slice(
        (data.currentPage - 1) * data.pageSize,
        data.currentPage * data.pageSize
      );
      commonService.writeData2Ctx(ctx, subRes);
    });
  },
  getTotalPage: async (ctx, next) => {
    // 获取总页码
    let data = ctx.request.body;
    await shopAccDao
      .getTotalPage(data)
      .then(result => {
        commonService.writeData2Ctx(ctx, result[0]);
      })
      .catch(err => {
        console.log(err);
      });
  },
  insert: async (ctx, next) => {
    // 新增
    let data = ctx.request.body;
    let id = uuid.v4().replace(/\-/g, "");
    let { time, label, matter, account, custId } = data;
    let params = [id, time, label, matter, account, custId];
    await shopAccDao
      .insert(params)
      .then(() => {
        ctx.body = tips[200];
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  },
  update: async (ctx, next) => {
    // 修改
    let data = ctx.request.body;
    let { time, label, matter, account, id } = data;
    let params = [time, label, matter, account, id];
    await shopAccDao
      .update(params)
      .then(() => {
        ctx.body = tips[200];
      })
      .catch(err => {
        console.log(err);
      });
  },
  delete: async (ctx, next) => {
    // 删除
    let data = ctx.request.body;
    for (let i = 0; i < data.length; i++) {
      await shopAccDao.delete(data[i]).catch(err => {
        console.log(err);
      });
    }
    ctx.body = tips[200];
  }
};

module.exports = shopAccService;
