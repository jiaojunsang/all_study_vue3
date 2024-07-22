<template>
  <div class="gender-container">
    <CardTitle title="性别比例"></CardTitle>
    <div class="icon-card-content">
      <div class="icon-card-content-left">
        <span>男士</span>
        <div class="gender-icon"></div>
      </div>
      <div class="icon-card-content-right">
        <span>女士</span>
        <div class="gender-icon"></div>
      </div>
    </div>
    <div class="data-title-container">
      <div class="data-title">男士52%</div>
      <div class="data-title">女士48%</div>
    </div>
    <div ref="echartsRef" :style="{ height: `50px`, width: '100%' }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts';
import CardTitle from "../CardTitle.vue"
const echartsRef = ref<any>(null)
onMounted(() => {
  let myCharts = echarts.init(echartsRef.value)
  myCharts.setOption({
    tooltip: {},
    xAxis: {
      // type: 'category',
      show: false,
      min: 0,
      max: 100,
    },
    yAxis:  [
        { type: 'category',show:false,},
        { type: 'category',show:false,inverse: true } // 第二个 y 轴，起点在右侧
    ],
    series: [
      {
        type: 'bar',
        barWidth:20,
        z:100,
        itemStyle:{
          borderRadius: 10,
        },
        data: [
          { value: 52, name: '男士' }
        ]
      },
      {
        type: 'bar',
        barWidth:20,
        barGap:'-100%',
        yAxisIndex: 0,
        itemStyle:{
          color:'pink',
          borderRadius: 10,
        },
        data: [
          { value: 100, name: '女士' }
        ]
      },
    ]
  })
})
</script>
<style scoped lang="scss">
.gender-container {
  background: url('@/views/screen/images/dataScreen-main-lc.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;

  .icon-card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    &-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 111px;
      height: 116px;
      background: url('@/views/screen/images/man-bg.png') no-repeat;
      background-size: 100% 100%;

      .gender-icon {
        width: 61px;
        height: 61px;
        margin-top: 20px;
        background: url('@/views/screen/images/man.png') no-repeat;
        background-size: 100% 100%;
      }
    }

    &-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 111px;
      height: 116px;
      margin-left: 50px;
      background: url('@/views/screen/images/woman-bg.png') no-repeat;
      background-size: 100% 100%;

      .gender-icon {
        width: 60px;
        height: 64px;
        margin-top: 20px;
        background: url('@/views/screen/images/woman.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .data-title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
  }
}
</style>