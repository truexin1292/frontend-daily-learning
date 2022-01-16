import {
  createRouter,
  createWebHashHistory
} from 'vue-router';

const routes = [{
    path: '/',
    component: import('layouts/index.vue'),
    alwaysShow: true,
    meta: {
      title: '导航',
      icon: 'el-icon-setting'
    },
    children: [{
        name: 'home',
        path: '/',
        component: import('views/home.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-setting'
        },
      },
      {
        name: '我的',
        path: '/me',
        component: import('views/me/me.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-setting'
        },
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: [{
//       path: '/',
//       component: import('layouts/index.vue'),
//       children: [{
//           path: '/home',
//           component: import('views/home.vue')
//         },
//         {
//           path: '/me',
//           component: import('views/me/me.vue')
//         }
//       ]
//     },

//   ]
// });

export default router;
