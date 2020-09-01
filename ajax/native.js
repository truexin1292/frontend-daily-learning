var https = require('follow-redirects').https;
var fs = require('fs');

var qs = require('querystring');

var options = {
  'method': 'POST',
  'hostname': 'db.leyaoyao.com',
  'path': '/lyy/rest/group/distributor/login',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'SESSION=d3899bbe-8cc5-404f-837a-96a796b76ad7'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = qs.stringify({
  'userName': '13168341703',
  'password': 'e10adc3949ba59abbe56e057f20f883e'
});

req.write(postData);

req.end();
