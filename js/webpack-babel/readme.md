## 1.新建一个叫webpack-babel的项目文件夹：
命令行：
```mkdir webpack-babel```
## 2.项目里面包含一个src，一个bin文件夹，还有个webpack.config.js文件和一个.babelrc文件：
命令行：
```
cd webpack-babel
mkdir src
mkdir bin
touch webpack.config.js
touch .babelrc
```
然后在webpack.config.js填写入webpack相关配置：
```
module.exports = {
    entry: './src/app.js',  //入口文件
    output: {  //输出文件路径设置
        path: __dirname,
        filename: './bin/app.bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}
```
然后在.babelrc填写入babel相关配置：
```
{
    "presets": [
        "es2015"
    ]
}
```
## 3.src文件夹里面有一个app.js文件：
命令行：
```
cd src
touch app.js 或者 vi app.js
```
然后在app.js填写入es6语法的语句：
```
let a = 111;
let b = 222;
var xxx = (c, d) => c * d;
console.log(xxx(a, b));
```
## 4.安装相关依赖包即可：
命令行：
```
sudo npm install webpack webpack-cli -g
npm install babel-core babel-loader babel-preset-es2015 -save
```
## 5.运行测试：
回到项目路径下：

命令行：
```
webapack
```
----
##### 执行命令后，如果bin里面发现生成了app.bundle.js说明成功编译es6变成es5了。
----
![](http://ww1.sinaimg.cn/large/ac4831f2gy1ft29ulvbdyj20b40b43zj.jpg)

> 注意 ： 执行命令```node app.js```；
 其中app.js想要使用模块时，不能使用import导入，只能用require引入，否则报错
或者我们可以巧妙地执行命令：babel-node app.js   就完全解决了，^_^。

***
参考链接：
[http://taobaofed.org/blog/2016/01/07/find-back-the-lost-es6-features-in-nodejs/](http://taobaofed.org/blog/2016/01/07/find-back-the-lost-es6-features-in-nodejs/)
