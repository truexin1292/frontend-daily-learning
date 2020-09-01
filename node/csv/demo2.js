const fs = require('fs');
const path = require('path');

function csvToJson(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      // data 为我们所读取的文件内容，按照换行符进行分割
      let dataList = data.split('\r\n');
      // 数组的第一位一定是表头，因此我们单独取出第一行，并且用 ',' 分割
      let titleList = dataList.shift(0).split(',');
      // 如果源文件最后有换行符，则数组的最后一项为空。当为空时，我们舍去最后一行
      if (!dataList[dataList.length - 1]) {
        dataList.pop();
      }
      // 剩下为内容的数组
      // 使用 map 方法，对行内容与表头进行配对编辑，最终返回一个 JSON 的数组
      let jsonList = dataList.map((content) => {
        // 对内容同样用 ',' 分割
        let tmpList = content.split(',');
        let dataObj = {};
        tmpList.forEach((_data, index) => {
          dataObj[titleList[index]] = _data
        });
        return dataObj;
      });
      console.log(jsonList);
      resolve(jsonList);
    })
  })
}
