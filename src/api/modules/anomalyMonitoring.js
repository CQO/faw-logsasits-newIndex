// 异常监控
import $api from '@/api/index'

// echarts图表
export function getEchartData(data) {
    return $api({
        url: 'screen-fzjcYcjkChartList',
        method: 'post',
        data
    })
}
// 列表数据
export function getTabListData(data) {
    return $api({
        url: 'screen-fzjcYcjkList',
        method: 'post',
        data
    })
}

// 企业列表
export function getQyListData(data) {
    return $api({
        url: 'screen-fzjcYcjkGysList',
        method: 'post',
        data
    })
}
// 异常处理
export function getResolveMothods(data) {
    return $api({
        url: 'screen-fzjcYcjkListCl',
        method: 'post',
        data
    })
}