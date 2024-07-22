

// 接口返回的公共参数
interface responsePublicData {
    code: number;
    message: string,
    ok: boolean;
}

//菜单接口返回
export interface resMenuList_type extends responsePublicData {
    data: menuListItem_type[];
}


// 菜单list
export interface menuListItem_type {
    "id"?: string | number,
    "createTime"?: string,
    "updateTime"?: string,
    "pid"?: string | number,
    "name": string,
    "code": string,
    "toCode"?: string
    "type"?: number,
    "status"?: null,
    "level"?: number,
    "children"?: menuListItem_type[],
    "select"?: boolean
}

// 用户分配菜单携带的参数
export interface menuRuqParams_type {
    "id"?: string | number,
    level?: number,
    "name": string,
    "code": string,
    pid?:string | number
 }
