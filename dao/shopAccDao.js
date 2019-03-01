let mysql = require('../sql/mysql');

const shopAccDao = {
    getAll: (data) => {
        var _sql = ' select b.name, a.* from shop_account a, customer b where a.customer_id = b.id';
        if (data.custName) {
            _sql += " and b.name like '%" + data.custName + "%'";
        }
        if (data.time) {
            _sql += " and date_format(a.time, '%Y-%m') = '" + data.time + "'";
        }
        if (data.inOrOut) {
            if (data.inOrOut > 0) {
                _sql += " and a.account >= 0";
            } else {
                _sql += " and a.account < 0";
            }
        }
        if (data.keyword) {
            _sql += " and a.matter like '%" + data.keyword + "%'";
        }
        _sql += ' order by a.time desc';
        return mysql.query(_sql);
    }
}

module.exports = shopAccDao;
