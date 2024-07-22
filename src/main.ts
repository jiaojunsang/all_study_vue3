import { createApp } from 'vue'
import App from './App.vue'
//@ts-ignore
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'//暗黑模式样式
import locale from 'element-plus/es/locale/lang/zh-cn'//引入中文包
import GlobalComponents  from '@/components'
import 'virtual:svg-icons-register'//svg配置代码
import router from "@/router/index.ts"
import pinia from "@/store/index.ts"
import Particles from "vue3-particles" 
import '@/style/index.scss'//引入全局样式表
import './permission' //引入路由鉴权（引入顺便执行）


const app = createApp(App)
// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    // size: Cookies.get('size') || 'default'
  })
  
app.use(GlobalComponents)
app.use(router)
app.use(pinia)
app.use(Particles)
app.mount('#app')

