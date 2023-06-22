<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
export default {
    name: 'ChartRadar',
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

            let _themeColors = [
                {
                    itemStyle: {
                        normal: {
                            color: 'rgba(19, 173, 255, 1)',
                            borderColor: 'rgba(19, 173, 255, 0.4)',
                            borderWidth: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(19, 173, 255, 0.5)'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'rgba(19, 173, 255, 1)',
                            width: 2,
                            type: 'dashed'
                        }
                    }
                },
                {
                    itemStyle: {
                        normal: {
                            color: 'rgba(245, 166, 35, 1)',
                            borderColor: 'rgba(245, 166, 35, 0.3)',
                            borderWidth: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(245, 166, 35, 0.4)'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'rgba(245, 166, 35, 1)',
                            width: 2,
                            type: 'dashed'
                        }
                    }
                },
                {
                    itemStyle: {
                        normal: {
                            color: 'rgba(1, 247, 255, 1)',
                            borderColor: 'rgba(1, 247, 255, 0.3)',
                            borderWidth: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(1, 247, 255, 0.4)'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'rgba(1, 247, 255, 1)',
                            width: 2,
                            type: 'dashed'
                        }
                    }
                }
            ]

            let seriesValues = []
            let _series = []
            this.data.seriesData.map((s, i) => {
                seriesValues.push(Math.max(...s.values))
                _series.push(
                    {
                        ...{
                            type: 'radar',
                            symbol: 'circle',
                            symbolSize: 5,
                            data: [ s.values ]
                        },
                        ..._themeColors[i < _themeColors.length ? i : 0]
                    }
                )
            })

            let dataMax = Math.max(...seriesValues) || 100
            const source = {
                indicator: [
                    { name: '0时', max: dataMax },
                    { name: '1时', max: dataMax },
                    { name: '2时', max: dataMax },
                    { name: '3时', max: dataMax },
                    { name: '4时', max: dataMax },
                    { name: '5时', max: dataMax },
                    { name: '6时', max: dataMax },
                    { name: '7时', max: dataMax },
                    { name: '8时', max: dataMax },
                    { name: '9时', max: dataMax },
                    { name: '10时', max: dataMax },
                    { name: '11时', max: dataMax },
                    { name: '12时', max: dataMax },
                    { name: '13时', max: dataMax },
                    { name: '14时', max: dataMax },
                    { name: '15时', max: dataMax },
                    { name: '16时', max: dataMax },
                    { name: '17时', max: dataMax },
                    { name: '18时', max: dataMax },
                    { name: '19时', max: dataMax },
                    { name: '20时', max: dataMax },
                    { name: '21时', max: dataMax },
                    { name: '22时', max: dataMax },
                    { name: '23时', max: dataMax }
                ]
            }
            // 配置数据
            let option = {
                radar: {
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            fontSize: 14, // 外圈标签字体大小
                            color: '#49DBFF' // 外圈标签字体颜色
                        }
                    },
                    center: ['50%', '50%'],
                    radius: '70%',
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    splitArea: {
                        areaStyle: {
                            color: ['transparent']
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#336ae4'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#336ae4'
                        }
                    },
                    indicator: source.indicator
                },
                series: _series
            }
            // 传入数据
            this.chart.setOption(option)
        }
    }
}
</script>
