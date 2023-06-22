import $api from '@/api/index'

/**
 * 获取用户列表
 */
function fetchList(data) { return $api.get('/sysuser/list', { params: data }) }

/**
 * 获取用户列表
 */
function execAdd(data) { return $api.post('/sysuser/add', data) }

/**
 * 修改用户
 */
function execEdit(data) { return $api.post('/sysuser/edit', data) }

/**
 * 删除用户
 */
function execDel(data) { return $api.get(`/sysuser/del/${data.id}`) }

export default {
    fetchList, execAdd, execEdit, execDel
}
