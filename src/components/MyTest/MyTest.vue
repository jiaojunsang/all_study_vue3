<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
// 测试代码：测试假的接口能否使用
import {loginApi} from "@/api/data/data.ts"

// import SvgIcon from "@/components/SvgIcon/index.vue"
loginApi({userName: "admin",password: "123123"}).then(res=>{
console.log('请求成功')
})
</script>
<template>
  <div class="container">测试组件
    <div class="header">header</div>
  </div>
  <svg>
    <use xlink:href="#icon-vue" fill="skyblue"></use>
  </svg>
  <SvgIcon name="full"></SvgIcon>
</template>

<style scoped lang="scss">
.container{
  .header{
    color: $color;
  }
}
</style>@/api/data/data