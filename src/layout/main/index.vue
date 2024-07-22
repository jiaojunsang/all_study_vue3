<template>
    <!-- 想要在你的路径组件上使用转场，并对导航进行动画处理 -->
    <router-view v-slot="{ Component }">
        <!-- 过渡动效 -->
        <transition name="fade">
            <!-- 渲染layout的子路由 -->
            <component :is="Component" v-if="render" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import useLayoutSettingStore from '@/store/modules/setting.ts'

const LayoutSettingStore = useLayoutSettingStore();

// 监听store里面的值（LayoutSettingStore.refresh）是否变化来判断是都点击刷新按钮
watch(() => LayoutSettingStore.refresh, () => {
    // 通过设置render值来达到刷新组件的目的，v-if可用来销毁挂载组件
    render.value = false
    nextTick(() => {
        // 使用nextTick来确保上述步骤执行完再挂载组件
        render.value = true
    })

});

const render = ref(true)
</script>
<style scoped lang="scss">
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 1s;
}

.fade-enter-to {
    opacity: 1;
}
</style>