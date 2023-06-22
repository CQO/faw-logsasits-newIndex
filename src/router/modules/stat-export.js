import Layout from '@/layout'

export default {
    path: '/stat/export',
    component: Layout,
    redirect: '/stat/export',
    name: 'statExport',
    meta: {
        title: '统计导出',
        icon: 'el-icon-help'
    },
    children: [
        {
            path: '',
            name: 'statExportIndex',
            component: () => import('@/views/stat/export'),
            meta: {
                sidebar: false
            }
        }
    ]
}
