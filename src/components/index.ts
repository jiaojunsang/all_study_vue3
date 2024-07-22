import { App, Component } from 'vue';
import SvgIcon from "@/components/GloabComponetns/SvgIcon/index.vue";
import pagination from "@/components/Pagination/index.vue"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 定义组件对象的类型
interface Components {
  [key: string]: Component;
}

const components: Components = {
  SvgIcon,
  pagination
};

export default {
  // 注册全局组件
  // install方法会在main.js里面使用use的时候执行
  install(app: App): void {
    Object.keys(components).forEach((name: string) => {
      app.component(name, components[name]);
    });
    // 全局注册图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
};