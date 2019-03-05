const mysql = require('mysql');
const config = require('../config/default');

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

const sql = {
    query: (sql, values) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    conn.query(sql, values, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                        conn.release();
                    });
                }
            });
        })
    }
};

module.exports = sql;
