"use strict"

// 易用、简洁且高效的http库
const axios = require('axios');
// 请求签到、抽奖的接口
const checkInApi = "https://api.juejin.cn/growth_api/v1/check_in"
const drawApi = "https://api.juejin.cn/growth_api/v1/lottery/draw"
// 请求接口的cookie配置 cookie的获取见下面的图片说明
const cookieInfo = `xxx`
// 发送信息的配置
const mobileInfo = {
  // 其实就是上图中 绿色框中的 APIID
  "account": "xxx",
  // 其实就是上图中 绿色框中的 APIKEY
  "password": "xxx",
  // 接收信息的电话号码
  "mobile": "xxx",
  // 短信模板需要审核 就先用这个默认的吧
  "content": "您的验证码是：1234。请不要把验证码泄露给其他人。"
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

// 签到完成 发送信息
const sendMessage = (checkInData, drawData) => {
  // content 为短信模板 需要审核 需要什么模板可以根据checkInData和drawData信息配置后去申请，这里就先不做过多赘述。
  let {
    account,
    password,
    mobile,
    content
  } = mobileInfo;
  axios.get(`https://106.ihuyi.com/webservice/sms.php?method=Submit&account=${account}&password=${password}&mobile=${mobile}$content=${content}`)
    .then((res) => {
      console.log('短信发送成功');
    })
}

exports.signIn = async () => {
  const checkInData = await checkIn();
  const drawData = await draw();
  sendMessage(checkInData, drawData)
};
