const mysql = require("mysql2");

let pool;
if (process.env.NODE_ENV === "production") {
  pool = mysql.createPool({
    host: process.env.PROD_DB_HOST,
    user: process.env.PROD_DB_USER,
    database: process.env.PROD_DB_DATABASE,
    password: process.env.PROD_DB_PASSWORD,
  });
}

if (process.env.NODE_ENV === "development") {
  pool = mysql.createPool({
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER,
    database: process.env.DEV_DB_DATABASE,
    password: process.env.DEV_DB_PASSWORD,
  });
}
module.exports = pool.promise();
