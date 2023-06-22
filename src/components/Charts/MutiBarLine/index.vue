<template>
    <div ref="chart" style="width: 100%; height: 100%;" />
</template>

<script>
const Echarts = require('echarts')
export default {
    name: 'ChartMutiBarLine',
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
            console.log('this.data', this.data.names)
            // let dataList = []
            // this.data.names.map((name, i) => {
            //     dataList.push(
            //         {
            //             name: name,
            //             value: this.data.values[i]
            //         }
            //     )
            // })

            // let lineDataList = []
            // this.data.names.map((name, i) => {
            //     lineDataList.push(
            //         {
            //             name: name,
            //             value: this.data.comparisons[i]
            //         }
            //     )
            // })

            let _lineSeries = []
            let _barSeries = []
            let _xDatas = []

            this.data.series.map(s => {
                let addNum = Math.random() * 1000
                let addNum1 = Math.random() * 1000
                let addNum2 = Math.random() * 1000
                let addNum3 = Math.random() * 1000
                let addNum4 = Math.random() * 1000
                let addNum5 = Math.random() * 1000
                let addNum6 = Math.random() * 1000
                _xDatas.push(s.name)
                _lineSeries.push(
                    {
                        name: s.name,
                        type: 'line',
                        yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                        smooth: true, // 平滑曲线显示
                        showAllSymbol: true, // 显示所有图形。
                        symbol: 'circle', // 标记的图形为实心圆
                        symbolSize: 8, // 标记的大小
                        // itemStyle: {
                        //     // 折线拐点标志的样式
                        //     color: '#1045A0',
                        //     borderColor: '#3D7EEB',
                        //     width: 2,
                        //     shadowColor: '#3D7EEB',
                        //     shadowBlur: 4
                        // },
                        // lineStyle: {
                        // color: '#3D7EEB',
                        // width: 2
                        // shadowColor: '#3D7EEB',
                        // shadowBlur: 4
                        // },
                        // areaStyle: {
                        //     color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        //         {
                        //             offset: 0,
                        //             color: 'rgba(61,126,235, 0.5)'
                        //         },
                        //         {
                        //             offset: 1,
                        //             color: 'rgba(61,126,235, 0)'
                        //         }
                        //     ])
                        // },
                        // data: s.comparisons
                        data: [12 + addNum, 36 + addNum1, 114 + addNum2, 722 + addNum3, 1123 + addNum4, 54 + addNum5, 0 + addNum6, 0 + addNum, 0 + addNum, 0 + addNum, 0 + addNum, 0 + addNum]
                    }
                )
                _barSeries.push(
                    {
                        name: s.name,
                        type: 'bar',
                        barWidth: 15,
                        itemStyle: {
                            normal: {
                                // color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(15,197,243,1)'}, {offset: 1, color: 'rgba(15,197,243,0)'}])
                                // borderColor: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(180,240,255,1)'}, {offset: 1, color: 'rgba(15,197,243,1)'}]),
                                // borderWidth: 2
                            }
                        },
                        data: s.values
                    }
                )
            })

            let _names = this.data.names.map(name => {
                return name + '月'
            })

            // 配置数据
            let option = option = {
                grid: {
                    top: 50,
                    left: 70,
                    bottom: 40
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true
                        }
                    }
                },
                legend: {
                    data: _xDatas,
                    top: '2%',
                    right: '10',
                    textStyle: {
                        color: 'rgba(250,250,250,0.6)',
                        fontSize: 14
                    }
                },
                xAxis: {
                    data: _names,
                    axisLine: {
                        show: true, // 隐藏X轴轴线
                        lineStyle: {
                            color: '#26D9FF',
                            width: 2
                        }
                    },
                    axisTick: {
                        show: true // 隐藏X轴刻度
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#49DBFF', // X轴文字颜色
                            fontSize: 14
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(250,250,250,0)']
                        }
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        /* name: "亿元",*/
                        nameTextStyle: {
                            color: '#ebf8ac',
                            fontSize: 14
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: true
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
                            textStyle: {
                                color: '#49DBFF',
                                fontSize: 14
                            }
                        }

                    },
                    {
                        type: 'value',
                        /* name: "同比",*/
                        nameTextStyle: {
                            color: '#ebf8ac',
                            fontSize: 16
                        },
                        position: 'right',
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            formatter: '{value} %', // 右侧Y轴文字显示
                            textStyle: {
                                color: '#49DBFF',
                                fontSize: 14
                            }
                        }
                    }
                ],
                series: [ ..._lineSeries, ..._barSeries ]
                // series: [
                //     {
                //         name: '销售量',
                //         type: 'line',
                //         yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                //         smooth: true, // 平滑曲线显示
                //         showAllSymbol: true, // 显示所有图形。
                //         symbol: 'circle', // 标记的图形为实心圆
                //         symbolSize: 8, // 标记的大小
                //         itemStyle: {
                //             // 折线拐点标志的样式
                //             color: '#1045A0',
                //             borderColor: '#3D7EEB',
                //             width: 2,
                //             shadowColor: '#3D7EEB',
                //             shadowBlur: 4
                //         },
                //         lineStyle: {
                //             color: '#3D7EEB',
                //             width: 2,
                //             shadowColor: '#3D7EEB',
                //             shadowBlur: 4
                //         },
                //         areaStyle: {
                //             color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //                 {
                //                     offset: 0,
                //                     color: 'rgba(61,126,235, 0.5)'
                //                 },
                //                 {
                //                     offset: 1,
                //                     color: 'rgba(61,126,235, 0)'
                //                 }
                //             ])
                //         },
                //         data: [4.2, 3.5, 2.9, 7.8, 5, 3]
                //     },
                //     {
                //         name: '业务1',
                //         type: 'bar',
                //         barWidth: 15,
                //         itemStyle: {
                //             normal: {
                //                 color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //                     {
                //                         offset: 0,
                //                         color: 'rgba(61,126,235, 1)'
                //                     },
                //                     {
                //                         offset: 1,
                //                         color: 'rgba(61,126,235, 0)'
                //                     }
                //                 ]),
                //                 borderColor: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //                     {
                //                         offset: 0,
                //                         color: 'rgba(160,196,225, 1)'
                //                     },
                //                     {
                //                         offset: 1,
                //                         color: 'rgba(61,126,235, 1)'
                //                     }
                //                 ]),
                //                 borderWidth: 2
                //             }
                //         },
                //         data: [4, 3, 2, 8, 3, 5]
                //     },
                //     {
                //         name: '业务2',
                //         type: 'bar',
                //         barWidth: 15,
                //         itemStyle: {
                //             normal: {
                //                 color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(15,197,243,1)'}, {offset: 1, color: 'rgba(15,197,243,0)'}]),
                //                 borderColor: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(180,240,255,1)'}, {offset: 1, color: 'rgba(15,197,243,1)'}]),
                //                 borderWidth: 2
                //             }
                //         },
                //         data: [3, 2, 3, 5, 4, 3]
                //     }
                // ]
            }
            // 传入数据
            this.chart.setOption(option)
        }
    }
}
</script>
