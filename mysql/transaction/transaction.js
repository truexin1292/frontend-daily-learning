//封装事务回滚函数
var mysql = require('mysql');
var async = require("async");

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test",
  connectionLimit: 10,
  port: "3306",
  waitForConnections: false
});

function execTrans(sqlparamsEntities, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      return callback(err, null);
    }
    // 开始事务 等同于 命令行里面的begin/start transaction;
    connection.beginTransaction(function (err) {
      if (err) {
        return callback(err, null);
      }
      console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
      var funcAry = [];
      sqlparamsEntities.forEach(function (sql_param, index) {
        var temp = function (cb) {
          var sql = sql_param.sql;
          var param = sql_param.params;
          // connection.query 就是开始 执行sql语句
          connection.query(sql, param, function (tErr, rows, fields) {
            if (tErr) {
              connection.rollback(function () {
                console.log(`第${ index }个事务失败：` + JSON.stringify(sql_param) + "，ERROR：" + tErr);
                throw tErr;
              });
            } else {
              return cb(null, 'ok');
            }
          })
        };
        funcAry.push(temp);
      });

      async.series(funcAry, function (err, result) {
        if (err) {
          connection.rollback(function (err) {
            console.log("transaction error: " + err);
            connection.release();
            return callback(err, null);
          });
        } else {
          connection.commit(function (err, info) {
            console.log("transaction info: " + JSON.stringify(info));
            if (err) {
              console.log("执行事务失败all，" + err);
              connection.rollback(function (err) {
                console.log("transaction error: " + err);
                connection.release();
                return callback(err, null);
              });
            } else {
              connection.release();
              return callback(null, info);
            }
          })
        }
      })
    });
  });
}

module.exports = {
  execTrans: execTrans,
};
