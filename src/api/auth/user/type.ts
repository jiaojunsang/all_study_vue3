

// 接口返回的公共参数
interface responsePublicData {
    code: number;
    message: string,
    ok: boolean;
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
    "createTime"?: string,
    "updateTime"?: string,
    "username"?: string,
    "password"?: string,
    "name"?: string,
    "phone"?: string | number,
    "roleName"?: string
}

// 根据用户ID获取的角色列表接口返回数据
export interface userRoleList_type extends responsePublicData {
    data: {
        assignRoles: userRoleListItem_type[],
        allRolesList: userRoleListItem_type[],
    };
}

// 用户角色item
export interface userRoleListItem_type {
   "id"?: string | number,
    "createTime"?: string,
    "updateTime"?: string,
    "roleName": string,
    "remark": null
}

// 用户分配角色携带的参数
export interface userRoleRuqParams_type {
    "roleIdList"?: number[],
    "userId"?: string | number
 }
