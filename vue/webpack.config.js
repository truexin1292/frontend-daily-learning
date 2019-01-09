var path = require('path');
var webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
	entry: [
		'babel-polyfill', // 使用es6语法需要提前编译代码
		'./src/main.js'
	], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
	devtool: '#eval-source-map', // 返回源代码，方便调试；
	output: {
		path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
		publicPath: '/dist/', // 通过devServer访问路径
		filename: 'build.js' // 打包后的文件名
	},
	devServer: {
		historyApiFallback: true,
		overlay: true
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					// 匹配后缀名为css的文件,然后分别用css-loader，
					// vue-style-loader去解析解析器的执行顺序是从下往上(先css-loader再vue-style-loader)
					'vue-style-loader',
					'css-loader'
				],
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				],
			},
			{
				test: /\.sass$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader?indentedSyntax'
				],
			},
			{
				test: /\.less$/,
				loader: "vue-style-loader!css-loader!less-loader",
			},
			{
				test: /\.js$/,
				loader: 'babel-loader', // entry 处需要同时搭配 babel-polyfill
				exclude: /node_modules/ // exclude表示忽略node_modules文件夹下的文件，不用转码
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'scss': [
							'vue-style-loader',
							'css-loader',
							'sass-loader'
						],
						'less': [
							'vue-style-loader',
							'css-loader',
							'less-loader'
						],
						'sass': [
							'vue-style-loader',
							'css-loader',
							'sass-loader?indentedSyntax'
						]
					}
				}
			}
		]
	},
	plugins: [
		// make sure to include the plugin for the magic
		new VueLoaderPlugin()
	]
};

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	module.exports.optimization = {
		minimize: true
	}
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
	])
}
