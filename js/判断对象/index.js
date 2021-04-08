// 直接复制到浏览器执行
var obj = null;
var b = Object.prototype.toString.call(obj);b;
"[object Null]"
var obj = {name:1};
var b = Object.prototype.toString.call(obj);b;
"[object Object]"
var obj = [];
var b = Object.prototype.toString.call(obj);b;
"[object Array]"
var obj = new Date();
var b = Object.prototype.toString.call(obj);b;
"[object Date]"
var obj = new RegExp();
var b = Object.prototype.toString.call(obj);b;
"[object RegExp]"
var obj = new Map();
var b = Object.prototype.toString.call(obj);b;
"[object Map]"