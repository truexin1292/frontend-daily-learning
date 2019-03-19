const formidable = require('formidable');
const http = require('http');
const textract = require('textract');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const Excel = require('exceljs');

const args = process.argv.splice(2);

const app = express();
const server = http.createServer(app);

let singleFileName = '';

server.listen(3000);

app.use(bodyParser());
app.use(express.static('public'));

app.get('/', (req, res) => {
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
        value && fields.push({ reg: value });
    });
    form.on('file', (field, file) => {
        fields.push({ reg: false });
        files.push([field, file]);
    });

    form.on('end', () => {
        //遍历上传文件
        var fileName = '';
        var folder_exists = fs.existsSync(target_path);
        if (folder_exists) {
            var dirList = fs.readdirSync(target_path);
            singleFileName = `${ fields[0] ? fields[0].reg : 'match' }_word.xls`;
            let workbook = new Excel.stream.xlsx.WorkbookWriter({
                filename: singleFileName
            });
            dirList.map((item, index) => {
                if (!fs.statSync(target_path + '/' + item).isDirectory()) {
                    fileName = target_path + '/' + item;
                    // let allowFile = ['doc', 'docx', 'pdf', 'xls', 'xlsx'];
                    if (fileName.indexOf('doc') > -1) {
                        textract.fromFileWithPath(
                            fileName,
                            async (error, text) => {
                                if (text) {
                                    console.log('导入doc或者docx文件内容成功!');
                                } else {
                                    console.log('导入doc或者docx文件内容失败!', error);
                                }

                                function findWords(article) {
                                    return {
                                        list: article ? article.match(/[\sa-zA-Z.（）<>&]+?[\u4e00-\u9fa5；（）<>]+\s?/g) : []
                                    }
                                }

                                function regSheet(regLetter) {
                                    let { list } = findWords(text, regLetter);
                                    let wordList = [];
                                    wordList.push({ word: regLetter });
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

                                console.log('成功匹配词缀，生成xls!');

                                await res.sendFile(__dirname + '/success.html');
                                // await res.send({ "code": 200, "msg": "成功导入数据" });

                                //delete file
                                fs.unlinkSync(fileName);
                            }
                        );
                    } else {
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

app.get("/download", (req, res) => {
    res.download(singleFileName, () => {
        console.log('下载成功！');
        fs.unlinkSync(__dirname + '/' + singleFileName);
    });
});
