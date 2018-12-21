var fs = require('fs');

// 删除json文件中的选项
function deleteJson(age) {
    fs.readFile('./json/test.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        // 把数据读出来删除
        for (var i = 0; i < person.list.length; i++) {
            if (age == person.list[i].age) {
                console.log(person.list[i])
                person.list.splice(i, 1);
            }
        }
        console.log(person.list);
        person.total = person.list.length;
        var str = JSON.stringify(person);
        // 然后再把数据写进去
        fs.writeFile('./json/test.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log("----------删除成功------------");
        })
    })
}

deleteJson(11); // 执行一下 需要修改删除项age的值；
