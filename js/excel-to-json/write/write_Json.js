//nodejs 写json文件
var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块

//创建data对象
var data = {
    code: 0,
    ok: true,
    list: []
};

//通过for循环追加数据
for (var i = 0; i < 10; i++) {
    var obj = {
        name: '张三' + i,
        age: i
    };
    data.list.push(obj);
}

//把data对象转换为json格式字符串
var content = JSON.stringify(data);

//指定创建目录及文件名称，__dirname为执行当前js文件的目录
var file = path.join(__dirname, 'json/test.json');

//写入文件
fs.writeFile(file, content, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('文件创建成功，地址：' + file);
});
