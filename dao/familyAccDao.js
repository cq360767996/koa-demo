let mysql = require("../sql/mysql");

const familyAccDao = {
  getAll: data => {
    let _sql = ``;
    _sql += `select a.*, (@balance := @balance + a.account) as balance from family_account a
    join (select @balance := 0) b where 1 = 1`;
    _sql += data.time
      ? ` and date_format(a.time, '%Y-%m') >= '${
          data.time[0]
        }' and date_format(a.time, '%Y-%m') <= '${data.time[1]}'`
      : "";
    if (data.inOrOut) {
      _sql += data.inOrOut >= 0 ? " and a.account >= 0" : " and a.account < 0";
    }
    _sql += data.keyword ? ` and a.matter like '%${data.keyword}%'` : "";
    _sql += ` order by a.time asc;`;
    return mysql.query(_sql);
  },
  getTotalPage: data => {
    let _sql = "select count(*) as amount from family_account where 1 = 1";
    _sql += data.time
      ? ` and date_format(time, '%Y-%m') >= '${data.time[0]}'
     and date_format(time, '%Y-%m') <= '${data.time[1]}'`
      : "";
    if (data.inOrOut) {
      _sql += data.inOrOut >= 0 ? " and account >= 0" : " and account < 0";
    }
    _sql += data.keyword ? ` and matter like %${data.keyword}%` : "";
    return mysql.query(_sql);
  },
  insert: data => {
    let _sql = "insert into family_account values(?, ?, ?, ?, ?)";
    return mysql.query(_sql, data);
  },
  update: data => {
    let _sql =
      "update family_account set time = ?, label= ?, matter = ?, account = ? where id = ?";
    return mysql.query(_sql, data);
  },
  delete: data => {
    let _sql = "delete from family_account where id= ?";
    return mysql.query(_sql, data);
  }
};

module.exports = familyAccDao;
