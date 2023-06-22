import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import i18n from './lang'
import VueAnimateNumber from 'vue-animate-number'
import '@/assets/iconfont/iconfont.css';
Vue.use(VueAnimateNumber)

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import './utils/rem'
import 'echarts-liquidfill'

import api from './api'
Vue.prototype.$api = api

import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs

import auth from './util/auth'
Vue.use(auth)

import tabbar from './util/tabbar'
Vue.use(tabbar)

import cookies from 'vue-cookies'
Vue.use(cookies)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$ELEMENT = ElementUI
Vue.use(ElementUI, {
    size: store.state.settings.elementSize,
    i18n: (key, value) => i18n.t(key, value)
})

import { handleTree } from "@/utils/ruoyi";
Vue.prototype.handleTree = handleTree

import hotkeys from 'hotkeys-js'
Vue.prototype.$hotkeys = hotkeys

import Contextmenu from 'vue-contextmenujs'
Vue.use(Contextmenu)

// 全局组件自动注册
import './components/autoRegister'

// 自动加载 svg 图标
const req = require.context('./assets/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

import 'remixicon/fonts/remixicon.css'

import './assets/styles/reset.scss'

// 错误日志
import './util/error.log'

// import './mock'

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    ak: 'eiGKuUzrdbcGMssUWfbN0UC2tsFQYuzH'
})

Vue.config.productionTip = false

var vue = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
Vue.prototype.$eventBus = vue

export default vue
