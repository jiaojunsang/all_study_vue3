import request from "@/utils/request.ts"
import type  {resMenuList_type,menuListItem_type,menuRuqParams_type} from './type.ts'


// 枚举
enum API {
    MENU_LIST_URL = '/admin/acl/permission',
    MENU_ADD_URL = '/admin/acl/permission/save',
    MENU_EDIT_URL = '/admin/acl/permission/update',
    MENU_DELETE_URL = '/admin/acl/permission/remove/',
}


// 角色列表
export const menuListApi =() => request.get<any,resMenuList_type>(API.MENU_LIST_URL);
// 角色新增
export const menuAddApi =(data:menuRuqParams_type) => request.post<any,any>(API.MENU_ADD_URL,data);
// 角色修改
export const menuEditApi =(data:menuRuqParams_type) => request.put<any,any>(API.MENU_EDIT_URL,data);
// 角色删除
export const menuDeleteApi =(id:number|string) => request.delete<any,any>(API.MENU_DELETE_URL+`${id}`);
