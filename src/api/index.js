import axios from 'axios'
import Qs from 'qs'
import router from '@/router/index'
import store from '@/store/index'
import {Message} from 'element-ui'

const toLogin = () => {
    router.push({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

const baseURL = process.env.VUE_APP_API_ROOT

const api = axios.create({    
    // baseURL: window.ipConfig.baseUrl, // 线上部署
    baseURL: process.env.NODE_ENV === 'development' ?'/api' : process.env.VUE_APP_API_ROOT , // 本地开发
    timeout: 120000,
    responseType: 'json'
    // withCredentials: true
})

api.interceptors.request.use(
    request => {
        request.headers['X-Requested-With'] = 'XMLHttpRequest'
        // request.headers['Content-Type'] = 'application/json; charset=UTF-8'
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

        request.paramsSerializer = params => {
            // Qs is not included in the Axios package
            return Qs.stringify(params, {
              arrayFormat: "brackets",
              encode: false,
              allowDots: true
            });
        };

        let _isJson = request.data ? request.data.isJson : false;
        if (_isJson) {
            request.headers['Content-Type'] = 'application/json; charset=UTF-8'
            delete request.data.isJson
        }
        let _hasPageId = request.data ? request.data.pageId : undefined;
        if (_hasPageId) {
            request.headers['pageId'] = _hasPageId
            delete request.data.pageId
        }
        request.headers['terminal'] = 'pc'

        if (store.getters['user/isLogin']) {
            request.headers['Authorization'] = store.state.user.token
            request.headers['satoken'] = store.state.user.token
        }
        if ((request.method == 'post' || request.method == 'put') && !_isJson) {
            if (request.data instanceof FormData) {
                if (store.getters['user/isLogin']) {
                    // 如果是 FormData 类型（上传图片）
                    request.data.append('auth-token', store.state.user.token)
                }
            } else {
                // 带上 token
                if (request.data == undefined) {
                    request.data = {}
                }
                request.data = Qs.stringify(request.data, { allowDots: true })
            }
        } else {
            // 带上 token
            if (request.params == undefined) {
                request.params = {}
            }
        }
        return request
    }
)

let _codes = [ 400000001, 100000418, 100000425 ]
api.interceptors.response.use(
    response => {
        /*if (response.data.code !== 0) {
            // 如果接口请求时发现 token 失效，则立马跳转到登录页
            if (response.data.code === 401) {
                // localStorage.removeItem('fa_token')
                // localStorage.removeItem('fa_account')
                // localStorage.removeItem('fa_failure_time')
                store.dispatch('user/logout').then(() => {
                    localStorage.removeItem('fa_token')
                    localStorage.removeItem('fa_account')
                    localStorage.removeItem('fa_failure_time')
                    toLogin()
                })
                // window.location.href = '/login'
            }
            if (_codes.includes(response.data.code)) {

            } else {
                Message.error(response.data.msg || '操作失败, 请稍后重试.')
            }
            return Promise.reject(response.data)
        }*/
        return Promise.resolve(response.data)
    },
    error => {
        return Promise.reject(error)
    }
)

export default api
export {
    baseURL
}
