let mysql = require('../sql/mysql')
let md5 = require('md5');
let jwt = require('jsonwebtoken');
let config = require('../config/default.js');
let fs = require('fs');
let path = require('path');

module.exports = {
    generateToken: data => {
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_private_key.pem'));
        let token = jwt.sign({
            data,
            exp: created + 3600 * 24
        }, cert, {algorithm: 'RS256'});
        return token;
    },
    verifyToken: (token) => {
        let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_public_key.pem')), res = {};
        try {
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            console.log(e);
        }
        return res;

    }
}
