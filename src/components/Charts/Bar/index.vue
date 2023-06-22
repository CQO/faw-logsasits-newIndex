<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
export default {
    name: 'ChartBar',
    props: {
        title: {
            type: String,
            default: ''
        },
        datas: {
            type: Array,
            default: () => {
                return []
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
            var xData = [],
                yData = []
            var min = 0
            var max = Math.max(...this.datas.map(r => r.value))
            this.datas.map(function(a) {
                xData.push(a.name)
                if (a.value === 0) {
                    yData.push(a.value + min)
                } else {
                    yData.push(a.value)
                }
            })

            // 配置数据
            let option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            opacity: 0
                        }
                    },
                    formatter: function(prams) {
                        if (prams[0].data === min) {
                            return prams[0].name + '：0'
                        } else {
                            return prams[0].name + '：' + prams[0].data
                        }
                    }
                },
                grid: {
                    left: '0%',
                    right: 20,
                    bottom: 10,
                    top: 20,
                    containLabel: true,
                    z: 22
                },
                xAxis: [{
                    type: 'category',
                    gridIndex: 0,
                    data: xData,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#0c3b71'
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#49DBFF',
                        fontSize: 14,
                        padding: [0, 0, 0, -10]
                    }
                }],
                yAxis: [
                    {
                        type: 'value',
                        gridIndex: 0,
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        min: min,
                        max: max,
                        axisLine: {
                            lineStyle: {
                                color: '#0c3b71'
                            }
                        },
                        axisLabel: {
                            color: '#49DBFF',
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        gridIndex: 0,
                        min: min,
                        max: max,
                        splitNumber: 12,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '-',
                        type: 'bar',
                        barWidth: '30%',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 2,
                                color: new Echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: '#00feff'
                                        },
                                        {
                                            offset: 0.5,
                                            color: '#027eff'
                                        },
                                        {
                                            offset: 1,
                                            color: '#0286ff'
                                        }
                                    ]
                                )
                            }
                        },
                        data: yData,
                        zlevel: 11
                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: '50%',
                        xAxisIndex: 0,
                        yAxisIndex: 1,
                        barGap: '-135%',
                        data: [...this.datas].fill(max),
                        itemStyle: {
                            normal: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        zlevel: 9
                    }

                ]
            }
            // 传入数据
            this.chart.setOption(option)
        }
    }
}
</script>
