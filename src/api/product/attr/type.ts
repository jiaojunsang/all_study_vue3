

// 接口返回的公共参数
interface responsePublicData {
    code: number;
    message: string,
    ok: boolean;
}

// 登录接口返回数据
export interface cateResponseData extends responsePublicData {
    data: cate[],
}

export interface cate{
    id: string | number,
    name: string,
    category1Id?: string | number,
    category2Id?: string | number,
}

export type list = cate[]

// 属性列表接口返回数据类型
export interface attrListResponseType extends responsePublicData {
    data:attrListItemResponseType[]
}
// 属性名列
export interface attrListItemResponseType {
    attrName: string,
    categoryId: string | number,
    categoryLevel: string | number,
    id?:  string | number,
    attrValueList:attrValue
}
// 单个属性名item
export type attrResponseListType = attrListItemResponseType[]

// 属性值列
export interface attrListItemValueResponseType {
    attrId?: string | number,
    id?: string | number,
    valueName: string,
    edit?: boolean
}
// 单个属性值item
export type attrValue = attrListItemValueResponseType[]

