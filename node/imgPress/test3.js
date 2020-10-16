const imagemin = require("imagemin");
const imageminGifsicle = require("imagemin-gifsicle");

(async () => {
  await imagemin([ "./img/*.gif" ], {
    destination: "build",
    plugins: [ imageminGifsicle() ],
  });

  console.log("Images optimized");
})();
