<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
export default {
    name: 'ChartArea',
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
            // var xData = [],
            //     yData = []
            // var min = 0
            // var max = Math.max(...this.datas.map(r => r.value))
            // this.datas.map(function(a) {
            //     xData.push(a.name)
            //     if (a.value === 0) {
            //         yData.push(a.value + min)
            //     } else {
            //         yData.push(a.value)
            //     }
            // })

            let _series = this.data.series.map(s => {
                return {
                    name: s.name,
                    type: 'line',
                    smooth: true, // 是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    symbol: 'circle',
                    symbolSize: 8,
                    lineStyle: {
                        normal: {
                            color: '#49DBFF',
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5
                        }
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#00b3f4'
                        }
                    },
                    itemStyle: {
                        color: '#49DBFF',
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowColor: '#49DBFF',
                        shadowBlur: 10
                        // shadowOffsetY: 2,
                        // shadowOffsetX: 2
                    },
                    tooltip: {
                        show: false
                    },
                    // areaStyle: {
                    //     normal: {
                    //         color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    //             {
                    //                 offset: 0,
                    //                 color: 'rgba(0,179,244,0.3)'
                    //             },
                    //             {
                    //                 offset: 1,
                    //                 color: 'rgba(0,179,244,0)'
                    //             }
                    //         ], false),
                    //         shadowColor: 'rgba(0,179,244, 0.9)',
                    //         shadowBlur: 20
                    //     }
                    // },
                    data: s.values
                }
            })

            // 配置数据
            let option = {
                legend: {
                    show: true,
                    icon: 'rect',
                    itemWidth: 20,
                    // itemHeight: 3,
                    right: 30,
                    top: '0%',
                    textStyle: {
                        color: '#fff'
                    },
                    data: this.data.series.map(s => s.name)
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(0, 255, 233,0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(255, 255, 255,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0, 255, 233,0)'
                                }],
                                global: false
                            }
                        }
                    }
                },
                grid: {
                    top: '50',
                    left: '60',
                    right: '5%',
                    bottom: '15%'
                    // containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    axisLine: {
                        show: true, // 隐藏X轴轴线
                        lineStyle: {
                            color: '#49DBFF',
                            width: 2
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            color: '#49DBFF'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    boundaryGap: false,
                    data: ['11/09', '11/08', '11/07', '11/06', '11/05', '11/04']

                }],

                yAxis: [{
                    type: 'value',
                    min: 0,
                    // max: 140,
                    splitNumber: 7,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#26D9FF',
                            width: 2
                        }
                    },
                    axisLabel: {
                        show: true,
                        margin: 10,
                        textStyle: {
                            color: '#49DBFF',
                            fontSize: 12
                        }
                    },
                    axisTick: {
                        show: true
                    }
                }],
                series: _series
            }
            // 传入数据
            this.chart.setOption(option)
        }
    }
}
</script>
