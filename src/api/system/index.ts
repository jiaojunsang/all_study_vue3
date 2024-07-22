import request from "@/utils/request.ts"
import type  {loginForm,loginResponseData,responseUserInfo,responseLogout,userList_type} from './type.ts'


// 枚举
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USER_INFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
    USER_LIST_URL = '/admin/acl/user/',
}

// 登录接口
export const reqLogin = (data: loginForm) => request.post<any,loginResponseData>(API.LOGIN_URL,data);
// 获取用户信息接口
export const reqUserInfo = () => request.get<any,responseUserInfo>(API.USER_INFO_URL);
// 退出登录
export const reqLogout = () => request.post<any,responseLogout>(API.LOGOUT_URL);

// 用户列表
export const userListApi =(page:number,limit:number) => request.get<any,userList_type>(API.USER_LIST_URL+`${page}/${limit}`);