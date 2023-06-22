import Mock from 'mockjs'

const Random = Mock.Random // 获取 mock.Random 随机对象
// 模拟一组数据
const getList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let listObject = {
            id: Random.integer(0), // 生成随机数，最小值是0
            title: Random.csentence(10, 30), // 生成随机文本，字数在10-30之间
            date: Random.datetime('yyyy-MM-dd hh:mm:ss'), // 格式化日期
            link: Random.url(), // 生成随机网址
        }
        list.push(listObject)
    }
    return {
        data: list
    }
}
Mock.mock('/list', 'get', getList)
