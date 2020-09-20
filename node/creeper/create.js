const fs = require('fs');
const fileName = 'files';
const filePath = 'files/';

// 创建文件和文件夹
for (let i = 0; i < 20; i++) {
  const name = 'truexin' + i;
  const pathStr = filePath + name;
  // 创建文件夹
  // fs.mkdirSync(pathStr); // mkdirSync 是创建文件夹
  // fs.mkdirSync(pathStr, '0777'); // mkdirSync 是创建文件夹， 0777 是权限控制:所有人可读，可写，可执行
  // path           将创建的目录路径
  // mode          目录权限（读写权限），默认0777
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr);
  }

  // 创建txt文件
  fs.writeFile(
    __dirname + '/' + pathStr + '.txt',
    JSON.stringify({ name: 'alex', age: 20 + i + 9 }),
    (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`${ pathStr } saves successful!`);
    }
  );
}
