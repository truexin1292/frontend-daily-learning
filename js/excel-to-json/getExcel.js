var Excel = require('exceljs');

var start_time = new Date();
var workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: './writer.xlsx'
});
var worksheet = workbook.addWorksheet('Sheet');

worksheet.columns = [
    { header: 'id', key: 'id' },
    { header: 'name', key: 'name' },
    { header: 'phone', key: 'phone' },
    { header: 'gender', key: 'gender' },
    { header: 'age', key: 'age' },
    { header: 'familyName', key: 'familyName' },
    { header: 'chineseName', key: 'chineseName' },
    { header: 'school', key: 'school' },
    { header: 'address', key: 'address' },
    { header: 'major', key: 'major' },
];

var data = [
    {
        id: 100,
        name: 'abc',
        phone: '123456789',
        gender: 'male',
        age: 26,
        familyName: 'truexin',
        chineseName: '邹新许',
        school: '广州中医药大学',
        address: '大学城',
        major: '医药英语',
    },
    {
        id: 101,
        name: 'xyz',
        phone: '13890341234',
        gender: 'female',
        age: 22,
        familyName: 'true',
        chineseName: '陈嘟嘟',
        school: '哈哈哈',
        address: '白云',
        major: '裤脚',
    },
];
var length = data.length;

// 当前进度
var current_num = 0;
var time_monit = 400;
var temp_time = Date.now();

console.log('开始添加数据');
// 开始添加数据
for (let i in data) {
    worksheet.addRow(data[i]).commit();
    current_num = i;
    if (Date.now() - temp_time > time_monit) {
        temp_time = Date.now();
        console.log((current_num / length * 100).toFixed(2) + '%');
    }
}
console.log('添加数据完毕：', (Date.now() - start_time));
workbook.commit();

var end_time = new Date();
var duration = end_time - start_time;

console.log('用时：' + duration);
console.log("程序执行完毕");
