const screenshot = require('screenshot-desktop')
const nodemailer = require('nodemailer')
const schedule = require('node-schedule')
const fs = require('fs')

var transporter = nodemailer.createTransport({
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
var rule = new schedule.RecurrenceRule();
rule.second = 10;
schedule.scheduleJob(
    rule,
    function () {
        screenshot()
            .then((img) => {
                    //将截取的图片存入根目录screenshot/out.jpg
                    fs.writeFile(
                        'screenshot/out.jpg',
                        img,
                        function (err) {
                            if (err) {
                                throw err
                            }
                            console.log('written to out.jpg')
                        });

                    var message = {
                        from: "truexin1292@126.com",
                        to: "truexin@163.com",
                        subject: "桌面截图",
                        html: '桌面截图：<img src="cid:test"/>',
                        //附加文件，提供cid给上面的img调用
                        attachments: [
                            {
                                filename: 'out',
                                path: __dirname + '/screenshot/out.jpg',
                                cid: 'test' // should be as unique as possible
                            }
                        ]
                    }
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