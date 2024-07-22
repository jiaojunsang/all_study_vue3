<template>
    <div class="trend-container">
        <CardTitle title="未来三十天趋势"></CardTitle>
        <div ref="echartsRef" :style="{ height: `calc(100% - 50px)`, width: '100%', 'margin-top': '20px' }"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
import CardTitle from "../CardTitle.vue"



const echartsRef = ref(null)


onMounted(() => {
    let myCharts = echarts.init(echartsRef.value)
    myCharts.setOption({
        xAxis: {
            type: 'category',
            data: ['1/01', '1/02', '1/03', '1/04', '1/05', '1/06', '1/07'],
            boundaryGap:false,
            splitLine:{
                show:false
            }
        },
        yAxis: {
            type: 'value',
            splitLine:{
                show:false
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '5%',
            top: '10',
            containLabel: true
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 130],
                type: 'line',
                smooth: true,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(55, 162, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(116, 21, 219)'
                        }
                    ])
                },
            },
        ]

    })
})

</script>
<style scoped lang="scss">
.trend-container {
    background: url('@/views/screen/images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    width: 94%;
    height: 100%;
}
</style>