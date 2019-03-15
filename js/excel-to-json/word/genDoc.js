var officegen = require('officegen');
var fs = require('fs');
var path = require('path');
var docx = officegen('docx');
var async = require('async');

var header = docx.getHeader().createP({ align: ('center') });

console.log(__dirname);

header.addText('公司名称', { font_size: 8, font_face: 'SimSun' });
header.addHorizontalLine();

var pObj = docx.createP();
pObj.options.align = 'center';
pObj.addText("样品检测流程卡", { font_size: 20, font_face: 'KaiTi_GB2312' });

var firstTable = [
    [{
        val: "共 1 页 第 1 页",
        opts: {
            b: true,
            sz: 20,
            align: "left"
        }
    }, {
        val: "编号:",
        opts: {
            b: true,
            sz: 20,
            align: "right"
        }
    }]
];
var tableStyle = {
    tableColWidth: 1200,
    tableFontFamily: "Times New Roman",
}
var pObj = docx.createTable(firstTable, tableStyle);

var table = [
    [{
        val: "样品名称",
        opts: {
            b: true,
            sz: '20',
            align: "left"
        }
    }, {
        val: "电源适配器",

        opts: {

            b: true,
            sz: 20,
            align: "center"
        }
    }, {
        val: "样品数量",

        opts: {

            b: true,
            sz: 20,
            align: "center"
        }
    }, {
        val: "         ",
        opts: {

            b: true,
            sz: 20,
        }
    }, {
        val: "报告编号",
        opts: {

            b: true,
            sz: 20,
            align: "left"
        }
    }, {
        val: "A-123456-ABC123456-201704392-D",
        opts: {
            b: true,
            sz: 20,
            align: "center"
        }
    }],

    [{
        val: "型号规格",
        opts: {

            b: true,
            sz: 20,
            align: "center"
        }
    }, {
        val: "",
        opts: {

            b: true,
            sz: 20,
            align: "center"
        }
    }, {
        val: "要求完成日期",
        opts: {

            b: true,
            sz: 20,
            align: "center"
        }
    }, {
        val: "2017.5.19",
        opts: {
            b: true,
            sz: 20,
        }
    }, {
        val: "委托单位",
        opts: {

            b: true,
            sz: 20,
            align: "center"
        }
    }, {
        val: "电子股份有限公司",
        opts: {

            b: true,
            sz: 20,
            align: "center"
        }
    }]
];

var tableStyle = {
    tableColWidth: 1200,
    tableSize: 20,
    borders: true
}
var pObj = docx.createTable(table, tableStyle);
var out = fs.createWriteStream('out.docx');// 文件写入
out.on('error', function (err) {
    console.log(err);
});
var result = docx.generate(out);// 服务端生成word
