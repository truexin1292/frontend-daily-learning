const express = require('express');
const https = require('https');
var bodyParser = require('body-parser'); //对post请求的请求体进行解析模块

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//设置允许跨域请求
app.all('*', function (req, res, next) {
  //访问控制允许来源：所有
  res.header('Access-Control-Allow-Origin', '*');
  //访问控制允许报头 X-Requested-With: xhr请求
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //访问控制允许方法
  res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS');
  //自定义头信息，表示服务端用nodejs
  res.header('X-Powered-By', 'nodejs');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

let access_token = '';

app.get('/', function (req, res) {
  const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc016701979152961&secret=6654a5a5dfab593a4d8935dba90cc406';

  https.get(url, res1 => {
    res1.on('data', (data) => {
      access_token = JSON.parse(data + '').access_token
    });
    res1.on('end', () => {
      res.send({
        data: access_token,
        result: 200
      });
    })
  }).on('error', e => {
    res.send(e);
  })
});

app.get('/check', function (req, res) {
  const { content } = req;
  console.log(req, '1');
  const url = 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + access_token + '&content=' + content;
  let postData = JSON.stringify({
    content: content
  });
  https.request({
    hostname: 'api.weixin.qq.com',
    path: 'wxa/msg_sec_check',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    },
  }, res1 => {
    let valid = '';
    res1.on('data', (data) => {
      valid = JSON.parse(data + '')
    });
    res1.on('end', () => {
      res.send({
        data: valid,
        result: 200
      });
    });
    req.write(postData);
    req.end();
  }).on('error', e => {
    res.send(e);
  })
});

app.listen(8888);


// curl -d '{ "content":"hello world!" }' 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=38_ZNvZx5qWDANWVukK7tjrOFmfarK3TGWmDUjYHM0IRKjj5G0pxChe_9ldcX68wFxnJmt7Vai7tHhWc6Si-zKl-jhEeTqpkBa17gzq1uHphfAd6gyq72y9xY4Mz8_4ga-YRN05LYfFP1bOoqaVFCZcACAKHE'
// {"errcode":0,"errmsg":"ok"}%
