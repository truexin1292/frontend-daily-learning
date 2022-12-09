import {
  arrayMethods,
  def
} from './array.js';

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

export class Observer {
  constructor(value) {
    this.value = value;
    // def(value, '__ob__', this);
    if (Array.isArray(value)) {
      this.observeArray(value); // 重写array方法
      // this.getEveryProperty(value); // 监听数组索引  -- 
      // 性能代价和获得的用户体验收益不成正比。
    } else {
      this.getEveryProperty(value);
    }
  }

  getEveryProperty(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(obj, keys[i]);
    }
  }

  defineReactive(obj, key, val) {
    if (arguments.length === 2) {
      val = obj[key];
    }
    
    if (typeof val === 'object') {
      new Observer(val);
      return;
    }
    Object.defineProperty(obj, key, {
      get() {
        console.log(`${key}属性被获取，值为${val}`);
        return val;
      },
      set(newValue) {
        if (newValue === val) {
          return;
        }
        console.log(`${key}属性被设置，值为${newValue}`);
        val = newValue;
      }
    })
  }

  observeArray(value) {
    const hasProto = '__proto__' in {};
    if (hasProto) {
      value.__proto__ = arrayMethods;
    } else {
      for (let i = 0; i < arrayKeys.length; i++) {
        const method = arrayKeys[i];
        def(value, method, arrayMethods[method]);
      }
    }
    for (let i = 0; i < value.length; i++) {
      this.observe(value[i]);
    }
  }

  observe(value) {
    if (typeof value === 'object') {
      return new Observer(value);
    }
  }
}