/**
 * node.js的入口文件.
 * 必须的参数：file - 文件名称； callback - jsonp形式调用
 * 返回jsonp形式
 */
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');

function writeMsg(response, msg) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:63341');
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8;' });
    response.write(msg);
    response.end();
}

http.createServer(function (request, response) {
    //获取url的query
    var arg = url.parse(request.url).query;
    //转换为json形式
    var arg_json = querystring.parse(arg);
    //输出的内容
    var content = '';
    var filepath = arg_json.file;
    var callback = arg_json.callback;

    if (filepath) {
        //file -- 本地的json文件路径
        filepath = path.resolve('./data/' + filepath);
        //判断文件是否存在
        if (!fs.existsSync(filepath)) {
            msg = 'error:文件不存在';
            writeMsg(response, msg);
        } else {
            fs.readFile(filepath, 'utf-8', function (err, data) {
                if (err) {
                    console.log(err);
                    msg = 'error:文件读取失败';
                    writeMsg(response, msg);
                } else {
                    //读取成功
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    if (callback) {
                        //callback -- jsonp形式
                        response.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8;' });
                        content = "(" + callback + ")" + "(" + data + ");";
                        response.write(content);
                        response.end();
                        return false;
                    }
                    else {
                        //callback -- jsonp形式
                        response.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8;' });
                        response.write(data);
                        response.end();
                        return false;
                    }
                }
            });
        }
    } else {
        msg = 'error:参数错误';
        writeMsg(response, msg);
    }
}).listen(3001, 'localhost', () => {
    console.log(`服务器运行在http://localhost:${3001}`);
});
