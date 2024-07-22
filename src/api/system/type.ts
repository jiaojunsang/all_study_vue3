// 登录接口请求数据
export interface loginForm {
    username: string;
    password: string;
}

// 接口返回的公共参数
interface responsePublicData {
    code: number;
    message: string,
    ok: boolean;
}

// 登录接口返回数据
export interface loginResponseData extends responsePublicData {
    data: string;
}
// 服务器返回用户信息数据类型
export interface responseUserInfo extends responsePublicData {
    data: userInfoType;
}
interface userInfoType {
    avatar: string,
    buttons: string[],
    name: string,
    roles: string[],
    routes: string[],
}

// 退出登录返回数据类型
export interface responseLogout extends responsePublicData {
    data: any;
}
// 用户列表返回接口数据
export interface userList_type extends responsePublicData {
    data: {
        records: userListItem_type[],
        "total": number,
        "size": number,
        "current": number,
        "orders"?: [],
        "optimizeCountSql": boolean,
        "hitCount": boolean,
        "countId": null,
        "maxLimit": null,
        "searchCount": boolean,
        "pages": number
    };
}
// 用户列表返回数据item
export interface userListItem_type {
    "id"?: string | number,
    "createTime": string,
    "updateTime": string,
    "username": string,
    "password": string,
    "name": string,
    "phone": string | number,
    "roleName": string
}
