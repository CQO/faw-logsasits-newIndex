import { deepClone } from '@/util'

function hasPermission(permissions, route) {
    let isAuth = false
    if (route.meta && route.meta.auth) {
        isAuth = permissions.some(auth => {
            if (typeof route.meta.auth == 'string') {
                return route.meta.auth === auth
            } else {
                return route.meta.auth.some(routeAuth => {
                    return routeAuth === auth
                })
            }
        })
    } else {
        isAuth = true
    }
    return isAuth
}

function filterAsyncRoutes(routes, permissions, mapping, prefix) {
    const keys = Object.keys(mapping);
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(permissions, tmp)) {
            if (tmp.meta && tmp.meta.auth) {
                let _idx = -1;
                tmp.meta.auth.filter(f => {
                    _idx = keys.findIndex(k => f === k)
                    return _idx > -1
                })
                if (_idx > -1) {
                    tmp['meta']['title'] = mapping[keys[_idx]].menuName || tmp['meta']['title']
                    tmp['meta']['icon'] = mapping[keys[_idx]].icon || tmp['meta']['icon']
                }
            }
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, permissions, mapping, prefix)
                tmp.children.length && res.push(tmp)
            } else {
                res.push(tmp)
            }
        }
    })
    return res
}

// 将多层嵌套路由处理成平级
function flatAsyncRoutes(routes, breadcrumb, baseUrl = '') {
    let res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (tmp.children) {
            let childrenBaseUrl = ''
            if (baseUrl == '') {
                childrenBaseUrl = tmp.path
            } else if (tmp.path != '') {
                childrenBaseUrl = `${baseUrl}/${tmp.path}`
            }
            let childrenBreadcrumb = deepClone(breadcrumb)
            if (route.meta.breadcrumb !== false) {
                childrenBreadcrumb.push({
                    path: childrenBaseUrl,
                    title: route.meta.title,
                    i18n: route.meta.i18n
                })
            }
            let tmpRoute = deepClone(route)
            tmpRoute.path = childrenBaseUrl
            tmpRoute.meta.breadcrumbNeste = childrenBreadcrumb
            delete tmpRoute.children
            res.push(tmpRoute)
            let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb, childrenBaseUrl)
            childrenRoutes.map(item => {
                // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
                if (res.some(v => v.path == item.path)) {
                    res.forEach((v, i) => {
                        if (v.path == item.path) {
                            res[i] = item
                        }
                    })
                } else {
                    res.push(item)
                }
            })
        } else {
            if (baseUrl != '') {
                if (tmp.path != '') {
                    tmp.path = `${baseUrl}/${tmp.path}`
                } else {
                    tmp.path = baseUrl
                }
            }
            // 处理面包屑导航
            let tmpBreadcrumb = deepClone(breadcrumb)
            if (tmp.meta.breadcrumb !== false) {
                tmpBreadcrumb.push({
                    path: tmp.path,
                    title: tmp.meta.title,
                    i18n: tmp.meta.i18n
                })
            }
            tmp.meta.breadcrumbNeste = tmpBreadcrumb
            res.push(tmp)
        }
    })
    return res
}

const state = {
    isGenerate: false,
    routes: [],
    headerActived: 0
}

const getters = {
    sidebarRoutes: state => {
        return state.routes.length > 0 ? state.routes[state.headerActived].children : []
    }
}

const actions = {
    // 根据权限动态生成路由
    generateRoutes({rootState, dispatch, commit}, data) {
        let _prefixs = {
            '-1': 'platform',
            '1': 'org',
            '2': 'moe',
            '3': 'school'
        }
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async resolve => {
            let accessedRoutes
            // 判断权限功能是否开启
            if (rootState.settings.openPermission) {
                const permissions = await dispatch('user/getPermissions', null, { root: true })
                const menus = await dispatch('user/fetchMenus', null, { root: true })
                let _mapping = {};
                (menus || []).map(m => {
                    _mapping[`${_prefixs[rootState.user.member.sysUser.terminal + '']}-${m.perms}`] = m
                });
                accessedRoutes = filterAsyncRoutes(data.asyncRoutes, permissions, _mapping, _prefixs[rootState.user.member.sysUser.terminal + ''])
            } else {
                accessedRoutes = data.asyncRoutes
            }
            commit('setRoutes', accessedRoutes)
            commit('setHeaderActived', data.currentPath)
            let routes = []
            accessedRoutes.map(item => {
                routes.push(...item.children)
            })
            if (rootState.settings.enableFlatRoutes) {
                routes.map(item => {
                    if (item.children) {
                        item.children = flatAsyncRoutes(item.children, [{
                            path: item.path,
                            title: item.meta.title,
                            i18n: item.meta.i18n
                        }])
                    }
                })
            }
            resolve(routes)
        })
    }
}

const mutations = {
    invalidRoutes(state) {
        state.isGenerate = false
        state.headerActived = 0
    },
    setRoutes(state, routes) {
        state.isGenerate = true
        let newRoutes = deepClone(routes)
        state.routes = newRoutes.filter(item => {
            return item.children.length != 0
        })
    },
    // 根据路由判断属于哪个头部导航
    setHeaderActived(state, path) {
        state.routes.map((item, index) => {
            if (
                item.children.some(r => {
                    return path.indexOf(r.path + '/') === 0 || path == r.path
                })
            ) {
                state.headerActived = index
            }
        })
    },
    // 切换头部导航
    switchHeaderActived(state, index) {
        state.headerActived = index
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
