

// 接口返回的公共参数
interface responsePublicData {
    code: number;
    message: string,
    ok: boolean;
}

// 登录接口返回数据
export interface brandResponseData extends responsePublicData {
    data: {
        countId: string | null,
        total: number,
        size: number,
        current: number,
        orders?: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        maxLimit: any,
        searchCount: boolean,
        pages: number,
        records:records,
    };
}

export interface brand{
    id?:string,
    createTime?:string,
    updateTime?:string,
    tmName:string,
    logoUrl:string,
}

export type records = brand[]
