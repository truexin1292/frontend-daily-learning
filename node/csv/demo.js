const fs = require('fs');
const path = require('path');
const convert = require('json-2-csv');
const chardet = require('chardet');
const iconv = require("iconv-lite");
const jschardet = require("jschardet")

let isGBK = false;
let strData = '';

const csvFile = path.join(__dirname, './file/device.csv');
const gbkFile = path.join(__dirname, './file/gbk.csv');
const utf8File = path.join(__dirname, './file/utf8.csv');

const str = jschardet.detect(utf8File);
const str1 = chardet.detect(utf8File);
console.log(str, str1);

fs.readFile(csvFile, (err, data) => {
  strData = iconv.decode(data, 'gbk');
  if (err) {
    throw new Error(err);
  }
  convert.csv2jsonAsync(strData).then(arr => {
    console.log('转换数组成功');
    // console.log(arr);
  }).catch(err => {
    throw new Error(err);
  });
});
