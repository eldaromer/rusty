const pool = require('./pool');
const errorCodes = require('pg-error-codes');

let createUser = (username, password, cb) => {
    pool.query('INSERT INTO users (email, passwordHash) VALUES ($1, $2)', [username, password], (err, res) => {
        if (err) cb(errorCodes[err.code]);
        cb()
    })
};

module.exports = {
    createUser: createUser
};