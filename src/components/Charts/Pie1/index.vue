<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
export default {
    name: 'ChartPie1',
    props: {
        subTitle: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        colors: {
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
            this.chart = this.chart || Echarts.init(this.$refs.chart)
            // 配置数据
            let option = {

                title: [ {
                    text: this.data.value + '%',
                    subtext: this.subTitle,
                    x: 'center',
                    top: '40%',
                    textStyle: {
                        fontSize: '20',
                        color: '#FFFFFF',
                        fontFamily: 'DINAlternate-Bold, DINAlternate',
                        foontWeight: '600'
                    },
                    subtextStyle: {
                        fontSize: '12',
                        color: '#919193',
                        fontFamily: 'DINAlternate-Bold, DINAlternate',
                        lineHeight: 4
                    }
                }],
                polar: {
                    radius: ['42%', '56%'],
                    center: ['50%', '50%']
                },
                angleAxis: {
                    max: 100,
                    show: false
                },
                radiusAxis: {
                    type: 'category',
                    show: true,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        roundCap: true,
                        barWidth: 90,
                        showBackground: true,
                        data: [ this.data.value ],
                        coordinateSystem: 'polar',
                        itemStyle: {
                            normal: {
                                color: new Echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 1,
                                        color: this.colors && this.colors.length ? this.colors[0] : '#16CEB9'
                                    },
                                    {
                                        offset: 0.5,
                                        color: this.colors && this.colors.length ? this.colors[1] : '#16CEB9'
                                    },
                                    {
                                        offset: 0,
                                        color: this.colors && this.colors.length ? this.colors[2] : '#6648FF'
                                    }
                                ])
                            }
                        }
                    },
                    {
                        name: '',
                        type: 'pie',
                        startAngle: 80,
                        radius: ['60%'],
                        hoverAnimation: false,
                        center: ['50%', '50%'],
                        itemStyle: {
                            color: 'rgba(66, 66, 66, .1)',
                            borderWidth: 1,
                            borderColor: '#344979'
                        },
                        data: [100]
                    },
                    {
                        name: '',
                        type: 'pie',
                        startAngle: 80,
                        radius: ['38%'],
                        hoverAnimation: false,
                        center: ['50%', '50%'],
                        itemStyle: {
                            color: 'rgba(66, 66, 66, .1)',
                            borderWidth: 1,
                            borderColor: '#344979'
                        },
                        data: [100]
                    }
                ]

            }
            // 传入数据
            this.chart.setOption(option, true)
        }
    }
}
</script>
