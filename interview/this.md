# 项目描述：

https://juejin.im/post/5b3715def265da59af40a630#heading-3

传入的不是对象：
如果你传入了一个原始值(字符串,布尔类型，数字类型)，来当做this的绑定对象，
这个原始值转换成它的对象形式。
如果你把null或者undefined作为this的绑定对象传入call/apply/bind，
这些值会在调用时被忽略，实际应用的是默认绑定规则。

```js
function foo(a) {
    console.log(this.a,a);
}
let obj = {
    a: 2
};
foo.call(obj); // 2
foo.call(null,1); // 2
```

```js
function foo() {
    // this.a = 'alex'; alex
    return () => {
    console.log(this.a);
  };
}
let obj1 = {
  a: 2
};
let obj2 = {
  a: 22
};
// foo.a = 'name'; // alex
let bar = foo.call(obj1); // foo this指向obj1
bar.call(obj2); // 输出2 这里执行箭头函数 并试图绑定this指向到obj2

```
箭头函数中的this继承于它外面第一个不是箭头函数的函数的this指向。
箭头函数的 this 一旦绑定了上下文，就不会被任何代码改变。
