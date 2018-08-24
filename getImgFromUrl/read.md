# readme.md

## 获取网页乱码问题？
https://cnodejs.org/topic/53142ef833dbcb076d007230

http://www.cnblogs.com/linka/p/6658055.html

https://cnodejs.org/topic/545de1e1a68535a174fe51b5

```js
var request = require('request');
request({url:'http://zhuanlan.zhihu.com/api/columns/bigertech/posts/19885746',gzip:true}, function (err,response,body) {
  console.log(typeof body); // => string
});
```

```js
var request = require('superagent');
request
.get('http://zhuanlan.zhihu.com/api/columns/bigertech/posts/19885746')
.end(function(res){
  console.log(typeof res.body); // => object
});
```
