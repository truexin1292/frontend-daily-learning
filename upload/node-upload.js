const Koa = require('koa')
const logger = require('koa-logger')
const router = require('koa-router')()
const formidable = require('formidable')
const koaBody = require('koa-body')
const util = require('util')
const path = require('path')
const staticCache = require('koa-static-cache')
const fs = require('fs')
const app = new Koa()
const port = 8080

app.use(logger()) // 输出日志
app.use(koaBody()) // body 解析
// 设置img 目录为静态资源
app.use(staticCache(path.join(__dirname, 'img'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
    buffer: true,
    dynamic: true
}))
router
// 首页
    .get('/', ctx => {
        ctx.body =
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
    })
    // 上传文件接口
    .post('/upload', async ctx => {
        const form = new formidable.IncomingForm()
        // 设置存储文件的目录
        const imgPath = path.join(__dirname, '/img')
        // 如果目录不存在则创建
        if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath)
        form.uploadDir = imgPath
        // 上传文件大小限制
        form.maxFieldsSize = 20 * 1024 * 1024

        let result = await new Promise(r => {
            form.parse(ctx.req, function (err, fields, files) {
                if (err) {
                    r({ err })
                } else {
                    // 手动给文件加后缀, formidable默认保存的文件是无后缀的
                    let newPath = files.upload.path + '_' + files.upload.name
                    fs.renameSync(files.upload.path, newPath)
                    r({ path: newPath })
                }
            })
        })
        const basename = '/' + path.basename(result.path)
        if (result.err) ctx.throw(400, '异常错误')
        else ctx.body = `<p>url: ${basename}</p><img src=${basename} style="max-width: 100%;">`

    })
app.use(router.routes())
app.on('error', (err, ctx) => {
    log.error('server error', err, ctx)
})
app.listen(port, () => {
    console.log('listen ', port)
})
