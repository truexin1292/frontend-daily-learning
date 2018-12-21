var fs = require('fs');
var params = {
    "name": "孙悟空",
    "age": 99,
}

function changeJson(age, params) {
    fs.readFile('./json/test.json', function (err, data) {
        if (err) {
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来,然后进行修改
        for (var i = 0; i < person.list.length; i++) {
            if (age == person.list[i].age) {
                console.log('age一样的');
                for (var key in params) {
                    if (person.list[i][key]) {
                        person.list[i][key] = params[key];
                    }
                }
            }
        }
        person.total = person.list.length;
        var str = JSON.stringify(person);
        fs.writeFile('./json/test.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('----------修改成功----------');
            console.log(person.list);
            console.log(person.total);
        })
    })
}

changeJson(3, params) // 执行一下;
