let mysql = require('../sql/mysql');

const custDao = {
    getAll: (data) => {
        let _sql = "select * from customer a LEFT JOIN (SELECT customer_id, SUM(account) as payment from shop_account WHERE account >= 0 GROUP BY customer_id) b on a.id = customer_id LEFT JOIN (SELECT customer_id, SUM(account) as cost from shop_account WHERE account < 0 GROUP BY customer_id) c on a.id = c.customer_id where a.id <> '67b2dfd5fcab4db3a1067f4cee22c5f6' ";
        if (data) {
            _sql += "and a.name like '%" + data.custName + "%' ";
        }
        _sql += 'order by a.time desc';
        return mysql.query(_sql);
    }
}

module.exports = custDao;
