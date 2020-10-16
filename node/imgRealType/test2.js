const imageinfo = require('imageinfo');
const fs = require('fs');
const imgPath1 = './img/h5.png';
const imgPath2 = './img/head.jpg';
const imgPath3 = './img/hh.jpg';

fs.readFile(
  imgPath1,
  (err, data) => {
    if (err) {
      throw err;
    }
    const info = imageinfo(data);
    console.log("Data is type:", info.mimeType);
    console.log("  Size:", data.length, "bytes");
    console.log("1  Dimensions:", info.width, "x", info.height);
  }
);

fs.readFile(
  imgPath2,
  (err, data) => {
    if (err) {
      throw err;
    }
    const info = imageinfo(data);
    console.log("Data is type:", info.mimeType);
    console.log("  Size:", data.length, "bytes");
    console.log("2  Dimensions:", info.width, "x", info.height);
  }
);

fs.readFile(
  imgPath3,
  (err, data) => {
    if (err) {
      throw err;
    }
    const info = imageinfo(data);
    console.log("Data is type:", info.mimeType);
    console.log("  Size:", data.length, "bytes");
    console.log("3  Dimensions:", info.width, "x", info.height);
  }
);
