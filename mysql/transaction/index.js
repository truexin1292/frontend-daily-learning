const express = require('express');
const transaction = require('./transaction.js');

//初始化sql & params：
function _getNewSqlParamEntity(sql, params, callback) {
  if (callback) {
    return callback(null, {
      sql: sql,
      params: params
    });
  }
  return {
    sql: sql,
    params: params
  };
}

//如果你要执行多条sql语句，则需要：
var sqlParamsEntity = [];
var sql0 = `update table1 set age=?, value=? where name='alex'`;
var param1 = [ 1, 2 ];
sqlParamsEntity.push(_getNewSqlParamEntity(sql0, param1));
var sql1 = `insert table1 (name,age) values('burt',19)`;
sqlParamsEntity.push(_getNewSqlParamEntity(sql1));
sql1 = `insert table1 (name,age) values('burt',23)`;
sqlParamsEntity.push(_getNewSqlParamEntity(sql1));
sql1 = `insert table1 (name,age) values('jing',20)`;
sqlParamsEntity.push(_getNewSqlParamEntity(sql1));

var ret;
transaction.execTrans(sqlParamsEntity, function (err, info) {
  if (err) {
    console.error("事务执行失败！");
  } else {
    console.log("事务执行成功！", info);
    ret = info;
  }
});

//创建服务器
const server = express();

//监听端口号8081,移到台北服务器要改成8080端口，mysql的链接也要更改
server.listen(8082, (err) => {
  if (err) {
    throw new err;
  } else {
    console.log('成功监听8082端口。');
  }
});

server.use('/', (req, res) => {
  console.log(ret);
  res.send(ret);
});

process.on('uncaughtException', (err) => {
  console.log('Caught exception: ' + err);
});
