<template>
    <div class="" ref="echartsRef" :style="{ height: `100%`, width: '100%' }">

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts';
import chinaJson from './china.json'



const echartsRef = ref(null)
const points = ref([
    { name: '新疆', value: [87.628579, 43.793301], itemStyle: { color: '#00EEFF' } }, // 新疆
    { name: '四川', value: [104.076452, 30.651696], itemStyle: { color: '#00EEFF' } }, // 四川
    { name: '甘肃', value: [103.826777, 36.060634], itemStyle: { color: '#00EEFF' } }, // 甘肃
    { name: '云南', value: [102.709372, 25.046432], itemStyle: { color: '#00EEFF' } }, // 云南
    { name: '广西', value: [108.327537, 22.816659], itemStyle: { color: '#00EEFF' } }, // 广西
    { name: '湖南', value: [112.982951, 28.116007], itemStyle: { color: '#00EEFF' } }, // 湖南
    { name: '山东', value: [117.020725, 36.670201], itemStyle: { color: '#00EEFF' } }, // 山东
    { name: '河南', value: [113.753094, 34.767052], itemStyle: { color: '#00EEFF' } }, // 河南
    { name: '山西', value: [112.578781, 37.813948], itemStyle: { color: '#00EEFF' } }, // 山西
    { name: '福建', value: [119.296194, 26.101082], itemStyle: { color: '#00EEFF' } }, // 福建
    { name: '浙江', value: [120.152575, 30.266619], itemStyle: { color: '#00EEFF' } }, // 浙江
    { name: '江苏', value: [118.763563, 32.061377], itemStyle: { color: '#00EEFF' } }, // 江苏
    { name: '北京', value: [116.407387, 39.904179], itemStyle: { color: '#A6283F' } }, // 北京
    { name: '陕西', value: [108.953939, 34.266611], itemStyle: { color: '#00EEFF' } }, // 陕西
    { name: '广东', value: [113.266887, 23.133306], itemStyle: { color: '#00EEFF' } } // 广东
])
const linesData = ref([
    { coords: [[116.407387, 39.904179], [87.628579, 43.793301]] },// 北京->新疆
    { coords: [[116.407387, 39.904179], [104.076452, 30.651696]] },// 北京->四川
    { coords: [[116.407387, 39.904179], [113.753094, 34.767052]] },// 北京->河南
    { coords: [[116.407387, 39.904179], [112.578781, 37.813948]] },// 北京->山西
    { coords: [[116.407387, 39.904179], [119.296194, 26.101082]] },// 北京->福建
])

const  planePath =  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

onMounted(() => {
    echarts.registerMap('china', chinaJson as any)
    let myCharts = echarts.init(echartsRef.value)
    myCharts.setOption({
        geo: [{
            map: 'china',//地图国家
            roam: true,//是否开启鼠标缩放和平移漫游
            left: 20,
            right: 20,
            top: 10,
            label: {
                show: true,
                color: '#29fcff',
                fontStyle: 'oblique',
            },
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#264062' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#2d74bb' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                            borderColor: '#5089EC',
                            borderWidth: 1,
                            areaColor: {//地图区域的颜色
                                colorStops: [
                                    { //0%处的颜色
                                        offset: 0,
                                        color: 'rgba(0,102,154,0)'
                                    },
                                    { //100%处的颜色 
                                        offset: 1,
                                        color: 'rgba(0,102,154,0.4)'
                                    },
                                ]
                            }
            },
            emphasis: {
                label: {
                    color: '#fff',
                    fontSize: 16,
                },
                itemStyle: {
                    color: "#387be5",
                }
            }
        }],
        series: [
            {//散点系列数据
                type: 'effectScatter',//带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
                coordinateSystem: 'geo',//该系列使用的坐标系:地理坐标系
                effectType: 'ripple',//特效类型,目前只支持涟漪特效'ripple'，意为“涟漪”
                showEffectOn: 'render',//配置何时显示特效。可选'render'(绘制完成后显示特效)和'emphasis'(高亮的时候显示特效) 。
                rippleEffect: {//涟漪特效相关配置
                    period: 10,// 动画的周期，秒数。
                    scale: 4,// 动画中波纹的最大缩放比例。
                    brushType: 'stroke'// 波纹的绘制方式，可选 'stroke' 和 'fill'。
                },
                zlevel: 1,//所有图形的zlevel值
                data: points.value
            },
            {//线条系列数据
                type: 'lines',//路径图,用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
                symbol: ['none', 'arrow'],//线两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。标记的图形：箭头，symbol的值还有这些:'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin'，还可以引入图片
                symbolSize: 10,//标记的大小
                effect: {//线特效的配置
                    show: true,
                    period: 6,//特效动画的时间，单位s
                    trailLength: 0,//特效尾迹的长度。取值[0,1]值越大，尾迹越重
                    symbol: planePath,//特效图形的标记 可选'circle'等
                    symbolSize: 15//特效标记的大小
                },
                lineStyle: {//线条样式
                        color: '#93E8F8',
                        width: 1.5,// 线条宽度
                        opacity: 0.6,// 尾迹线条透明度
                        curveness: 0.2// 尾迹线条曲直度
                },
                data: linesData.value
            }
        ]
    })
})

</script>
<style scoped lang="scss"></style>