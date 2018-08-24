//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var async = require('async');
var Iconv = require('iconv-lite');

// 目标网址
// var url = 'http://desk.zol.com.cn/meinv/1920x1080/2.html';
var url = 'http://www.sucaijishi.com/2017/png_0808/556.html';

// 本地存储目录
var dir = './images';

// 图片链接地址
var links = [];
var alts = [];

// 创建目录
mkdirp(dir, function (err) {
    if (err) {
        console.log(err);
    }
});

// 发送请求
request({ url, encoding: null }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // console.log(Iconv.decode(body, 'gb2312').toString()); // 修改获取页面乱码问题
        var $ = cheerio.load(Iconv.decode(body, 'gbk').toString());
        $('body').find('img').each(function () {
            var src = $(this).attr('src');
            var alt = $(this).attr('alt');
            links.push({ src, alt });
            alts.push(alt);
        });
        // 每次只执行一个异步操作
        async.mapSeries(
            links,
            function (item, callback) {
                download(
                    item.src,
                    dir,
                    ((item.alt ? item.alt.replace(/\s+/g, "") : '未定义') + Math.floor(Math.random() * 100)) + '.png'
                );
                callback(null, item);
            },
            function (err, results) {
                console.log(results);
            }
        );
    }
});

// 下载方法
var download = function (url, dir, filename) {
    request.head(url, function (err, res, body) {
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};
