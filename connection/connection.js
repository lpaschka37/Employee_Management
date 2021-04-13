const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Austen@15!',
    database: 'company_db',
  });
module.exports = connection;
