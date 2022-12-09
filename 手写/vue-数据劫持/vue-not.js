function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function defineGet() {
      console.log(`get key: ${key} value: ${value}`)
      return value
    },
    set: function defineSet(newVal) {
      console.log(`set key: ${key} value: ${newVal}`)
      value = newVal
    }
  })
}

function observe(data) {
  Object.keys(data).forEach(function (key) {
    if (typeof data[key] === 'object') {
      observe(data[key])
    }
    // else{
    defineReactive(data, key, data[key])
    // }
  })
}

let arr = [1, 2, 3, {
    name: 'alex',
    age: 23
  },
  [3, 2, 1]
]
observe(arr);

arr[3].name = 2
// VM906: 6 get key: 3 value: [object Object]
// VM906: 10 set key: name value: 2