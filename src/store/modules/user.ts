import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from "@/api/system"
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoutes } from '@/router/routes.ts'
// import type { loginForm, loginResponseData, responseUserInfo } from '@/api/data/type.ts'
import type { loginForm, loginResponseData, responseUserInfo,responseLogout } from '@/api/system/type.ts'
import type { userState } from './type.ts'

const useUserStore = defineStore('User', {
    state: (): userState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoutes,//左侧菜单
            username: '',
            avatar: '',
        }
    },
    actions: {
        // 登录
        async userLogin(userData: loginForm) {
            const res: loginResponseData = await reqLogin(userData)
            if (res.code == 200) {
                // as表示类型断言，此处表示强制将类型转换为string，可以使用尖括号（<string>）语法或者as string语法进行类型断言
                this.token = (res.data as string)
                SET_TOKEN((res.data as string))
                // localStorage.setItem('token', (res.data.token as string))
                return Promise.resolve('登录成功')
            } else {
                const err = new Error(res.data)
                return Promise.reject(err)
            }
        },
        // 获取用户信息
        userInfo() {
            return reqUserInfo().then((res:responseUserInfo) => {
                if (res.code == 200) {
                    this.username = res.data.name
                    this.avatar = res.data.avatar
                    this.buttons = res.data.buttons
                    this.roles = res.data.roles
                    this.routes = res.data.routes
                    return 'ok'
                } else {
                    return Promise.reject(new Error(res.message));
                }

            })
        },
        userLogout() {
            console.log('woieowie');
            this.token = ''
            this.username = ''
            this.avatar = ''
            REMOVE_TOKEN()
            return reqLogout().then((res:responseLogout) => {
                if (res.code == 200) {
                    return Promise.resolve('退出成功')
                } else {
                    return Promise.reject(new Error(res.message))
                }
            })

        }
    }
})

export default useUserStore