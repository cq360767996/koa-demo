let mysql = require("../sql/mysql");

const shopAccDao = {
  // getAll: (data, isTotalPage) => {
  //     let _sql = 'select ';
  //     if (isTotalPage) {
  //         _sql += 'count(*) as amount';
  //     } else {
  //         _sql += 'b.name, a.*';
  //     }
  //     _sql += ' from shop_account a, customer b where a.customer_id = b.id';
  //     if (data.custName) {
  //         _sql += " and b.name like '%" + data.custName + "%'";
  //     }
  //     if (data.time) {
  //         _sql += ` and date_format(a.time, '%Y-%m') >= '${data.time[0]}'`;
  //         _sql += ` and date_format(a.time, '%Y-%m') <= '${data.time[1]}'`;
  //     }
  //     if (data.inOrOut) {
  //         if (data.inOrOut > 0) {
  //             _sql += " and a.account >= 0";
  //         } else {
  //             _sql += " and a.account < 0";
  //         }
  //     }
  //     if (data.keyword) {
  //         _sql += " and a.matter like '%" + data.keyword + "%'";
  //     }
  //     _sql += ' order by a.time desc';
  //     if (!isTotalPage && data.pageSize && data.currentPage) {
  //         _sql += ' limit ' + (data.currentPage - 1) * data.pageSize + ', ' + data.pageSize;
  //     }
  //     return mysql.query(_sql);
  // },
  getAll: data => {
    let _sql = `select a.*, (@balance := @balance + a.account) as balance, c.name 
    from shop_account a join (select @balance := 0) b join customer c
    where a.customer_id = c.id`;
    _sql += data.custName ? ` and c.name like '%${data.custName}%'` : "";
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
    let _sql = "select count(*) as amount from shop_account where 1 = 1";
    _sql += data.time
      ? ` and date_format(time, '%Y-%m') >= '${data.time[0]}'
     and date_format(time, '%Y-%m') <= '${data.time[1]}'`
      : "";
    if (data.inOrOut) {
      _sql += data.inOrOut >= 0 ? " and account >= 0" : " and account < 0";
    }
    _sql += data.keyword ? ` and matter like '%${data.keyword}%'` : "";
    return mysql.query(_sql);
  },
  insert: data => {
    let _sql = "insert into shop_account values(?, ?, ?, ?, ?, ?)";
    return mysql.query(_sql, data);
  },
  update: data => {
    let _sql =
      "update shop_account set time = ?, label= ?, matter = ?, account = ? where id = ?";
    return mysql.query(_sql, data);
  },
  delete: data => {
    let _sql = "delete from shop_account where id= ?";
    return mysql.query(_sql, data);
  }
};

module.exports = shopAccDao;
