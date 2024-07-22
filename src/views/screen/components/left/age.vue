<template>
  <div class="sphere-container">
    <CardTitle title="年龄比例"></CardTitle>
    <div ref="sphereRef" :style="{ height: '100%', width: '100%' }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import CardTitle from "../CardTitle.vue"

const sphereRef = ref<any>(null)


const realNumber = ref<string>('666689人')
onMounted(() => {
  let myCharts = echarts.init(sphereRef.value)
  myCharts.setOption({
    tooltip: {
      trigger: 'item'
    },
    grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    containLabel: true
  },
    legend: {
      top: '25%',
      right: '10%',
      orient: 'vertical',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff'
        },
        emphasis: {
          label: {
            show: true,
          }
        },
        labelLine: {
          show: true
        },
        left: 0,
        data: [
          { value: 1048, name: '10-20岁' },
          { value: 735, name: '20-30岁' },
          { value: 580, name: '30-40岁' },
          { value: 484, name: '40-50岁' },
          { value: 300, name: '50-60岁' }
        ]
      }
    ]
  })
})

</script>
<style scoped lang="scss">
.sphere-container {
  background: url('@/views/screen/images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
}
</style>