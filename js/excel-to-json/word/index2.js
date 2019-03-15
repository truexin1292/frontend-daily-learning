const mammoth = require("mammoth");

mammoth
    .extractRawText({ path: "./text1.docx" })
    .then(function (result) {
        var text = result.value; // The raw text
        console.log(text);
        var messages = result.messages;
        console.log(messages);
    })
    .done();

// mammoth
//     .convertToHtml({ path: "./test.doc" })
//     .then((result) => {
//         var text = result.value; // html
//         console.log(text);
//         var messages = result.messages;
//         console.log(messages);
//     })
//     .done();
