const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Austen@15!',
    database: 'company_db',
  });

// const connection = mysql.createConnection(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
// {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3306,
  
// });

  
module.exports = connection;
