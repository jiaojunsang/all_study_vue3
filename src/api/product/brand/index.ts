import request from "@/utils/request.ts"
import type  {brandResponseData,brand} from './type.ts'


// 枚举
enum API {
    BRAND_URL = `/admin/product/baseTrademark/`,
    ADD_BRAND_URL = '/admin/product/baseTrademark/save',
    EDIT_BRAND_URL = '/admin/product/baseTrademark/update',
    DELETE_BRAND_URL = '/admin/product/baseTrademark/remove/',
}

// 品牌列表接口
export const reqBrandList = (page:number,limit:number) => request.get<any,brandResponseData>(API.BRAND_URL+`${page}/${limit}`);
// 新增品牌
export const addBrandApi = (data:brand) => request.post<any,brandResponseData>(API.ADD_BRAND_URL,data);
// 修改品牌
export const editBrandApi = (data:brand) => request.put<any,any>(API.EDIT_BRAND_URL,data);
// 删除品牌
export const deleteBrandApi = (id:string | number) => request.delete<any,any>(API.DELETE_BRAND_URL+`${id}`);
