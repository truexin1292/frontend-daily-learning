import {
  createApp
} from 'vue';
import App from './App.vue';

// 路由
import router from './router';

// vuex
// import {
//   store
// } from './store';
import store from './store';

import './index.css';

// 全局样式
import 'styles/index.scss';
import 'styles/index.less';

// element3
import element3 from 'plugins/element3';

// 使用工厂函数 和 直接挂载
createApp(App)
  .use(router)
  .use(store)
  .use(element3)
  .mount('#app');
