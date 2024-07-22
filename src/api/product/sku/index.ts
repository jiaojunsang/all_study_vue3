import request from "@/utils/request.ts"
import type  {skuReqData} from './type.ts'


// 枚举
enum API {
    SKU_LIST_URL = `/admin/product/list/`,
    SKU_CANCEL_URL = `/admin/product/cancelSale/`,
    SKU_UP_URL = `/admin/product/onSale/`,
    SKU_DETAIL_URL = `/admin/product/getSkuInfo/`,
    SKU_DELETE_URL = `/admin/product/deleteSku/`,
}

// sku列表接口
export const skuListApi = (page:number,limit:number) => request.get<any,skuReqData>(API.SKU_LIST_URL+`${page}/${limit}`);
// sku下架
export const skuCancelApi = (id:string | number) => request.get<any,any>(API.SKU_CANCEL_URL+`${id}`);
// sku上架
export const skuUpApi = (id:string | number) => request.get<any,any>(API.SKU_UP_URL+`${id}`);
// 查看sku
export const lookSkuApi = (id:string | number) => request.get<any,skuReqData>(API.SKU_DETAIL_URL+`${id}`);
// 删除sku
export const deletesKUApi = (id:string | number) => request.delete<any,any>(API.SKU_DELETE_URL+`${id}`);
