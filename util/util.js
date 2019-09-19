/*
* 替换url的某个参数的值
* */
function changeUrlArg(arg, val, url) {
  url = url ? url : location.href;
  let pattern = arg + '=([^&]*)';
  let replaceText = arg + '=' + val;
  return url.match(pattern) ?
    url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) :
    (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
}

/*
* 获取一天24小时的分钟时间段 00:01 - 00:00
* */
export function get24HoursGap() {
  function getDateArray(endDate, splitTime, count) {
    if (!endDate) {
      endDate = new Date(new Date(new Date().toLocaleDateString()).getTime()); // 获取一天的00：00点；
    }
    if (!splitTime) {
      splitTime = 1 * 60 * 1000; // 1.按照分钟间隔；可修改间隔； 例如: (1*5) * 60 * 1000
    }
    if (!count) {
      count = 60 * 24; // 2.根据1.修改间隔进行调整；60分钟/小时、24小时/天 例如: (60/5) * 24
    }
    let endTime = endDate.getTime();
    let mod = endTime % splitTime;
    if (mod > 0) {
      endTime -= mod;
    }
    let dateArray = [];
    while (count-- > 0) {
      let d = new Date();
      d.setTime(endTime - count * splitTime);
      dateArray.push(d);
    }
    return dateArray;
  }

  return getDateArray().map((v, i) => {
    return v.toString().split(' ')[4].slice(0, 5);
  })
}

export default {
  changeUrlArg,
  get24HoursGap
}
