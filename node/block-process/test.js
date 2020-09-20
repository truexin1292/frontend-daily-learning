var http = require('http');

var server = http.createServer(function(req,res){
  res.writeHead(200,{});
  res.end('response');
  setTimeout(function(){
    console.log('This will still run.');
  },2000);
  method(); //由于method()未定义，会将程序进程退出。
  console.log('response end');
});

server.listen(10086);

process.on('uncaughtException', function (err) {
  console.log('Caught Exception:' + err);//直接捕获method()未定义函数，Node进程未被退出。
});
