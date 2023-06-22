<template>
    <div class="left-chart-three-component">
        <div ref="block-chart-x" class="chart"></div>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
const Echarts = require('echarts')
export default {
    name: 'LeftChartThreeComponent',
    data() {
        return {
        }
    },
    mounted() {
        this.fetchDatas();
    },
    methods: {
        fetchDatas() {
            HomeAPI.fetchTopTimelyDeliveryRate({ params: { type: 'day' }}).then(res => {
                this.renderChart(Echarts.init(this.$refs['block-chart-x']), res.data.list);
            }).catch((e) => {
                this.renderChart(Echarts.init(this.$refs['block-chart-x']), []);
            })
        },
        renderChart(echartRef, datas = []) {
            let _titles = [];
            let _lineVals = [];
            datas.map(m => {
                _titles.push(m._date || '-')
                _lineVals.push(m.rate || 100)
            })
            let _option = {
                // legend: {
                //     top: '20',
                //     x: 'right',
                //     icon:"rect",
                //     textStyle: {
                //         fontSize: 16,
                //         color: '#BFEBFF',
                //     },
                //     itemWidth: 8, // 设置宽度
                //     itemHeight: 8, // 设置高度、
                //     itemGap: 12, // 设置间距
                // },
                tooltip: {
                    show: true,
                    trigger: 'axis', //axis , item
                    backgroundColor: 'RGBA(0, 49, 85, 1)',
                    borderColor: 'rgba(0, 151, 251, 1)',
                    borderWidth: 1,
                    borderRadius: 0,
                    textStyle: {
                        color: '#BCE9FC',
                        fontSize: 9,
                        align: 'left',
                    },
                    formatter: function (params) {
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/><br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + '%'
                        }
                        return relVal;
                    }
                },
                grid: {
                    top: '15%',
                    left: '5%',
                    right: '0%',
                    bottom: '5%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: _titles,
                    axisLabel: {
                        //坐标轴刻度标签的相关设置。
                        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                        //	margin:15,
                        textStyle: {
                            color: '#D9D9D9',
                            fontStyle: 'normal',
                            fontSize: 9,
                        },
                    },
                    axisTick: {
                        //坐标轴刻度相关设置。
                        show: false,
                    },
                    axisLine: {
                        //坐标轴轴线相关设置
                        lineStyle: {
                            color: 'rgba(77, 128, 254, 0.2)',
                        },
                    },
                    // splitLine: {
                    //     //坐标轴在 grid 区域中的分隔线。
                    //     show: true,
                    //     lineStyle: {
                    //         color: 'rgba(77, 128, 254, 0.2)',
                    //     },
                    // },
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        splitNumber: 5,
                        max: 100,
                        axisLabel: {
                            textStyle: {
                                color: '#D9D9D9',
                                fontStyle: 'normal',
                                fontSize: 9,
                            },
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(77, 128, 254, 0.2)',
                            },
                        },
                        // splitLine: {
                        //     show: false,
                        // },
                    },
                ],
                series: [
                    {
                        name: 'x',
                        type: 'pictorialBar',
                        barWidth: '4',
                        stack: '总量',
                        tooltip: {
                            show: false
                        },
                        label: {
                            normal: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(0, 151, 251, 0.7)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.7,
                                        color: 'rgba(0, 34, 66, 0.3)', // 100% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0, 34, 66, 0)', // 100% 处的颜色
                                    },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                }, //渐变颜色
                            },
                        },
                        // 子显示的样式，'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                        // symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
                        symbol: 'rect',
                        data: _lineVals,
                    },
                    {
                        name: '及时交付率',
                        type: 'line',
                        barWidth: '40%',
                        stack: '总量',
                        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
                        showAllSymbol: true,
                        symbolSize: 7,
                        // smooth: true,
                        label: {
                            normal: {
                                show: false,
                            },
                        },
                        areaStyle: { //区域填充样式
                            normal: {
                                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(25,163,223,.2)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(25,163,223, 0)"
                                    }
                                ], false),
                                shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: "rgba(25,163,223,1)", // 线条颜色
                            },
                            borderColor: 'rgba(0,0,0,.4)',
                        },
                        itemStyle: {
                            color: "#b7f9ff",
                            borderColor: "#2185da",
                            borderWidth: 2,
                            shadowColor: 'rgba(22, 137, 229)',
                            shadowBlur: 14

                        },
                        data: _lineVals,
                    },
                ],
            };
            // 传入数据
            echartRef.setOption(_option)
        }
    }
}
</script>

<style lang="scss" scoped>
.left-chart-three-component {
    z-index: 1;
    height: 100%;
    width: 100%;
    .chart {
        height: 100%;
        width: 100%;
    }
}
</style>
