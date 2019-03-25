var express = require('express'),
    https = require('https'),
    app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    superagent = require('superagent');
var options = {
    key: fs.readFileSync('./https/zhangzehui.cn.key'),
    cert: fs.readFileSync('./https/zhangzehui.cn.crt')
};
//var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//拦截器允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    // 允许证书 携带cookie
    res.header("Access-Control-Allow-Credentials", "true")
    next();
});
app.get('/get', function (req, res) {
    var data = req.query,
        ServerCookie = req.headers.cookie,
        nres = res;
    if (data.api == "" || data.api == undefined) {
        res.json({ "msg": "api字段不能为空!" })
        return
    }
    var sreq = superagent.get(data.api);
    //如果使用 Accept存在的的话则设置为Accept的值
    if (data.Accept) {
        sreq.set({
            'Accept': data.Accept,
            'Content-Type': 'application/json;charset=UTF-8'
        })
        // 判断cookie是否存在存在则设置cookie
        if (ServerCookie) {
            sreq.set('Cookie', ServerCookie)
        }
    } else {
        sreq.set({
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        })
        if (ServerCookie) {
            sreq.set('Cookie', ServerCookie)
        }
    }
    if (data.datas) {
        sreq.query(data.datas)
    }
    sreq.end(function (err, res) {
        if (err) {
            nres.json({ "msg": "请求发生错误可能是api地址无效或者Accept设置不正确或者请求方式错误" })
        } else {
            console.log(res)
            if (JSON.stringify(res.body) == "{}") {
                var text = res.text
                if (text.charAt(0) == "{" && text.charAt(text.length - 1) == "}") {
                    nres.json(JSON.parse(text))
                } else {
                    nres.json({ "data": text })
                }
            } else {
                nres.json(res.body)
            }
        }
    })
});
app.post('/post', function (req, res) {
    var data = req.body,
        ServerCookie = req.headers.cookie,
        nres = res;
    if (data.api == "" || data.api == undefined) {
        res.json({ "msg": "api字段不能为空!" })
        return
    }
    var sreq = superagent.post(data.api);
    if (data.Accept) {
        sreq.set({
            'Accept': data.Accept,
            'Content-Type': 'application/json;charset=UTF-8'
        })
        // 判断cookie是否存在存在则设置cookie
        if (ServerCookie) {
            sreq.set('Cookie', ServerCookie)
        }
    } else {
        sreq.set({
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        })
        if (ServerCookie) {
            sreq.set('Cookie', ServerCookie)
        }
    }
    if (data.datas) {
        sreq.send(data.datas)
    }
    sreq.end(function (err, res) {
        if (err) {
//nres.send(err.response.text)
            nres.json({ "msg": "请求发生错误可能是api地址无效或者Accept设置不正确或者请求方式错误" })
        } else {
            console.log(res)
            if (JSON.stringify(res.body) == "{}") {
                var text = res.text
                if (text.charAt(0) == "{" && text.charAt(text.length - 1) == "}") {
                    nres.json(JSON.parse(text))
                } else {
                    nres.json({ "data": text })
                }
            } else {
                nres.json(res.body)
            }
        }
    })
});
app.get('/', function (req, res) {
    if (req.query.echostr) {
        res.end(req.query.echostr)
    } else {
        res.send('欢迎访问，此域名目前仅用于接口转发（如果你是开发者请勿用于其他用途比如攻击他人，技术交流出' +
            '问题不负责），未用于其他用途！！！！bywzzhui 微博关注wzzehui')
    }
})
//app.listen(443);
https.createServer(options, app).listen(443)
