// User.find({}, (err, user) => {
//   if (err) {
//     res.send(err);
//   }
//   for (let i = 0; i < family.length; i++) {
//     console.log("第" + (i + 1) + "条数据");
//     let username = user[i].username;
//     let email = user[i].email;
//     let password = user[i].password;
//     let sql = "insert into user_table(username, email, password) values ('" + username + "','" + email + "','" + password + "');";
//     pool.query(sql, (err, rows) => {
//       if (err) {
//         res.send(err);
//       }
//       res.json({
//         message: '数据插入成功',
//         rows
//       });
//     });
//   }
// });

//mongo对象
const Record = require('./record');
//mysql对象
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost', // mysql服务器ip
  user: 'root', // mysql登录名
  password: '123456', // mysql登录密码
  database: 'truexin_base' // mysql数据库名
});
connection.query('set names latin1'); // 这句很关键，确保中文不乱码

const addZero = function (num) {
  return num < 10 ? '0' + num : num;
};

const getYesterday = function () {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  now.setTime(now.getTime() - 1000 * 60 * 60 * 24);
  const day = now.getDate();
  return year + '-' + addZero(month) + '-' + addZero(day);
};

const yesterday = getYesterday();

//导入昨天的数据
Record.find(
  {
    time: {
      '$gt': yesterday + ' 00:00:00',
      '$lt': yesterday + ' 23:59:59'
    }
  },
  function (err, docs) {
    if (err) {
      console.log('error');
    } else {
      for (let i = 0; i < docs.length; i++) {
        const name = docs[i].name;
        // const 字段2 = docs[i].字段2;
        const sql = 'insert into faq_records (name) values(' + name + ');';
        connection.query(sql, function (err, rows) {
          if (err) {
            console.log(err, 'err');
            return;
          }
          console.log(rows, 'rows');
        });
      }
      console.log('succeed!');
    }
  }
);
