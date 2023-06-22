// 需求分析
import $api from '@/api/index'

export function getAreaData(data) {
    return $api({
        url: 'screen-fzjcXqfx',
        method: 'post',
        data
    })
}
export function getAreaList(data) {
    return $api({
        url: 'screen-xqfxXqfb',
        method: 'post',
        data
    })
}
// 需求分布列表
export function getAreaDiaList(data) {
    return $api({
        url: 'screen-xqfxXqfbList',
        method: 'post',
        data
    })
}
// 需求库存
export function getAreaDemandKcList(data) {
    return $api({
        url: 'screen-xqfxXqkc',
        method: 'post',
        data
    })
}
// 需求库存导出
export function getAreaXqkcDiaListExport(data) {
    return $api({
        url: 'screen-xqfxXqkcListExport',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 需求库存列表
export function getAreaXqkcDiaList(data) {
    return $api({
        url: 'screen-xqfxXqkcList',
        method: 'post',
        data
    })
}
// 储备预算
export function getCbysList(data) {
    return $api({
        url: 'screen-xqfxCbyc',
        method: 'post',
        data
    })
}
// 需求储备预测导出
export function getAreaXqcbycDiaListExport(data) {
    return $api({
        url: 'screen-xqfxCbycListExport',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
// 储备预算列表
export function getCbysDiaList(data) {
    return $api({
        url: 'screen-xqfxCbycList',
        method: 'post',
        data
    })
}

// 战区统计
export function getDemandTjData(data) {
    return $api({
        url: 'screen-xqfxZqtj',
        method: 'post',
        data
    })
}

// 战区统计
export function getTypeTjData(data) {
    return $api({
        url: 'screen-xqfxFltj',
        method: 'post',
        data
    })
}
// 战区统计列表
export function getZqTjList(data) {
    return $api({
        url: 'screen-xqfxZqtjList',
        method: 'post',
        data
    })
}
// 需求总量列表
export function getXqfxFltjList(data) {
    return $api({
        url: 'screen-xqfxFltjList',
        method: 'post',
        data
    })
}

// 解决方案列表
export function getXqfxJjfaList(data) {
    return $api({
        url: 'screen-xqfxJjfaList',
        method: 'post',
        data
    })
}

// 解决方案列表获取状态
export function getXqfxJjfaStatusList(data) {
    return $api({
        url: 'screen-xqfxJjfaStatusList',
        method: 'post',
        data
    })
}

// 点击下载生成解决方案
export function getXqfxJjfaData(data) {
    return $api({
        url: 'screen-xqfxJjfa',
        method: 'post',
        data
    })
}