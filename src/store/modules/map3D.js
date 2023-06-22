const state = {
    mapCkthdData:[],
    mapWlckData:[],
    mapSgdwData:[],
    mapLineData:[],
    mapGcthData:[],
    searchCkthdData:[],
    searchWlckData:[],
    searchSgdwData:[],
    searchLineData:[],
    searchGcthData:[]
}

const getters = {}

const actions = {}

const mutations = {
    searchCkthdData(state,CkthdData) {
        state.searchCkthdData = CkthdData
    },
    searchWlckData(state,WlckData) {
        state.searchWlckData = WlckData
    },
    searchSgdwData(state,SgdwData) {
        state.searchSgdwData = SgdwData
    },
    // mapLineData(state,mapLineData) {
    //     state.mapLineData = mapLineData
    // },
    searchGcthData(state,GcthData) {
        state.searchGcthData = GcthData
    },
    mapCkthdData(state,ckthdData) {
        state.mapCkthdData = ckthdData
    },
    mapWlckData(state,wlckData) {
        state.mapWlckData = wlckData
    },
    mapSgdwData(state,sgdwData) {
        state.mapSgdwData = sgdwData
    },
    mapLineData(state,mapLineData) {
        state.mapLineData = mapLineData
    },
    mapGcthData(state,mapGcthData) {
        state.mapGcthData = mapGcthData
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
