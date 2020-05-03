// app.js
var express = require('express');
var fs = require('fs');
var app = express();

var router = require('./router.js');

app.use(function (req, res, next) {
  router(req, res, next);
});

app.listen(3000, function () {
  console.log("http://localhost:3000");
});

// 监听文件修改重新加载代码
fs.watch(require.resolve('./router.js'), function () {
  cleanCache(require.resolve('./router.js'));
  try {
    router = require('./router.js');
  } catch (ex) {
    console.error('module update failed');
  }
});

function cleanCache(modulePath) {
  require.cache[modulePath] = null;
}

