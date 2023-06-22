<template>
    <div class="right-chart-three-component">
        <div ref="block-chart" class="chart"></div>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
const Echarts = require("echarts");
export default {
    name: "RightChartFourComponent",
    data() {
        return {
            refChart: undefined,
            intervalTimer: undefined,
        };
    },
    // mounted() {
    //     this.$nextTick(() => {
    //         this.refChart = Echarts.init(this.$refs["block-chart"]);
    //         this.renderChart(this.refChart);
    //     });
    // },
    mounted() {
        this.fetchDatas();
    },
    methods: {
        fetchDatas() {
            this.refChart = Echarts.init(this.$refs["block-chart"]);
            HomeAPI.fetchRightStockTurnoverRate({}).then(res => {
                this.renderChart(this.refChart, res.data.rate || 0);
            }).catch((e) => {
                this.renderChart(this.refChart, 0);
            })
        },
        renderChart(echartRef, value) {
            var labelData = [];
            var labelData1 = [];
            for (var i = 0; i < 150; ++i) {
                labelData.push({
                    value: 1,
                    name: i,
                    itemStyle: {
                        normal: {
                            color: "rgba(0,209,228,0)",
                        },
                    },
                });
            }
            for (var i = 0; i < labelData.length; ++i) {
                if (labelData[i].name < 50) {
                    labelData[i].itemStyle = {
                        normal: {
                            // color: new echarts.graphic.LinearGradient(
                            //     0, 1, 0, 0,
                            //     [{
                            //             offset: 0,
                            //             color: '#6dfbff'
                            //         },
                            //         {
                            //             offset: 1,
                            //             color: '#02aeff'
                            //         }
                            //     ]
                            // )
                        },
                    };
                }
            }
            for (var i = 0; i < 150; ++i) {
                labelData1.push({
                    value: 1,
                    name: i,
                    itemStyle: {
                        normal: {
                            color: "rgba(0,209,228,0)",
                        },
                    },
                });
            }
            for (var i = 0; i < labelData1.length; ++i) {
                if (labelData1[i].name < 150) {
                    labelData1[i].itemStyle = {
                        normal: {
                            color: "#464451",
                        },
                    };
                }
            }

            var itemNoneStyle = {
                normal: {
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0,
                },
                emphasis: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0,
                },
            };

            let _option = {
                title: {
                    text: `${value}%`,
                    x: "47%",
                    top: "middle",
                    textAlign: "center",
                    textStyle: {
                        fontSize: "13",
                        fontWeight: "600",
                        color: "#fff",
                        textAlign: "center",
                    },
                },
                polar: {
                    radius: ["95%", "87%"],
                    center: ["50%", "50%"],
                },
                angleAxis: {
                    max: 100,
                    show: false,
                    startAngle: 0,
                },
                radiusAxis: {
                    type: "category",
                    show: true,
                    axisLabel: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                series: [
                    {
                        name: "",
                        type: "bar",
                        animation: false,
                        roundCap: true,
                        barWidth: 40,
                        showBackground: true,
                        backgroundStyle: {
                            color: "#464451",
                        },
                        data: [100],
                        coordinateSystem: "polar",
                        itemStyle: {
                            normal: {
                                color: new Echarts.graphic.LinearGradient(
                                    1,
                                    0,
                                    0,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "#D43B39",
                                        },
                                        {
                                            offset: 1,
                                            color: "#D43B39",
                                        },
                                    ]
                                ),
                            },
                        },
                    },
                    // {
                    //     hoverAnimation: false,
                    //     type: 'pie',
                    //     z: 10,
                    //     data: labelData1,
                    //     radius: ['77%', '80%'],
                    //     zlevel: 11,
                    //     itemStyle: {
                    //         normal: {
                    //             // borderColor: '#1f1e26',
                    //             // borderWidth: 2,

                    //             color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //                 offset: 0,
                    //                 color: '#DC3E3C'
                    //             },
                    //             // {
                    //             //     offset: 0.5,
                    //             //     color: '#350602'
                    //             // },
                    //             {
                    //                 offset: 1,
                    //                 color: '#350602'
                    //             }]),
                    //         }
                    //     },
                    //     label: {
                    //         normal: {
                    //             position: 'inside',
                    //             show: false,
                    //         }
                    //     },
                    // },
                    // {
                    //     hoverAnimation: false,
                    //     type: 'pie',
                    //     z: 11,
                    //     data: labelData1,
                    //     radius: ['77%', '80%'],
                    //     zlevel: 12,
                    //     itemStyle: {
                    //         normal: {
                    //             borderColor: '#1f1e26',
                    //             borderWidth: 2,
                    //         }
                    //     },
                    //     label: {
                    //         normal: {
                    //             position: 'inside',
                    //             show: false,
                    //         }
                    //     },
                    // },
                    {
                        type: 'pie',
                        animation: false,
                        radius: ['74%', '82%'],
                        hoverAnimation: false,
                        clockWise: false,
                        itemStyle: {
                            normal: {
                                color: '#0C355E'
                            }
                        },
                        label: {
                            show: false
                        },
                        data: this._dashed()
                    },
                    {
                        type: "pie",
                        animation: false,
                        radius: ["58%", "64%"],
                        center: ["50%", "50%"],
                        zlevel: 3,
                        data: [
                            {
                                hoverOffset: 1,
                                value: 25,
                                name: "",
                                itemStyle: {
                                    color: "#D3911C",
                                },
                                label: {
                                    show: false,
                                },
                                labelLine: {
                                    normal: {
                                        show: false,
                                        smooth: true,
                                        lineStyle: {
                                            width: 0,
                                        },
                                    },
                                },
                                hoverAnimation: false,
                            },
                            {
                                value: 25,
                                itemStyle: itemNoneStyle,
                            },
                        ],
                    },
                    {
                        type: "pie",
                        animation: false,
                        radius: ["60%", "62%"],
                        center: ["50%", "50%"],
                        zlevel: 1,
                        data: [
                            {
                                labelLine: {
                                    normal: {
                                        show: false,
                                        smooth: true,
                                        lineStyle: {
                                            width: 0,
                                        },
                                    },
                                },
                                value: 75,
                            },
                            {
                                hoverOffset: 1,
                                value: 100,
                                name: "",
                                itemStyle: {
                                    color: "#FAF7F7",
                                },
                                label: {
                                    show: false,
                                },
                                labelLine: {
                                    normal: {
                                        show: false,
                                        smooth: true,
                                        lineStyle: {
                                            width: 0,
                                        },
                                    },
                                },
                                hoverAnimation: false,
                            },
                        ],
                    },
                ],
            };
            // 传入数据
            echartRef.setOption(_option);
            setTimeout(this.startTimer, 0);
        },
        doing() {
            let option = this.refChart.getOption();
            option.series[1].startAngle = option.series[1].startAngle - 1;
            this.refChart.setOption(option);
        },
        startTimer() {
            if (this.refChart && !this.intervalTimer) {
                clearInterval(this.intervalTimer)
                this.intervalTimer = setInterval(this.doing, 100);
            }
        },
        _dashed() {
            let dataArr = [];
            for (var i = 0; i < 50; i++) {
                if (i % 2 === 0) {
                    dataArr.push({
                        name: (i + 1).toString(),
                        value: 40,
                        itemStyle: {
                            normal: {
                                color: 'transparent',
                            }
                        }
                    })
                } else {
                    dataArr.push({
                        name: (i + 1).toString(),
                        value: 60,
                        itemStyle: {
                            normal: {
                                // color: 'rgb(0,0,0,0)',
                                borderWidth: 1,
                                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#DC3E3C'
                                },
                                // {
                                //     offset: 0.5,
                                //     color: '#350602'
                                // },
                                {
                                    offset: 1,
                                    color: '#350602'
                                }]),
                            }
                        }
                    })
                }

            }
            return dataArr
        }
    },
};
</script>

<style lang="scss" scoped>
.right-chart-three-component {
    z-index: 1;
    height: 100%;
    width: 100%;
    .chart {
        height: 100%;
        width: 100%;
    }
}
</style>
