const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
    query: (text, params, cb) => {
        return pool.query(text, params, cb);
    }
};