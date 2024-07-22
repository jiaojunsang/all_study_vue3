<template>
  <div class="screen-container">
    <div class="box" ref="screenRef">
      <div class="header">
        <Header></Header>
      </div>
      <div class="content">
        <div class="content-left">
          <SiderLeft></SiderLeft>
        </div>
        <div class="content-center">
          <div class="map">
            <Map></Map>
          </div>
          <div class="trend">
            <Trend></Trend>
          </div>
        </div>
        <div class="content-right">
          <SiderRight></SiderRight>
        </div>
      </div>
    </div>
    <!-- <video class="fullscreenVideo" id="bgVid" playsinline="" autoplay="" muted="" loop="">
      <source src="../../assets/images/data-bg-video.mp4" type="video/mp4">
    </video> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import Header from "./components/header.vue"
import SiderLeft from "./components/left/index.vue"
import SiderRight from "./components/right/index.vue"
import Map from "./components/center/map.vue"
import Trend from "./components/center/trend.vue"
const screenRef = ref<any>(null)
onMounted(() => {
  // const box: any = document.querySelector('.box')
  // console.log(box, 'box');
  screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`

})

// 窗口大小改变时重新计算缩放比例
window.onresize = () => {
  screenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
// 计算缩放比列
function getScale(width: number = 1920, height: number = 1080) {
  // 窗口宽度除设计稿宽度计算原始比例
  let originalW = window.innerWidth / width//初始宽度比
  let originalH = window.innerHeight / height//初始宽高度比
  return originalW < originalH ? originalW : originalH//如果横向窗口变化幅度小于高度则以横向为准（宽跟高谁变化小就以谁为准）
}


</script>
<style scoped lang="scss">
.screen-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -100;
  // background: url('@/assets/images/data-bg.png') no-repeat;
  background: url('@/views/screen/images/bg.png') no-repeat;
  background-size: cover;

  // :before {
  //   content: "";
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   display: block;
  //   z-index: -1;
  //   top: 0;
  //   left: 0;
  //   background: rgba(25, 29, 34, .65);
  // }

  // .fullscreenvideo {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   min-width: 100%;
  //   min-height: 100%;
  //   width: auto;
  //   height: auto;
  //   z-index: -100;
  //   -webkit-transform: translateX(-50%) translateY(-50%);
  //   transform: translateX(-50%) translateY(-50%);
  //   -webkit-transition: 1s opacity;
  //   transition: 1s opacity;
  // }
  .box {
    width: 1920px;
    height: 1080px;
    transform-origin: top left; //设置坐标系原点为左上角
    position: fixed;
    top: 50%;
    left: 50%;


    // transform: translateX(-50%) translateY(-50%);
    .header {
      width: 100%;
      height: 70px;

    }

    .content {
      width: 100%;
      height: calc(100% - 70px);
      display: flex;
      justify-content: space-between;

      &-left {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      &-center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
          width: 100%;
        }

        .trend {
          flex: 1;
          width: 100%;
        }
      }

      &-right {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>