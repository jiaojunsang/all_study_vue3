// 接口返回的公共参数
export interface responsePublicData {
    code: number;
    message: string,
    ok: boolean;
}
export interface skuReqData extends responsePublicData {
    data:{
        records:skuListItem_type[],
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "optimizeCountSql": boolean,
        "hitCount": boolean,
        "countId": null,
        "maxLimit": null,
        "searchCount": boolean,
        "pages": number
    }
}

export interface skuListItem_type {
    category3Id?: string|number,
    id?: string|number,
    skuName?: string,
    isSale?: number,
    price?: string|number,
    spuId?: string|number,
    tmId?: string|number,
    weight?: string|number
    skuDefaultImg?: string,
    skuDesc?: string,
    skuAttrValueList?: [
      {
        attrId: string|number,
        // attrName: string,
        id?: string|number,
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
    skuSaleAttrValueList?: [
      {
        id?: string|number,
        saleAttrId: string|number,
        // saleAttrName: string,
        saleAttrValueId: string|number,
        // saleAttrValueName: string,
        // skuId: string|number,
        // spuId: string|number
      }
    ] |[]|null,
    
}