// 路距测算
import $api from '@/api/index'

// 综合评价tab列表
export function getZhpjTableData(data) {
    return $api({
        url: 'screen-fzjcZhpjList',
        method: 'post',
        data
    })
}
// 企业承运体量
export function getZhpjQycytlData(data) {
    return $api({
        url: 'screen-fzjcZhpjCytl',
        method: 'post',
        data
    })
}

// 经费占比
export function getZhpjJfzbData(data) {
    return $api({
        url: 'screen-fzjcZhpjJfzb',
        method: 'post',
        data
    })
}
// 服务水平  
export function getZhpjJFwspData(data) {
    return $api({
        url: 'screen-fzjcZhpjFwsp',
        method: 'post',
        data
    })
}
export default{
    getZhpjTableData,
    getZhpjQycytlData,
    getZhpjJfzbData,
    getZhpjJFwspData
}