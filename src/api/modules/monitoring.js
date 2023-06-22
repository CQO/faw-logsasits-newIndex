import $api from '@/api/index'
//保障批次监控
function getBzpcjkData(data){
    return $api.get('/screen-qcjkBzpcjk', data)
}
//计划监控
function getJhjkData(data){
    return $api.get('/screen-qcjkJhjk', data)
}
//订单监控
function getDdjkData(data){
    return $api.get('/screen-qcjkDdjk', data)
}
//物资监控
function getWzjkData(data){
    return $api.get('/screen-qcjkWzjk', data)
}
//物资监控列表
function getWzjkListData(data){
    // return $api.get('/screen-qyjkYlfxList', data)
    return $api({
        url: 'screen-qcjkWzjkList',
        method: 'post',
        data
    })
}
//保障批次监控列表
function getBzpcjkListData(data){
    // return $api.get('/screen-qyjkYlfxList', data)
    return $api({
        url: 'screen-qcjkBzpcjkList',
        method: 'post',
        data
    })
}

//运单监控列表
function getYdjkListData(data){
    // return $api.get('/screen-qyjkYlfxList', data)
    return $api({
        url: 'screen-qcjkYdjkList',
        method: 'post',
        data
    })
}

//数据分析列表
function getzjfxListData(data){
    // return $api.get('/screen-qyjkYlfxList', data)
    return $api({
        url: 'screen-qcjkTjfxList',
        method: 'post',
        data
    })
}

//物资监控列表-仓储中心名字
function getcczxmzListData(data){
    // return $api.get('/screen-qyjkYlfxList', data)
    return $api({
        url: 'screen-qcjkWzjkListNames',
        method: 'post',
        data
    })
}

//统计分析列表-物资品名名字
function getWzpmNameListData(data){
    // return $api.get('/screen-qyjkYlfxList', data)
    return $api({
        url: 'screen-qcjkTjfxListMaterial',
        method: 'post',
        data
    })
}

//计划监控列表
function getJhjkListData(data){
    // return $api.get('/screen-qyjkYlfxList', data)
    return $api({
        url: 'screen-qyjkJhjkList',
        method: 'post',
        data
    })
}
export default {
    getBzpcjkData,
    getJhjkData,
    getDdjkData,
    getWzjkData,
    getWzjkListData,
    getBzpcjkListData,
    getYdjkListData,
    getzjfxListData,
    getcczxmzListData,
    getWzpmNameListData,
    getJhjkListData
}