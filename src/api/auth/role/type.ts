

// 接口返回的公共参数
interface responsePublicData {
    code: number;
    message: string,
    ok: boolean;
}


// 角色列表返回接口数据
export interface roleList_type extends responsePublicData {
    data: {
        records: roleListItem_type[],
        "total": number,
        "size": number,
        "current": number,
        "orders"?: [],
        "optimizeCountSql": boolean,
        "hitCount": boolean,
        "countId": null,
        "maxLimit": null,
        "searchCount": boolean,
        "pages": number,
        
    };
}
// 角色列表返回数据item
export interface roleListItem_type {
    "id"?: string | number,
    "createTime"?: string,
    "updateTime"?: string,
    "roleName"?: string,
    "remark"?: null
}

// 根据角色ID获取的菜单列表接口返回数据
export interface roleMenuList_type extends responsePublicData {
    data: roleMenuListItem_type[];
}

// 用户角色item
export interface roleMenuListItem_type {
    "id"?: string | number,
    "createTime"?: string,
    "updateTime"?: string,
    "pid"?: string | number,
    "name"?: string,
    "code"?: string,
    "toCode"?: string
    "type"?: number,
    "status"?: null,
    "level"?: number,
    "children"?: roleMenuListItem_type[],
    "select"?: boolean
}

// 用户分配菜单携带的参数
export interface roleMenuRuqParams_type {
    "permissionIdList"?: number[],
    "roleId"?: string | number
 }
