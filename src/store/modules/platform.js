import api from '@/api'

const state = {
    activities: [],
    bureaus: [],
    depts: [],
    grades: [],
}

const getters = {
}

const actions = {
    fetchActivityList({commit}, data) {
        api.post(process.env.VUE_APP_API_ROOT + '/activity/act/list', {
            pageSize: 999999,
        }).then(res => {
            let _converts = (res.data.rows || []).map(r => {
                return {
                    id: r.id,
                    name: r.name
                }
            })
            commit('SET_ACTIVITIES_LIST', _converts)
        }).catch(error => {
            console.log(error)
        })
    },
    fetchBureauList({commit}, data) {
        api.get(process.env.VUE_APP_API_ROOT + '/system/bureau/list', {
            pageSize: 999999,
        }).then(res => {
            commit('SET_BUREAUS_LIST', res.rows)
        }).catch(error => {
            console.log(error)
        })
    },
    fetchDeptList({commit}, data) {
        api.get(process.env.VUE_APP_API_ROOT + '/system/dept/list', {
            pageSize: 999999,
        }).then(res => {
            let _converts = (res.data || []).map(r => {
                return {
                    id: r.deptId,
                    name: r.deptName
                }
            })
            commit('SET_DEPT_LIST', _converts)
        }).catch(error => {
            console.log(error)
        })
    },
    fetchGradeList({rootState, commit}, data) {
        if (rootState.user.member.sysUser.terminal === 3) {
            api.get(process.env.VUE_APP_API_ROOT + '/system/schoolGrade/enableGrade', {
                pageSize: 999999, ...data
            }).then(res => {
                let _converts = (res.data || []).map(r => {
                    return {
                        id: r.gid,
                        name: r.gradeName
                    }
                })
                commit('SET_GRADE_LIST', _converts)
            }).catch(error => {
                console.log(error)
            })
        } else {
            api.get(process.env.VUE_APP_API_ROOT + '/system/grade/list', {
                pageSize: 99999999, ...data
            }).then(res => {
                let _converts = (res.rows || []).map(r => {
                    return {
                        id: r.id,
                        name: r.gradeName
                    }
                })
                commit('SET_GRADE_LIST', _converts)
            }).catch(error => {
                console.log(error)
            })
        }
    }

}

const mutations = {
    SET_ACTIVITIES_LIST(state, data) {
        state.activities = data
    },
    SET_BUREAUS_LIST(state, data) {
        state.bureaus = data
    },
    SET_DEPT_LIST(state, data) {
        state.depts = data
    },
    SET_GRADE_LIST(state, data) {
        state.grades = data
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
