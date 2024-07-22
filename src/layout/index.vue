<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-slider" :class="{collapse:!LayoutSettingStore.isExpand}">
      <Logo></Logo>
      
      <el-scrollbar class="scrollbar-menu-box">
        <el-menu 
        :collapse="LayoutSettingStore.isExpand?false:true"
        :default-active="$router.path"
        active-text-color="#ffd04b" 
        text-color="#fff" 
        background-color="#001529" 
        class="menu-box" 
        unique-opened
        collapse-transition
        >
          <Menu :menuList="UserStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>

    </div>
    <!-- 顶部导航 -->
    <div class="layout-header" :class="{collapse:!LayoutSettingStore.isExpand}">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout-main" :class="{collapse:!LayoutSettingStore.isExpand}">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user';
import {useRoute} from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting.ts'

const LayoutSettingStore = useLayoutSettingStore();
const UserStore = useUserStore();
const $router = useRoute();

</script>
<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  // box-sizing: border-box;

  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.4s;
    &.collapse{
      width: $base-menu-collapse-width;
    }
    .scrollbar-menu-box{
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu{
        border-right: none;

      }
    }
  }

  .layout-header {
    position: fixed;
    width: calc(100vw - $base-menu-width);
    height: $base-head-height;
    top: 0;
    left: $base-menu-width;
    border-bottom: 1px solid $base-border;
    transition: all 0.4s;
    &.collapse{
      width: calc(100vw - $base-menu-collapse-width);
      left: $base-menu-collapse-width;;
    }
  }

  .layout-main {
    position: absolute;
    width: calc(100vw - $base-menu-width);
    height: calc(100vh - $base-head-height);
    left: $base-menu-width;
    top: $base-head-height;
    padding: 15px;
    box-sizing: border-box;
    overflow: auto;
    transition: all 0.4s;
    &.collapse{
      width: calc(100vw - $base-menu-collapse-width);
      left: $base-menu-collapse-width;;
    }
  }
}
</style>