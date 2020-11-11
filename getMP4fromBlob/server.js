/**
 * mp4转blob链接
 * */
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const fs = require('fs');
const cors = require('koa2-cors');

const video = async (ctx, next) => {
  try {
    // open 一个放在服务器的视频
    let data = fs.readFileSync('files/test.mp4');
    ctx.response.body = data
  } catch (e) {
    return Promise.reject({
      status: 500,
      message: '视频传输错误'
    })
  }
  next();
};

router.get('/video', video);

// 解决跨域问题
// 方法1：
// app.use(async (ctx, next)=> {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (ctx.method === 'OPTIONS') {
//     ctx.body = 200;
//   } else {
//     await next();
//   }
// });

// 方法2：
app.use(cors());

// https://www.cnblogs.com/fangshidaima/p/10495890.html
// https://www.jianshu.com/p/cef733fba02d
// https://www.jianshu.com/p/5b3acded5182

app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);
