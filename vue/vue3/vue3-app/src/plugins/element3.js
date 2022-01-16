// 全局引入element3
// import element3 from 'element3';
// import 'element3/lib/theme-chalk/index.css';

// 按需加载
import {
  ElButton, ElInput
} from 'element3';
import 'element3/lib/theme-chalk/button.css';
import 'element3/lib/theme-chalk/input.css';

// 插件形式，就是返回一个函数
export default function (app) {
  // app.use(element3);
  app.use(ElButton);
  app.use(ElInput);
}
