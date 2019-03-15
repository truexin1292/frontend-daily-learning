function FindWord(article, reg = 'ti') {
    return {
        reg,
        list: article.match(/\b\w+\b/g)
    };
}

var { list, reg } = FindWord('If I knew it would be the last time' +
    ' Id see you fall asleep,I would tuck you in more tightly and' +
    ' If I knew it would be the last time Id see you walk out the door.');

//["If", "I", "knew", "it", "would", "be", "the", "last", "time", "Id", "see", "you", "fall", "asleep", "I", "would", "tuck", "you", "in", "more", "tightly", "and", "If", "I", "knew", "it", "would", "be", "the", "last", "time", "Id", "see", "you", "walk", "out", "the", "door"]

var wordList = [];
var findWord = list.map((v, i) => {
    if (v.indexOf(reg) > -1) {
        wordList.push(v);
    }
})
