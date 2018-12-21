var fs = require('fs');
var addPerson = {
    "name": "新增名字",
    "age": 0
}
// 在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据
// 写入json文件选项
function writeJson(params) {
    //现将json文件读出来
    fs.readFile('./json/test.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var person = data.toString(); // 将二进制的数据转换为字符串
        person = JSON.parse(person); // 将字符串转换为json对象
        var index = person.list.length;
        params.name = params.name + index;
        params.age = index;
        person.list.push(params); // 将传来的对象push进数组对象中
        person.total = person.list.length; // 定义一下总条数，为以后的分页打基础
        console.log(person.list);
        var str = JSON.stringify(person); // 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('./json/test.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
    })
}

writeJson(addPerson) // 执行一下;
