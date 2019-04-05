# cache：分为两大类：强缓存，协商缓存

https://www.byvoid.com/zhs/blog/http-keep-alive-header
http://web.jobbole.com/95057/?utm_source=blog.jobbole.com&utm_medium=relatedPosts

强缓存：
1. expires: Thu, 19 Nov 1981 08:52:00 GMT
  //服务端返回绝对时间在http的header头里面；（http1.0版本）
客户端发送数据请求：
会判断请求的时间是否在这个绝对时间内，是的话就直接取缓存的；
过期就直接请求服务器的数据；  

2. Cache-Control: mage-age = 3600
   Cache-Control: public, max-age=0
   Cache-Control: no-store, no-cache, must-revalidate
  
   Connection: keep-alive
   
   ETag: W/"10b0-1698f9c1dec"
   If-None-Match: W/"10b0-1698f9c1dec"

   Last-Modified: Mon, 18 Mar 2019 07:02:47 GMT 
   //服务器在header设置，返回给客户端响应头里面；
   If-Modified-Since: Mon, 18 Mar 2019 07:02:47 GMT 
   //客户端发送给服务器确认；此值就是Last-Modified的值


```js
java.util.Date date = new java.util.Date();    
response.setDateHeader("Expires",date.getTime()+20000); 
//Expires:过时期限值 
response.setHeader("Cache-Control", "public"); 
//Cache-Control来控制页面的缓存与否,public:浏览器和缓存服务器都可以缓存页面信息；
response.setHeader("Pragma", "Pragma");
// Pragma: no-cache
//Pragma:设置页面是否缓存，为Pragma则缓存，no-cache则不缓存

// Pramga: no-cache，相当于 Cache-Control： no-cache
```

```js
response.setHeader( "Pragma", "no-cache" );   
response.setDateHeader("Expires", 0);   
response.addHeader( "Cache-Control", "no-cache" );
//浏览器和缓存服务器都不应该缓存页面信息
```
http 1.0中默认是关闭的，
需要在http头加入"Connection: Keep-Alive"，
才能启用Keep-Alive；

http 1.1中默认启用Keep-Alive，如果加入"Connection: close "，才关闭。
目前大部分浏览器都是用http1.1协议，
也就是说默认都会发起Keep-Alive的连接请求了，
所以是否能完成一个完整的Keep- Alive连接就看服务器设置情况。

浏览器端缓存分为200 from cache和304 not modified
我们讨论的所有关于缓存资源的问题，都仅仅针对GET请求

缓存影响怎么处理？

1）直接ctrl+f5，这个办法能解决页面直接引用的资源更新的问题；

2）使用浏览器的隐私模式开发；

3）如果用的是chrome，可以f12在network那里把缓存给禁掉（这是个非常有效的方法）：

https://blog.csdn.net/yan_rong_technology/article/details/80282051
