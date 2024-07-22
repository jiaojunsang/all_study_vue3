<template>
    <div class="number-digital">
        <div class="box-item">
            <li :class="{ 'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
                :style="{ marginRight: needDivideMgright(index) }" v-for="(item, index) in orderNum" :key="index">
                <span v-if="!isNaN(item)">
                    <i :id="`numberItem${index}`">0123456789</I>
                </span>
                <div v-if="needDivideDot(index)" class="num-dot">,</div>
            </li>
        </div>
    </div>
</template>
   
<script lang="ts" setup>
import { ref, reactive, toRefs,watch, onMounted ,onBeforeUnmount} from 'vue'
const props = defineProps<{
    numm: number | string
    numLen: number
    noneDivide?: boolean // 默认需要超过7位数字以上以,分隔
}>()
function needDivideDot(index: number): boolean {
    if (props.noneDivide) { //不需要分隔符
        return false
    }
    if (props.numLen <= 7) {
        return false
    }
    return index === props.numLen - 8 || index === props.numLen - 5
}
function needDivideMgright(index: number): string {
    if (props.noneDivide) { //不需要分隔符
        return '2px'
    }
    if (props.numLen <= 7) {
        return '2px'
    }
    return (index === props.numLen - 7 || index === props.numLen - 4) ? '14px' : '2px'
}

const orderNum = ref<Array<number>>([]);
// 处理数字
// numm: 传入的数字  numLen: 默认显示几位数
const toOrderNum = (num: string | number) => {
    num = num.toString();
    if (num.length < props.numLen) {
        num = '0' + num // 如未满定义的位数，添加"0"补位
        toOrderNum(num) // 递归添加"0"补位
    } else if (num.length === props.numLen) {
        orderNum.value = num.split('') as unknown as number[] // 将其便变成数据，渲染至滚动数组
    }

}
watch(() => props.numm, (newVal: any) => {
    toOrderNum(newVal)
    setNumberTransform()
})
function setNumberTransform() {
    for (let index = 0; index < orderNum.value.length; index++) {
        const ele: HTMLDivElement = document.getElementById(`numberItem${index}`) as HTMLDivElement
        if (ele) {
            ele.style.transform = `translate(-50%, -${orderNum.value[index] as number * 10}%)`
        }
    }
}
toOrderNum(props.numm)
onMounted(() => {
    setTimeout(() => {
        setNumberTransform()
    }, 200)
})

</script>
<style lang='scss' scoped>
.number-digital {
    margin-right: 8px;

    .box-item {
        position: relative;
        font-size: 54px;
        line-height: 41px;
        text-align: center;
        list-style: none;
        color: #2D7CFF;
        writing-mode: vertical-lr;
        text-orientation: upright;
        /*文字禁止编辑*/
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    /*滚动数字设置*/
    .number-item {
        width: 50px;
        height: 56px;
        color: #fff;
        font-size: 40px;
        font-family: MiSans, MiSans-Demibold;
        font-weight: 800;
        list-style: none;
        margin-right: 3px;
        background: rgba(3, 21, 42, 0.50);
        border: 1px solid #4d9ef8;
        box-shadow: 0px 0px 3px 0px #01072E;

        &>span {
            position: relative;
            display: inline-block;
            margin-right: 10px;
            width: 100%;
            height: 100%;
            writing-mode: vertical-rl;
            text-orientation: upright;
            overflow: hidden;

            &>I {
                font-style: normal;
                position: absolute;
                top: 8px;
                left: 50%;
                transform: translate(-50%, 0);
                transition: transform 1s ease-in-out;
                letter-spacing: 10px;
            }
        }
    }

    .number-item:last-child {
        margin-right: 0;
    }

    .num-dot {
        display: inline-block;
        margin-left: 8px;
        height: 53px;
        font-size: 47px;
        font-family: MiSans, MiSans-Demibold;
        font-weight: normal;
        text-align: CENTER;
        color: #ffffff;
        line-height: 47px;
    }

}
</style>
  