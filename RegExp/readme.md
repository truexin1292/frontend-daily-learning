# 项目描述：
https://juejin.im/post/5caf12485188251ae000533f
http://www.itpon.com/article/js/6441.html

## 1.匹配中文
let chinese = /^[\u4e00-\u9fa5]+$/ // 只包含一个或者多个中文的正则表达式

## 2.金额分割
let splitMoney = /(\d)(?=(\d{3})+(?!\d))/g , '$1,'
var num = 9999966666669.45146;
var result = num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

## 3.url查询参数转换成对象
```js
//todo 当只有一个参数时substring 与 substr可以等同用法；
//str.substring(start,end=str.length) ：start，end 第二个参数是截取下标（不包含此下标），省略默认到最后
//str.substr(start,length=str.length) ：start，length 第二个参数是截取长度，省略默认到最后
//arr.slice(start,end=str.length) ：start，end 第二个参数是截取下标（不包含此下标），省略默认到最后 
// [].slice.call(str,1)
function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);                
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}
//rs是匹配的子串，$1和$2代表匹配的第n个分组，
// 这里也就是([^?&=]+)（即query的name）和([^?&=]*)（即query的value），
// 遍历同时将value赋值到obj对应的name属性上。
//为每项匹配的数据设置回调处理

function getAllParam(url){
    url = url ? url : location.href;
    let search = url.substring(url.lastIndexOf('?')+1);
    // let search = url.substr(url.lastIndexOf('?')+1);
    // let search = [].slice.call(url,url.lastIndexOf('?')+1).join('');
    // slice实现返回是[]，记得join('')；默认join是','拼接；
    
    //let search = location.search;
    let reg = /([^?&=]+)=([^?&=]*)/g; // [^]非的意思
    // var reg = /[^?&]+=[^?&]*/g;
    let arr = search.match(reg) || [];
    let obj = {};
    arr.forEach((v,i,curr)=>{
        let item = v.split('=');
        let name = decodeURIComponent(item[0]);
        let val = decodeURIComponent(item[1]);
        obj[name] = val;
    });
    return obj
}
```

```
要理解?=和?!，首先需要理解前瞻，后顾，负前瞻，负后顾四个概念：

前瞻：
exp1(?=exp2) 查找exp2前面的exp1
后顾：
(?<=exp2)exp1 查找exp2后面的exp1
负前瞻：
exp1(?!exp2) 查找后面不是exp2的exp1
负后顾：
(?<!=exp2)exp1 查找前面不是exp2的exp1

举例：
"中国人".replace(/(?<=中国)人/, "rr") // 匹配中国人中的人，将其替换为rr，结果为 中国rr
"法国人".replace(/(?<=中国)人/, "rr") // 结果为 法国人，因为人前面不是中国，所以无法匹配到

要理解?:则需要理解捕获分组和非捕获分组的概念：

()表示捕获分组，()会把每个分组里的匹配的值保存起来，使用$n(n是一个数字，表示第n个捕获组的内容)
(?:)表示非捕获分组，和捕获分组唯一的区别在于，非捕获分组匹配的值不会保存起来

举例：
// 数字格式化 1,123,000
"1234567890".replace(/\B(?=(?:\d{3})+(?!\d))/g,",") // 结果：1,234,567,890，匹配的是后面是3*n个数字的非单词边界(\B)
```
