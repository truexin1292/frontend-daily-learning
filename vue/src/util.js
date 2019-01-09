// 1. 非es6，webpack默认不支持转码es6，但是import export这两个语法却单独支持。
// module.exports = function say(){
//     console.log('hello world');
// }

// 2. 修改为es6语法：
// export default function say() {
// 	console.log('hello world ');
// }

// 3. es6其他语法 async await
export default function getData() {
	return new Promise((resolve, reject) => {
		resolve('ok');
	})
}
