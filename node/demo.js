// 题目1：
setTimeout(() => {
  console.log('setTimeout1');
}, 0);

setImmediate(() => {
  console.log('setImmedate1');
});
// setImmediate1与setTimeout1随机领先输出

// 题目2：
setImmediate(() => {
  setTimeout(() => {
    console.log('setTimeout2');
  }, 0);
  setImmediate(() => {
    console.log('setImmediate2');
  });
});
// setImmediate2与setTimeout2随机领先输出

// 题目3：
setTimeout(() => {
  setTimeout(() => {
    console.log('setTimeout3');
  }, 0);
  setImmediate(() => {
    console.log('setImmediate3');
  });
}, 0);
// 一定是setImmediate3先于setTimeout3

// 题目4：
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('setTimeout4');
  }, 0);
  setImmediate(() => {
    console.log('setImmediate4');
  });
});
// 一定是setImmediate4先于setTimeout4