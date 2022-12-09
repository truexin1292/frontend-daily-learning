// 链接：https://www.nowcoder.com/questionTerminal/e9d0a72fb08044efb8263946f405ec4b

// others
function res(people, likesArr, q, selectObj) {
    for (let i = 0; i < q; i++) {
        let before = selectObj[i][0];// 1 2 3
        let after = selectObj[i][1];// 2 4 5
        let c = selectObj[i][2]; // 1 5 3
        let com = likesArr.filter(v => v >= before && v <= after);
        let num = 0;
        if (com.length > 0) {
            for (let j = 0; j < com.length; j++) {
                if (com[j] === c) {
                    num++;
                }
            }
        }
        console.log(num);
    }
}

// res(5, [1, 2, 3, 3, 5], 3, [[1, 2, 1], [2, 4, 5], [3, 5, 3]]);
res(5, [5, 1, 3, 2, 3], 3, [[1, 2, 1], [2, 4, 5], [3, 5, 3]]);
