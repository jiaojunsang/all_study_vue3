// 登录接口请求数据
export interface loginForm {
    username: string;
    password: string;
}

interface dataType {
    token?: string,
    message?:string
}

// 登录接口返回数据
export interface loginResponseData {
    code?: number;
    data: dataType;
}

interface userData {
    userId: number,
    userName: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[], // 按钮权限标识
    routes: string[], // 路由权限标识
    token: string,
    avatar:string,
}
interface userInfoType {
    checkUser: userData
}
// 服务器返回用户信息数据类型
export interface responseUserInfo {
    code: number;
    data: userInfoType;
}