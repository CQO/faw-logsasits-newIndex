<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
export default {
    name: 'ChartHorizontalBar',
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        showLineBg: {
            type: Boolean,
            default: false
        },
        colors: {
            type: Array,
            default: () => {
                return []
            }
        },
        colorIndex: {
            type: Number,
            default: 0
        },
        borderRadius: {
            type: Number,
            default: 4
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

            let _series = [
                {
                    name: '数量',
                    type: 'bar',
                    zlevel: 2,
                    itemStyle: {
                        normal: {
                            barBorderRadius: this.borderRadius,
                            color: new Echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: this.colors[0]
                            }, {
                                offset: 1,
                                color: this.colors[1]
                            }])
                        }
                    },
                    barWidth: 14,
                    data: this.data.values
                }
            ]
            let _max = Math.max(...this.data.values)
            let _convertMax = []
            if (_max > 10) {
                let _arrs = (_max + '').split('')
                let _first = parseInt(_arrs[0])
                _arrs.fill(0)
                _arrs[0] = _first
                let _originalVal = parseInt(_arrs.join(''))
                if (_max > _originalVal) {
                    _arrs[0] = _first + 1
                }
                _convertMax = parseInt(_arrs.join(''))
            }
            if (this.showLineBg === true) {
                _series.push({
                    name: '背景',
                    type: 'bar',
                    zlevel: 1,
                    barGap: '-100%',
                    itemStyle: {
                        normal: {
                            color: 'rgba(14, 59, 110, 1)',
                            barBorderRadius: this.borderRadius
                        }
                    },
                    barWidth: 14,
                    data: [...this.data.values].fill(_convertMax)
                })
                console.log(_series)
            }

            // 配置数据
            let option = {
                grid: {
                    left: 20,
                    right: 20,
                    bottom: 10,
                    top: 0,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    formatter: function(params) {
                        return params[0].name + '<br/>' +
                            '<span style=\'display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)\'></span>' +
                            params[0].seriesName + ' : ' + params[0].value + ' 次<br/>'
                    }
                },
                xAxis: {
                    show: false,
                    type: 'value'
                },
                yAxis: [{
                    type: 'category',
                    inverse: true,
                    axisLabel: {
                        show: true,
                        width: 300,
                        textStyle: {
                            color: '#fff'
                            // textShadowColor: '#C1F7FE',
                            // textShadowBlur: 10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    data: this.data.names
                }, {
                    type: 'category',
                    inverse: true,
                    axisTick: 'none',
                    axisLine: 'none',
                    show: true,
                    axisLabel: {
                        textStyle: {
                            color: this.colors[this.colorIndex || 0],
                            fontSize: '12'
                        },
                        formatter: function(value) {
                            return value
                        }
                    },
                    data: [...this.data.values]
                }],
                series: _series
            }
            // 传入数据
            this.chart.setOption(option, true)
        }
    }
}
</script>
