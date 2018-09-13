var conns = {};

var wss = require('ws').Server;

var server = new wss({
    host: "127.0.0.1",
    port: 9999
});

server.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log(message);
        var msg = JSON.parse(message);   //记录客户端信息
        if (msg.id) {
            conns[msg.id] = msg['info'];
            conns[msg.id]['conn'] = ws;
            console.log(conns[msg.id]['name'] + '-已连接');
        }   //服务器向特定的客户端发送消息
        if (msg.fromId && msg.toId && msg.data) {
            var temp = {
                'name': conns[msg.fromId]['name'],
                'msg': msg.data
            }
            conns[msg.toId]['conn'].send(JSON.stringify(temp));
        }
    });
});

console.log('WebSocketserverruning...');
