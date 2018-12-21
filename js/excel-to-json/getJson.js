var node_xj = require("xls-to-json");

node_xj(
    // {
    //     input: "writer.xlsx",  // input xls
    //     output: "writer.json", // output json
    // },
    {
        input: "interview.xls",  // input xls
        output: "interview.json", // output json
        // sheet: "名称分类",  // specific sheetname tab //todo 就是excel下面的标签
        sheet: "Sheet2"  // specific sheetname tab //todo 就是excel下面的标签
    },
    // { //todo 一样效果
    //     input: __dirname + '/writer.xlsx',
    //     output: __dirname + '/writer.json'
    // },
    function (err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    }
);
