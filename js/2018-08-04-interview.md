# JavaScript中如何检测一个变量是一个String类型？请写出函数实现

```node
var str = 'i am a string!';
1. typeof(str) === 'string'; //true; //typeof str =>object,function,...基本类型；
2. Object.prototype.toString.call(obj) == '[object Object]'
3. str.constructor === String; //true;
4. instanceof
5. ===

```

### 1.arguments.callee
https://www.jianshu.com/p/72a590f59f4f
https://blog.csdn.net/u012863664/article/details/54743835
作用一. 取消代码与函数名的耦合状态
作用二. 取消匿名函数的绑定

### 2.closure
http://www.cnblogs.com/isaboy/p/javascript_closure.html
```markdown
A closure is an inner function that has access to the outer (enclosing) function's variables—scope chain.
闭包就是一个内部函数，它具备访问外部函数变量（这些变量位于作用域链中）的能力[注意变量不包含this和arguments]
```
