<template>
  <div class="login-container">
    <Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />
    <el-card class="login-card-left card-content">
      <div class="title">
        <div class="content">
          <h1>welcome</h1>
          <h1>*****</h1>
        </div>
      </div>
      <div class="remark">2023-∞ v1.0.0 cz出品</div>
    </el-card>
    <el-card class="login-card-right card-content">
      <el-form :model="formData" :rules="formRules" ref="formRef" :label-width="0" class="form-container">
        <el-form-item label="">
          <h1>欢迎来到我的个人项目</h1>
        </el-form-item>
        <el-form-item label="" prop="username">
          <el-input v-model="formData.username" :prefix-icon="User" />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="formData.password" :prefix-icon="Lock" type="password" show-password />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" class="login-btn" :loading="loginLoading" @click="loginFn">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from "@/store/modules/user.ts"
import { getTime } from '@/utils/time'
import type { loginForm } from "@/api/data/type.ts"
import config from "./config.js";
import { loadFull } from "tsparticles"


const userStore = useUserStore();
const $router = useRouter()
const formRef = ref();
const formData: loginForm = reactive({
  username: 'admin',
  password: '111111'
})
const validateUserName = (rule: any, value: any, callback: any) => {
  // rule：校验规则对象
  // value:表单绑定的值
  // callback：回调函数
  if (!value) {
    callback(new Error('名称不能为空'))
  } else {
    callback()
  }
}
const formRules = {
  // trigger：表示触发时机
  // blur：表示失去焦点
  // change：表示表单绑定的v-model值发生变化时触发
  username: [
    // { required: true, message: '名称不能为空', trigger: 'blur' },
    { validator: validateUserName, trigger: 'change' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度在6-12之间', trigger: 'change' },
  ]
}

const options = reactive(config.particles);
// 粒子效果
const particlesInit = async (engine: any) => {
  await loadFull(engine)
}


const loginLoading = ref(false);
function loginFn() {
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      loginLoading.value = true;
      try {
        const res = await userStore.userLogin(formData)
        loginLoading.value = false;
        $router.push('/layout')
        ElNotification({
          type: 'success',
          message: '登录成功',
          title: 'Hi,' + getTime() + '好'
        })
        // ElMessage({
        //   type: 'success',
        //   message:'登录成功'
        // })

      } catch (error) {
        loginLoading.value = false;
        ElMessage({
          type: 'error',
          message: (error as Error).message
        })
      }
    } else {
      ElMessage({
        type: 'error',
        message: '请填写正确信息'
      })
    }
  })


}
</script>
<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover; //此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。
  position: relative;

  .login-card-left {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-100%, -60%);
    background-color: rgba(255, 255, 255, 0.2);
    text-align: center;
    color: #fff;

    .title {
      height: 350px;
      display: flex;
      align-items: center;
      justify-content: center;

      .welcome {
        // font-size: 25px;
      }

      .name {
        // font-size: 25px;
      }
    }

    .remark {
      height: 100px;
      line-height: 100px;
    }
  }

  .login-card-right {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(0%, -60%);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    .form-container {
      h1 {
        // color: #fff;
      }

      .login-btn {
        width: 100%
      }
    }

    :deep(.el-input) {
      margin-top: 15px;

      .el-input__wrapper {
        background: transparent;
        border: none;
        border-bottom: 1px solid rgb(191, 191, 191);
        border-radius: 0;
        caret-color: #a7a7a7; //光标颜色
        color: #343434 !important;
        // 以下这一坨是为了防止浏览器记住密码自动填充之后导致样式改变
        box-shadow: 0 0 0px 1000px #c7c6c6 inset !important;
        // -webkit-text-fill-color: #333333 !important; //这个鬼样式有问题
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s;
      }

      .el-input__inner::placeholder {
        color: #bbbbbb;
      }

    }

    //   // 错误提示文本颜色
    //   :deep(.el-form-item__error) {
    //     color: skyblue;
    //   }
    //   // 错误提示边框颜色
    //   :deep(.el-form-item.is-error .el-input__inner) {
    //     border-color: skyblue !important;
    //   }
    .code-img {
      height: 47px;
      width: 100%;
      cursor: pointer;
    }
  }

  .card-content {
    width: 450px;
    height: 450px;
  }

  :deep(.el-card) {
    border-radius: 0px;
    border: none;
  }
}
</style>