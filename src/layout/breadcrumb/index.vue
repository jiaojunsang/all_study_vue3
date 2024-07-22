<template>
    <el-icon @click="changeIcon" class="cur-poi">
        <component :is="LayoutSettingStore.isExpand?'Expand':'Fold'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight" class="ml15">
        <el-breadcrumb-item :to="{ path: redirect(item) }" v-for="(item) in $route.matched" :key="item.path"
            v-show="item.meta.title">
            <div class="flex-al" v-if="item.meta.title">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span class="ml10">{{ item.meta.title }}</span>
            </div>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouteRecordRaw } from 'vue-router';
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting.ts'
import { ArrowRight } from '@element-plus/icons-vue'
const LayoutSettingStore = useLayoutSettingStore()
const changeIcon = () => {
    LayoutSettingStore.expandChange();
}
const $route = useRoute();
const redirect = (item: RouteRecordRaw) => {
    if (item.children && item.children.length > 0) {
        return item.children[0].path
    } else {
        return item.path
    }

}


</script>
<style scoped lang="scss"></style>