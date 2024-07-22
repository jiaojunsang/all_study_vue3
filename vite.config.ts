import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'//扩展 <script setup> 的功能如直接在script里面加name
import path from 'path';
// mock插件提供的方法
import { viteMockServe } from "vite-plugin-mock";



// https://vitejs.dev/config/
export default defineConfig(({command,mode})=>{
  // 获取环境变量，mode表示加载的环境，process.cwd()表示加载环境文件的目录（根目录）
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === "serve"//
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],//svg图片存放路径
        symbolId: 'icon-[dir]-[name]',
      }),
      VueSetupExtend()
    ],
    resolve: {
      // 设置文件./src路径为 @
      alias: {
          "@": path.resolve('./src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/style/variable.scss";`,
        },
      },
    },
    server: {
      // port: 80,
      host: true,//开启之后将新增network地址
      open: true,
      proxy: {
        // 匹配到的当前环境api字符
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVER,//服务器地址
          changeOrigin: true,//是否需要代理跨域
          rewrite: (p) => p.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')//将匹配到的路径（env.VITE_APP_BASE_API）重写成为空字符串
        }
      }
    },
  }
})
