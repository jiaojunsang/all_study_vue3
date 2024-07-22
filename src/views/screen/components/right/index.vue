<template>
        <Ranking class="sphere"></Ranking>
        <Contrast class="gender mt20"></Contrast>
        <Channel class="age mt20"></Channel>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, toRefs, onMounted} from 'vue'
  import Ranking from './ranking.vue'
  import Contrast from './contrast.vue'
  import Channel from './channel.vue'
  
  </script>
  <style scoped lang="scss">
  .sphere{
    flex: 1.2;
  }
  .gender{
    flex: 1;
  }
  .age{
    flex: 1;
  }
  </style>