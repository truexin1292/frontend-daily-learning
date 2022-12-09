// 亲测可用
let print = (_favo, _queryLRK) => {
    for (let i = 0; i < _queryLRK.length; i++) {
        let [l, r, k] = _queryLRK[i];
        let fk = _favo[k];
        let count = 0;
        if (fk === undefined) {
            console.log(0);
        } else {
            for (let j = 0; j < fk.length; j++) {
                if (l <= fk[j] && fk[j] <= r) {
                    count++;
                }
            }
            console.log(count);
        }
    }
};

let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let n;
let count = 0;
let favo = {};
let q;
let queryLRK = [];
rl.on('line', (line) => {
    let tokens = line.split(' ');
    if (count === 0) {
        n = parseInt(tokens[0]);
    } else if (count === 1) {
        for (let i = 0; i < n; i++) {
            if (favo[tokens[i]] === undefined) {
                favo[tokens[i]] = [];
            }
            favo[tokens[i]].push(i + 1);
        }
    } else if (count === 2) {
        q = parseInt(tokens[0]);
    } else {
        queryLRK.push(tokens);
        q--;
        if (q === 0) {
            print(favo, queryLRK);
            rl.close();
        }
    }
    count < 3 && count++;
});

