//力量部署
import $api from '@/api/index'

//全部数据点
function getAllDataPoint() {
    return $api.get('/screen-llbsAll')
}

//战区统计(仓库数据)
function getWarehouseData(data) {
    return $api({
        url: 'screen-llbsZqtj',
        method: 'post',
        data
    })
}

//战区类型(列表)
function getTheaterType(data) {
    return $api({
        url: 'screen-llbsZqlx',
        method: 'post',
        data
    })
}

//战区分类
function getTheaterClassific(data) {
    return $api({
        url: 'screen-llbsZqfl',
        method: 'post',
        data
    })
}

//军兵种分类
function getArmsClassific(data) {
    return $api({
        url: 'screen-llbsJbzfl',
        method: 'post',
        data
    })
}

//军兵种类型
function getArmsType(data) {
    return $api({
        url: 'screen-llbsJbzlx',
        method: 'post',
        data
    })
}

// 军兵种统计(仓库数据)
function getArmsHouseData(data) {
    return $api({
        url: 'screen-llbsJbztj',
        method: 'post',
        data
    })
}

//储供基地分类
function getBaseClassific(data) {
    return $api({
        url: 'screen-llbsCgjdfl',
        method: 'post',
        data
    })
}

//储供基地统计
function getBaseHouseData(data) {
    return $api({
        url: 'screen-llbsCgjdtj',
        method: 'post',
        data
    })
}

//储供基地类型
function getBaseType(data) {
    return $api({
        url: 'screen-llbsCgjdlx',
        method: 'post',
        data
    })
}

// 物资类型
function getWzTypeData(data) {
    return $api({
        url: 'screen-llbsWzlx',
        method: 'post',
        data
    })
}
// 供应关系（保障方）
function getgygxzData(data) {
    return $api({
        url: 'screen-llbsGygxBzList',
        method: 'post',
        data
    })
}
// 供应关系（被保障方）
function getgygxbData(data) {
    return $api({
        url: 'screen-llbsGygxBbzList',
        method: 'post',
        data
    })
}


export default {
    getAllDataPoint,
    getWarehouseData,
    getTheaterType,
    getTheaterClassific,
    getArmsClassific,
    getArmsHouseData,
    getArmsType,
    getBaseClassific,
    getBaseHouseData,
    getBaseType,
    getWzTypeData,
    getgygxzData,
    getgygxbData
}
