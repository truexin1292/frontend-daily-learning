const net = require('net');

net.createServer((stream) => {
  stream.write('hello\r\n');

  stream.on('end', () => {
    stream.end('goodbye\r\n');
  });

  stream.pipe(stream);
}).listen(7000);
