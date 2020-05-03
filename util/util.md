# js各种方法大全

## 1.如何获取文件扩展名？[参考](http://leftstick.github.io/tech/2016/04/23/how-to-get-the-file-extension-more-efficiently)
https://jsbin.com/tipofu/edit?js,console

### String.prototype

![](.util_images/f63d83a9.png)

### Array.prototype

![](.util_images/4006625c.png)


注意： 对于不支持ES5的浏览器，MDN上提供了ployfill方案。
---
```js
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {}
        F.prototype = proto;
        return new F();
    };
}
```
![](.util_images/5640aed6.png)

### 方法：
--
- 1.https://lodash.com/docs

- 2.https://juejin.im/post/5da1a04ae51d45783d6122bf#heading-86