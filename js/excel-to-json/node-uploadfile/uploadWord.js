var formidable = require('formidable');
var http = require('http');
var textract = require('textract');
var express = require('express');
var fs = require('fs');
var path = require('path');
var xlsx = require('node-xlsx');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
// const compression = require('compression');

const Excel = require('exceljs');

//想获得命令行后面的几个参数值
/*
//node arg.js arg1 arg2 arg3， 想取得这三个参数
//即可以程序中用：
var args = process.argv.splice(2)
//process是一个全局对象，argv返回的是一组包含命令行参数的数组。
//第一项为”node”，第二项为执行的js的完整路径，后面是附加在命令行后的参数
*/
var args = process.argv.splice(2);

var app = express();
var server = http.createServer(app);

server.listen(3000);

app.set('views', '/views');
app.use(favicon('./public/favicon.ico'));
app.use(bodyParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // todo
    // 直接生成html
    // res.writeHead(200, { 'content-type': 'text/html' });
    // res.end(
    //     '<form action="/upload" enctype="multipart/form-data" method="post">' +
    //     '<input type="text" name="reg1"><br>' +
    //     '<input type="text" name="reg2"><br>' +
    //     '<input type="file" name="upload" multiple="multiple"><br>' +
    //     '<input type="submit" value="Upload">' +
    //     '</form>'
    // );

    // todo
    // 直接使用本地的html，必须使用绝对路径；
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', (req, res) => {
    var target_path = __dirname + "/upload";
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.uploadDir = target_path;

    var fields = [];
    var files = [];

    form.on('field', (field, value) => {
        fields.push({ reg: value });
    });
    form.on('file', (field, file) => {
        console.log('upload file: ' + file.name);
        fields.push({ reg: false });
        files.push([field, file]);
    });

    form.on('end', () => {
        //遍历上传文件
        var fileName = '';
        var folder_exists = fs.existsSync(target_path);
        if (folder_exists) {
            var dirList = fs.readdirSync(target_path);
            let workbook = new Excel.stream.xlsx.WorkbookWriter({
                filename: `${ args[0] }_word_match.xlsx`
            });
            dirList.map((item, index) => {
                console.log('--log--:', index, fields);
                if (!fs.statSync(target_path + '/' + item).isDirectory()) {
                    console.log('parse item:' + target_path + '/' + item);
                    fileName = target_path + '/' + item;
                    if (fileName.indexOf('doc') > -1) {
                        textract.fromFileWithPath(
                            fileName,
                            async (error, text) => {
                                // console.log(text);

                                function findWords(article) {
                                    // return list: article.match(/\b\w+\b/g);
                                    return {
                                        list: article.match(/[\sa-zA-Z.（）<>&]+?[\u4e00-\u9fa5；（）<>]+\s?/g)
                                    }
                                }

                                function regSheet(regLetter) {
                                    let { list } = findWords(text, regLetter);
                                    let wordList = [];
                                    wordList.push({ word: regLetter });
                                    console.log('--list--:', list);
                                    list = Array.isArray(list) ? list : [];
                                    list.map((v, j) => {
                                        if (v.indexOf(regLetter) > -1) {
                                            wordList.push({ word: v });
                                        }
                                    });
                                    let worksheet = workbook.addWorksheet(`${ regLetter }_sheet`);
                                    worksheet.columns = [
                                        { header: '词缀', key: 'word', width: 50 },
                                    ];
                                    for (let i in wordList) {
                                        worksheet.addRow(wordList[i]).commit();
                                    }
                                }

                                fields.map((field, i) => {
                                    if (field.reg) {
                                        regSheet(field.reg);
                                    }
                                })

                                // 添加sheet
                                workbook.commit();

                                await res.send({ "code": 200, "msg": "成功导入数据" });

                                //delete file
                                fs.unlinkSync(fileName);
                            }
                        );
                    } else {
                        console.log('--匹配词缀--:', fields[index].reg)
                        res.send({ "code": 200, "msg": "成功导入数据", data: fields[index].reg });
                        //delete file
                        fs.unlinkSync(fileName);
                    }
                }
            });
        } else {
            res.send({ "code": "1", "msg": "系统错误" });
        }
    });
    form.on('error', (err) => {
        res.send({ "code": "1", "msg": "上传出错" });
    });
    form.on('aborted', () => {
        res.send({ "code": "1", "msg": "放弃上传" });
    });
    form.parse(req);
});

// app.use(compression()); // todo 好像与默认压缩一样；
