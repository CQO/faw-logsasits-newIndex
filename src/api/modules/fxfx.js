// 路距测算
import $api from '@/api/index'

// 费效分析-----费效分析
export function getFxfxFxfxData(data) {
    return $api({
        url: 'screen-fzjcFxfxList',
        method: 'post',
        data
    })
}

export default{
    getFxfxFxfxData,
}