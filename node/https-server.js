var https = require('https');
var fs = require('fs');
const url = 'https://www.jianshu.com/p/785b841d69ee';

const homePage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>测试</title>
</head>
<body>
    <h1>Nice to meet you, truexin1292 ~ </h1>
    <img src="http://ww1.sinaimg.cn/large/ac4831f2gy1fp9zshb41gj2031031q2q.jpg" alt="图片">
</body>
</html>
`

var options = {
    key: fs.readFileSync('./key/privatekey.pem'),
    cert: fs.readFileSync('./key/certificate.pem'),
};

https.get(url, (res) => {
    let html = '';
    res.on('data', (data) => {
        html += data;
    })
    res.on('end', () => {
        https.createServer(options, function (req, res) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            // res.end(homePage);
        }).listen(8000);
    })
}).on('error', () => {
    console.log('获取资源出错！')
})


