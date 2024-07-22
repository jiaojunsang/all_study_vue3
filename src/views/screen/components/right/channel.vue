<template>
    <div class="sphere-container">
        <CardTitle title="预约渠道统计"></CardTitle>
        <div ref="sphereRef" :style="{ height: `calc(100% - 30px)`, width: '100%' }"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
import CardTitle from "../CardTitle.vue"

const sphereRef = ref<any>(null)

onMounted(() => {
    let myCharts = echarts.init(sphereRef.value)
    let indicatorList = [{
        name: '消费',
    },
    {
        name: '年龄',
    },
    {
        name: '性格',
    },
    {
        name: '旅游频次',
    },
    {
        name: '其他',
    }];
    myCharts.setOption({
        color: ['#0290ff', '#ffe533', '#ff4d4d', '#06f5bc'],
        tooltip: {
            show: false // 弹层数据去掉
        },
        grid: {
            top: '20%',
            left: '20%',
            right: '10%',
            bottom: '10%',
        },
        legend: {
            data: [
                {
                    name: '携程', icon: 'rect', itemStyle: {
                        color: '#ff4d4d', borderWidth: 0 // 设置图例图标的颜色
                    },
                },
                {
                    name: '美团', icon: 'rect', itemStyle: {
                        color: '#0290ff', borderWidth: 0 // 设置图例图标的颜色
                    }
                },
                {
                    name: '去哪儿', icon: 'rect', itemStyle: {
                        color: '#ffe533', borderWidth: 0 // 设置图例图标的颜色
                    }
                },
                {
                    name: '线下', icon: 'rect', itemStyle: {
                        color: '#06f5bc', borderWidth: 0 // 设置图例图标的颜色
                    }
                },
            ],

            top: 20,
            show: true,
            y: '1',
            center: 0,
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 26,
            z: 3,
            // orient: 'horizontal',
            textStyle: {
                fontSize: 14,
                color: '#edf8ff',
            },
        },
        radar: {
            center: ['50%', '60%'], // 外圆的位置
            radius: '55%',
            axisName: {
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 400,
                    fontFamily: 'PingFangSC-Regular,PingFang SC',
                    fontStyle: 'normal',
            },
            // TODO:
            indicator: indicatorList,
            splitArea: {
                // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                show: true,
                areaStyle: {
                    // 分隔区域的样式设置。
                    color: ['rgba(255,255,255,0)'] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                }
            },
            axisLine: {
                // 指向外圈文本的分隔线样式
                lineStyle: {
                    color: 'rgba(255,255,255,0)'
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#0ac8ff', // 分隔线颜色
                    width: 2 // 分隔线线宽
                }
            }
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [50, 60, 40, 10, 0],
                        name: '携程',
                        areaStyle: {
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(255, 56, 56, 0.14)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.15, color: 'rgba(255, 56, 56, 0.14)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 0.75, color: 'rgba(255, 56, 56, 0.4)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 1, color: 'rgba(255, 56, 56, 0.8)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                        },
                        symbolSize: [6, 6],
                        lineStyle: { //边缘颜色
                            //  width: 0
                            color: 'rgba(255, 56, 56, 0.8)',
                            // shadowBlur:8,
                            // shadowColor:'#ff3838'
                        },
                        itemStyle: {
                            color: '#fff',
                            borderColor: '#ff6565',
                            borderWidth: 1,
                            shadowBlur: 8,
                            shadowColor: '#ff6565'
                        },
                    },
                    {
                        value: [80, 80, 80, 70, 60],
                        name: '美团',
                        areaStyle: {
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(0,194,255, 0.14)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.15, color: 'rgba(0,194,255, 0.14)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 0.75, color: 'rgba(0,194,255, 0.4)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 1, color: 'rgba(0,194,255, 0.8)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                        },
                        symbolSize: [6, 6],
                        lineStyle: { //边缘颜色
                            //  width: 0
                            color: 'rgba(0, 194, 255, 0.8)',
                            // shadowBlur:8,
                            // shadowColor:'#ff3838'
                        },
                        itemStyle: {
                            color: '#fff',
                            borderColor: '#00c8ff',
                            borderWidth: 1,
                            shadowBlur: 8,
                            shadowColor: '#00c8ff'
                        },
                    },
                    {
                        value: [50, 40, 70, 50, 60],
                        name: '去哪儿',
                        areaStyle: {
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(255, 220, 56, 0.14)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.15, color: 'rgba(255, 220, 56, 0.14)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 0.75, color: 'rgba(255, 220, 56, 0.4)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 1, color: 'rgba(255, 220, 56, 0.8)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                        },
                        symbolSize: [6, 6],
                        lineStyle: { //边缘颜色
                            //  width: 0
                            color: 'rgba(255, 220, 56, 0.8)',
                            // shadowBlur:8,
                            // shadowColor:'#ff3838'
                        },
                        itemStyle: {
                            color: '#fff',
                            borderColor: '#cdbd3e',
                            borderWidth: 1,
                            shadowBlur: 8,
                            shadowColor: '#cdbd3e'
                        },
                    },
                    {
                        value: [0, 0, 10, 30, 70],
                        name: '线下',
                        areaStyle: {
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(13, 248, 172, 0.14)' // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.15, color: 'rgba(13, 248, 172, 0.14)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 0.75, color: 'rgba(13, 248, 172, 0.4)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 1, color: 'rgba(13, 248, 172, 0.8)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                        },
                        symbolSize: [6, 6],
                        lineStyle: { //边缘颜色
                            //  width: 0
                            color: 'rgba(13, 248, 172, 0.8)',
                            // shadowBlur:8,
                            // shadowColor:'#ff3838'
                        },
                        itemStyle: {
                            color: '#fff',
                            borderColor: '#00ffb4',
                            borderWidth: 1,
                            shadowBlur: 8,
                            shadowColor: '#00ffb4'
                        },
                    },
                ]
            }
        ]
    })
})

</script>
<style scoped lang="scss">
.sphere-container {
    background: url('@/views/screen/images/dataScreen-main-lt.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;




}
</style>