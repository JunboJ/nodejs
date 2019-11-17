const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: '3307',
    user: 'root',
    database: 'nodestudy',
    password: 'Kane22271672!'
});

module.exports = pool.promise();