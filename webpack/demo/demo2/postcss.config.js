module.exports = { // postcss单独的配置文件
  plugins: [
    require('autoprefixer') // 参照package.json的browserslist的属性的配置，市场份额占有和浏览器的多少版本
  ]
}