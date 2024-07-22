<script setup lang="ts">
import { } from 'vue'

defineOptions({
    name:"SvgName"
})

defineProps({
    prefix:{
        type:String,
        default:'#icon-'
    },
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        default:''
    },
    width:{
        type:String,
        default:'15px'
    },
    height:{
        type:String,
        default:'15px'
    }
})

</script>
<template>
   <svg :style="{width,height}">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped lang="scss">
</style>