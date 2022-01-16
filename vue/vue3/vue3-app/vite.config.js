// 修改vite配置文件不需要重新跑项目，会自动编译更新
import {
  defineConfig
} from "vite";
import {
  resolve
} from "path";
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {
  viteMockServe
} from 'vite-plugin-mock';

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  base: "",
  css: {},
  esbuild: {},
  plugins: [vue(), vueJsx(), viteMockServe({
    supportTs: false
  })],
  // alias: { // alias" option is deprecated. Use "resolve.alias" instead.
  //   "@": resolve(__dirname, "src"),
  //   "com": resolve(__dirname, "src/components"),
  //   // "utils": pathResolve("src/utils"),
  //   // "apis": pathResolve("src/apis"),
  //   // "views": pathResolve("src/views"),
  //   // "routes": pathResolve("src/routes"),
  //   // "styles": pathResolve("src/styles"),
  // },
  resolve: {
    alias: {
      "@": pathResolve("src"),
      "coms": pathResolve("src/components"),
      "utils": pathResolve("src/utils"),
      "apis": pathResolve("src/apis"),
      "views": pathResolve("src/views"),
      "routes": pathResolve("src/routes"),
      "styles": pathResolve("src/styles"),
      "plugins": pathResolve("src/plugins"),
      "layouts": pathResolve("src/layouts"),
    }
  },
  optimizeDeps: {
    include: ['axios'],
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser' // 混淆器
  },
  server: {
    cors: true,
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.99.22:3000', //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
