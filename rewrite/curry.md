# 项目描述：

柯里化（英语：Currying），又称为部分求值，
是把接受多个参数的函数变换成接受一个单一参数
（最初函数的第一个参数）的函数，并且返回一个新的函数的技术，
新函数接受余下参数并返回运算结果。

```js



function add(x){
  var sum=x;
  var tmp=function(y){
    sum=sum+y;
    return tmp;
  };
  tmp.toString=function(){
    return sum;
  };
  return tmp;
}
console.log(add(1)(2)(3));
console.log(add(1)(2)(3)(4));
```

代码注释:

（1）function add(x){}，此函数实现了多次调用效果，参数就是要传递的数字。

（2）var sum=x，将x值赋值给sum。

（3）var tmp = function(y){
        sum=sum+y;
        return tmp;
    }，
    声明一个函数，此函数实现了数字的累加效果，并且会返回函数本身。

（4）tmp.toString=function(){
        return sum;
    }，
    重写了tmp的toString()方法，目的是为了返回计算结果值，
    add(1)(2)(3)单纯这样获取的是函数对象，
    而是用console.log()输出add(1)(2)(3)的时候就会隐式调用toString()方法，
    于是就会获取计算值。

（5）return tmp，返回函数。
