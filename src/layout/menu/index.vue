<script setup name="Menu">
import { ref, reactive, toRefs, onMounted } from 'vue'
import {useRouter} from "vue-router"

defineProps(['menuList'])
const $router = useRouter();
// 没有二级菜单
const isShowMenu = (item) => {
    if (item.meta.hidden) {
        return false;
    } else {
        if (!item.children) {
            return true;
        } else {
            return false
        }
    }
}
// 二级菜单只有一个
const isShowchildOneMenu = (item) => {
    if (item.meta.hidden) {
        return false;
    } else {
        if (item.children && item.children.length == 1) {
            return true;
        } else {
            return false
        }
    }
}
// 二次菜单有多个或嵌套
const isShowchildMenu = (item) => {
    if (item.meta.hidden) {
        return false;
    } else {
        if (item.children && item.children.length > 1) {
            return true;
        } else {
            return false
        }
    }
}
// 跳转至对应路由
const menuClick = (path)=>{
    console.log(path,'path');
    $router.push({path})
}
</script>
<template>
    <!-- <el-menu> -->
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有二级菜单 -->
        <el-menu-item :index="item.path" v-if="isShowMenu(item)" @click="menuClick(item.path)">
            <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
            <template #title>
                <span v-if="item.meta">{{ item.meta.title }}</span>
            </template>

        </el-menu-item>
        <!-- 二级菜单只有一个 -->
        <el-menu-item :index="item.children[0].path" v-if="isShowchildOneMenu(item)" @click="menuClick(item.children[0].path)">
            <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
            <template #title>
                <span>
                    <span v-if="item.children[0].meta">{{ item.children[0].meta.title }}</span>
                </span>
            </template>
        </el-menu-item>
        <!-- 二次菜单有多个或嵌套 -->
        <el-sub-menu :index="item.path" v-if="isShowchildMenu(item)">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span v-if="item.meta">{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
    <!-- </el-menu> -->
</template>

<style scoped lang="scss"></style>