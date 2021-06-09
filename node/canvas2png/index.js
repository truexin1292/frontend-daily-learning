const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// let httpUrl = "http://www.netbian.com/dongman/index.htm";
let httpUrl = "http://www.doc88.com/p-3932314471252.html";

let dirName = path.join(__dirname, "images");
if (fs.existsSync(dirName)) {
  console.log("文件夹已存在");
} else {
  fs.mkdir(dirName, () => {
    console.log("文件夹创建成功");
  });
}

function exportCanvasAsPNG(canvasElement) {
  console.log('log:', canvasElement);
  var MIME_TYPE = "image/png";

  var imgURL = document.querySelector('canvas').toDataURL(MIME_TYPE);

  var dlLink = document.createElement('a');
  dlLink.download = Math.ceil(Math.random() * 10);
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}

async function getData() {
  let htmlData = await axios.get(httpUrl);
  let $ = cheerio.load(htmlData.data);
  console.log('log:', htmlData);
  $("#pptContainer canvas").each(async (index, item) => {//定位到当前图片元素img
    console.log('log:', index, item);
    var MIME_TYPE = "image/png";
    var imgUrl = $(item).toDataURL(MIME_TYPE);
    let srcFile = path.join(dirName, path.parse(imgUrl).base);
    let ws = fs.createWriteStream(srcFile);
    axios.get(imgUrl, { responseType: "stream" }).then((res) => {//请求当前图片
      res.data.pipe(ws);//将请求的图片数据copy到srcFile文件路径中
      res.data.on("close", () => {
        console.log("图片" + path.parse(imgUrl).base + "已经下载完成");
        ws.close();
      })
    })
  })
}

getData();