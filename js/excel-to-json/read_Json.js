// nodejs 读json文件
// 操作对象
var fs = require('fs');
var file = "./writer.json";
var result = JSON.parse(fs.readFileSync(file));
console.log('result：', result);
