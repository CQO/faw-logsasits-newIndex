//运力测算
import $api from '@/api/index'

export function getSyylData(data) {
    return $api({
        url: 'screen-ylcsSyyl',
        method: 'post',
        data
    })
}

export function getSyylListData(data) {
    return $api({
        url: 'screen-ylcsList',
        method: 'post',
        data
    })
}

//发物单位下拉列表
export function getSFwdwlListData(data) {
    return $api({
        url: 'screen-ylcsFwdw',
        method: 'post',
        data
    })
}

//地点省列表
export function getProvinceListData(data) {
    return $api({
        url: 'screen-ylcsBzdds',
        method: 'post',
        data
    })
}

//地点市区列表
export function getSqListData(data) {
    return $api({
        url: 'screen-ylcsBzddsq',
        method: 'post',
        data
    })
}

//模板下载
export function getdropDown(data) {
    return $api({
        url: 'template/ylcs.xls',
        method: 'post',
        data
    })
}

//导入
export function getdropDownIn(data) {
    return $api({
        url: 'screen-importYlcs',
        method: 'post',
        data
    })
}

//方案预算数据获取
export function getfananysList(data) {
    return $api({
        url: 'screen-ylcsFacs',
        method: 'post',
        data
    })
}

//方案数据下载
export function getfananysExportList(data) {
    return $api({
        url: 'screen-ylcsFacsExport',
        method: 'post',
        data,
        responseType: 'blob'
    })
}


export default {
    getSyylData,
    getSyylListData,
    getSFwdwlListData,
    getProvinceListData,
    getSqListData,
    getdropDown,
    getdropDownIn,
    getfananysList,
    getfananysExportList
}