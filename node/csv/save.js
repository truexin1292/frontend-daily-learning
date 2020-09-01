const fs = require('fs');
const iconv = require('iconv-lite');
const path = require('path');
const request = require('request');

const csvFile = path.join(__dirname, './file/gbk.txt');
const utf8File = path.join(__dirname, './file/utf8.txt');

// 这里是utf8
const str = '坑爹啊，都是国际项目了，编码居然还用gbk';
console.log(Buffer.from(str).length);

// 转换成gbk
const encoded = iconv.encode(str, 'gbk');

fs.writeFile(csvFile, encoded, function () {
  const buf = fs.readFileSync(csvFile);
  console.log(buf.length);
});

fs.writeFile(utf8File, str, function () {
  const buf = fs.readFileSync(utf8File);
  console.log(buf.length);
});

// var str = iconv.decode(buf, 'GBK'); // return unicode string from GBK encoded bytes
// var buf = iconv.encode(str, 'GBK');// return GBK encoded bytes from unicode string

/**
 * [@param](/user/param) url 需要抓取的url地址
 * [@param](/user/param) calback
 */
function fetchContent(url, calback) {
  var req = request(url, { timeout: 10000, pool: false });
  req.setMaxListeners(50);
  req
    .setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
    .setHeader('accept', 'text/html,application/xhtml+xml');

  req.on('error', function (err) {
    console.log(err);
  });
  req.on('response', function (res) {
    var bufferHelper = new BufferHelper();
    res.on('data', function (chunk) {
      bufferHelper.concat(chunk);
    });
    res.on('end', function () {
      var result = iconv.decode(bufferHelper.toBuffer(), 'GBK');
      calback(result);
    });
  });
}
