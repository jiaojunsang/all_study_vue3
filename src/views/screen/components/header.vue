<template>
    <div class="screen-header-container">
        <div class="container-left"></div>
        <div class="container-center">
            <div class="center-btn-left" @click="goHome">首页</div>
            <div class="center-title">旅游实时数据大屏</div>
            <div class="center-btn-right">统计报告</div>
        </div>
        <div class="container-right">
            当前时间{{time  }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted ,onBeforeUnmount} from 'vue'
import {useRouter} from 'vue-router'
import {getCurrentDateTime} from "@/utils/time"
const time = ref('')
const timer = setInterval(()=>{
    time.value = getCurrentDateTime();
},1000)
const $router:any = useRouter()
const goHome = ()=>{
    $router.push('/home')
}
onBeforeUnmount(()=>{
    clearInterval(timer)
})
</script>
<style scoped lang="scss">
.screen-header-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    color: #29fcff;

    .container-left {
        height: 40px;
        flex: 1;
        color: #fff;
        background: url('@/views/screen/images/dataScreen-header-left-bg.png') no-repeat;
        background-size: cover; //此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小
    }

    .container-center {
        flex: 2;
        display: flex;
        // align-items: center;
        justify-content: space-between;
        color: #29fcff;
        // background-color: #fff;
        width: 100%;
        height: 100%;

        .center-btn-left {
            background-color: #fff;
            background: url('@/views/screen/images/dataScreen-header-btn-bg-l.png') no-repeat;
            width: 100px;
            height: 40px;
            background-size: 100% 100%;//背景图片会等比例拉伸或压缩以填充整个元素的宽度和高度，确保背景图片完全覆盖整个元素
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            // color: #29fcff;
        }
        .center-title {
            width: calc(100% - 200px);
            height: 100%;
            // background-color: red;
            text-align: center;
            line-height: 70px;
            font-size: 25px;
            background-image: url('@/views/screen/images/dataScreen-header-center-bg.png');
            background-size: cover;
            background-repeat: no-repeat;
        }
        .center-btn-right {
            background-color: #fff;
            background: url('@/views/screen/images/dataScreen-header-btn-bg-r.png');
            width: 100px;
            height:40px;
            text-align: center;
            line-height: 40px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }

    .container-right {
        height: 40px;
        text-align: center;
        line-height: 40px;
        flex: 1;
        background: url('@/views/screen/images/dataScreen-header-right-bg.png') no-repeat;
        background-size: cover; //此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小
    }
}
</style>