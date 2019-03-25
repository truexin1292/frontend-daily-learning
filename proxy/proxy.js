const express = require('express');
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const app = express();

//设置超时时间
const TIME_OUT = 30 * 1e3;

//设置端口
app.set('port', 8888);

//设置超时 返回超时响应
// app.use(timeout(TIME_OUT));
app.use(function (req, res, next) {
    if (!req.timeout) next();
});

//静态资源路径
app.use('/', express.static(__dirname + '/src'));

//反向代理
var proxyOption = {
    // target: 'http://localhost:8081/', //要代理到的目标主机
    target: 'http://www.runoob.com/', //要代理到的目标主机 http://www.runoob.com/try/ajax/ajax_info.txt
    pathRewrite: {
        // '^/szmqs/':'/szmqs',
        '^/new/bird/': '/'
    },
    changeOrigoin: true
}

app.use('/szmqs', proxy(proxyOption));

// 监听端口
app.listen(app.get('port'), function () {
    console.log('server running @${app.get(' + app.get('port') + ')}');
});
