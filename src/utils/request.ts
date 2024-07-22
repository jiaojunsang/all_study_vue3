import axios from 'axios';
import { ElMessage } from "element-plus"
import useUserStore from "@/store/modules/user.ts"

const request = axios.create({
    // baseURL: import.meta.env.VITE_APP_BASE_API,
    baseURL: 'https://sph-api.atguigu.cn',
    timeout: 5000,
})
// console.log(import.meta.env.VITE_APP_BASE_API,'import.meta.env.VITE_APP_BASE_API');

request.interceptors.request.use(config => {
    
    let UserStore = useUserStore();
    if(UserStore.token){
        config.headers.token = UserStore.token;
    }
    return config;
})

request.interceptors.response.use(res => {
    return res.data
}, err => {
    // 失败
    const code = Number(err.response.status)
    switch (code) {
        case 401:
            ElMessage({ type: 'error', message: 'token过期啦' })
            break;
        case 403:
            ElMessage({ type: 'error', message: '无权访问' })
            break;
        case 404:
            ElMessage({ type: 'error', message: '请求地址错误' })
            break;
        case 500:
            ElMessage({ type: 'error', message: '服务器崩溃啦' })
            break;
        default:
            ElMessage({ type: 'error', message: '网络错误' })
            break;
    }

    return Promise.reject(err)
})

export default request;