var docx2html = require('docx2html')
docx2html("./test.docx").then(function (html) {
    var result = html.toString();
    console.log('--result--:', result)
})
