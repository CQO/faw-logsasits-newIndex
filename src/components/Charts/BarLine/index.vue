<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
export default {
    name: 'ChartBarLine',
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
            this.chart = Echarts.init(this.$refs.chart)

            let dataList = []
            this.data.names.map((name, i) => {
                dataList.push(
                    {
                        name: name,
                        value: this.data.values[i]
                    }
                )
            })

            let lineDataList = []
            this.data.names.map((name, i) => {
                lineDataList.push(
                    {
                        name: name,
                        value: this.data.comparisons[i]
                    }
                )
            })

            // 配置数据
            let option = {
                grid: {
                    left: '10%', // 距离左边的距离
                    right: '13%', // 距离右边的距离
                    bottom: 40, // 距离下边的距离
                    top: '8%' // 距离上边的距离
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: this.data.names,
                    axisLabel: {
                        textStyle: {
                            color: '#49DBFF',
                            fontSize: 14,
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#49DBFF',
                                fontSize: 12,
                                fontFamily: 'Microsoft YaHei'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#49DBFF',
                                fontSize: 12,
                                fontFamily: 'Microsoft YaHei'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        data: dataList,
                        barGap: '-100%',
                        barCategoryGap: '60%',
                        itemStyle: {
                            normal: {
                                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#499ef4'
                                    },
                                    {
                                        offset: 1,
                                        color: '#3eb5dd'
                                    }
                                ])
                            },
                            emphasis: {
                                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#3eb5dd'
                                    },
                                    {
                                        offset: 1,
                                        color: '#499ef4'
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: '环比',
                        type: 'line',
                        yAxisIndex: 1,
                        data: lineDataList,
                        itemStyle: {
                            normal: {
                                color: '#ff7f50'
                            }
                        }
                    }
                ]
            }
            // 传入数据
            this.chart.setOption(option)
        }
    }
}
</script>
