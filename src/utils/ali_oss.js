const OSS = require('ali-oss')

export function ossClient(data) {
    //后端提供数据
    return new OSS({
        // secure: true,
        region: data.region, //oss-cn-shenzhen.aliyuncs.com
        accessKeyId: data.accessKeyId,
        accessKeySecret: data.accessKeySecret,
        // stsToken: data.securityToken,
        bucket: data.bucket,
        refreshSTSToken: async () => {
            const refreshToken = await fetch('http://127.0.0.1/sts');
            return {
                accessKeyId: refreshToken.AccessKeyId,
                accessKeySecret: refreshToken.AccessKeySecret,
                stsToken: refreshToken.SecurityToken,
            }
        }
    })
    // //后端提供数据
    // return new OSS({
    //     // secure: true,
    //     region: 'oss-cn-huhehaote', //oss-cn-shenzhen.aliyuncs.com
    //     accessKeyId: 'x',
    //     accessKeySecret: 'x',
    //     bucket: 'shili-img',
    //     refreshSTSToken: async () => {
    //         const refreshToken = await fetch('http://127.0.0.1/sts');
    //         return {
    //             accessKeyId: refreshToken.AccessKeyId,
    //             accessKeySecret: refreshToken.AccessKeySecret,
    //             stsToken: refreshToken.SecurityToken,
    //         }
    //     }
    // })
}

