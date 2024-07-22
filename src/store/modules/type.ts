import type { RouteRecordRaw } from "vue-router";//路由的ts类型
export interface userState {
    token: string | null;
    menuRoutes:RouteRecordRaw;
    username:string;
    avatar:string | null;
    buttons:string[],
    roles:string[],
    routes:string[],
}