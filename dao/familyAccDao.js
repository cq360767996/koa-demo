let mysql = require('../sql/mysql');

const familyAccDao = {
    getAll: (data, isTotalPage) => {
        let _sql = 'select';
        if (isTotalPage) {
            _sql += ' count(*) as amount';
        } else {
            _sql += ' *';
        }
        _sql += ' from family_account where 1 = 1';
        if (data.time) {
            _sql += " and date_format(time, '%Y-%m') = '" + data.time + "'";
        }
        if (data.inOrOut) {
            if (data.inOrOut > 0) {
                _sql += " and account >= 0";
            } else {
                _sql += " and account < 0";
            }
        }
        if (data.keyword) {
            _sql += " and matter like '%" + data.keyword + "%'";
        }
        _sql += ' order by time desc';
        if (!isTotalPage && data.pageSize && data.currentPage) {
            _sql += ' limit ' + (data.currentPage - 1) * data.pageSize + ', ' + data.pageSize;
        }
        return mysql.query(_sql);
    },
    insert: (data) => {
        let _sql = "insert into family_account values(?, ?, ?, ?, ?)";
        return mysql.query(_sql, data);
    },
    update: (data) => {
        let _sql = "update family_account set time = ?, label= ?, matter = ?, account = ? where id = ?";
        return mysql.query(_sql, data);
    },
    delete: (data) => {
        let _sql = "delete from family_account where id= ?";
        return mysql.query(_sql, data);
    }
};

module.exports = familyAccDao;
