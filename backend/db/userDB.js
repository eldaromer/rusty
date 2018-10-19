const pool = require('./pool');
const errorCodes = require('pg-error-codes');
const error = require('../error/Exception').Exception;

let createUser = async (username, password) => {
    await pool.query('INSERT INTO users (username, passwordHash) VALUES ($1, $2)', [username, password]);
};

let findUser = async (username) => {
    const {rows} = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    return rows;
};

module.exports = {
    createUser: createUser,
    findUser: findUser
};