const https = require('https');
const http = require('http');
const url = 'https://b.leyaoyao.com';
const url2 = 'http://zd.ksepton.com/';
const url22 = 'http://sit.ksepton.com/login';
const url23 = 'http://vm.ksepton.com/login';
const url3 = 'https://mt.ksepton.com/';
const url1 = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc016701979152961&secret=6654a5a5dfab593a4d8935dba90cc406';

// https.get(url3, (res) => {
//     let html = '';
//     res.on('data', (data) => {
//         html += data;
//     })
//     res.on('end', () => {
//         console.log(html);
//     })
// }).on('error', () => {
//     console.log('获取资源出错！')
// })
http.get(url22, (res) => {
    console.log('log:', res);
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
