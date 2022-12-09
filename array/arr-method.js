// 返回值
var a = [1, 2, 3, 4];
var b = a.push(5); // 新数组长度
var b1 = a.pop(); // 原数组最后一个值
var b2 = a.unshift(0); // 新数组长度
var b3 = a.shift(); // 原数组第一个值
console.log(a, b, b1, b2, b3); // [1, 2, 3, 4] 5 5 5 0

// 修改原数组的方法：- 8个
// reverse, // 反转/倒序 - 修改原来数组，返回新数组
// sort,  // 排序 - 修改原来数组，返回新数组
// push, pop, shift, unshift, // 添加删除 - 修改原来数组，pop和shift返回删除的值，push和unshift返回添加后的数组长度
// splice, // 切割 - 修改原来数组，返回被切割部分的数组
// fill // 填充 - 修改原来数组，返回新数组

// 不修改原数组的方法 - 17个
// map, forEach, filter // 遍历 - forEach没有返回值undefined，其他返回新数组
// includes, every, some // 判断 - 返回布尔值
// find, findLast, findIndex, findLastIndex, indexOf, lastIndexOf // 查找 - 返回元素值或者元素下标
// join, toString // 变成字符串 - 返回字符串
// concat, slice // 追加和切割 - 返回新数组
// reduce // 遍历求和（callback(pre,next,index,arr),[initialValue]） - 返回求和值   
// 使用reduce注意：数组必须有一个元素 或者 提供initialValue，否则报错。
// 如果只有一个元素或者数组空，提供initialValue，则直接返回这个元素，不执行callback
// [].reduce(() => {});  // Uncaught TypeError: Reduce of empty array with no initial value 
// [2].reduce(() => {}); // 2
// [].reduce(()=>{},9);  //9   

// 高级用法：https://blog.csdn.net/weixin_34345560/article/details/93701010
var arr = [1, 2, 3, 4, 5];
var b = arr.reduce(function (pre, next, index, arr) {
    return pre + next; // 16
    // return pre * next; // 120
}, 1);
console.log(b);

// 注意：split是字符串方法，返回数组。String.split() 与 Array.join() 相反的
// slice也是字符串方法
// split(字符串)
// string.split(separator,limit)：split方法把这个string分割成片段来创建一个字符串数组。
// 可选参数limit可以限制被分割的片段数量。
// separator参数可以是一个字符串或一个正则表达式。
// 如果separator是一个空字符，会返回一个单字符的数组，不会改变原数组。
var a = "0123456";
var b = a.split("", 3);
console.log(b);//b=["0","1","2"]
var c = a.split("", 4);
console.log(c);//c=["0","1","2","3"]
// 注意：String.split() 执行的操作与 Array.join 执行的操作是相反的。

