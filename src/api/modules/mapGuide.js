//地图导视
import $api from '@/api/index'

//全部数据点
function getAllDataPoint() {
    return $api.get('/screen-dtdsAll')
}

//战区筛选
function getTheaterScreen(data) {
    return $api({
        url: 'screen-dtdsZqsx',
        method: 'post',
        data
    })
}

//战区统计
function getTheaterStatistics(data) {
    return $api({
        url: 'screen-dtdsZqtj',
        method: 'post',
        data
    })
}

//省份筛选
function getProvinceScreen(data) {
    return $api({
        url: 'screen-dtdsSfsx',
        method: 'post',
        data
    })
}

//省份统计
function getProvinceStatistics(data) {
    return $api({
        url: 'screen-dtdsSftj',
        method: 'post',
        data
    })
}

//省份列表
function getProvinceList(data) {
    return $api({
        url: 'screen-dtdsSflb',
        method: 'post',
        data
    })
}

//运单列表
function getWaybillList(data) {
    return $api({
        url: 'screen-dtdsYdlb',
        method: 'post',
        data
    })
}

//运单在途
function getWaybillInTransit(data) {
    return $api({
        url: 'screen-dtdsYdzt',
        method: 'post',
        data
    })
}

//运单统计
function getWaybillIStatics(data) {
    return $api({
        url: 'screen-dtdsYdtj',
        method: 'post',
        data
    })
}



//运单监控列表
function getYdMonitorListData(data) {
    return $api({
        url: 'screen-dtdsYdtj',
        method: 'post',
        data
    })
}

// 问题追溯
function getWtzsData(data) {
    return $api({
        url: 'screen-dtdsWtzs',
        method: 'post',
        data
    })
}
// 问题追溯列表
function getWtzsListData(data) {
    return $api({
        url: 'screen-dtdsWtzsList',
        method: 'post',
        data
    })
}
// 仓库监控
function getCkjkListData(data) {
    return $api({
        url: 'screen-dtdsCkjkList',
        method: 'post',
        data
    })
}
// 设备监控  
function getSbjkListData(data) {
    return $api({
        url: 'screen-dtdsSbjkList',
        method: 'post',
        data
    })
}
// 计划监控
function getPlanplanData(data) {
    return $api({
        url: 'screen-dtdsJhjk',
        method: 'post',
        data
    })
}
// 计划监控 （精申） 
function getJhJsListData(data) {
    return $api({
        url: 'screen-dtdsJhjkJsList',
        method: 'post',
        data
    })
}
// 计划监控 （计划） 
function getJhJhListData(data) {
    return $api({
        url: 'screen-dtdsJhjkJhList',
        method: 'post',
        data
    })
}

// 仓库布局 
function getCkbjData(data) {
    return $api({
        url: 'screen-dtdsCkbj',
        method: 'post',
        data
    })
}
export default {
    getAllDataPoint,
    getTheaterScreen,
    getTheaterStatistics,
    getProvinceScreen,
    getProvinceStatistics,
    getProvinceList,
    getWaybillList,
    getWaybillInTransit,
    getWaybillIStatics,
    getPlanplanData,



    getYdMonitorListData,
    getWtzsData,
    getWtzsListData,
    getCkjkListData,
    getSbjkListData,
    getJhJsListData,
    getJhJhListData,
    getCkbjData
}
