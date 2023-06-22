import Layout from '@/layout/visualise'

export default {
    path: '/big/screen',
    component: Layout,
    redirect: '/big/screen/index',
    name: 'bigScreen',
    meta: {
        title: '大屏展示',
        sidebar: false,
        icon: 'el-icon-help'
    },
    children: [
        {
            path: 'index',
            name: 'bigScreenIndex',
            component: () => import('@/views/bigscreen/index'),
            meta: {
                sidebar: false
            }
        }
    ]
}
