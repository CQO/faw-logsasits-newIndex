const state = {
    dot: true,
    number: 10,
    unprocessedNumber: 0,
    text: '热门'
}

const getters = {}

const actions = {}

const mutations = {
    switchDot(state) {
        state.dot = !state.dot
    },
    setNumber(state, number) {
        state.number = number
    },
    setUnprocessedNumber(state, number) {
        state.unprocessedNumber = number
    },
    setText(state, text) {
        state.text = text
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
