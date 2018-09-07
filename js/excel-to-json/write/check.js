var fs = require('fs');

// 通过传回来的页数，进行分页模拟
function pagination(page, count) {
    // p为页数，比如第一页传0，第二页传1,s为每页多少条数据
    fs.readFile('./json/test.json', function (err, data) {
        if (err) {
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        // 把数据读出来
        var length = person.list.length;
        if (page * count > length) {
            console.log('-----------查询成功。数据不足，已全部返回-------------');
            console.log(person.list);
        } else {
            var pagePerson = person.list.slice(count * page, (page + 1) * count);
            console.log('-----------查询成功pagePerson-------------');
            console.log(pagePerson);
        }
    })
}

// pagination(0, 6); // 查询第1页，每页的数据条数为6条
pagination(5, 6); // 查询第5页，每页的数据条数为6条
