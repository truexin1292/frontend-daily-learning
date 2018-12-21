var PORT = 3000;
var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');
var querystring = require('querystring');

var server = http.createServer(function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    var arg = url.parse(request.url).query;
    var arg_json = querystring.parse(arg);
    var realPath = path.join("data", arg_json.file);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write("This request URL " + realPath + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});

server.listen(PORT);
console.log(`服务器运行在http://localhost:${3000}`);

// server.listen(PORT, '', function () {
//     console.log(`服务器运行在http://localhost:${3000}`);
// });
