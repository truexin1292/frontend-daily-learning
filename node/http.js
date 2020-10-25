const https = require('https');
const url = 'http://frontend.test.fengchaoli.com/';
const url1 = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc016701979152961&secret=6654a5a5dfab593a4d8935dba90cc406';

https.get(url1, (res) => {
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
