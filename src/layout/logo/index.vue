<template>
  <div class="container-box">
    <el-avatar class="image-box" shape="circle" :size="40"  :src="LOGO" />
    <span class="title-box" v-if="LayoutSettingStore.isExpand">{{ settings.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import setting from '@/settings.ts'
import useLayoutSettingStore from '@/store/modules/setting.ts'
import LOGO from "@/assets/logo/logo.jpg"

const LayoutSettingStore = useLayoutSettingStore();

const settings = ref(setting)

</script>
<style scoped lang="scss">
.container-box{
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    .image-box{
      // width: 40px;
      // height: 40px;
      margin: 0px 10px;
    }
    .title-box{
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
    }
}
</style>