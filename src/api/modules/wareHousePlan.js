//仓储规划
import $api from '@/api/index'

// 热力图
export function getHotMapData(data) {
    // return $api.get('/screen-fzjcCcgh')
    return $api({
        url: 'screen-fzjcCcgh',
        method: 'post',
        data
    })
}

// 省列表
export function getProvinceList(data) {
    // return $api.get('/screen-fzjcCcghList')
    return $api({
        url: 'screen-fzjcCcghList',
        method: 'post',
        data
    })
}


