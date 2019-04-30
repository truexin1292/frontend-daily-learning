# 项目描述：
http://es6.ruanyifeng.com/#docs/iterator

```js
let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
for (let x of arrayLike) {
  console.log(x);
}//Uncaught TypeError: arrayLike is not iterable


// 报错
for (let x of [...arrayLike]) {
  console.log(x);
}//Uncaught TypeError: [(...arrayLike)] is not iterable


// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x);
} // a b

// todo 普通对象可以直接调用for in，调用for of 需要封装下；
var obj = {a:1,b:2,c:3};

for (var key in obj) {
  console.log(key + ': ' + obj[key]);
}

//方法1
for (var key of Object.keys(obj)) {
  console.log(key + ': ' + obj[key]);
}

//方法2 使用 Generator 函数将对象重新包装一下
function* list(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of list(obj)) {
  console.log(key, '->', value);
}
```
