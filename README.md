# frontend-daily-learning
js, css, html的日常学习记录，希望大家多多交流

```bash
http-server -a 127.0.0.1 -p 9001 
```


## npm报错

```Error: Cannot find module 'ajv'
    at Function.Module._resolveFilename (module.js:485:15)
    at Function.Module._load (module.js:437:25)
    at Module.require (module.js:513:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/home/user/GIT/project/node_modules/webpack/lib/validateSchema.js:7:13)
    at Module._compile (module.js:569:30)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:503:32)
    at tryModuleLoad (module.js:466:12)
    at Function.Module._load (module.js:458:3)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
```

解决：
```nodemon
cnpm install npm -g
```
### 闭包异步面试题
https://www.jianshu.com/p/76857b595f80
