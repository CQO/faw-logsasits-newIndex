<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
export default {
    name: 'ChartPie',
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.initChart()
        window.addEventListener('resize', () => {
            this.chart.resize()
        })
    },
    methods: {
        initChart() {
            // 初始化
            this.chart = this.chart || Echarts.init(this.$refs.chart)
            // 职称结构取数
            var getsjjg = this.data.names
            var getsjjgrs = this.data.values
            var syjgdata = []
            var total = 0
            for (var i = 0; i < getsjjg.length; i++) {
                syjgdata.push({
                    name: getsjjg[i],
                    value: getsjjgrs[i]
                })
                total += (getsjjgrs[i] || 0)
            }
            var syjgdata2 = []
            for (var x = 0; x < getsjjg.length; x++) {
                syjgdata2.push({
                    name: getsjjg[x],
                    value: 100
                })
            }
            console.log(syjgdata, syjgdata2)

            // var rich = {
            //     name: {
            //         color: '#99B3FF',
            //         fontSize: 14,
            //         padding: [0, 5],
            //         fontWeight: '400',
            //         align: 'right'
            //     },
            //     value: {
            //         color: '#99B3FF',
            //         fontSize: 14,
            //         padding: [5, 5],
            //         fontWeight: '500',
            //         align: 'right'
            //     },
            //     percent: {
            //         color: '#99B3FF',
            //         align: 'right',
            //         fontSize: 14,
            //         fontWeight: '500',
            //         padding: [0, 5]
            //     },
            //     hr: {
            //         borderColor: '#DFDFDF',
            //         width: '100%',
            //         borderWidth: 1,
            //         height: 0
            //     }
            // }
            // 职称结构图表
            var colorList = ['#9f6afb', '#324dfe', '#7f1df4', '#5377fd', '#536EBF', '#6E93FF', '#5FEBFF', '#8AF1FF', '#8AF1FF']

            // 配置数据
            let option = {
                legend: {
                    type: 'scroll',
                    // orient: 'vertical',
                    bottom: 20,
                    // textStyle: {
                    //     color: '#fff'
                    // },
                    data: getsjjg,
                    // formatter: function(name, a, b) {
                    //     console.log(name, a, b)
                    //     // return `{title|${name}}{percent|${getsjjgrs[name].percent}}{unit|%}`
                    //     return '1'
                    // },
                    // 重写legend显示样式
                    formatter: function(name) {
                        // 获取legend显示内容
                        // let data = option.series[0].data
                        // let total = 0
                        // let tarValue = 0
                        // for (let i = 0, l = data.length; i < l; i++) {
                        //     total += data[i].value
                        //     if (data[i].name == name) {
                        //         tarValue = data[i].value
                        //     }
                        // }
                        // let p = (tarValue / total * 100).toFixed(2)
                        // return `{title|${name}}{percent|${p}}{percent|%}`
                        return `{title|${name}}`
                    },
                    textStyle: {
                        rich: {
                            title: {
                                color: '#BCF0FE',
                                width: 70,
                                fontSize: 14
                            },
                            percent: {
                                color: '#BCF0FE',
                                fontSize: 14
                            }
                        }
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [{
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            },
                            borderColor: '#172659',
                            borderWidth: 3,
                            label: {
                                show: true,
                                position: 'outside',
                                color: '#ddd',
                                formatter: function(item) {
                                    // let data = option.series[0].data
                                    // let total = 0
                                    // let tarValue = 0
                                    // for (let i = 0, l = data.length; i < l; i++) {
                                    //     total += data[i].value
                                    //     if (data[i].name == name) {
                                    //         tarValue = data[i].value
                                    //     }
                                    // }
                                    let p = 0
                                    if (total > 0) {
                                        p = (item.value / total * 100).toFixed(0)
                                    } else {
                                        p = 0
                                    }
                                    return `{title|${item.name}}\n\n数量: ${item.value}({percent|${p}}{percent|%})`
                                    // return `${total > 0 ? item.value / 0}`
                                },
                                textStyle: {
                                    rich: {
                                        title: {
                                            align: 'left',
                                            color: '#BCF0FE',
                                            // width: 70,
                                            fontSize: 14
                                        },
                                        percent: {
                                            // color: '#BCF0FE',
                                            fontSize: 12
                                        }
                                    }
                                }
                            },
                            labelLine: {
                                length: 10,
                                length2: 20,
                                show: true,
                                color: '#00ffff'
                            }
                        }
                    },
                    // itemStyle: {
                    //     normal: {
                    //         label: {
                    //             show: true,
                    //             position: 'outside',
                    //             color: '#ddd',
                    //             formatter: function() {
                    //                 return ''
                    //             }
                    //         },
                    //         labelLine: {
                    //             length: 30,
                    //             length2: 100,
                    //             show: true,
                    //             color: '#00ffff'
                    //         }
                    //     }
                    // },
                    type: 'pie',
                    // clockWise: false ,
                    // roseType: 'radius',
                    radius: ['25%', '46%'],
                    center: ['50%', '46%'],
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#34569D'
                            }
                        }
                    },
                    label: {
                        show: false
                    //     normal: {
                    //         formatter: params => {
                    //             return (
                    //                 '{name|' + params.name + '}{percent|' + params.percent.toFixed(0) + '%}'
                    //             )
                    //         },
                    //         rich: rich,
                    //         padding: [0, -5, 0, -5]
                    //     }
                    },
                    data: syjgdata
                }, {
                    itemStyle: {
                        normal: {
                            color: 'rgba(62,109,255,0.1)'
                        }
                    },
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['20%', '51%'],
                    center: ['50%', '46%'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: 1
                    }],
                    z: -1
                }]
            }
            // 传入数据
            this.chart.setOption(option, true)
        }
    }
}
</script>
