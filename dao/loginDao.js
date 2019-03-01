let mysql = require('../sql/mysql');

const loginDao = {
    checkLogin: (value) => {
        let _sql = 'select * from tbl_user where user_loginname = ? and user_password = ?';
        return mysql.query(_sql, value);
    }
}

module.exports = loginDao
