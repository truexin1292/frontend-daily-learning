# 项目描述：
https://blog.csdn.net/miss_liang/article/details/72866609

https://codepen.io/truexin/pen/mavvvm


关于在网页拼接时出现：提示Uncaught SyntaxError: missing ) after argument list；错误的原因分析

https://www.cnblogs.com/wx-ym-good/p/6702890.html
https://blog.csdn.net/yueloveme/article/details/77914613


一直报这个错 但是随便怎么看 代码都是对的， 
原因：后台传的值是String，js必须要用“”或者 ‘’弄起来
```js
var url1 ="http://localhost:8080/zzhpro/servlet/AddToCar?id="+arr[i].id; 
html2 = html2 + "<button onclick='addToCar(\""+url1+"\")'>加入购物车</button></div>";
```
