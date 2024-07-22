import {createRouter,createWebHashHistory} from "vue-router"
import {constantRoutes} from "@/router/routes.ts"

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior (to, from, savedPosition){
        return {
            top: 0,
            left: 0,
        }
    }
})

export default router;