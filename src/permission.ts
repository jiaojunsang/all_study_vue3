// 路由鉴权
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user';
import pinia from '@/store'
import { ElMessage } from "element-plus"
import settings from './settings.ts'

const UserStore = useUserStore(pinia);//在组件以外的地方使用pinia小仓库需要先引入pinia再传入

NProgress.configure({ showSpinner: false });

// 前置守卫
router.beforeEach((to, from, next) => {
    
    NProgress.start()
    const token = UserStore.token//因为仓库的token是跟缓存的同步的所以刷新后依然会存在
    const username = UserStore.username
    if (token) {
        // 已登录
        if (to.path == '/login') {
            next({ path: '/layout' })//已登录不能访问登录页
        } else {
            if (!username) {
                // 不存在用用户信息，则发请求获取用户信息
                UserStore.userInfo().then(() => {
                    next();
                }, () => {
                    // 获取用户信息失败（token过期或者用户修改了token）
                    // 退出登录
                    UserStore.userLogout().then(() => {
                        next({ path: '/login' });
                    },()=>{
                        // 退出登录失败
                        next({ path: '/layout' });
                    })
                })
            } else {
                next();
            }

        }
    } else {
        // 未登录
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login' })//未登录访问的不是login页面则跳转到登录页
        }
    }
})

router.afterEach((to, from) => {
    document.title = `${settings.title}-${to.meta.title}`
    NProgress.done()
})