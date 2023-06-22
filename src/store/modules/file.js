const state = {
    // 图片文件限定
    picture: {
        // 单位为M
        limitSize: 5,
        // 限定格式
        suffixes: [ 'jpg', 'jpeg', 'png' ]
    },
    // 视频文件限定
    videos: {
        // 单位为M
        limitSize: 50,
        // 限定格式
        suffixes: [ 'mp4' ]
    },
    // 文档文件限定
    doc: {
        // 单位为M
        limitSize: 5,
        // 限定格式
        suffixes: [ 'docx', 'doc', 'pdf' ]
    },
    // 图片及文档文件限定
    picAndDoc: {
        // 单位为M
        limitSize: 5,
        suffixes: [ 'jpg', 'jpeg', 'png', 'docx', 'doc', 'pdf' ]
    },
    any: {
        // 单位为M
        limitSize: 5,
        suffixes: [ ]
    }
}

const getters = {
}

const actions = {
}

const mutations = {
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
