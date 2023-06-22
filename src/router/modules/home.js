import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

export default {
    path: '/home',
    component: Layout,
    redirect: '/home/first',
    name: 'home',
    meta: {
        title: '用户管理',
        icon: 'el-icon-s-home'
    },
    children: [
        {
            path: 'first',
            name: 'dashboard',
            component: () => import(/* webpackChunkName: 'home' */ '@/views/user/index'),
            meta: {
                sidebar: false,
                activeMenu: '/home'
            }
        }
    ]
}
