# readme.md

## [].slice.call(arguments,1)的理解
[参考](https://segmentfault.com/q/1010000005643934)

```html
所以说
[].slice.call(arguments, 1);
或者
Array.prototype.slice.call(arguments,1);
实际上相当于（并不一定等同于）：
arguments.slice(1);
```

## call、apply和bind方法的用法以及区别
[参考](https://www.jianshu.com/p/bc541afad6ee)
![](.array_images/33224861.png)
```html
bind
和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表。区别在于bind方法返回值是函数以及bind接收的参数列表的使用。

apply
apply接受两个参数，第一个参数是要绑定给this的值，第二个参数是一个参数数组。当第一个参数为null、undefined的时候，默认指向window。

call 
call 方法第一个参数是要绑定给this的值，后面传入的是一个参数列表。当第一个参数为null、undefined的时候，默认指向window。
```

```js
if(!Function.prototype.softBind){
           Function.prototype.softBind = function(obj){
               var fn = this;
               var curried = [].slice.call(arguments,1);
               var bound = function(){
                   return fn.apply(
                       (!this || this === (window || global)) ? obj:this,
                       curried.concat.apply(curried,arguments)
                   )
               };
               bound.prototype = Object.create(fn.prototype);
               return bound;
           }
       }
```


/*此处的返回值是true*/
   [].slice === Array.prototype.slice;
   
/*此处的返回值是true*/
   ''.slice === String.prototype.slice;

## es6 --- set
https://www.cnblogs.com/liuna/p/6171003.html

1.key方法、value方法、entries方法返回的都是遍历器对象。由于Set结构没有键名，只有键值（或者说键名和键值是同一个值），所以key方法和value方法的行为完全一致。
2.Set.prototype[Symbol.iterator] === Set.prototype.values === Set.prototype.keys
##### 由于两个空对象不相等，所以它们被视为两个值（与原生js一致）
##### 在 Set 内部，两个NaN是相等（与原生js不一致）
![](.array_images/b6e962fd.png)

![](.array_images/f6caf729.png)

![](.array_images/4fd12055.png)

```js
var set = new WeakSet([{name:'alex',data:{
time:'2018-11-30',dataList:[{id:1,value:'test1'},{id:2,value:'test2'},{id:3,value:'test3'}]}},{age:23},{gender:'male'}]);

var obj = {name:'alex4444-7777777',data:{
time:'2018-11-30',dataList:[{id:1,value:'test1'},{id:2,value:'test2'},{id:3,value:'test3'}]}}
set.add(obj);
console.log(set); // ...
console.log(set.has(obj)); // true
```
