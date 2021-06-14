const fs = require("fs");

const writeStream = fs.createWriteStream(__dirname + "/big-file.txt");
for (let i = 0; i <= 1e5; i++) {
  writeStream.write(`${i} 我是truexin 我就要生成不一样的文字咯，哼，你咬我啊。。。哈哈哈哈\n`, "utf8");
}

writeStream.end();

const writeStream2 = fs.createWriteStream(__dirname + "/small-file.txt");
for (let i = 0; i <= 100; i++) {
  writeStream2.write(`${i} 我是truexin 我就要生成不一样的文字咯，哼，你咬我啊。。。哈哈哈哈\n`, "utf8");
}
writeStream2.end();