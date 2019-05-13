const https = require('https');
var fs = require("fs");

var options = {
    hostname: 'localhost',
    port: 8000,
    path: '/',
    method: 'GET',
    key: fs.readFileSync('./key/privatekey.pem'),
    cert: fs.readFileSync('./key/certificate.pem'),
    ca: [fs.readFileSync('./key/certrequest.csr')]
};

options.agent = new https.Agent(options);

var req = https.request(options, function (res) {
    res.setEncoding('utf-8');
    res.on('data', function (data) {
        console.log('--log--:', data)
    });
})
req.end();
req.on('error', function (e) {
    console.log(e);
});
