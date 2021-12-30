import {
  defineConfig
} from "vite";
import {
  resolve
} from "path";
import vue from '@vitejs/plugin-vue';

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  base: "",
  css: {},
  esbuild: {},
  plugins: [vue()],
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
      "com": pathResolve("src/components"),
      // "utils": pathResolve("src/utils"),
      // "apis": pathResolve("src/apis"),
      // "views": pathResolve("src/views"),
      // "routes": pathResolve("src/routes"),
      // "styles": pathResolve("src/styles"),
    }
  },
  optimizeDeps: {
    // include: ['axios'],
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
