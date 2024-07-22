<template>
    <div class="tabbar">
        <div class="tabbar-left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar-right flex-al">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'

import Breadcrumb from '../breadcrumb/index.vue'
import Setting from '../setting/index.vue'

</script>
<style scoped lang="scss">
.tabbar {
    height: 100%;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tabbar-left {
        display: flex;
        align-items: center;

        .breadcrumb {
            margin-left: 20px;
        }
    }
}
</style>