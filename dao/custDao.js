let mysql = require('../sql/mysql');

const custDao = {
    getAll: (data) => { // 查询所有
        let _sql = "select * from customer where 1 = 1";
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
    }
};

module.exports = custDao;
