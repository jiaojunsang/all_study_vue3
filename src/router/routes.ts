import { RouteRecordRaw } from 'vue-router';
export const constantRoutes = [
    {
        path: '/',
        name: 'meta',
        redirect: '/login',
        meta: {
            title: '项目名称',
            hidden: true,
            icon:'Star'
        }
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            hidden: true,
            icon:'Pointer'
        },
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/layout',
        name: 'layout',
        redirect:'/home',
        meta: {
            title: '',
            hidden:false,
            icon:''
        },
        component: () => import('@/layout/index.vue'),
        children:[
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    hidden: false,
                    icon:'HomeFilled'
                },
                component: () => import('@/views/home/index.vue')
            }
        ]
    },
    {
        path: '/screen',
        name: 'screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon:'failed'
        },
        component: () => import('@/views/screen/index.vue')
    },
    {
        path: '/authority',
        name: 'authority',
        meta: {
            title: '权限管理',
            hidden:false,
            icon:'Grid'
        },
        component: () => import('@/layout/index.vue'),
        children:[
            {
                path: '/authority/user',//path需添加父级路由
                name: 'user',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon:'HomeFilled'
                },
                component: () => import('@/views/authority/user/index.vue')
            },
            {
                path: '/authority/role',
                name: 'role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon:'Setting'
                },
                component: () => import('@/views/authority/role/index.vue')
            },
            {
                path: '/authority/menu',
                name: 'menu',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon:'Setting'
                },
                component: () => import('@/views/authority/menu/index.vue')
            },
        ]
    },
    {
        path: '/product',
        name: 'product',
        meta: {
            title: '商品管理',
            hidden:false,
            icon:'Grid'
        },
        component: () => import('@/layout/index.vue'),
        children:[
            {
                path: '/product/brand',//path需添加父级路由
                name: 'brand',
                meta: {
                    title: '品牌管理',
                    hidden: false,
                    icon:'HomeFilled'
                },
                component: () => import('@/views/product/brand/index.vue')
            },
            {
                path: '/product/attr',
                name: 'attr',
                meta: {
                    title: '属性管理',
                    hidden: false,
                    icon:'Setting'
                },
                component: () => import('@/views/product/attr/index.vue')
            },
            {
                path: '/product/spu',
                name: 'spu',
                meta: {
                    title: 'SPU管理',
                    hidden: false,
                    icon:'Setting'
                },
                component: () => import('@/views/product/spu/index.vue')
            },
            {
                path: '/product/sku',
                name: 'sku',
                meta: {
                    title: 'SKU管理',
                    hidden: false,
                    icon:'Setting'
                },
                component: () => import('@/views/product/sku/index.vue')
            },
        ]
    },
    {
        path: '/common',
        name: 'common',
        // redirect:'/common/map',
        meta: {
            title: '常用功能封装',
            hidden:false,
            icon:'Grid'
        },
        component: () => import('@/layout/index.vue'),
        children:[
            {
                path: '/common/map',//path需添加父级路由
                name: 'map',
                meta: {
                    title: '高德地图',
                    hidden: false,
                    icon:'HomeFilled'
                },
                component: () => import('@/views/common/map/index.vue')
            },
            // {
            //     path: '/common/map',//path需添加父级路由
            //     name: 'map',
            //     meta: {
            //         title: '高德地图',
            //         hidden: false,
            //         icon:'HomeFilled'
            //     },
            //     component: () => import('@/views/common/map/index.vue')
            // },
        ]
    },
    {
        path: '/404',
        name: 'notFount',
        meta: {
            title: '404',
            hidden: true,
            icon:'failed'
        },
        component: () => import('@/views/404/index.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name:'any',
        meta: {
            title: '未匹配路由',
            hidden: true,
            icon:'WarnTriangleFilled'
        },
        component: () => import('@/views/404/index.vue')
    }
]