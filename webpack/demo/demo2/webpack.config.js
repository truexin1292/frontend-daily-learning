const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 默认是production
  // entry: './src/index.js', // 单个入口写法 默认是 main.js
  entry: {
    test: './src/index.js', // 修改main为test，默认就是打包出来名字, output如果有filename，以filename为准
    // app: './src/index.js', // 多入口名称
  },
  output: {
    // publicPath: 'https://cdn.xxx.com', // cdn配置；可以将静态文件放到cdn里面
    path: path.resolve(__dirname, 'dist'), // 默认dist，可写可不写，注意在clean-webpack-plugin情况下，需要配置的
    // path: path.resolve(__dirname, 'zip'), // 修改打包后文件夹的名称
    // filename: 'main.js', // 单个入口命名 , // 默认main.js，可写可不写
    filename: 'bundle.js', // 修改打包后文件的名称
    // filename: '[name].js', // 占位符，多个入口命名
  },
  // 插件，在webpack的不同时刻，不同节点去做不同的事情 ---- vue的生命周期类似，每个阶段帮助我们干什么。
  plugins: [ 
    new HTMLWebpackPlugin({
      template: './src/index.html' // 将本地index.html文件打包到dist里面，并且将对应js追加进去
    }),
    new CleanWebpackPlugin(), // 清空dist文件夹，必须设置 output.path
  ],
  module: { // 默认只认识.js文件 ，其他的vue，png，jpg。。。。都需要loader
    rules: [
      {
        test: /.jpg$|.png$/,
        use: 'file-loader',
      }
    ]
  }
}