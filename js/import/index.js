import { b } from './b';
// b = 2;
console.log('b', b);

import {
  serverUrl,
  typeList
} from "./a";
// import * as a from './a';
serverUrl++;
typeList.push(3);
console.log(serverUrl, typeList);
// console.log(a.serverUrl, a.typeList);