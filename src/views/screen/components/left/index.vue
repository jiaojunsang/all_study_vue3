<template>
        <Sphere class="sphere"></Sphere>
        <Gender class="gender mt20"></Gender>
        <Age class="age mt20"></Age>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, toRefs, onMounted} from 'vue'
  import Sphere from './sphere.vue'
  import Gender from './gender.vue'
  import Age from './age.vue'
  
  </script>
  <style scoped lang="scss">
  .sphere{
    flex: 1.5;
  }
  .gender{
    flex: 1;
  }
  .age{
    flex: 1;
  }
  </style>