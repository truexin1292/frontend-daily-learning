const textract = require('textract');
const Excel = require('exceljs');
const regLetter = 'ate';
const regLetter2 = 'tion';
const docPath = './text1.docx';

let workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: `word_match.xlsx`
});

textract.fromFileWithPath(docPath, function (error, text) {
    console.log('text:', text);

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
        list.map((v, i) => {
            if (v.indexOf(regLetter) > -1) {
                wordList.push({ word: v });
            }
        });
        let worksheet = workbook.addWorksheet(`${ regLetter }_sheet`);
        worksheet.columns = [
            { header: '词缀', key: 'word', width: 30 },
        ];
        for (let i in wordList) {
            worksheet.addRow(wordList[i]).commit();
        }
    }

    regSheet(regLetter);

    regSheet(regLetter2);

    // 添加sheet
    workbook.commit();
})
