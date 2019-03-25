# js手动实现new方法/new操作符具体干了什么呢?
## 1.新生成了一个对象；
## 2.该新对象隐性原型链接到函数原型；
## 3.调用函数绑定this；
## 4.返回新对象；

```js
const newCreate = function(func) {
  return function() {
       let newObj = { // 1
           _proto_:func.prototype, // 2
       }
       func.apply(newObj,arguments); // 3
       return newObj; // 4
  }
}
// todo demo1
var Person = function() { //=》 构造函数-首字母大写
    this.name = 'alex';
    this.gender = 'male';
    this.age = 26;
}
// todo demo2
var Person2 = function(
    name = 'alex',
    gender = 'male',
    age = 26
    ) { 
    //=》 构造函数-首字母大写
    this.name = name;
    this.gender = gender;
    this.age = age;
}
// todo es6 demo3 
class Person3 {
    constructor(name,gender,age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }
    
    /*showName = () => {
        console.log(this.name);
    }
    
    showAll = () => {
        console.log(this);
    }*/
    //showName(){
      //  console.log(this.name);
    //}
    function showName(){
        console.log(this.name);
    }
}

var newPerson = newCreate(Person);
var newPerson2 = newCreate(Person2);
var newPerson3 = newCreate(Person3);
console.log(newPerson().name);
console.log(newPerson().gender);
console.log(newPerson().age);

console.log(newPerson2('tom', 'female', 30));
console.log(newPerson3('true', 'male', 38));
```
衍生问题：工厂函数和构造函数区别？
一个构造函数通过new一个新的对象出来使用，
在函数内部通过this来添加对象内部成员，
他只能为对象类型。同时一般我们定义一个构造函数首字母要记得大写。 
而工厂函数是需要在内部创建对象，
并且必须要有return 返回值。 
构造函数可以重写但是工厂函数不可以。 
构造函数通过Person.prototype = {} 
