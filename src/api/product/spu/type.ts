

// 接口返回的公共参数
interface responsePublicData {
    code: number;
    message: string,
    ok: boolean;
}

// spu接口返回数据
export interface spuResponseData extends responsePublicData {
    data: {
        current: number,
        pages: number,
        records:spu[]|null,
        searchCount: boolean,
        size: number,
        total: number
    };
}
export type records = spu[]
// 单个spu数据
export interface spu {
    category3Id: string|number,
    description: string,
    id?: string|number,
    spuImageList: spuImageList_type[]|null,
    spuName: string,
    spuPosterList?:null,
    spuSaleAttrList: spuSaleAttrList_type[]|null,
    tmId?: string|number
  }
//   spu图片列表
  export interface spuImageList_type{
    id?: string|number,
    imgName?: string,
    imgUrl?: string,
    spuId?: string|number,
    name?: string,
    url?: string
  }
//   销售属性
  export interface spuSaleAttrList_type{
    baseSaleAttrId: string|number,
    id?: string|number,
    saleAttrName: string,
    spuId?: string|number,
    spuSaleAttrValueList: spuSaleAttrValueList_type[]|null,
    edit?: boolean,
    saleAttrValue?:string,
  }
//   销售属性值
  export interface spuSaleAttrValueList_type{
    baseSaleAttrId: string|number,
    id?: string|number,
    isChecked?: string,
    saleAttrName?: string|number,
    saleAttrValueName:string,
    spuId?: string|number,
  }

// spu品牌返回数据
  export interface spuBrandResponseDataList_type extends responsePublicData {
    data: spuBrandResponseDataItem_type[]
}
// spu品牌返回数据item
export interface spuBrandResponseDataItem_type {
    id?: string|number,
    logoUrl: string,
    tmName: string
}

// spu照片返回数据
export interface spuImageResponseDataList_type extends responsePublicData {
    data: spuImageResponseDataItem_type[]
}
// spu照片返回数据item
export interface spuImageResponseDataItem_type {
    id?: string|number,
    createTime?: string,
    updateTime?:string,
    imgName: string,
    imgUrl: string,
    spuId?: string|number
}

// spu属性返回数据
export interface spuAttrResponseDataList_type extends responsePublicData {
    data: spuAttrResponseDataItem_type[]
}
// spu属性返回数据item
export interface spuAttrResponseDataItem_type {
        baseSaleAttrId?: string|number,
        id?: string|number,
        saleAttrName: string,
        spuId?:string|number,
        spuSaleAttrValueList: spuAttrValueResponseDataItem_type[]
}
// spu属性值返回数据item
export interface spuAttrValueResponseDataItem_type {
        createTime?: null,
        updateTime?:null,
        baseSaleAttrId: string|number,
        id?: string|number,
        isChecked: string,
        saleAttrName: string,
        saleAttrValueName: string,
        spuId?: string|number
}

// spu销售属性返回数据
export interface spuSaleAttrDataList_type extends responsePublicData {
    data: spuSaleAttrDataItem_type[]
}
// spu销售属性返回数据item
export interface spuSaleAttrDataItem_type {
    id?: string|number,
    name: string
}

// spu下新增sku的参数
export interface spuSkuAddData {
    category3Id: string|number,
    id?: string|number,
    skuName: string,
    isSale?: number,
    price: string|number,
    spuId: string|number,
    tmId: string|number,
    weight: string|number
    skuDefaultImg: string,
    skuDesc: string,
    skuAttrValueList: [
      {
        attrId: string|number,
        // attrName: string,
        // id: string|number,
        // skuId: string|number,
        valueId: string|number,
        // valueName: string
      }
    ]|[]|null,
    skuImageList?: [
      {
        id: string|number,
        imgName: string,
        imgUrl: string,
        isDefault: string,
        skuId: string|number,
        spuImgId: string|number
      }
    ]|[]|null,
    skuSaleAttrValueList: [
      {
        // id: string|number,
        saleAttrId: string|number,
        // saleAttrName: string,
        saleAttrValueId: string|number,
        // saleAttrValueName: string,
        // skuId: string|number,
        // spuId: string|number
      }
    ] |[]|null,
    
}

// spu销售属性返回数据
export interface skuListApi_Type extends responsePublicData {
    data: spuSkuAddData[]
}

