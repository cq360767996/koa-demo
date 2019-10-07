const familyAccDao = require("../dao/familyAccDao");
const commonService = require("./commonService");
const uuid = require("node-uuid");
const tips = require("../config/tips");

const familyAccService = {
  getAll: async (ctx, next) => {
    let data = ctx.request.body;
    await familyAccDao.getAll(data).then(result => {
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
    await familyAccDao
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
    let { time, label, matter, account } = data;
    let params = [id, time, label, matter, account];
    await familyAccDao
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
    await familyAccDao
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
      await familyAccDao.delete(data[i]).catch(err => {
        console.log(err);
      });
    }
    ctx.body = tips[200];
  }
};

module.exports = familyAccService;
