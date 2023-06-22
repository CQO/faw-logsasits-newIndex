import $api from '@/api/index'
//物资流向监控
function getWzlxjkData(data){
    // return $api.get('/screen-qyjkWzlxjk', data)
    return $api({
        url: 'screen-qyjkWzlxjk',
        method: 'post',
        data
    })
}
//物资监控
function getQyjkWzjkData(data){
    return $api.get('/screen-qyjkWzjk', data)
}
//运力分析
function getYlfxData(data){
    return $api.get('/screen-qyjkYlfx', data)
}
//物资监控
function getJhjkData(data){
    return $api.get('/screen-qyjkJhjk', data)
}
//订单监控
function getDdjkData(data){
    return $api.get('/screen-qyjkDdjk', data)
}
//保障批次监控
function getBzpcjkData(data){
    return $api.get('/screen-qyjkBzpcjk', data)
}

//运力分析列表
function getYlfxListData(data){
    // return $api.get('/screen-qyjkYlfxList', data)
    return $api({
        url: 'screen-qyjkYlfxList',
        method: 'post',
        data
    })
}
//保障批次监控列表
function getYBzpcjkListData(data){
    // return $api.get('/screen-qyjkBzpcjkList', data)
    return $api({
        url: 'screen-qyjkBzpcjkList',
        method: 'post',
        data
    })
}
//物资监控列表
function getWzjkListData(data){
    // return $api.get('/screen-qyjkBzpcjkList', data)
    return $api({
        url: 'screen-qyjkWzjkList',
        method: 'post',
        data
    })
}

//数据分析列表
function getSjfxListData(data){
    // return $api.get('/screen-qyjkBzpcjkList', data)
    return $api({
        url: 'screen-qyjkTjfxList',
        method: 'post',
        data
    })
}

//计划监控列表
function getJhjkListData(data){
    // return $api.get('/screen-qyjkBzpcjkList', data)
    return $api({
        url: 'screen-qyjkJhjkList',
        method: 'post',
        data
    })
}
//订单监控列表
function getDdjkListData(data){
    // return $api.get('/screen-qyjkBzpcjkList', data)
    return $api({
        url: 'screen-qyjkDdjkList',
        method: 'post',
        data
    })
}
export default {
    getWzlxjkData,
    getQyjkWzjkData,
getYlfxData,
getJhjkData,
getDdjkData,
getBzpcjkData,
getYlfxListData,
getYBzpcjkListData,
getWzjkListData,
getSjfxListData,
getJhjkListData,
getDdjkListData
}