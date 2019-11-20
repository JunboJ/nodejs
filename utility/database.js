const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: 'nodejsstudy',
    password: ''
});

module.exports = pool.promise();