const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'reallyStrongPwd123',
    database: 'workers'
});

module.exports = connection;