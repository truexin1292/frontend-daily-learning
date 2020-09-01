const screenshot = require('screenshot-desktop');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: "smtp.126.com",
  secure: true,
  port: 465,
  auth: {
    user: "truexin1292@126.com",
    pass: "test1234"
  },
  debug: true // include SMTP traffic in the logs
});

// 设置每一分钟发送一次
const rule = new schedule.RecurrenceRule();
rule.minute = 50; // 每小时的第50分钟执行一次
// rule.second = 10; // 每分钟的第10秒执行一次

// const hours = [ 1, 5, 9, 13, 17, 21 ];
// rule.hour = hours; // 每4小时执行一次

// const hours = new Array(23).fill('').map((_, i) => i + 1);
// rule.hour = hours; // 每1小时执行一次

schedule.scheduleJob(
  rule,
  function () {
    screenshot()
      .then((img) => {
          //将截取的图片存入根目录screenshot/out.jpg
          const date = new Date();
          const strDate = `${ date.getFullYear() }-${ (date.getMonth() + 1) }-${ date.getDate() }-${ date.getHours() }`;
          fs.writeFile(
            `screenshot/${ strDate }out.jpg`,
            img,
            function (err) {
              if (err) {
                throw err
              }
              console.log('written to out.jpg')
            });

          const message = {
            from: "truexin1292@126.com",
            to: "truexin@163.com",
            subject: "桌面截图",
            html: '桌面截图：<img src="cid:test"/>',
            //附加文件，提供cid给上面的img调用
            attachments: [
              {
                filename: 'out',
                path: __dirname + `/screenshot/${ strDate }out.jpg`,
                cid: 'test' // should be as unique as possible
              }
            ]
          };
          transporter.sendMail(message, (error, info) => {
            if (error) {
              console.log('Error occurred');
              console.log(error.message);
              return;
            }
            console.log('Message sent successfully!');
            console.log('Server responded with "%s"', info.response);
            transporter.close();
          });
        }
      )
      .catch((err) => {
        throw err
      })
  });
