<template>
    <div class="sphere-container">
        <CardTitle title="实时排行榜"></CardTitle>
        <div ref="sphereRef" :style="{ height: `calc(100% - 100px)`, width: '100%','margin-top':'20px' }"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
import CardTitle from "../CardTitle.vue"

const sphereRef = ref<any>(null)
const data = [163, 182, 191, 234, 290, 322, 345, 444];
const barWidth = 20;
let maxNum = 0;
for (let i = 0; i < data.length; i++) {
    if (data[i] > maxNum) {
        maxNum = data[i];
    }
}
onMounted(() => {
    let myCharts = echarts.init(sphereRef.value)
    myCharts.setOption({
        grid: {
            top: '20%',
            left: '20%',
            right: '10%',
            bottom: '0%',
        },

        title: {
            text: '景区排行榜',
            left:'50%',
            textStyle: { fontSize: '16px', fontWeight: 'bold', color: '#02afff' },
        },
        xAxis: {
            show: false,
        },
        yAxis: {
            data: ['NO.1', 'NO.2', 'NO.3', 'NO.4', 'NO.5', 'NO.6', 'NO.7', 'NO.8'],
        splitLine: {
                show: false,
            },
            axisLabel: {
                 fontSize: '80%', color: '#02afff' ,
            },
            axisLine: {
                show: false,
            },
            axisTick: false,
        },
        series: [
            {
                type: 'bar',
                barWidth: barWidth,
                zlevel: 2,
                data: data.map(function (item) {
                    return {
                        value: item,
                        maxNum: maxNum,
                    };
                }),
                label: {
                    show: true,
                    position: 'inside',
                    // distance: 80,
                    align: 'center',
                    formatter:  (params:any)=> {
                        // return params.data.realValue;
                        const percent = Number((params.data.value / params.data.maxNum) * 100).toFixed(2);
                        return percent;
                    },
                    color: '#fff',
                    fontSize: 12,
                },
                itemStyle: {
                    borderRadius: 10,
                    color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
                        { offset: 0, color: '#395CFE' },
                        { offset: 1, color: '#2EC7CF' },
                    ]),
                },
            },
            {
                type: 'bar',
                barWidth: barWidth,
                barGap: '-100%',
                data: data.map(function (item) {
                    return {
                        realValue: item,
                        value: maxNum,
                    };
                }),
                label: {
                    show: false,
                    position: 'right',
                    distance: 80,
                    align: 'right',
                    formatter:  (params:any) =>{
                        return params.data.realValue;
                    },
                    color: '#02afff',
                    fontSize: 18,
                },
                itemStyle: {
                    borderRadius: 10,
                    color: 'rgba(3,169,244, 0.5)',
                },
            },
        ],
    })
})

</script>
<style scoped lang="scss">
.sphere-container {
    background: url('@/views/screen/images/dataScreen-main-rt.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    width: 100%;
    height: 100%;



}
</style>