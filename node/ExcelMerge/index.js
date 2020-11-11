/**
 * @description excel批量合成工具
 * @author truexin
 */
// 公共库
const xlsx = require('node-xlsx');
const fs = require('fs');
// excel文件夹路径（把要合并的文件放在excel文件夹内）
const _file = `${ __dirname }/excel/`;
const _output = `${ __dirname }/result/`;

const now = new Date();
const date = `${ now.getFullYear() }-${ now.getMonth() + 1 }-${ now.getDate() }`;
const inputDate = process.argv.slice(2)[0] && process.argv.slice(2)[0].split('=')[1];
const dateStr = inputDate || date;

// console.log(process.argv, 'process.argv');
// 输入：node index.js date=2020-06
// 输出：
//  [
//   '/Users/truexin/.nvm/versions/node/v10.19.0/bin/node',
//   '/Users/truexin/truexin/frontend-daily-learning/node/ExcelMerge/index.js',
//   'date=2020-06'
//  ] 'process.argv'

// 合并数据的结果集
let dataList = [
  {
    name: 'sheet1',
    data: []
  }
];

init();

function init() {
  fs.readdir(_file, function (err, files) {
    if (err) {
      throw err
    }
    // files是一个数组
    // 每个元素是此目录下的文件或文件夹的名称
    // console.log(`${files}`);
    files.forEach((item, index) => {
      try {
        // console.log(`${_file}${item}`)
        console.log(`开始合并：${ item }`);
        let excelData = xlsx.parse(`${ _file }${ item }`);
        if (excelData) {
          if (dataList[0].data.length > 0) {
            excelData[0].data.splice(0, 1);
          }
          dataList[0].data = dataList[0].data.concat(excelData[0].data);
        }
      } catch (e) {
        console.log(e);
        console.log('excel表格内部字段不一致，请检查后再合并。');
      }
    });
    // 写xlsx
    const buffer = xlsx.build(dataList);
    fs.writeFile(
      `${ _output }交易订单-${ dateStr }.xlsx`,
      buffer,
      function (err) {
        if (err) {
          throw err;
        }
        console.log('\x1B[33m%s\x1b[0m', `完成合并：${ _output }交易订单-${ dateStr }.xlsx`);
      }
    )
  })
}
