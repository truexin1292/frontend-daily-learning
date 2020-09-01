var http = require('http');
var schedule = require("node-schedule");
const https = require('https');

function httpGet() {
  var uri = `https://dwo.leyaoyao.com/wawawu/rest/verifycode`;
  https.get(uri, function (res) {
    console.log("访问个人微博状态码: " + res.statusCode);
  }).on('error', function (e) {
    console.log("个人微博 error: " + e.message);
  });
}

// 1. 确定的时间执行  比如: 2016年7月13日15:50:00 , new Date() 的时候月份要减1.
// var date = new Date(2020, 7, 29, 22, 0, 0);
// schedule.scheduleJob(date, function () {
//   httpGet();
// });

// 2. 秒为单位执行  比如:每5秒执行一次

var rule1 = new schedule.RecurrenceRule();
var times1 = [ 1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56 ];
rule1.second = times1;
schedule.scheduleJob(rule1, function () {
  httpGet();
});

// 3.以分为单位执行  比如:每5分种执行一次

// var rule2     = new schedule.RecurrenceRule();
// var times2    = [1,6,11,16,21,26,31,36,41,46,51,56];
// rule2.minute  = times2;
// schedule.scheduleJob(rule2, function(){
//   httpGet();
// });

// 4.以小时为单位执行  比如:每4小时执行一次

// var rule3     = new schedule.RecurrenceRule();
// var times3    = [1,5,9,13,17,21];
// rule3.hour  = times3; rule1.minute = 0;
// schedule.scheduleJob(rule3, function(){
//   httpGet();
// });

// 5.Cron风格
//
// schedule.scheduleJob('5 * * * * *', function(){
//   httpGet();
// });
