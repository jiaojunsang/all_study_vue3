import request from "@/utils/request.ts"
import type {loginForm,loginResponseData,responseUserInfo} from './type'

// 枚举
enum API {
    LOGIN_URL = '/api/user/login',
    USER_INFO_URL = '/api/user/info'
}

// interface loginReqData {
//     userName: string;
//     password: string;
// }
// interface loginResData {
//     code: number,
//     data: dataType
// }
// interface dataType {
//     token: string
// }

// reqLogin
export const loginApi = (data: loginForm) => {
    return request({
        url: API.LOGIN_URL,
        method: 'post',
        data
    })
}
// 登录接口
export const reqLogin = (data: loginForm) => request.post<any,loginResponseData>(API.LOGIN_URL,data);
// 获取用户信息接口
export const reqUserInfo = () => request.get<any,responseUserInfo>(API.USER_INFO_URL);