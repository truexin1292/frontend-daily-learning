# 项目描述：
https://2018.stateofjs.com/cn/introduction/


### 1.JavaScript 深入之从原型到原型链
http://web.jobbole.com/91207/

### 2.JavaScript 深入之词法作用域和动态作用域
http://web.jobbole.com/91210/

### 3.JavaScript 深入之执行上下文栈
http://web.jobbole.com/91303/

### 4.JavaScript 深入之变量对象
http://web.jobbole.com/91306/

### 5.JavaScript 深入之作用域链
http://web.jobbole.com/91318/

### 6.JavaScript 深入之从 ECMAScript 规范解读 this
http://web.jobbole.com/91331/

### 7.JavaScript 深入之执行上下文
http://web.jobbole.com/91337/

### 8.JavaScript 深入之闭包
http://web.jobbole.com/91342/

### 9.JavaScript 深入之参数按值传递
http://web.jobbole.com/91359/

### 10.深入之call和apply的模拟实现
http://web.jobbole.com/91366/

```js
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) //true
```

* 其次是__proto__, 绝大部分浏览器都支持这个非标准的方法访问原型，
然而它并不存在与Person.prototype中，实际上，它是来自于Object.prototype，
与其说是一个属性，不如说是一个getter/setter，当使用obj.__proto__时，
可以理解成返回了Object.getPrototypeOf(obj)
