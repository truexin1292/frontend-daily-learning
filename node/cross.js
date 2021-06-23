const http = require('http');
const hostname = '127.0.0.1';
const port = 8080;
const request = require('request');
const url = 'https://www.toutiao.com/api/pc/feed/?max_behot_time=1516362919&category=__all__&utm_source=toutiao&widen=1&tadrequire=true&as=A195AA76C15F9EC&cp=5A610FC90EECCE1&_signature=78ujsRAStbVttVF07Qxkku.Lo6';
const url1 = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc016701979152961&secret=6654a5a5dfab593a4d8935dba90cc406';
const url2 = 'https://mt.ksepton.com/';

http.createServer((req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json"
	});
	request(url2, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			//输出返回的内容
			// var json = JSON.stringify(body);
			res.end(body);			
		}
	}); 
}).listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});