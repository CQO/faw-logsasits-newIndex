<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
import 'echarts-liquidfill'
export default {
    name: 'ChartLiquidFill',
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        color: {
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
            var { value } = this.data;
            // 配置数据
            let option = {
                series:[{
                    type: 'liquidFill',
                    radius: '94%',
                    data: [0.3, 0.2],
                    backgroundStyle: {
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(0,24,55, 0)'
                                },
                                {
                                    offset: 0.75,
                                    color: 'rgba(0,24,55, 0)'
                                },
                                {
                                    offset: 1,
                                    color: this.color.outline || '#8d48f9'
                                }
                            ],
                            globalCoord: false
                        },
                    },
                    outline: {
                        borderDistance: 5,
                        itemStyle: {
                            borderWidth: 3,
                            borderColor: this.color.outline || '#8d48f9',
                        },
                    },
                    color: this.color.colors || ['rgba(197,163,253, 0.6)', 'rgba(141,72,241, 0.5)'],
                    // color: {
                    //     type: 'linear',
                    //     x: 0,
                    //     y: 0,
                    //     x2: 0,
                    //     y2: 1,
                    //     colorStops: [{
                    //         offset: 0,
                    //         color: 'rgba(197,163,253, 1)'
                    //     }, {
                    //         offset: 0.5,
                    //         color: 'rgba(141,72,241, 0.5)'
                    //     }, {
                    //         offset: 1,
                    //         color: '#8d48f9'
                    //     }],
                    //     globalCoord: false
                    // },
                    label: {
                        formatter: (param) => {
                            return (this.data.value || 0) + '';
                        },
                        textStyle: {
                            fontSize: 30,
                            color: 'white'
                        }
                    },
                }]
            }
            // 传入数据
            this.chart.setOption(option)
        }
    }
}
</script>
