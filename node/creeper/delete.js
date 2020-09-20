const fs = require('fs');
const fileName = 'files';
const filePath = 'files/';

// 判断是否文件或者文件夹
const checkFileOrFolder = (file) => {
  fs.stat(filePath + file, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // isFile(): boolean;
      // isDirectory(): boolean;
      // isBlockDevice(): boolean;
      // isCharacterDevice(): boolean;
      // isSymbolicLink(): boolean;
      // isFIFO(): boolean;
      // isSocket(): boolean;
      if (data.isFile()) { // 文件
        // 删除文件
        fs.unlink(`${ filePath }${ file }`, (err) => {
          if (err) {
            console.log(`delete file ${ file } fail`, err);
          } else {
            console.log(`delete file ${ file } ok`);
          }
        });
        return;
      }
      if (data.isDirectory()) { // 文件夹
        // 删除文件夹
        fs.rmdir(
          `${ filePath }${ file }`,
          (err) => {
            if (err) {
              console.log(`delete folder ${ file } fail`, err);
            } else {
              console.log(`delete folder ${ file } ok`);
            }
          }
        );
      }
    }
  });
};

// 删除文件和文件夹
fs.readdirSync(fileName).map((file) => {
  checkFileOrFolder(file);
});

