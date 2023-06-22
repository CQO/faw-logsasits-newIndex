import storage from '@/util/storage'
import api from '@/api'

const state = {
    account: storage.local.get('account') || '',
    token: storage.local.get('token') || '',
    failure_time: storage.local.get('failure_time') || '',
    member: JSON.parse('{}') || {},
    permissions: [],
    msgCount: 0,
    sidebar:''
}

const getters = {
    isLogin: state => {
        // return true;
        let retn = false
        if (state.token) {
            let unix = Date.parse(new Date())
            if (unix < state.failure_time * 1000) {
                retn = true
            }
        }
        return retn
    }
}

const actions = {
    closeSideBar(context, playload) {
        console.log(context,'contextcontext111222333%%%%%%%%%%~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log(playload,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        context.commit('CLOSE_SIDEBAR', playload)
      },
    login({commit}, data) {
        return new Promise((resolve, reject) => {
            // login({commit}) {
        // return new Promise(resolve => {
            // 通过 mock 进行登录
            // let _data = { ...data }
            // _data['phone'] = data.account
            // _data['orgCode'] = 'test'
            // delete _data.account
            api.post('auth/login', { username: data.account, pwd: data.password, isJson: true }).then(res => {
                commit('setUserData', res.data)
                resolve(res.data)
            }).catch(error => {
                console.log(345, error)
                reject(error)
            })

            // commit('setUserData', res.data)
            // resolve()

            // commit('setUserData', {
            //     account: data.account,
            //     token: 'asdqwer',
            //     loginUser: JSON.stringify({
            //         phone: '123456'
            //     }),
            //     failure_time: Date.parse(new Date()) / 1000 + 24 * 60 * 60
            // })
            // resolve()
        })
    },
    msgCount({commit}, data) {
        return new Promise((resolve, reject) => {
            resolve(0)
        })
    },
    editPassword({commit}, data) {
        return new Promise((resolve, reject) => {
            api.put(`${process.env.VUE_APP_API_ROOT}/system/user/profile/updatePwd`, data).then(res => {
                resolve(true)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({commit}) {
        commit('removeUserData')
        commit('menu/invalidRoutes', null, {root: true})
        commit('tabbar/clean', null, {root: true})
    },
    fetchMenus({state, commit}, data) {
        return new Promise((resolve, reject) => {
            api.get(`${process.env.VUE_APP_API_ROOT}/system/menu/list?status=&menuName=&terminals=${state.member.sysUser.terminal}`).then(res => {
                resolve((res.data || []).filter(f => f.menuType === 'M' || f.menuType === 'C'))
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取我的权限
    getPermissions({state, commit}) {
        return new Promise(resolve => {
            let _permissions = []
            commit('setPermissions', _permissions)
            resolve(_permissions)
        })
    },
}

const mutations = {
    CLOSE_SIDEBAR: (state, playload) => {
        // Cookies.set('sidebarStatus', 0)
        // state.sidebar.opened = false
        state.sidebar = playload
      },
    setUserData(state, data) {
        storage.local.set('account', data.account)
        storage.local.set('token', data.token)
        storage.local.set('failure_time', data.timeout ? new Date().getTime() + +1645505385 : 2276657385)
        storage.local.set('user', data.loginUser)
        state.account = data.account
        state.token = data.token
        state.failure_time = data.timeout ? new Date().getTime() + +1645505385 : 2276657385
        state.member = JSON.parse('{}')
    },
    removeUserData(state) {
        storage.local.remove('account')
        storage.local.remove('token')
        storage.local.remove('failure_time')
        storage.local.remove('user')
        state.account = ''
        state.token = ''
        state.failure_time = ''
    },
    setPermissions(state, permissions) {
        state.permissions = permissions
    },
    setMsgCount(state, count) {
        state.msgCount = count
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
