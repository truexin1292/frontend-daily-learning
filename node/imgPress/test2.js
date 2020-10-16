const { execFile } = require("child_process");
const gifsicle = require("gifsicle");
const imgPath = "./img/head.gif";

execFile(gifsicle, ["-o", "build/head2.gif", imgPath], (err) => {
  console.log("Image minified!");
});
