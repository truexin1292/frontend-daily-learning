"use strict";

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var foo = function foo(item) {
  return console.log(JSON.stringify(item));
};

foo(_user["default"].userinfo);
foo(_user["default"].moduleinfo);