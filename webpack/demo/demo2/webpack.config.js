const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 默认是production
  // devtool: 'eval', // 打包最快，优势：劣势：项目复杂的话，可能显示行数不准确
  // devtool: 'eval-cheap-module-source-map', // 开发使用
  // devtool: 'cheap-module-source-map', // 线上使用这个好点
  // devtool: false, // 关闭，错误指向打包后的文件
  // devtool: 'source-map', // 多一个.map文件，记录所有错误的行列
  // devtool: 'inline-source-map', // 不显示.map文件，而是将.map的内容在bindle.js里面最后一行显示完，通过base64记录
  // devtool: 'inline-cheap-source-map', // 不显示.map文件，而是将.map的内容在bindle.js里面最后一行显示完，通过base64记录，第三方模块和loader不记录sourcemap，只记录哪一行，不记录哪一列，提高性能。
  // devtool: 'inline-cheap-module-source-map', // 同inline-cheap-source-map，增加记录第三方模块和loadersourcemap。
  devtool: 'eval-source-map', // 通过映射关系将错误指向对应的开发文件
  // entry: './src/index.js', // 单个入口写法 默认是 main.js
  entry: {
    test: './src/index.js', // 修改main为test，默认就是打包出来名字, output如果有filename，以filename为准
    // app: './src/index.js', // 多入口名称
  },
  // 只有开发环境才有的转发服务器
  devServer: { // webpack-dev-server 是 package.json 的 script 的 webpack serve
    // contentBase: './dist', // 报错？为啥，是不是版本问题 --- // webpack-dev-server 3 对应的
    static: './dist', // webpack-dev-server 4 对应的
    // hot: false, // 3 默认关闭； 4 默认开启
    hot: true, // 3 默认关闭； 4 默认开启
    proxy: {
      // '/Yixiantong': {
      //   target: 'http://study.jsplusplus.com',
      //   changeOrigin: true, // 无论限制与否，都配置就行了
      // },
      '/api/Yixiantong': {
        target: 'http://study.jsplusplus.com',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true, // 无论限制与否，都配置就行了
      },
      '/thirdApi': {
        target: 'https://study.163.com',
        pathRewrite: {
          '^/thirdApi': ''
        },
        changeOrigin: true, // 无论限制与否，都配置就行了
      },
      '/kaikebaApi': {
        target: 'https://open2.kaikeba.com',
        pathRewrite: {
          '^/kaikebaApi': ''
        },
        changeOrigin: true, // 无论限制与否，都配置就行了
      }
    }
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
    rules: [{
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: { // es6 => es5： 比如监听函数可以变成function函数了，但是没有替换es6推出了的属性和方法：Promise 和 .map方法。。。
          //   presets: ['@babel/preset-env']
          // },
          options: { // 配合polyfill使用，实现部分方法，比如Promise 和 .map方法
            presets: [
              ['@babel/preset-env',
                {
                  useBuiltIns: 'usage'
                }
              ],
            ]
          }
        },
      },
      // {
      //   test: /.jpg$|.png$/,
      //   use: 'file-loader',
      // },
      {
        // test: /.jpg$|.png$/,
        test: /.(jpg|png|gif)$/,
        use: {
          // loader: 'file-loader', // 图片格式
          loader: 'url-loader',
          // base64格式 ,
          // 好处：少了图片的http请求，
          // 坏处：如果图片过大，js加载过久，空白页面
          // 图片是1、2kb的情况就使用url-loader，其他的就直接使用file-loader
          options: {
            // 占位符 placeholder
            // name: '[name].[ext]',
            name: '[name]_[hash].[ext]',
            //打包后的图片位置
            outputPath: 'images/',
            limit: 2048 // 2kb, // url-loader才支持，url-loader+file-loader
            // limit: 409600 // 400kb,
          }
        },
      },
      {
        // test: /.css$/,
        test: /.scss$/,
        use: [ // 注意：如果是数组格式，loader是从下往上执行的
          'style-loader', // 将css放到html的style标签里面
          'css-loader', // 可以正确处理项目的css依赖关系
          // {
          //   // 启用CSS Modules CSS模块化 ----- 
          //   // 作用：当前文件样式只作用于当前文件 
          //   // 1.css-loader设置modules: true 
          //   // 2.引入scss的规范：import styles from './index.scss';
          //   loader: 'css-loader',
          //   options: {
          //     modules: true
          //   }
          // }, // 可以正确处理项目的css依赖关系
          'postcss-loader', // 官网推荐的loader顺序
          'sass-loader'
        ]
      },
      // { // 为啥不用都可以打包字体文件的？
      //   test: /.(ttf|woff|woff2|eot|svg)$/,
      //   use: 'file-loader'
      // }
    ]
  }
}