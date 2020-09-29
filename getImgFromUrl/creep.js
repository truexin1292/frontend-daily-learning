const superagent = require("superagent"),
  cheerio = require("cheerio"),
  path = require('path'),
  // async = require("async"),
  // eventproxy = require('eventproxy'),
  $ = require('jQuery'),
  // http = require("http"),
  // url = require("url"),
  fs = require("fs");

const writerStream2 = fs.createWriteStream(
  path.resolve(__dirname, './data/news.txt'),
  {
    flags: 'w',
    encoding: null,
    mode: '0666'
  }
);

const text = [];
const resUrl = 'https://wenku.baidu.com/view/c25c8657f01dc281e53af089.html'; // 爬取网站的url
const getUrlInfo = () => {
  superagent.get(resUrl)
    .end((err, pres) => {
      const $ = cheerio.load(pres.text);
      const curPageUrls = $('#reader-container .ppt-page-item img'); // class="ppt-page-item batch-50-1"
      // 关键是这里
      console.log(curPageUrls);
      curPageUrls.each((index, elem) => {
        text.push({
          title: `img${ index + 1 }`,
          url: $(elem).attr('src') || $(elem).attr('data-src')
        })
      });
      writerStream2.write(JSON.stringify(text), 'UTF8');
    });
};
getUrlInfo();
