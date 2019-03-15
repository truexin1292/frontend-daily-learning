var formidable = require('formidable');
var http = require('http');
var util = require('util');
var express = require('express');
var fs = require('fs');
var path = require('path');
var xlsx = require('node-xlsx');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

server.listen(3000);

app.set('views', '/views');
//app.use(favicon('/public/favicon.ico'));
app.use(bodyParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
});

app.post('/upload', function (req, res) {
    console.log(" ########## POST /upload ####### ");
    var fileTypeError = false;
    var target_path = __dirname + "/upload";
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.uploadDir = target_path;

    var fields = [];
    var files = [];

    form.on('field', function (field, value) {
        fields.push([field, value]);
    });
    form.on('file', function (field, file) {
        console.log('upload file: ' + file.name);
        //判断文件类型是否是xlsx
        if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            fileTypeError = true;
        }
        files.push([field, file]);
    });

    form.on('end', function () {
        //遍历上传文件
        var fileName = '';
        var obj = '';
        var folder_exists = fs.existsSync(target_path);
        if (folder_exists) {
            var dirList = fs.readdirSync(target_path);
            dirList.forEach(function (item) {
                if (!fs.statSync(target_path + '/' + item).isDirectory()) {
                    console.log('parse item:' + target_path + '/' + item);
                    fileName = target_path + '/' + item;
                    if (!fileTypeError) {
                        //解析excel
                        obj = xlsx.parse(fileName);
                        console.log(JSON.stringify(obj));
                        res.send({ "rtnCode": "0", "rtnInfo": "成功导入数据" });
                    } else {
                        res.send({ "rtnCode": "1", "rtnInfo": "文件格式不正确" });
                    }
                    //todo 是否delete file
                    // fs.unlinkSync(fileName);
                }
            });
        } else {
            res.send({ "rtnCode": "1", "rtnInfo": "系统错误" });
        }
    });
    form.on('error', function (err) {
        res.send({ "rtnCode": "1", "rtnInfo": "上传出错" });
    });
    form.on('aborted', function () {
        res.send({ "rtnCode": "1", "rtnInfo": "放弃上传" });
    });
    form.parse(req);
});


