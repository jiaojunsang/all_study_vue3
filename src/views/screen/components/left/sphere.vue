<template>
    <div class="sphere-container">
        <CardTitle title="实时游客统计"></CardTitle>
        <!-- <NumberAnimation :numm="232323" :numLen="9"></NumberAnimation> -->
        <div class="total-number">可预约总人数<span class="number">{{ 66 }}</span>人</div>
        <div class="real-count">
            <div :style="{ width: `calc(100% / ${realNumber.length})` }" class="real-count-number"
                v-for="(item, index) in realNumber" :key="index">{{ item }}</div>
        </div>
        <div ref="sphereRef" :style="{ height: `calc(100% - 100px)`, width: '100%' }"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted ,onBeforeUnmount} from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import CardTitle from "../CardTitle.vue"
import NumberAnimation from "@/components/NumberAnimation/index.vue"

const sphereRef = ref<any>(null)
const timer = setInterval(() => {
    realNumber.value = (Number(realNumber.value.split('人')[0]) as number + 1).toString() as string +'人'
}, 2000)
onBeforeUnmount(()=>{
    clearInterval(timer)
})

const realNumber = ref<string>('666689人')
console.log(realNumber.value.split('人'),'1111');

onMounted(() => {
    let myCharts = echarts.init(sphereRef.value)
    myCharts.setOption({
        title: { text: '' },
        series: [{
            type: 'liquidFill',//类型
            data: [0.6, 0.55, 0.4, 0.25],//数据
            radius: '80%',//水球图大小
            outline: {
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'skyblue',//圈圈颜色
                    borderColor: '#294D99',//外圈颜色
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(208, 27, 27, 0.25)'
                }
            },
            backgroundStyle: {
                borderColor: 'rgba(255, 255, 255, 0.9)',
                borderWidth: 1,
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 20
            },
            // shape: 'path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z',
            label: {
                position: ['50%', '50%'],
                formatter: function () {
                    return '预约量60%';
                },
                fontSize: 30,
                color: '#fff'
            }
        }]
    })
})

</script>
<style scoped lang="scss">
.sphere-container {
    background: url('@/views/screen/images/dataScreen-main-lt.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;

    .total-number {
        text-align: right;
        padding: 0 20px;
        box-sizing: border-box;

        .number {
            color: #ffec5a;
        }
    }

    .real-count {
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        margin-top: 20px;

        .real-count-number {
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 20px;
            font-weight: 600;
            background: url('@/views/screen/images/total.png') no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>