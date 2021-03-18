const fetch = require("node-fetch");

const www = new Proxy(
  new URL('https://www'),
  {
    get: function get(target, prop) {
      let o = Reflect.get(target, prop);
      if (typeof o === 'function') {
        return o.bind(target);
      }
      if (typeof prop !== 'string') {
        return o;
      }
      if (prop === 'then') {
        return Promise.prototype.then.bind(fetch(target));
      }
      target = new URL(target);
      target.hostname += `.${prop}`;
      return new Proxy(target, { get });
    }
  }
)

www.baidu.com.then((res) => {
  console.log(res.status);
});

(async function () {
  // const res = await www.baidu.com;
  const res = await www.truexin.club;
  console.log(res);
  console.log(res.status);
  console.log(res.ok);
})();