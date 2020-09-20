const extract = require('we-extract').extract;
const fs = require('fs');

// const rs = extract('微信文章 url 或者 文章内容');

// 选项
const getInfo = async () => {
  const res = await extract(
    'https://mp.weixin.qq.com/s/J07K7DQOb5lglLgmtDXrew',
    // 'https://www.moodys.com/sites/products/ProductAttachments/%E7%A9%86%E8%BF%AA%E4%B8%AD%E5%9B%BD%E4%BF%A1%E7%94%A8%E5%B8%82%E5%9C%BA%E5%91%A8%E5%88%8A.html#story02',
    {
      shouldReturnRawMeta: false, // 是否返回原始的 js 解析结果，一般只用于调试，默认不返回
      shouldReturnContent: true // 是否返回内容，默认返回
    });
  const { code, done, data = {}, msg = 'success' } = res;
  console.log({
      code,
      done,
      title: data.account_name,
      msg
    },
    'finished'
  );
  if (done) {
    genFile(res);
  }
};

// __dirname === /Users/truexin/truexin/frontend-daily-learning/node/creeper。请注意，要加/哦，哈哈
const genFile = (txt) => {
  const now = new Date();
  const fileName = `${ now.getMonth() + 1 }${ now.getDate() }${ now.getHours() }${ now.getMinutes() }${ now.getSeconds() }_article.txt`;
  fs.writeFile(
    __dirname + '/' + fileName,
    JSON.stringify(txt),
    (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`${ fileName } saves successful!`);
    }
  );
};

getInfo();


