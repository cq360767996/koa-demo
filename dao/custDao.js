let mysql = require('../sql/mysql');

const custDao = {
    getAll: () => {
        let _sql = 'select * from customer';
        return mysql.query(_sql);
    }
}

module.exports = custDao
