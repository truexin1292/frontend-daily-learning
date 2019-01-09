// 1. 非es6，webpack默认不支持转码es6，但是import export这两个语法却单独支持。
// var say = require('./util');
// say();

// 2. 修改为es6语法：
// import say from './util';
// say();

// 3. 引入vue代码
// import Vue from 'vue';
// import './style/common.scss';
//
// var app = new Vue({
// 	el: '#app',
// 	data: {
// 		message: 'Hello Vue!'
// 	}
// });

// 4. es6 其他语法使用
// import getData from './util';
// import Vue from 'vue';
//
// import './style/common.scss';
//
// var app = new Vue({
// 	el: '#app',
// 	data: {
// 		message: 'Hello Vue!'
// 	},
// 	methods: {
// 		async fetchData() {
// 			const data = await getData();
// 			this.message = data;
// 		}
// 	},
// 	created() {
// 		this.fetchData();
// 	}
// });

// 5. 引入图片，需要增加图片编译器 ，使用 Vue.component 来定义全局组件
// import getData from './util';
// import Vue from 'vue';
//
// import './style/common.scss';
//
// Vue.component('my-component', {
// 	template: '<img :src="url" />',
// 	data() {
// 		return {
// 			url: require('./img/logo.png')
// 		}
// 	}
// })
//
// var app = new Vue({
// 	el: '#app',
// 	data: {
// 		message: 'Hello Vue !'
// 	},
// 	methods: {
// 		async fetchData() {
// 			const data = await getData();
// 			this.message = data;
// 		}
// 	},
// 	created() {
// 		this.fetchData()
// 	}
// });

// 6. 使用单文件组件.vue进行代码编写
import Vue from 'vue';
import App from './App.vue';

import './style/common.scss';

new Vue({
	el: '#app',
	template: '<App/>',
	components: {App}
})
