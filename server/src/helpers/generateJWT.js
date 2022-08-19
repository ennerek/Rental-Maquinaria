const jwt = require('jsonwebtoken');
const config  = require('../config');

const generateJWT = (id) => {

    return new Promise((resolve, reject) => {
        jwt.sign({ id }, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
            reject(err);
            } else {
            resolve(token);
            }
        });
    });

    
}


module.exports = generateJWT;
