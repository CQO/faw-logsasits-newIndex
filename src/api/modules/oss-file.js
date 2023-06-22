import $api from '@/api/index'

/**
 * 获取oss临时凭证
 */
function fetchOSSConfig(query) { return $api.get('/system/file/getOSSConfig') }

export default {
    fetchOSSConfig
}
