"use strict"
const schedule = require('node-schedule');
// Nodemailer是一个简单易用的Node.js邮件发送组件
const nodeMailer = require('nodemailer');
// 易用、简洁且高效的http库
const axios = require('axios');
// 请求签到、抽奖的接口
const checkInApi = "https://api.juejin.cn/growth_api/v1/check_in"
const drawApi = "https://api.juejin.cn/growth_api/v1/lottery/draw"
// 请求接口的cookie配置 cookie的获取见下面的图片说明
const cookieInfo = `_ga=GA1.2.1990489644.1605853603; MONITOR_WEB_ID=6d22c1ca-d4ab-4be2-9102-73af933c1e11; passport_csrf_token_default=1b6e6dba76514f6535b181adc3414cdb; passport_csrf_token=1b6e6dba76514f6535b181adc3414cdb; sid_guard=9b73dc2a2f998bbcc0a89a2a2338640a%7C1637198957%7C5184000%7CMon%2C+17-Jan-2022+01%3A29%3A17+GMT; uid_tt=54298bf1f472c411c337ffcb42aa055d; uid_tt_ss=54298bf1f472c411c337ffcb42aa055d; sid_tt=9b73dc2a2f998bbcc0a89a2a2338640a; sessionid=9b73dc2a2f998bbcc0a89a2a2338640a; sessionid_ss=9b73dc2a2f998bbcc0a89a2a2338640a; sid_ucp_v1=1.0.0-KGM2ZDA0OWM2ZjRlNzA4ZmMyM2Y1YTNlMjEyMjEyOTYyMzE5YTZiOGYKFwju5IC-_fXNBhDt2NaMBhiwFDgCQO8HGgJsZiIgOWI3M2RjMmEyZjk5OGJiY2MwYTg5YTJhMjMzODY0MGE; ssid_ucp_v1=1.0.0-KGM2ZDA0OWM2ZjRlNzA4ZmMyM2Y1YTNlMjEyMjEyOTYyMzE5YTZiOGYKFwju5IC-_fXNBhDt2NaMBhiwFDgCQO8HGgJsZiIgOWI3M2RjMmEyZjk5OGJiY2MwYTg5YTJhMjMzODY0MGE; _tea_utm_cache_2608={%22utm_source%22:%22gold_browser_extension%22}; n_mh=w0-pdP-1ijQampAfGmsY9YDOK-JsWQHuJ49gYOUgWAk; _gid=GA1.2.1399717289.1640155972`
// 发送邮件的配置
// user、from、to都填写自己的qq邮箱, pass的获取见下面的图片说明
const emailInfo = {
  "user": "truexin@163.com",
  "from": "truexin@163.com",
  "to": "truexinology@163.com",
  "pass": "IROYVERFIUUIURTW"
}
// 请求签到接口
const checkIn = async () => {
  let {
    data
  } = await axios({
    url: checkInApi,
    method: 'post',
    headers: {
      Cookie: cookieInfo
    }
  });
  return data
}
// 请求抽奖接口
const draw = async () => {
  let {
    data
  } = await axios({
    url: drawApi,
    method: 'post',
    headers: {
      Cookie: cookieInfo
    }
  });
  return data
}
// 签到完成 发送邮件
const sendQQEmail = async (subject, html) => {
  let {
    user,
    from,
    to,
    pass
  } = emailInfo;
  const transporter = nodeMailer.createTransport({
    service: '163',
    auth: {
      user,
      pass
    }
  });
  transporter.sendMail({
    from,
    to,
    subject,
    html
  }, (err) => {
    if (err) return console.log(`发送邮件失败：${err}`);
    console.log('发送邮件成功')
  })
}
// 触发签到和抽奖的方法
const signIn = async () => {
  const checkInData = await checkIn();
  const drawData = await draw();
  console.log('🔥', checkInData, drawData)
  if (checkInData.data && drawData.data) {
    sendQQEmail('掘金签到和抽奖成功', `掘金签到成功！今日获得${checkInData.data.incr_point}积分，当前总积分：${checkInData.data.sum_point}。 掘金免费抽奖成功, 获得：${drawData.data.lottery_name}`);
  } else if (checkInData.data && !drawData.data) {
    sendQQEmail('掘金签到成功, 抽奖失败', `掘金签到成功！今日获得${checkInData.data.incr_point}积分，当前总积分：${checkInData.data.sum_point}。 掘金免费抽奖失败, ${JSON.stringify(drawData)}`);
  } else if (!checkInData.data && drawData.data) {
    sendQQEmail('掘金签到失败, 抽奖成功', `掘金签到失败！${JSON.stringify(checkInData)}。 掘金免费抽奖成功, 获得：${drawData.data.lottery_name}`);
  } else if (!checkInData.data && !drawData.data) {
    sendQQEmail('掘金签到和抽奖失败', `掘金签到失败！${JSON.stringify(checkInData)}。 掘金免费抽奖失败, ${JSON.stringify(drawData)}`);
  }
};

const scheduleTask = () => {
  // 每天早上7点执行
  schedule.scheduleJob({
    second: 0,
    minute: 0,
    hour: 7
  }, () => {
    signIn();
  });
}

;
(function () {
  console.log('pm2: ---start');
  scheduleTask();
}())