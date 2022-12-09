console.log('Script开始')
setTimeout(() => {
  console.log('宏任务1-setTimeout')
  Promise.resolve().then(() => {
    console.log('微任务promise2')
  })
}, 0)
setImmediate(() => {
  console.log('宏任务2-setImmediate')
})
setTimeout(() => {
  console.log('宏任务3-setTimeout')
}, 0)
console.log('Script结束')
Promise.resolve().then(() => {
  console.log('微任务promise1')
})
process.nextTick(() => {
  console.log('微任务nextTick')
})