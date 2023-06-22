import $api from '@/api/index'
//计划监控
function getPlanMonitorData(data){
    return $api({
        url: 'screen-syJhjk',
        method: 'post',
        data
    })
}

//订单监控
function getOrderMonitorData(data){
    return $api({
        url: 'screen-syDdjk',
        method: 'post',
        data
    })
}

//物流态势分析
function getWtsfxData(data){
    return $api({
        url: 'screen-syWltsFx',
        method: 'post',
        data
    })
}

//货运指数
function getHyzsData(data){
    return $api({
        url: 'screen-syHyzs',
        method: 'post',
        data
    })
}

//运单监控
function getYdjkData(data){
    return $api({
        url: 'screen-syYdjk',
        method: 'post',
        data
    })
}

//准点率分析
function getZdlfxData(data){
    return $api({
        url: 'screen-syZdlfx',
        method: 'post',
        data
    })
}
//设备监控
function getSbjkData(data){
    return $api({
        url: 'screen-sySbjk',
        method: 'post',
        data
    })
}

//仓储监控
function getCcjkData(data){
    return $api({
        url: 'screen-syCkjk',
        method: 'post',
        data
    })
}

//顶部统计
function getDbtjData(data){
    return $api({
        url: 'screen-syTj',
        method: 'post',
        data
    })
}

//运单监控tab
function getOrderListData(data){
    return $api({
        url: 'screen-syYdjkList',
        method: 'post',
        data
    })
}





//精申列表tab
function getPlanJsListData(data){
    return $api({
        url: 'screen-syJhjkJsList',
        method: 'post',
        data
    })
}
//计划列表tab
function getPlanJhListData(data){
    return $api({
        url: 'screen-syJhjkJhList',
        method: 'post',
        data
    })
}
//订单监控列表tab
function getDdjkListData(data){
    return $api({
        url: 'screen-syDdjkList',
        method: 'post',
        data
    })
}
//物流态势分析列表tab
function getWltsfxListData(data){
    return $api({
        url: 'screen-syWltsFxList',
        method: 'post',
        data
    })
}
//仓储监控列表tab
function getCcjkListData(data){
    return $api({
        url: 'screen-syCcjkList',
        method: 'post',
        data
    })
}
//设备监控列表tab
function getSbjkListData(data){
    return $api({
        url: 'screen-sySbjkList',
        method: 'post',
        data
    })
}
//货运指数列表tab
function getHyzsListData(data){
    return $api({
        url: 'screen-syHyzsList',
        method: 'post',
        data
    })
}
//准点率分析列表tab
function getZdlfxListData(data){
    return $api({
        url: 'screen-syZdlfxList',
        method: 'post',
        data
    })
}
//物流企业列表tab
function getWlqyListData(data){
    return $api({
        url: 'screen-businessList',
        method: 'post',
        data
    })
}

//物流企业列表tab
function getLoginData(data){
    return $api({
        url: 'screen-login',
        method: 'post',
        data
    })
}
//运单二级列表tab
function getYdEjData(data){
    return $api({
        url: 'screen-syYdjkRouteList',
        method: 'post',
        data
    })
}

// 以下地图相关接口

// 查询仓库提货点 点位列表  
function getMapPointCkthd(data){
    return $api({
        url: 'screen-syMapPointCkthd',
        method: 'post',
        data
    })
}
// 查询物流仓库点位 列表  
function getMapPointWlck(data){
    return $api({
        url: 'screen-syMapPointWlck',
        method: 'post',
        data
    })
}
// 查询受供单位 点位列表  
function getMapPointSgdw(data){
    return $api({
        url: 'screen-syMapPointSgdw',
        method: 'post',
        data
    })
}
// 工厂提货点 点位列表  
function getMapPointGcth(data){
    return $api({
        url: 'screen-syMapPointGcthd',
        method: 'post',
        data
    })
}
// 搜索点位
function getMapSearch(data){
    return $api({
        url: 'screen-syMapSearch',
        method: 'post',
        data
    })
}
// 迁徙飞线接口
function getMapLine(data){
    return $api({
        url: 'screen-syMapLine',
        method: 'post',
        data
    })
}
//点位详情
function getMapPointDetail(data){
    return $api({
        url: 'screen-syMapPointDetail',
        method: 'post',
        data
    })
}
// 飞线的汇总信息
function getMapCenterCount(data){
    return $api({
        url: 'screen-syMapCenterCount',
        method: 'post',
        data
    })
}
// 计划监控中心
function tiPlanCenter(data){
    return $api({
        url: 'screen-syJhjkSe',
        method: 'post',
        data
    })
}
// 订单监控中心
function tiOrderCenter(data){
    return $api({
        url: 'screen-syDdjkSe',
        method: 'post',
        data
    })
}
// 运单监控中心
function tiYdCenter(data){
    return $api({
        url: 'screen-syYdjkSe',
        method: 'post',
        data
    })
}
// 精申状态列表
function getJsStatuData(data){
    return $api({
        url: 'screen-syJhjkJsStatus',
        method: 'post',
        data
    })
}


export default {
    getPlanMonitorData,
    getOrderMonitorData,
    getWtsfxData,
    getHyzsData,
    getYdjkData,
    getSbjkData,
    getCcjkData,
    getDbtjData,
    getZdlfxData,
    getOrderListData,
    getPlanJsListData,
    getPlanJhListData,
    getDdjkListData,
    getWltsfxListData,
    getCcjkListData,
    getSbjkListData,
    getHyzsListData,
    getZdlfxListData,
    getWlqyListData,
    getLoginData,
    getYdEjData,
    getMapPointCkthd, // 查询仓库提货点 点位列表  
    getMapPointWlck, // 查询物流仓库点位 列表       
    getMapPointSgdw, // 查询受供单位 点位列表 
    getMapPointGcth,//工厂提货点
    getMapPointDetail,//点位详情
    getMapSearch, // 地图搜索
    getMapLine, // 地图迁徙飞线
    getMapCenterCount, // 飞线完成进度
    tiPlanCenter,
    tiOrderCenter,
    tiYdCenter,
    getJsStatuData
}