const http = require('http');
const url = 'http://frontend.test.fengchaoli.com/';

http.get(url, (res) => {
    let html = '';
    res.on('data', (data) => {
        html += data;
    })
    res.on('end', () => {
        console.log(html);
    })
}).on('error', () => {
    console.log('获取资源出错！')
})
