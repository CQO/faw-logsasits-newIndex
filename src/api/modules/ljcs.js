// 路距测算
import $api from '@/api/index'

export function getTableData(data) {
    return $api({
        url: 'screen-ljcsList',
        method: 'post',
        data
    })
}

export function getProvinceData(data) {
    return $api({
        url: 'screen-ljcsSt',
        method: 'post',
        data
    })
}

export default{
    getTableData,
    getProvinceData
}