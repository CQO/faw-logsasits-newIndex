import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

Vue.use(VueRouter)

// import Layout from '@/layout'
import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

const constantRoutes = [
    {
        path: '/big/screen/index',
        name: 'powerDeployment',
        component: () => import('@/views/bigscreen'),
        meta: {
            title: '登录',
            i18n: 'route.login'
        }
    },
    {
        path: '/',
        component: Layout,
        // redirect:'/zhpj'
        // redirect:'globalMonitoring'
        redirect:'/login'
    },
    //登录 overview
    { 
        path:'/login',
        name:'login',
        component: () => import('@/views/bigscreen/login'),
    },
     //异常监控 overview
     { 
        path:'/anomalyMonitoring',
        name:'anomalyMonitoring',
        component: () => import('@/views/bigscreen/anomalyMonitoring'),
    },
    //总体概况General overview
    { 
        path:'/homePage',
        name:'homePage',
        component: () => import('@/views/bigscreen/homePage'),
    },
    {
        path:'/compontApp',
        name:'compontApp',
        component: () => import('@/views/bigscreen/compontApp'),
    },
    {
        path:'/szhjkpt',
        name:'szhjkpt',
        component: () => import('@/views/bigscreen/szhjkpt'),
    },
    //物流态势
    {
        path:'/logisticsSituation',
        name:'logisticsSituation',
        component: () => import('@/views/bigscreen/logisticsSituation'),
    },
    {
        path:'/monitoring',
        name:'monitoring',
        component: () => import('@/views/bigscreen/monitoring'),
    },
    //地图导视
    {
        path:'/mapGuide',
        name:'mapGuide',
        component: () => import('@/views/bigscreen/mapGuide'),
    },
    {
        path:'/globalMonitoring',
        name:'globalMonitoring',
        component: () => import('@/views/bigscreen/globalMonitoring'),
    },
    //需求分析
    {
        path:'/demandAnalysis',
        name:'demandAnalysis',
        component: () => import('@/views/bigscreen/demandAnalysis'),
    },
    //仓储规划
    {
        path:'/warehousingPlanning',
        name:'warehousingPlanning',
        component: () => import('@/views/bigscreen/warehousingPlanning'),
    },
    //总体概况General overview
    {
        path:'/generalOverview',
        name:'generalOverview',
        component: () => import('@/views/bigscreen/generalOverview'),
    },
    //费效分析General overview
    {
        path:'/fxfx',
        name:'fxfx',
        component: () => import('@/views/bigscreen/fxfx'),
    },
    {
        path:'/ylcs',
        name:'ylcs',
        component: () => import('@/views/bigscreen/ylcs'),
    },
    {
        path:'/ljcs',
        name:'ljcs',
        component: () => import('@/views/bigscreen/ljcs'),
    },
    {
        path:'/zhpj',
        name:'zhpj',
        component: () => import('@/views/bigscreen/zhpj'),
    },
    {
        path:'/mainjsp',
        name:'mainjsp',
        component: () => import('@/views/bigscreen/mainjsp'),
    },
]

// 首页
import HomeRouters from './modules/home'
import BigScreenRouters from './modules/big.screen'
import StatRouters from './modules/stat-export'
// import { component } from 'node_modules/vue/types/umd'

// 当 children 不为空的主导航只有一项时，则隐藏
let asyncRoutes = [
    {
        meta: {
            title: '演示',
            icon: 'sidebar-default'
        },
        children: [
            HomeRouters,
            BigScreenRouters,
            StatRouters
        ]
    }
]

const lastRoute = [{
    path: '*',
    component: () => import('@/views/404'),
    meta: {
        title: '404',
        sidebar: false
    }
}]

const router = new VueRouter({
    routes: constantRoutes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

// 解决路由在 push/replace 了相同地址报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

// router.beforeEach(async(to, from, next) => {
//     store.state.settings.enableProgress && NProgress.start()
//     // 已经登录，但还没根据权限动态生成并挂载路由
//     if (store.getters['user/isLogin'] && !store.state.menu.isGenerate) {
//         // 挂载动态路由的同时，根据当前帐号复原固定标签栏
//         store.state.settings.enableTabbar && store.commit('tabbar/recoveryStorage', store.state.user.account)
//         /**
//          * 重置 matcher
//          * https://blog.csdn.net/baidu_28647571/article/details/101711682
//          */
//         router.matcher = new VueRouter({
//             routes: constantRoutes
//         }).matcher
//         const accessRoutes = await store.dispatch('menu/generateRoutes', {
//             asyncRoutes,
//             currentPath: to.path
//         })
//         accessRoutes.push(...lastRoute)
//         accessRoutes.forEach(route => {
//             router.addRoute(route)
//         })
//         next({ ...to, replace: true })
//     }
//     if (store.state.menu.isGenerate) {
//         store.commit('menu/setHeaderActived', to.path)
//     }
//     if (store.getters['user/isLogin']) {
//         if (to.name) {
//             if (to.matched.length !== 0) {
//                 // 如果已登录状态下，进入登录页会强制跳转到控制台页面
//                 console.log(from, to);
//                 if (to.name === 'bigScreenIndex' || (from.path || '').indexOf('/big/screen/index') !== -1) {
//                 } else if (to.name == 'login' && to.query.need !== true) {
//                     next({
//                         name: 'login',
//                         query: {
//                             'need': true
//                         },
//                         replace: true
//                     })
//                 } else if (!store.state.settings.enableDashboard && to.name == 'dashboard') {
//                     // 如果未开启控制台页面，则默认进入第一个固定标签栏或者侧边栏导航第一个模块
//                     if (store.state.settings.enableTabbar && store.state.tabbar.list.length > 0) {
//                         next({
//                             path: store.state.tabbar.list[0].path,
//                             replace: true
//                         })
//                     } else if (store.getters['menu/sidebarRoutes'].length > 0) {
//                         next({
//                             path: store.getters['menu/sidebarRoutes'][0].path,
//                             replace: true
//                         })
//                     }
//                 }
//             } else {
//                 // 如果是通过 name 跳转，并且 name 对应的路由没有权限时，需要做这步处理，手动指向到 404 页面
//                 next({
//                     path: '/404'
//                 })
//             }
//         }
//     } else {
//         if (to.name != 'login') {
//             next({
//                 name: 'login',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             })
//         }
//     }
//     next()
// })

router.afterEach(() => {
    store.state.settings.enableProgress && NProgress.done()
})

export default router
