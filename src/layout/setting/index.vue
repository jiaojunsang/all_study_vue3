<template>
    <el-button :icon="Refresh" circle @click="refreshFn" />
    <el-button :icon="FullScreen" circle @click="FullScreenFn" />
    <el-button :icon="Setting" circle @click="handleSetting" />
    <el-avatar :size="40" :src="Avatar" class="ml15" />
    <el-dropdown @command="dropdownItemClcik">
        <span class="ml10">
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
            <span>{{ UserStore.username }}</span>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                <el-dropdown-item command="set">系统设置</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <el-drawer v-model="settingDrawer" title="设置" :before-close="handleClose" append-to-body>
        <!-- Your setting content here -->
        <el-form label-width="80px" :model="formData" >
            <el-form-item label="主题色">
                <el-color-picker v-model="formData.themeColor" :predefine="predefineColors" @change="colorChange" />
            </el-form-item>
            <el-form-item label="dark模式">
                <el-switch v-model="formData.darkTheme" class="ml-2" @change="darkChange" />
            </el-form-item>
        </el-form>
        <!-- <template  class="dialog-footer">
      <el-button @click="settingDrawer = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保 存</el-button>
      </template> -->
    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus"
import logo from '@/assets/logo/logo.png'
import useLayoutSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRouter } from 'vue-router'
import Avatar from "@/assets/images/avatar.gif"

const LayoutSettingStore = useLayoutSettingStore();
const UserStore = useUserStore();

const $router = useRouter();
// 设置drawer
const settingDrawer = ref<boolean>(false)
const formData = ref<any>({
    themeColor: '',
    darkTheme:false,
})
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// const avatar = ref(logo)
const refreshFn = () => {
    LayoutSettingStore.refreshChange();
}
const FullScreenFn = () => {

    let full = document.fullscreenElement//用以判断当前是否为全屏
    // 不是全屏的时候full值为null
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
const dropdownItemClcik = (value: string) => {

    if (value == 'logout') {
        logout();
    }

}
const handleSetting = () => {
    settingDrawer.value = true
}
const handleClose = (done: any) => {
    done(false)
}
const colorChange = (value:string)=>{
    console.log(value);
    let baseDom = document.documentElement
    baseDom.style.setProperty('--el-color-primary', value)
    
}
const darkChange = (value:boolean)=>{
    let baseHtml = document.documentElement//根节点
    if (value) {
        baseHtml.classList.add('dark');//根节点添加类名
    } else {
        baseHtml.classList.remove('dark')//移除根节点类名
    }
}
const logout = () => {
    UserStore.userLogout().then(() => {
        ElMessage.success('退出登录成功')
        $router.push({ path: '/login' })
    }, err => {
        ElMessage.error(err)
    })
}

</script>
<style scoped lang="scss"></style>