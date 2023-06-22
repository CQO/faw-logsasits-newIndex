const state = {
    callDialogShow: false,
    callDialogData: {},
    keyAuthorizationDialogShow: false,
    keyAuthorizationDialogData: {},
    sendSmsDialogShow: false,
    sendSmsDialogData: {},
    resultModifyDialogShow: false,
    resultModifyDialogData: {},
    audioDialogShow: false,
    audioDialogData: {}
}

const getters = {
}

const actions = {
    setCallDialogShow({commit}, data) {
        commit('SET_CALL_DIALOG_SHOW', data)
    },
    setKeyAuthorizationDialogShow({commit}, data) {
        commit('SET_KEY_AUTHORIZATION_DIALOG_SHOW', data)
    },
    setSendSmsDialogShow({commit}, data) {
        commit('SET_SEND_SMS_DIALOG_SHOW', data)
    },
    setResultModifyDialogShow({commit}, data) {
        commit('SET_RESULT_MODIFY_DIALOG_SHOW', data)
    },
    setAudioDialogShow({commit}, data) {
        commit('SET_AUDIO_DIALOG_SHOW', data)
    }
}

const mutations = {
    SET_CALL_DIALOG_SHOW(state, data) {
        if (data.status === true) {
            state.callDialogShow = true
            let _params = JSON.parse(JSON.stringify(data.vo));
            if (data.type) {
                _params['type'] = data.type
            }
            state.callDialogData = _params
        } else {
            state.callDialogShow = false
            state.callDialogData = {}
        }
    },
    SET_KEY_AUTHORIZATION_DIALOG_SHOW(state, data) {
        if (data.status === true) {
            state.keyAuthorizationDialogShow = true
            state.keyAuthorizationDialogData = data.vo
        } else {
            state.keyAuthorizationDialogShow = false
            state.keyAuthorizationDialogData = {}
        }
    },
    SET_SEND_SMS_DIALOG_SHOW(state, data) {
        if (data.status === true) {
            state.sendSmsDialogShow = true
            state.sendSmsDialogData = data.vo
        } else {
            state.sendSmsDialogShow = false
            state.sendSmsDialogData = {}
        }
    },
    SET_RESULT_MODIFY_DIALOG_SHOW(state, data) {
        if (data.status === true) {
            state.resultModifyDialogShow = true
            state.resultModifyDialogData = data.vo
        } else {
            state.resultModifyDialogShow = false
            state.resultModifyDialogData = {}
        }
    },
    SET_AUDIO_DIALOG_SHOW(state, data) {
        if (data.status === true) {
            state.audioDialogShow = true
            state.audioDialogData = data.vo
        } else {
            state.audioDialogShow = false
            state.audioDialogData = {}
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
