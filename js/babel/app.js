import http from  'http';

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

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(homePage);
}).listen(3004, () => {
    const a = 111;
    let b = 222;
    const fn = (c, d) => c * d;
    console.log('result=', fn(a, b));
    console.log('Server Runing At 3004')
})

