let mysql = require('../sql/mysql');

const loginDao = {
    checkLogin: (data) => {
        let _sql = 'select * from tbl_user where user_loginname = ? and user_password = ?';
        return mysql.query(_sql, data);
    },
    addUser: (data) => {
        let _sql = "insert into tbl_user (id, user_loginname, user_password, user_name, user_role_id) values(?, ?, ?, ?, ?)";
        return mysql.query(_sql, data);
    },
    editUser: (data) => {
        let _sql = "update tbl_user set user_loginname = ?, user_password = ?, user_name = ? where id = ?";
        return mysql.query(_sql, data);
    }
};

module.exports = loginDao;
