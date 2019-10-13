const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'customer_express_db'
});

global.connection = connection;
console.log('Connected to database');

module.exports = connection; 