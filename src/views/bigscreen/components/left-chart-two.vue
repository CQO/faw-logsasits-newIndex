<template>
    <div class="left-chart-two-component">
        <!-- <ChartLegend :records="legends"></ChartLegend> -->
        <div ref="block-chart" class="chart"></div>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
const Echarts = require("echarts");
export default {
    name: "LeftChartTwoComponent",
    data() {
        return {
            echartRef: undefined,
            // legends: [
            //     {
            //         background: 'linear-gradient(180deg, #00C9D7 0%, #00A2FE 100%);',
            //         type: 'square',
            //         text: '日采购入库量'
            //     },
            //     {
            //         background: 'linear-gradient(90deg, #2BA8DE 0%, #153C63 100%);',
            //         type: 'line',
            //         text: '日采购入库遵守率'
            //     },
            //     {
            //         background: '#00F39D',
            //         type: 'line',
            //         text: '遵守达标率'
            //     }
            // ]
        };
    },
    mounted() {
        this.fetchDatas();
        this.$eventBus.$on('left-chart-two-refresh', () => {
            this.fetchDatas()
        })
    },
    beforeDestroy() {
        this.$eventBus.$off('left-chart-two-refresh')
    },
    methods: {
        fetchDatas(type = '') {
            if (!this.echartRef) {
                this.echartRef = Echarts.init(this.$refs['block-chart']);
            }
            HomeAPI.fetchLeftPurchaseInstoreQtyTrend({ params: { type: type }}).then(res => {
                this.renderChart(res.data, type);
            }).catch((e) => {
                this.renderChart([], type);
            })
        },
        calcPercent(num, total) {
            if (!total || total <= 0) return 100;
            return Math.round(num / total * 10000) / 100;
        },
        renderChart(datas = [], type) {
            let _titles = [];
            let _barVals = [];
            let _barMaxVals = [];
            let _lineVals = [];
            datas.map(m => {
                _titles.push(m.convert_date.replace('-', '.'))
                _barVals.push(m.sum_real_instore_qty_new || 0)
                _lineVals.push(this.calcPercent(m.completed_num || 0, m.total_num || 0))
            })
            let _unit = '日';
            if (type === 'month') {
                _titles = _titles.reverse();
                _barVals = _barVals.reverse();
                _lineVals = _lineVals.reverse();
                _unit = '月'
            }
            let _max = Math.max(..._barVals);
            datas.map(m => {
                _barMaxVals.push(_max)
            })
            let _option = {
                animation: true,
                grid: {
                    top: "20%",
                    left: '5%',
                    bottom: "5%", //也可设置left和right设置距离来控制图表的大小
                    containLabel: true,
                },
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
                            relVal += '<br/><br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + (i > 0 ? '%' : '')
                        }
                        return relVal;
                    }
                },
                legend: {
                    data: [ `${_unit}采购入库量`, {
                        name: `${_unit}采购入库遵守率`, icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z'
                    }, {
                        name: '遵守达标率', icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z'
                    } ],
                    textStyle: { fontSize: 10, color: '#d9d9d9'},
                    lineStyle: {
                        type: 'dotted'
                    },
                    itemWidth: 16,
                    itemHeight: 10,
                    itemGap: 10,
                    top: '0%',
                    right: '2%',
                    selectedMode: false
                },
                xAxis: {
                    data: _titles,
                    axisLine: {
                        show: false, //隐藏X轴轴线
                        lineStyle: {
                            color: "#2D455A",
                        },
                    },
                    axisTick: {
                        show: false, //隐藏X轴刻度
                    },
                    axisLabel: {
                        show: true,
                        margin: 14,
                        fontSize: 9,
                        textStyle: {
                            color: "#D9D9D9", //X轴文字颜色
                        },
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        max: _max,
                        // interval: 25,
                        splitNumber: 3,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                type: "dashed",
                                color: "#2B4359",
                                width: 2,
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#2D455A",
                            },
                        },
                        axisLabel: {
                            show: true,
                            margin: 14,
                            fontSize: 9,
                            textStyle: {
                                color: "#D9D9D9", //X轴文字颜色
                            },
                        },
                    },
                    {
                        name: "",
                        min: 0,
                        max: 120,
                        interval: 50,
                        nameTextStyle: {
                            color: "rgb(250,250,250,.7)",
                            fontSize: 12,
                            padding: [0, 0, 0, 40],
                        },
                        show: true,
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 9,
                                color: "#D9D9D9",
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: `${_unit}采购入库量`,
                        type: "bar",
                        barWidth: 16,
                        itemStyle: {
                            normal: {
                                color: new Echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "#00FFE3",
                                        },
                                        {
                                            offset: 1,
                                            color: "#4693EC",
                                        },
                                    ]
                                ),
                            },
                        },
                        data: _barVals,
                        z: 10,
                        zlevel: 0,
                    },
                    {
                        // 分隔
                        type: "pictorialBar",
                        tooltip: {
                            show: false,
                        },
                        itemStyle: {
                            normal: {
                                color: "#0F375F",
                            },
                        },
                        symbolRepeat: "fixed",
                        symbolMargin: 3,
                        symbol: "rect",
                        symbolClip: true,
                        symbolSize: [16, 2],
                        symbolPosition: "start",
                        symbolOffset: [-2, -1],
                        // symbolBoundingData: this.total,
                        data: _barVals,
                        width: 15,
                        z: 0,
                        zlevel: 1,
                    },
                    {
                        name: "外框",
                        tooltip: {
                            show: false,
                        },
                        type: "bar",
                        barGap: "-110%", // 设置外框粗细
                        data: _barMaxVals,
                        barWidth: 22,
                        itemStyle: {
                            normal: {
                                color: "transparent", // 填充色
                                barBorderColor: "#2D465C", // 边框色
                                barBorderWidth: 1, // 边框宽度
                                // barBorderRadius: 0, //圆角半径
                                label: {
                                    // 标签显示位置
                                    show: false,
                                    position: "top", // insideTop 或者横向的 insideLeft
                                },
                            },
                        },
                        z: 0,
                    },
                    {
                        name: `${_unit}采购入库遵守率`,
                        type: "line",
                        yAxisIndex: 1,
                        smooth: true, //平滑曲线显示
                        showAllSymbol: false,
                        symbolSize: 0,
                        lineStyle: {
                            color: "#182733",
                            width: 0,
                        },
                        areaStyle: {
                            // color: 'rgb(16 72 110 / 45%)'
                            color: new Echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "rgb(16 72 110 / 100%)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(17 59 110 / 53%)",
                                    },
                                ]
                            ),
                        },
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: new Echarts.graphic.LinearGradient(
                                    1,
                                    0,
                                    0,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgb(28 108 199 / 100%)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgb(1 250 255 / 53%)",
                                        },
                                    ]
                                ),
                            },
                            borderColor: "rgba(0,0,0,.4)",
                        },
                        data: _lineVals,
                        z: 100,
                    },
                    {
                        name: "遵守达标率",
                        type: "line",
                        yAxisIndex: 1,
                        smooth: true, //平滑曲线显示
                        showAllSymbol: false,
                        symbolSize: 0,
                        markLine: {
                            silent: true,
                            symbol: 'none',
                            data: [
                                {
                                    type: "average",
                                    name: "遵守达标率",
                                },
                            ],
                            precision: 0,
                            // label: {
                            //     normal: {
                            //         formatter: "{c}%",
                            //     },
                            // },
                            label: {
                                normal: {
                                    borderWidth: 2,
                                    distance: 12,
                                    align: 'center',
                                    offset: [10, 6],
                                    verticalAlign: 'bottom',
                                    borderRadius: 1,
                                    // borderColor: '#00FACC',
                                    backgroundColor: new Echarts.graphic.LinearGradient(
                                        1,
                                        0,
                                        0,
                                        0,
                                        [
                                            {
                                                offset: 0,
                                                color: "rgba(3, 127, 131, 1)",
                                            },
                                            {
                                                offset: 1,
                                                color: "rgba(0, 250, 204, 1)",
                                            },
                                        ]
                                    ),
                                    show: true,
                                    // position: 'top',
                                    formatter: '{c}%',
                                    color: '#fff',
                                    fontSize: 10,
                                    padding: [ 3, 4, 0, 4 ]
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color: "#00F39D",
                                },
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: 0,
                                color: "transparent",
                            },
                            borderColor: "rgba(0,0,0,.4)",
                        },
                        data: [90, 90, 90, 90, 90, 90, 90],
                        z: 1001,
                    },
                ],
            };
            // 传入数据
            this.echartRef.setOption(_option);
        },
    },
};
</script>

<style lang="scss" scoped>
.left-chart-two-component {
    z-index: 1;
    height: 100%;
    width: 100%;
    .chart {
        height: 100%;
        width: 100%;
    }
}
</style>
