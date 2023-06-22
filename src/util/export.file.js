import axios from 'axios'
import store from '@/store/index'
import Qs from 'qs'

const mimeMap = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
  zip: 'application/zip'
}

const baseUrl = process.env.VUE_APP_API_ROOT
export function exportFile(path, fileName, method, data, callback, errCallback) {
    let _params = {};
    if (method === 'get' || method === 'GET') {
        _params = data
    }
    axios({
        method: method || 'post',
        data: Qs.stringify(data, { allowDots: true }),
        params: _params,
        url: baseUrl + path,
        responseType: 'arraybuffer',
        headers: {
            'Authorization': store.state.user.token,
            'satoken': store.state.user.token
        }
    }).then(res => {
        resolveBlob(res.data, fileName, mimeMap.xlsx)
        if (callback) {
            callback();
        }
    }).catch(e => {
        if (errCallback) {
            errCallback(e)
        } else {
            console.log('download file error: ', e);
        }
    })
}

/**
 * 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} mimeType MIME类型
 */
export function resolveBlob(res, fileName, mimeType) {
    if (res.code) {
        this.$Message.error({ content: '下载失败, 请稍后重试.', duration: 2.5 });
    } else {
        if ('msSaveOrOpenBlob' in navigator){
            window.navigator.msSaveOrOpenBlob(new Blob([res]), fileName);
        } else {
            let blob = new Blob([res], { type: mimeType });
            // let patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
            // let contentDisposition = decodeURI(res.headers['content-disposition'])
            // let result = patt.exec(contentDisposition)
            // let fileName = result[1].replace(/\"/g, '')
            let dataObject = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.download = fileName;
            a.href = dataObject;
            // a.setAttribute('download', 'a.xlsx') // 设置下载文件名称
            document.body.appendChild(a);
            a.click();
            a.parentNode.removeChild(a);
            window.URL.revokeObjectURL(dataObject); //释放掉blob对象
        }
    }
}
