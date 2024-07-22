import request from "@/utils/request.ts"
import type  {userList_type,userListItem_type,userRoleList_type,userRoleRuqParams_type} from './type.ts'


// 枚举
enum API {
    USER_LIST_URL = '/admin/acl/user/',
    USER_ADD_URL = '/admin/acl/user/save',
    USER_EDIT_URL = '/admin/acl/user/update',
    USER_DELETE_URL = '/admin/acl/user/remove/',
    USER_BATCH_DELETE_URL = '/admin/acl/user/batchRemove',
    USER_ROLE_LIST_URL = '/admin/acl/user/toAssign/',
    USER_ROLE_SHARE_URL = '/admin/acl/user/doAssignRole',
}


// 用户列表
export const userListApi =(page:number,limit:number,params:any) => request.get<any,userList_type>(API.USER_LIST_URL+`${page}/${limit}`,{params});
// 用户新增
export const userAddApi =(data:userListItem_type) => request.post<any,any>(API.USER_ADD_URL,data);
// 用户修改
export const userEditApi =(data:userListItem_type) => request.put<any,any>(API.USER_EDIT_URL,data);
// 用户删除
export const userDeleteApi =(id:number|string) => request.delete<any,any>(API.USER_DELETE_URL+`${id}`);
// 用户批量删除
export const userBatchDeleteApi =(ids:number[] |string[]) => request.delete<any,any>(API.USER_BATCH_DELETE_URL,{data:ids});
//获取用户的角色
export const userRoleListApi =(id:number|string) => request.get<any,userRoleList_type>(API.USER_ROLE_LIST_URL+`${id}`);
// 根据用户分配角色
export const userShareRoleApi =(data:userRoleRuqParams_type) => request.post<any,any>(API.USER_ROLE_SHARE_URL,data);