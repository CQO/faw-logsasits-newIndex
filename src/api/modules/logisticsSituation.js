//物流态势
import $api from '@/api/index'
//任务发布√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√
function getTaskPublishing(data){
    return $api.get('/screen-wltsRwfb', data)
}
//任务完成进度√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√
function getTaskProgress(data){
    return $api.get('/screen-wltsRwjd', data)
}
//风险预警√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√
function getRiskWarning(data){
    return $api.get('/screen-wltsFxyj', data)
}
//库存动态
function getInventoryDynamics(data) {
    return $api({
        url: 'screen-wltsKcdt',
        method: 'post',
        data
    })
}
//搬运入库
function getIntoStorage(data) {
    return $api({
        url: '/screen-wltsByrk',
        method: 'post',
        data
    })
}
//分拣配送
function getSorting(data){
    return $api({
        url: '/screen-wltsFjps',
        method: 'post',
        data
    })
}
//供应动态√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√
function getSupplyDynamics(data) {
    return $api({
        url: '/screen-wltsGydt',
        method: 'post',
        data
    })
}
// 任务进度
// 供应动态tab列表
function getJdProgessData(data) {
    return $api({
        url: 'screen-wltsRwfbZt',
        method: 'post',
        data
    })
}

// 供应动态tab列表
function getGydtData(data) {
    return $api({
        url: 'screen-wltsGydtList',
        method: 'post',
        data
    })
}

// 提运入库tab列表
function getTyrkData(data) {
    return $api({
        url: 'screen-wltsTyrkList',
        method: 'post',
        data
    })
}
// 分拣配送tab列表
function getFjpsData(data) {
    return $api({
        url: 'screen-wltsFjpsList',
        method: 'post',
        data
    })
}
// 风险预警tab列表
function getFxyjData(data) {
    return $api({
        url: 'screen-wltsFxyjList',
        method: 'post',
        data
    })
}
// 库存动态tab列表
function getKcdtData(data) {
    return $api({
        url: 'screen-wltsKcdtList',
        method: 'post',
        data
    })
}
// 部队最新动态tab列表
function getBdNewerdtData(data) {
    return $api({
        url: 'screen-wltsBdzxdt',
        method: 'post',
        data
    })
}
// 企业最新动态tab列表
function getQyNewerdtData(data) {
    return $api({
        url: 'screen-wltsQyzxdt',
        method: 'post',
        data
    })
}

// 任务完成进度tab列表
function getRwwcjdListData(data) {
    return $api({
        url: 'screen-wltsRwwcjdList',
        method: 'post',
        data
    })
}
export default {
    getTaskPublishing,
    getTaskProgress,
    getRiskWarning,
    getInventoryDynamics,
    getSupplyDynamics,
    getIntoStorage,
    getSorting,
    getGydtData,
    getTyrkData,
    getFjpsData,
    getFxyjData,
getKcdtData,
getJdProgessData,
getBdNewerdtData,
getQyNewerdtData,
getRwwcjdListData
}