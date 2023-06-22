import $api from '@/api/index'
//总体进度
function getZtjdData(data){
    return $api.get('/screen-ztgkZtjd', data)
}
//当前任务
function getDqrwData(data){
    return $api({
        url: '/screen-ztgkDqrw',
        method: 'post',
        data
    })
}
//年度汇总
function getNdhzData(data){
    return $api.get('/screen-ztgkNdhz', data)
}
//问题监控
function getWtjkData(data){
    // return $api.get('/screen-ztgkWtjk', data)
    return $api({
        url: '/screen-ztgkWtjk',
        method: 'post',
        data
    })
}


// 总体进度tab列表
export function getZtjdTabList(data) {
    return $api({
        url: 'screen-ztgkZtjdList',
        method: 'post',
        data
    })
}
// 问题监控tab列表
export function getWtjkTabList(data) {
    return $api({
        url: 'screen-ztgkWtjkList',
        method: 'post',
        data
    })
}
// 年度汇总tab列表
export function getNdhzTabList(data) {
    return $api({
        url: 'screen-ztgkNdhzList',
        method: 'post',
        data
    })
}
export default {
    getZtjdData,
    getDqrwData,
    getNdhzData,
    getWtjkData,
    getZtjdTabList,
    getWtjkTabList,
    getNdhzTabList
}