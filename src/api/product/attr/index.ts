import request from "@/utils/request.ts"
import type  {cateResponseData,attrListResponseType,attrListItemResponseType} from './type.ts'


// 枚举
enum API {
    ATTR_CATE_LEVEL_ONE = `/admin/product/getCategory1`,
    ATTR_CATE_LEVEL_TWO = `/admin/product/getCategory2/`,
    ATTR_CATE_LEVEL_THREE = `/admin/product/getCategory3/`,
    ATTR_LIST_API = `/admin/product/attrInfoList/`,
    ATTR_ADD_EDIT_API = `/admin/product/saveAttrInfo`,
    ATTR_DELETE_API = `/admin/product/deleteAttr/`,
}

// 一级
export const oneLevelCateApi = () => request.get<any,cateResponseData>(API.ATTR_CATE_LEVEL_ONE);
// 二级
export const twoLevelCateApi = (id:string | number) => request.get<any,cateResponseData>(API.ATTR_CATE_LEVEL_TWO+`${id}`);
// 三级
export const threeLevelCateApi = (id:string | number) => request.get<any,cateResponseData>(API.ATTR_CATE_LEVEL_THREE+`${id}`);

// 属性列表接口
export const reqAttrListApi = (category1Id:number|string,category2Id:number|string,category3Id:number|string) => request.get<any,attrListResponseType>(API.ATTR_LIST_API+`${category1Id}/${category2Id}/${category3Id}`);
// 新增或修改属性
export const addOperationApi = (data:attrListItemResponseType) => request.post<any,any>(API.ATTR_ADD_EDIT_API,data);

// 删除属性
export const deleteAttrApi = (id:number|string) => request.delete<any,any>(API.ATTR_DELETE_API+id);