// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql');
// const conf = require('../config/dbconnection');
//
// // 定义pool池
// const pool = mysql.createPool(
//   {
//     host: conf.dbMysql.host,
//     user: conf.dbMysql.user,
//     password: conf.dbMysql.password,
//     database: conf.dbMysql.database,
//     port: conf.dbMysql.port
//   }
// );
//
// router.get('/', function (req, res) {
//   const selectSites = "select *, date_format(do_time, '%Y-%m-%d %H:%i:%s') as time from siteinfo order by id";
//   pool.getConnection(function (err, connection) {
//     if (err) throw err;
//     connection.query(selectSites, function (err, rows) {
//       if (err) throw err;
//       res.render('sites', { title: '站点分布', results: rows });
//       // 回收pool
//       connection.release();
//     });
//   });
// });
//
// module.exports = router;

const mongoose = require('mongoose');
// const connectionRecord = mongoose.createConnection('mongodb://mongo登录帐号:mongo登录密码@ip:mongo服务端口(默认是27017)/数据库名');
// const connectionRecord = mongoose.createConnection('mongodb://root:123456@localhost:27017/truexin_base');
// const connectionRecord = mongoose.createConnection('mongodb://localhost:27017/truexin_base');
// const connectionRecord = mongoose.createConnection('mongodb://127.0.0.1:27017/truexin_base');

const connectionRecord = mongoose.connect('mongodb://127.0.0.1:27017/truexin_base', { useNewUrlParser: true }, (err, res) => {
  if (!err) {
    console.log(res);
  } else {
    console.log('err:', err);
  }
});
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  name: String,
  // _id: String
});
const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
