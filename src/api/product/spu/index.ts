import request from "@/utils/request.ts"
import type  {
    spu,
    spuBrandResponseDataList_type,
    spuImageResponseDataList_type,
    spuAttrResponseDataList_type,
    spuSaleAttrDataList_type,
    spuSkuAddData,
    skuListApi_Type
} from './type.ts'


// 枚举
enum API {
    SPU_LIST_URL = `/admin/product/`,
    ADD_SPU_URL = '/admin/product/saveSpuInfo',
    EDIT_SPU_URL = '/admin/product/updateSpuInfo',
    DELETE_SPU_URL = '/admin/product/deleteSpu/',
    BRAND_LIST_URL = `/admin/product/baseTrademark/getTrademarkList`,
    SPU_IMAGE_LIST_URL = `/admin/product/spuImageList/`,
    SPU_SALE_ATTR_LIST_URL = `/admin/product/spuSaleAttrList/`,
    SPU_BASE_SALE_ATTR_URL = `/admin/product/baseSaleAttrList`,
    SKU_SAVE_INFO_URL = `/admin/product/saveSkuInfo`,
    SKU_LIST_URL = `/admin/product/findBySpuId/`,
}

// spu列表接口
export const reqSpuList = (page:number,limit:number,category3Id:number|string) => request.get<any,any>(API.SPU_LIST_URL+`${page}/${limit}?category3Id=${category3Id}`);
// 新增spu
export const addSpuApi = (data:spu) => request.post<any,any>(API.ADD_SPU_URL,data);
// 修改spu
export const editSpuApi = (data:spu) => request.post<any,any>(API.EDIT_SPU_URL,data);
// 删除spu
export const deleteSpuApi = (id:string | number) => request.delete<any,any>(API.DELETE_SPU_URL+`${id}`);

// 获取spu品牌的接口
export const brandListApi = () => request.get<any,spuBrandResponseDataList_type>(API.BRAND_LIST_URL);
// 获取spu照片
export const spuImageListApi = (id:string | number) => request.get<any,spuImageResponseDataList_type>(API.SPU_IMAGE_LIST_URL+`${id}`);
// 获取spu属性
export const spuSaleAttrListApi = (id:string | number) => request.get<any,spuAttrResponseDataList_type>(API.SPU_SALE_ATTR_LIST_URL+`${id}`);

// 获取spu销售属性
export const baseSaleAttrListApi = () => {
    return request.get<any,spuSaleAttrDataList_type>(API.SPU_BASE_SALE_ATTR_URL);
}
// 添加一个sku
export const saveSkuInfoApi = (data:spuSkuAddData) => {
    return request.post<any,any>(API.SKU_SAVE_INFO_URL,data);
}

// sku列表
export const skuListApi = (spuId:number|string) => {
    return request.get<any,skuListApi_Type>(API.SKU_LIST_URL+ `${spuId}`);
}