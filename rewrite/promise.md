# 项目描述：

http://web.jobbole.com/91406/
https://www.jianshu.com/p/473cd754311f%20
https://www.jianshu.com/p/fe5f173276bd
https://juejin.im/post/5aab8cb8f265da239a5f9064
https://www.jianshu.com/p/4e6be72236d6
使用：
https://blog.csdn.net/shan1991fei/article/details/78966297

```js
//简化版promise
function Promise(fn) {
    var value = null,
        callbacks = [];  //callbacks为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
        return this;
    };

    function resolve(value) {
        setTimeout(function() {
            callbacks.forEach(function (callback) {
                callback(value);
            });
        }, 0)
    }

    fn(resolve);
}
```

```js
//升级版promise
function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled, onRejected) {
        return new Promise(function (resolve, reject) {
            handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            });
        });
    };

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }

        var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
            ret;
        if (cb === null) {
            cb = state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(value);
            return;
        }
        ret = cb(value);
        callback.resolve(ret);
    }

    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve, reject);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        execute();
    }

    function reject(reason) {
        state = 'rejected';
        value = reason;
        execute();
    }

    function execute() {
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }

    fn(resolve, reject);
}
```



```js
function Promise(excutor) {
  let self = this
  self.status = 'pending'
  self.value = null
  self.reason = null
  self.onFulfilledCallbacks = []
  self.onRejectedCallbacks = []

  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fulfilled'
      self.onFulfilledCallbacks.forEach(item => item())
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'
      self.onRejectedCallbacks.forEach(item => item())
    }
  }
  try {
    excutor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}


Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled :  function (data) {resolve(data)}
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) {throw err}
  let self = this
  if (self.status === 'fulfilled') {
    return new Promise((resolve, reject) => {
      try {
        let x = onFulfilled(self.value)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (err) {
        reject(err)
      }
    })
  }
  if (self.status === 'rejected') {
    return new Promise((resolve, reject) => {
      try {
        let x = onRejected(self.reason)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (err) {
        reject(err)
      }
    })
  }
  if (self.status === 'pending') {
    return new Promise((resolve, reject) => {
      self.onFulfilledCallbacks.push(() => {
        let x = onFulfilled(self.value)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      })
      self.onRejectedCallbacks.push(() => {
        let x = onRejected(self.reason)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      })
    })
  }
}

Promise.prototype.catch = function (fn) {
  return this.then(null, fn)
}

```

```js
function Promise(task) {
    let that = this;//缓存this
    //默认状态为pending
    that.status = 'pending';
    //此变量里放着此promise的结果
    that.value = undefined;
    //存放的着所有成功的回调函数
    that.onResolvedCallbacks = [];
    //存放着所有的失败的回调函数
    that.onRejectedCallbacks = [];
    //调用此方法可以把promise变成成功态
    //resolve的时候你把挣到的钱传进来
    function resolve(value) {
        if(value instanceof Promise){
            return value.then(resolve,reject);
        }
        if (that.status == 'pending') {
            that.status = 'fulfilled';
            that.value = value;
            that.onResolvedCallbacks.forEach(item=>item(that.value));
        }
    }

    //调用此方法可以把当前的promise变成失败态
    function reject(reason) {
        //如果当前状态是初始态，则转成失败态
        if (that.status == 'pending') {
            that.status = 'rejected';
            that.value = reason;
            that.onRejectedCallbacks.forEach(item=>item(that.value));
        }
    }

    //立即执行传入的任务
    try {
        task(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
function resolvePromise(promise2,x,resolve,reject){
    let then;
    //如果x就是promise2
    if(promise2 === x){
        return reject(new TypeError('循环引用'));
    }
    if(x instanceof Promise){
        if(x.status == 'pending'){
            x.then(function(y){
                resolvePromise(promise2,y,resolve,reject);
            },reject);
        }else if(x.status == 'fulfilled'){
            resolve(x.value);
        }else if(x.status == 'rejected'){
            reject(x.value);
        }
    }else if(x!=null && (typeof x == 'object' || typeof x == 'function')){
        try{
            then = x.then;
            if(typeof then == 'function'){
                then.call(x,function(y){
                    resolvePromise(promise2,y,resolve,reject)
                },reject);
            }
        }catch(e){
            reject(e);
        };
    }else{
        resolve(x);
    }
}
//onFulfilled成功的回调，onReject失败的回调
Promise.prototype.then = function (onFulfilled, onReject) {
    onFulfilled = typeof onFulfilled == 'function'?onFulfilled:function(value){return value};
    onReject = typeof onReject=='function'?onReject:function(reason){
        throw reason;
    }
    let that = this;
    let promise2;
    if(that.status == 'fulfilled'){
        promise2 = new Promise(function(resolve,reject){
            let x = onFulfilled(that.value);
            resolvePromise(promise2,x,resolve,reject);
        });
    }
    if(that.status == 'rejected'){
        promise2 = new Promise(function(resolve,reject){
            let x = onReject(that.value);
            resolvePromise(promise2,x,resolve,reject);
        });

    }
    if(that.status == 'pending'){
        promise2 = new Promise(function(resolve,reject){
            that.onResolvedCallbacks.push(function(){
                let x = onFulfilled(that.value);
                resolvePromise(promise2,x,resolve,reject);
            });
            that.onRejectedCallbacks.push(function(){
                let x = onReject(that.value);
                resolvePromise(promise2,x,resolve,reject);
            });
        });
    }
    return promise2;
}

Promise.all = function (arr) {
    return new Promise((resolve,reject) =>{
        let values = []
        let len = arr.length
        for(var i = 0;i < len; i++){
            let promise = arr[i]
            if(typeof promise.then == 'function'){
                promise.then(res=>{
                    values.push(res)
                    if(values.length == len){
                        resolve(values)
                    }
                })
            }
        }
    })
}

Promise.race = function (arr) {
    return new Promise((resolve,reject) =>{
        let len = arr.length
        for(var i = 0;i < len; i++){
            let promise = arr[i]
            if(typeof promise.then == 'function'){
                promise.then(res=>{
                    resolve(res)
                })
            }
        }
    })
}

Promise.resolve = function (value) {
    if (value instanceof Promise) return value
    return new Promise(resolve => resolve(value))
}

Promise.reject = function (value) {
    return new Promise((resolve,reject)=>reject(value))
}


module.exports = Promise;
```
