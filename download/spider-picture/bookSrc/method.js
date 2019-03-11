const config = require('./config'),
    fs = require('fs'),
    cheerio = require('cheerio'),
    axios = require('axios');

module.exports = {
    // 获取页面
    async getPage(url) {
        return {
            res: await axios.get(url)
        }
    },
    // 获取图片页面中 图片地址
    getImageSrcList(page) {
        let $ = cheerio.load(page.res.data);
        let imageSrcList = $('#ctn').find('img'); //todo 因为是生成的，所以获取不到
        return imageSrcList
    },
    // 新建保存图片的文件夹
    mkdirSaveFolder() {
        if (!fs.existsSync(config.savePath)) {
            fs.mkdirSync(config.savePath)
            console.log(`文件夹已生成：${ config.savePath }`)
        } else {
            console.log(`文件夹已存在：${ config.savePath }`)
        }
    },
    // 下载图片到本地
    async downloadImage(imageSrc, fileName) {
        let headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.19 Safari/537.36"
        }
        await axios({
            method: 'get',
            url: imageSrc,
            responseType: 'stream',
            headers
        }).then(function (response) {
            response.data.pipe(fs.createWriteStream(fileName))
        })
    }
}
