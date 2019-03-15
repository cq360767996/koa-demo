let mysql = require('../sql/mysql');

const custDao = {
    getAll: (data) => { // 查询所有
        let _sql = "select ";
        if (data.isPage) {
            _sql += "count(*) as amount";
        } else {
            _sql += "*";
        }
        _sql += " from customer where 1 = 1";
        if (data.isNotAll) {
            _sql += " and id <> '67b2dfd5fcab4db3a1067f4cee22c5f6'";
        }
        if (data.name) {
            _sql += " and name like '%" + data.name + "%'";
        }
        if (data.time) {
            _sql += " and date_format(time, '%Y-%m') = '" + data.time + "'";
        }
        _sql += ' order by time desc';
        if (data.pageSize && data.currentPage) {
            _sql += ' limit ' + (data.currentPage - 1) * data.pageSize + ', ' + data.pageSize;
        }
        return mysql.query(_sql);
    },
    getCostAndPay: (data) => { // 获取成本和已收到
        let _sql = "select * from customer a, shop_account b where a.id = b.customer_id";
        if (data.name) {
            _sql += " and a.name like '%" + data.name + "%'";
        }
        if (data.time) {
            _sql += " and date_format(a.time, '%Y-%m') = '" + data.time + "'";
        }
        _sql += ' order by a.time desc';
        return mysql.query(_sql);
    },
    insert: (data) => { // 插入
        let _sql = "insert into customer values (?, ?, ?, ?, ?, '', ?, ?)";
        return mysql.query(_sql, data);
    },
    update: (data) => { // 更新
        let _sql = "update customer set name = ?, phone = ?, sex = ?, addr = ?, price = ?, time = ? where id = ?";
        return mysql.query(_sql, data);
    },
    delete: (data) => { // 删除
        let _sql = "delete from customer where id = ?";
        return mysql.query(_sql, data);
    },
    selectById: (data) => { //根据id查询
        let _sql = "select * from customer where id = ?";
        return mysql.query(_sql, data);
    },
    updateDesign: (data) => { // 更新设计图
        let _sql = "update customer set design = ? where id = ?";
        return mysql.query(_sql, data);
    },
    getAllSt: () => { // 获取所有统计数据
        let _sql = "select sum(account) as amount from shop_account where account >= 0 union all(select abs(sum(account)) from shop_account where account < 0) union all(select IFNULL(sum(account), 0) from shop_account where account >= 0 and YEAR(time)=YEAR(now())) union all(select IFNULL(abs(sum(account)), 0) from shop_account where account < 0 and YEAR(time)=YEAR(now()))";
        return mysql.query(_sql);
    },
    getCustRank: (data) => { // 客户售价排行
        let _sql = "select name, price as value from customer where id <> '67b2dfd5fcab4db3a1067f4cee22c5f6' ";
        if (data !== '总排行') {
            _sql += "and time > '" + data + "-01' and time < '" + data + "-13'";
        }
        _sql += "order by value desc limit 10";
        return mysql.query(_sql);
    },
    getFlowSt: (data) => {
        let _sql = "select date_format(time, '%y-%m') as name, count(*) as value from customer where id <> '67b2dfd5fcab4db3a1067f4cee22c5f6' AND date_format(time, '%Y') = ? group by date_format(time, '%y-%m')";
        return mysql.query(_sql, data);
    },
    getInOutSt: (data) => { // 收支统计
        let _sql = "select label as name, abs(sum(account)) as value from ";
        if (data.isShopAcc) {
            _sql += "shop_account ";
        } else {
            _sql += "family_account ";
        }
        _sql += " where date_format(time, '%Y') = ? and account ";
        if (data.isIncome) {
            _sql += ">="
        } else {
            _sql += "<"
        }
        _sql += " 0 group by label";
        return mysql.query(_sql, data.date);
    },
    getAnnualSt: (data) => { // 年度统计
        let _sql = "select date_format(time, '%y-%m') as name, abs(sum(account)) as value from ";
        if (data.isShopAcc) {
            _sql += "shop_account ";
        } else {
            _sql += "family_account ";
        }
        _sql += " where date_format(time, '%Y') = ? and account ";
        if (data.isIncome) {
            _sql += ">="
        } else {
            _sql += "<"
        }
        _sql += " 0 group by date_format(time, '%y-%m')";
        return mysql.query(_sql, data.date);
    }
};

module.exports = custDao;
