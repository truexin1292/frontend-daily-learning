/*
 * @Author: your name
 * @Date: 2020-05-02 13:42:25
 * @LastEditTime: 2020-05-02 15:56:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /frontend-daily-learning/webpack/indexDemo/webpack.config.js
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const webpack = require("webpack");

const webConfig = {
  target: "web", // 默认，可省略
  entry: {
    // string | object | array
    // 单个入口的写法
    main: "./src/index.js",
  },

  // entry: "./src/index.js", // 单个入口的简写写法

  // entry: { // 多页面应用程序入口写法 1
  //   pageOne: './src/pageOne/index.js',
  //   pageTwo: './src/pageTwo/index.js',
  //   pageThree: './src/pageThree/index.js'
  // },
  // 多页面应用程序入口写法 2
  // entry: ["./app/entry1", "./app/entry2"],

  output: {
    // path: path.resolve(__dirname, "dist"),
    // filename: "bundle.js",

    filename: "[name].js", // 多入口的取对应名称的写法
    path: __dirname + "/dist",

    // publicPath: "/assets/", // string
  },
  // mode: "production", // "production" | "development" | "none"
  mode: "development", // development
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.less$/,
        use: "less-loader",
      },
      {
        test: /\.jade$/,
        use: "jade-loader",
      },
      {
        test: /\.json$/,
        use: "json-loader",
      },
      // {
      //   test: /\.(js|jxs)$/,
      //   use: "babel-loader",
      // },
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css$/, // 依赖单个loader
      //   use: "css-loader",
      // },
      // import Styles from 'style-loader!css-loader?modules!./styles.css'; // 内联模式使用loader
      // webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader' // cli模式使用loader
      {
        test: /\.css$/, // 依赖多个loader
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
            {
              loader: "postcss-loader",
            },
          ],
        }),
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.(png|gif|jpg|jpeg|tmp)$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    // webpack.optimize.UglifyJsPlugin(), // 主动加入压缩，mode为production自动会使用压缩 --- webpack4中已经废弃使用的写法
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  optimization: {
    // webpack.optimize.UglifyJsPlugin()的代替写法
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: true, // Boolean | Object
          // compress: {
          //   warnings: false,
          //   drop_debugger: false,
          //   drop_console: false,
          // },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
  },
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      "/api": "http://localhost:3000",
    },
    contentBase: path.join(__dirname, "public"), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
};

const serverConfig = {
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lib.server.js",
  },
};

module.exports = [serverConfig, webConfig];
