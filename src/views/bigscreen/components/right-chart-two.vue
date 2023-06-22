<template>
    <div class="right-chart-two-component">
        <div ref="block-chart" class="chart"></div>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
const Echarts = require("echarts");
export default {
    name: "RightChartTwoComponent",
    data() {
        return {
            echartRef: undefined,
        };
    },
    mounted() {
        this.fetchDatas();
        this.$eventBus.$on('right-chart-two-refresh', () => {
            this.fetchDatas()
        })
    },
    beforeDestroy() {
        this.$eventBus.$off('right-chart-two-refresh')
    },
    methods: {
        fetchDatas(type = '') {
            if (!this.echartRef) {
                this.echartRef = Echarts.init(this.$refs['block-chart']);
            }
            HomeAPI.fetchRightOutStoreQtyTrendByJj({ params: { type: type }}).then(res => {
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
                _barVals.push(m.sum_real_out_qty_new || 0)
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
            // const mock = [{
            //         k: '系列1',
            //         v: [{
            //             k: '类目1',
            //             v: 100
            //         }],
            //     },
            //     {
            //         k: '系列2',
            //         v: [{
            //             k: '类目1',
            //             v: 80
            //         }],
            //     },
            //     {
            //         k: '系列3',
            //         v: [{
            //             k: '类目1',
            //             v: 80
            //         }],
            //     },
            //     {
            //         k: '系列4',
            //         v: [{
            //             k: '类目1',
            //             v: 80
            //         }],
            //     },
            //     {
            //         k: '系列5',
            //         v: [{
            //             k: '类目1',
            //             v: 80
            //         }],
            //     },
            // ]

            // // 横轴数据
            // const xAxis = mock.map(item => item.k)
            // // 系列 1 数据 (类目1)
            // const seriesData1 = mock.map(item => item.v[0].v)
            // // 最大值 (额外拉高多少根据数据数量级决定)
            // const max = Math.max(...seriesData1) + 10
            // // 构造柱最大值数组
            // const maxList = []
            // for (let i = 0; i < mock.length; i += 1) {
            //     maxList.push(max)
            // }


            // console.log(xAxis, seriesData1, max, maxList);



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
                        params = params.reverse();
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/><br/>' + params[i].marker + params[i].seriesName + ' : ' + (i === 0 ? params[i].data.oldValue : params[i].value) + (i > 0 ? '%' : '')
                        }
                        return relVal;
                    }
                },
                legend: {
                    data: [ `${_unit}出库量`, {
                        name: `${_unit}出库遵守率`, icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z'
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
                xAxis: [{
                        data: _barMaxVals,
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        position: 'bottom',
                    },
                    {
                        data: _titles,
                        axisLine: {
                            lineStyle: {
                                color: '#00D2FF',
                            },
                        },
                        axisLabel: {
                            color: '#fff',
                        },
                        axisTick: {
                            show: false,
                        },
                        position: 'bottom',
                    },
                ],

                // {
                //     data: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7"],
                //     axisLine: {
                //         show: false, //隐藏X轴轴线
                //         lineStyle: {
                //             color: "#2D455A",
                //         },
                //     },
                //     axisTick: {
                //         show: false, //隐藏X轴刻度
                //     },
                //     axisLabel: {
                //         show: true,
                //         margin: 14,
                //         fontSize: 9,
                //         textStyle: {
                //             color: "#D9D9D9", //X轴文字颜色
                //         },
                //     },
                // },
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
                        // 该系列为背景深蓝色半胶囊
                        data: _barMaxVals,
                        tooltip: {
                            show: false,
                        },
                        type: 'bar',
                        xAxisIndex: 0,
                        silent: true,
                        color: 'transparent',
                        itemStyle: {
                            borderColor: 'rgba(146, 181, 207, 1)',
                            barBorderRadius: [20, 20, 20, 20],
                            borderWidth: 1,
                        },
                        barWidth: 16,
                    },
                    {
                        name: `${_unit}出库量`,
                        data: _barVals.map((m, i) => {
                            return {
                                name: _titles[i],
                                value: parseInt(m / 1.1),
                                oldValue: m,
                                barBorderRadius: [ m >= 100 ? 20 : 0, m >= 100 ? 20 : 0, 20, 20],
                                tooltip: {
                                    show: false,
                                },
                                // barBorderRadius: [ 20, 20, 20, 20],
                            }
                        }),
                        type: 'bar',
                        xAxisIndex: 1,
                        itemStyle: {
                            // barBorderRadius: [0, 0, 20, 20],
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(0, 243, 156, 1)', // 0% 处的颜色
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(25, 123, 205, 0.66)',
                                }, {
                                    offset: 1,
                                    color: 'rgba(28, 108, 199, 0.62)',
                                }],
                            },
                        },
                        barWidth: 16,
                    }, {
                        data: _barVals.map((m, i) => {
                            return {
                                name: _titles[i],
                                value: m / 1.07,
                            }
                        }),
                        tooltip: {
                            show: false,
                        },
                        type: 'pictorialBar',
                        symbolPosition: "end",
                        symbolSize: [16, 10],
                        symbolOffset: [0, -6],
                        zlevel: 2,
                        // color: 'rgba(0, 243, 156, 1)',
                        color: new Echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: 'rgba(4, 208, 154, 1)',
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(4, 208, 154, 1)',
                                },
                                {
                                    offset: 0.9,
                                    color: 'rgba(12, 102, 117, 0.9)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(4, 208, 154, 1)',
                                },
                            ]
                        )
                        // type: "pictorialBar",
                        // barMaxWidth: "20",
                        // symbolPosition: "end",
                        // symbol: "diamond",
                        // symbolOffset: [0, "-50%"],
                        // symbolSize: [30, 12],
                        // zlevel: 2
                    },
                    {
                        name: `${_unit}出库遵守率`,
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
                                    name: "准守达标率",
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
                        data: [99, 99, 99, 99, 99, 99, 99],
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
.right-chart-two-component {
    z-index: 1;
    height: 100%;
    width: 100%;
    .chart {
        height: 100%;
        width: 100%;
    }
}
</style>
