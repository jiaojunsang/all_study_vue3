<template>
    <div class="title-container">
        <div class="title" :style="{'font-size':`${titleSize}px`}">{{title}}</div>
        <div class="img"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: '标题',
        required: true
    },
    titleSize:{
        type: Number,
        default: 16
    }
})
</script>
<style scoped lang="scss">
.title-container{
    width: 100%;
    color: #fff;
    .img{
        margin-top: 10px;
        width: 68px;
        height: 7px;
        background: url('@/views/screen/images/dataScreen-title.png') no-repeat;
        background-size: cover; //此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小
        color: rgba(208, 27, 27, 0.25);
    }
}
</style>