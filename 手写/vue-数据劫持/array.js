const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

const methodsToPatch = [
  'push',
  'pop',
  'unshift',
  'shift',
  'sort',
  'reverse',
  'splice',
  'fill',
];

methodsToPatch.forEach(function (method) {
  const original = arrayProto[method];

  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    // const ob = this.__ob__
    // let inserted
    // switch (method) {
    //   case 'push':
    //   case 'unshift':
    //     inserted = args
    //     break
    //   case 'splice':
    //     inserted = args.slice(2)
    //     break
    // }
    // if (inserted) ob.observeArray(inserted);
    console.log(`数组数据改变了，方法${method}，参数${args}`, result);
    return result;
  });
});

export function def(obj, method, val) {
  Object.defineProperty(obj, method, {
    writable: true,
    enumerable: true,
    configurable: true,
    value: val,
  })
}