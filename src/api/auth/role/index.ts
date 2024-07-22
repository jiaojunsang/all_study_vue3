import request from "@/utils/request.ts"
import type  {roleList_type,roleListItem_type,roleMenuList_type,roleMenuRuqParams_type} from './type.ts'


// 枚举
enum API {
    ROLE_LIST_URL = '/admin/acl/role/',
    ROLE_ADD_URL = '/admin/acl/role/save',
    ROLE_EDIT_URL = '/admin/acl/role/update',
    ROLE_DELETE_URL = '/admin/acl/role/remove/',
    // ROLE_BATCH_DELETE_URL = '/admin/acl/role/batchRemove',
    ROLE_MENU_LIST_URL = '/admin/acl/permission/toAssign/',
    ROLE_MENU_SHARE_URL = '/admin/acl/permission/doAssign',
}


// 角色列表
export const roleListApi =(page:number,limit:number,params:any) => request.get<any,roleList_type>(API.ROLE_LIST_URL+`${page}/${limit}`,{params});
// 角色新增
export const roleAddApi =(data:roleListItem_type) => request.post<any,any>(API.ROLE_ADD_URL,data);
// 角色修改
export const roleEditApi =(data:roleListItem_type) => request.put<any,any>(API.ROLE_EDIT_URL,data);
// 角色删除
export const roleDeleteApi =(id:number|string) => request.delete<any,any>(API.ROLE_DELETE_URL+`${id}`);
//获取角色的菜单
export const roleMenuListApi =(id:number|string) => request.get<any,roleMenuList_type>(API.ROLE_MENU_LIST_URL+`${id}`);
// 根据角色分配菜单
export const roleShareMenuApi =(data:roleMenuRuqParams_type) => request.post<any,any>(API.ROLE_MENU_SHARE_URL+`?roleId=${data.roleId}&permissionId=${data.permissionIdList}`,);