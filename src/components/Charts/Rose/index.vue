<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
export default {
    name: 'ChartRose',
    props: {
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
            var colorArr = ['#218de0', '#01cbb3', '#85e647', '#5d5cda', '#05c5b0', '#c29927']
            var colorAlpha = ['rgba(60,170,211,0.05)', 'rgba(1,203,179,0.05)', 'rgba(133,230,71,0.05)', 'rgba(93,92,218,0.05)', 'rgba(5,197,176,0.05)', 'rgba(194,153,39,0.05)']

            var _convertDatas = []
            this.datas.map((d, i) => {
                _convertDatas.push(
                    {
                        value: d.value,
                        name: d.name,
                        itemStyle: {
                            borderColor: colorArr[i < colorAlpha.length ? i : 0],
                            borderWidth: 2,
                            shadowBlur: 20,
                            shadowColor: '#41a8f8',
                            shadowOffsetx: 25,
                            shadowOffsety: 20,
                            color: colorAlpha[i < colorAlpha.length ? i : 0]
                        }
                    },
                )
            })

            // 配置数据
            let option = {
                grid: {
                    left: -100,
                    top: 70,
                    bottom: 20,
                    right: 10,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                legend: {
                    show: false
                },
                polar: {},
                angleAxis: {
                    interval: 1,
                    type: 'category',
                    data: [],
                    z: 10,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#0B4A6B',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        show: true,
                        color: '#0B4A6B',
                        margin: 8,
                        fontSize: 16
                    }
                },
                radiusAxis: {
                    min: 20,
                    max: 120,
                    interval: 20,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#0B3E5E',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        show: false,
                        padding: [0, 0, 20, 0],
                        color: '#0B3E5E',
                        fontSize: 16
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#07385e',
                            width: 2,
                            type: 'dashed'
                        }
                    }
                },
                calculable: true,
                series: [ {
                    stack: 'a',
                    type: 'pie',
                    radius: '80%',
                    roseType: 'radius',
                    zlevel: 10,
                    startAngle: 100,
                    label: {
                        normal: {
                            formatter: [ '{b|{b}}', '{d|{d}%}'].join('\n'),
                            rich: {
                                b: {
                                    color: '#3bd2fe',
                                    fontSize: 14,
                                    lineHeight: 20
                                },
                                d: {
                                    color: '#d0fffc',
                                    fontSize: 14,
                                    height: 20
                                }
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 10,
                            length2: 45,
                            lineStyle: {
                                color: '#0096b1'

                            }
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: _convertDatas
                } ]
            }
            // 传入数据
            this.chart.setOption(option)
        }
    }
}
</script>
