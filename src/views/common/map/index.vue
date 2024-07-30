<template>
  <div ref="containerRef" id="container" class="container-map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted,onUnmounted} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import {getPosition} from "@/utils/index"

const containerRef = ref(null)

let map:any = null;
let marker:any = null
 
onMounted(() => {
     let longitude:number, latitude:number
    //  获取定位
    getPosition().then((res:any)=>{
        console.log(res.longitude);
         longitude = res.longitude
         latitude = res.latitude
    })
    window._AMapSecurityConfig = {
        securityJsCode :'e481caa600cf3b3d9b5442c9577b5d09'
    }
  AMapLoader.load({
    key: "568cd9b29b0aca844b8934ea56ba9cc9", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        // center:[longitude, latitude], // 初始化地图中心点位置
        mapStyle: "amap://styles/normal",//设置地图的显示样式可选样式有normal、grey、whitesmoke、dark、light、graffiti，切换字符串最后单词即可
      });
    //   标记
      marker = new AMap.Marker({
          icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          position: [longitude, latitude],
        //   offset: new AMap.Pixel(20, -30)
        });
        marker.setMap(map)
    })
    .catch((e) => {
      console.log(e);
    });
});
 
onUnmounted(() => {
  map?.destroy();
});
</script>
<style scoped lang="scss">
.container-map{
    width: 100%;
    height: 100%;
}
</style>