// 连接mysql
const mysql = require("mysql");
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "031648",
  database: "zzxbg",
});
// connection.connect();

let query = function (sql, values) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          // 结束会话
          connection.release();
        });
      }
    });
  });
};

module.exports = query;
