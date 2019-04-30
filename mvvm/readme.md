# 项目描述：
http://jsbin.com/tixekufaha/edit?html,js,output

https://github.com/xuqiang521/xuejs.git

https://github.com/xuqiang521/overwrite/tree/master/src/my-mvvm

document.createDocumentFragment

1. 文档碎片，遍历过程中会有多次的dom操作，
为提高性能我们会将el节点转化为fragment文档碎片进行解析操作
解析操作完成，将其添加回真实dom节点中

2.new Vue 的时候就进行observe监听了；

3.data - > observe 监听- > Dep 回调- > < -监听 Watcher 观察- > view

* my-mvvm
https://github.com/xuqiang521/overwrite/tree/master/src/my-mvvm
* mvvm
https://jsbin.com/tixekufaha/edit?html,js,output
https://www.jianshu.com/p/f673fbbd889a
https://twiknight.gitbooks.io/blog/content/write_a_mvvm_framework_from_scratch_1.html
* own-react
https://github.com/jackiewillen/build-your-own-react
* virtual dom
https://juejin.im/post/5cb66fdaf265da0384128445
* biu.js:
https://github.com/veedrin/biu/blob/master/src/biu.js
* xue.js
https://github.com/xuqiang521/xuejs
