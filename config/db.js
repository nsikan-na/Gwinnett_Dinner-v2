const { createPool } = require("mysql");
const pool = createPool({
  host: MYSQL_HOST,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});


pool.getConnection((err) => {
  if (err) {
    return console.log("Error connecting to db...");
  }
  console.log("Connected to db...");
});

const executeQuery = (query, arrayParams) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrayParams, (err, data) => {
        if (err) {
          console.log("error in executing the query");
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = { executeQuery };
