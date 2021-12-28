"use strict";

var _b = require("./b");

_b.b = (2, function () {
  throw new Error('"' + "b" + '" is read-only.');
}());
console.log('b', _b.b);