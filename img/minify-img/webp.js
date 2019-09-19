const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['img/*.{jpg,png}'], 'build/images', {
  use: [
    imageminWebp({quality: 50})
  ]
}).then(() => {
  console.log('Images optimized');
});
