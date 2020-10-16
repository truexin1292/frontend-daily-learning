const { spawn } = require('child_process');

const image = gm("src2/" + file)
image.identify((err, val) => {
  if (!val.Scene) {
    console.log(file + " has err：" + err)
    return
  }
  let frames_count = val.Scene[0].replace(/\d* of /, '') * 1
  let gap = countGap(frames_count)

  let delayList = [];
  let totaldelay = 0
  if (val.Delay != undefined) {
    let i
    for (i = 0; i < val.Delay.length; i++) {
      delayList[i] = val.Delay[i].replace(/x\d*/, '') * 1
      totaldelay += delayList[i]
    }
    for (; i < val.Scene.length; i++) {
      delayList[i] = 8
      totaldelay += delayList[i]
    }
  } else {
    for (let i = 0; i < val.Scene.length; i++) {
      delayList[i] = 8
      totaldelay += delayList[i]
    }
  }
  let totalFrame = parseInt(frames_count / gap)
  //判断是否速度过慢，需要进行归一加速处理
  if (totaldelay / totalFrame > 20) {
    let scale = (totalFrame * 1.0 * 20) / totaldelay
    for (let i = 0; i < delayList.length; i++) {
      delayList[i] = parseInt(delayList[i] * scale)
    }
  }

  let params = []
  params.push("--colors=255")
  params.push("--unoptimize")
  params.push("src2/" + file)

  let tempdelay = delayList[0]
  for (let i = 1; i < frames_count; i++) {
    if (i % gap == 0) {
      params.push("-d" + tempdelay)
      params.push("#" + (i - gap))
      tempdelay = 0
    }
    tempdelay += delayList[i]
  }
  params.push("--optimize=3")
  params.push("-o")
  params.push("src2/" + file + "gap-keepdelay.gif")
  spawn("gifsicle", params, { stdio: 'inherit' })
})
