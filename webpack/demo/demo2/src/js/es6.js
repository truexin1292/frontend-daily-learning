import '@babel/polyfill';
// 使用之后，代码量增大了 从原来的255kb => 1.17mb , 再使用useBuiltIns就 => 395kb
/*
1.不使用 255kb
2.使用 1.17mb
3.使用 + 配置useBuiltIns 395kb （推荐）
*/ 

function es6() {
  const promiseArray = [
    new Promise(() => {}),
    new Promise(() => {}),
  ];
  promiseArray.map((v) => {
    console.log('Promise:', v);
  });
}

export default es6;