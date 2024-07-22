<template>
  <div class="container">
    <el-card class="info-card">
      <el-avatar
      :size="100"
        :src="Avatar"
      />
      <div class="info">
        <h1>{{ UserStore.username }}</h1>
        <p>{{ getTime()+'好'}}</p>
      </div>
    </el-card>
    <!-- <div style="width: 100px;height: 100px;background-color: yellow;padding: 30px;box-sizing: border-box;">
      <div style="width: 100%;height: 100%;background-color: red;"></div>
    </div> -->
    <NumberAnimation :numm="2323" :numLen="9" :noneDivide="true"></NumberAnimation>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted} from 'vue'
import useUserStore from "@/store/modules/user.ts"
import {getTime} from "@/utils/time.ts"
import Avatar from "@/assets/images/avatar.gif"
import NumberAnimation from "@/components/NumberAnimation/index.vue"
const UserStore = useUserStore()
onMounted(()=>{
  console.log('123'.substr(0,3));
  
})
</script>
<style scoped lang="scss">
.container{
  // position: absolute;
  // z-index: -1 !important;
  // width: 100%;
  // box-sizing: border-box;
}
.info-card{
  :deep(.el-card__body){
    display: flex;
    align-items: center;
  }
  .info{
    margin: 0 50px;
  }
}
</style>