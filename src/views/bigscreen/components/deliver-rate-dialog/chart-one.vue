<template>
    <div class="dialog-chart-one-component">
        <div ref="block-chart" class="chart"></div>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
const Echarts = require("echarts");
export default {
    name: "DialogChartOneComponent",
    data() {
        return {};
    },
    // mounted() {
    //     this.$nextTick(() => {
    //         this.renderChart(Echarts.init(this.$refs["block-chart"]));
    //     });
    // },
    mounted() {
        this.fetchDatas();
    },
    methods: {
        fetchDatas() {
            HomeAPI.fetchTopTimelyDeliveryRate({ params: { type: 'month' }}).then(res => {
                this.renderChart(Echarts.init(this.$refs['block-chart']), res.data.list);
            }).catch((e) => {
                this.renderChart(Echarts.init(this.$refs['block-chart']), []);
            })
        },
        renderChart(echartRef, datas = []) {
            let _titles = [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ];
            // let _lineVals = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
            let _mapping = {};
            datas.map(m => {
                // _titles.push(m.month.replace('-', '.'))
                // _lineVals.push(m.rate || 100)
                if (m.rate && m.rate === '100.00') {
                    m.rate = 100;
                }
                let _arrs = m.month.split('-');
                if (!_mapping[_arrs[0]]) {
                    _mapping[_arrs[0]] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
                }
                _mapping[_arrs[0]][parseInt(_arrs[1]) - 1] = m.rate || 100
            })

            let _colors = [
                [ '#182733', 'rgba(4, 145, 255, 0.4)', 'rgba(4, 145, 255, 0.31)', 'rgba(3, 102, 202, 1)', 'rgba(4, 145, 255, 0.41)' ],
                [ '#182733', 'rgba(4, 141, 181, 1)', 'rgba(4, 141, 181, 0.53)', 'rgba(12, 233, 239, 1)', 'rgba(4, 141, 181, 1)' ],
                // [ '#182733', 'rgba(4, 145, 255, 0.4)', 'rgba(4, 145, 255, 0.31)', 'rgba(3, 102, 202, 1)', 'rgba(4, 145, 255, 0.41)' ],
                // [ '#182733', 'rgba(4, 145, 255, 0.4)', 'rgba(4, 145, 255, 0.31)', 'rgba(3, 102, 202, 1)', 'rgba(4, 145, 255, 0.41)' ]
            ];
            let _convertDatas = [];
            Object.entries(_mapping).map((entry, index) => {
                let _color = _colors[index];
                _convertDatas.push({
                    name: entry[0],
                    type: "line",
                    smooth: true, //平滑曲线显示
                    showAllSymbol: false,
                    symbolSize: 0,
                    lineStyle: {
                        color: _color[0],
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
                                    color: _color[1],
                                },
                                {
                                    offset: 1,
                                    color: _color[2],
                                },
                            ]
                        ),
                    },
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: new Echarts.graphic.LinearGradient(
                                1,
                                0,
                                0,
                                0,
                                [
                                    {
                                        offset: 0,
                                        color: _color[3],
                                    },
                                    {
                                        offset: 1,
                                        color: _color[4],
                                    },
                                ]
                            ),
                        },
                        borderColor: "rgba(0,0,0,.4)",
                    },
                    data: entry[1],
                    z: 100,
                })
            })

            console.log('_mapping', _mapping)
            let _option = {
                animation: true,
                grid: {
                    top: "15%",
                    left: '0%',
                    right: '2%',
                    bottom: "15%", //也可设置left和right设置距离来控制图表的大小
                    containLabel: true,
                },
                legend: {
                    data: [ `2021`, `2022`],
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
                xAxis: {
                    type: 'category',
                    data: _titles,
                    boundaryGap: false,
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255, 255, 255, 0.15)"
                        }
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
                        name: "",
                        min: 0,
                        max: 100,
                        interval: 25,
                        nameTextStyle: {
                            color: "rgb(250,250,250,.7)",
                            fontSize: 12,
                            padding: [0, 0, 0, 40],
                        },
                        show: true,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255, 255, 255, 0.15)",
                                width: 1
                            }
                        },
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255, 255, 255, 0.15)"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 9,
                                color: "#D9D9D9",
                            },
                        },
                    },
                ],
                series: _convertDatas,
                // [
                //     {
                //         name: "2021",
                //         type: "line",
                //         smooth: true, //平滑曲线显示
                //         showAllSymbol: false,
                //         symbolSize: 0,
                //         lineStyle: {
                //             color: "#182733",
                //             width: 0,
                //         },
                //         areaStyle: {
                //             // color: 'rgb(16 72 110 / 45%)'
                //             color: new Echarts.graphic.LinearGradient(
                //                 0,
                //                 0,
                //                 0,
                //                 1,
                //                 [
                //                     {
                //                         offset: 0,
                //                         color: "rgba(4, 145, 255, 0.4)",
                //                     },
                //                     {
                //                         offset: 1,
                //                         color: "rgba(4, 145, 255, 0.31)",
                //                     },
                //                 ]
                //             ),
                //         },
                //         lineStyle: {
                //             normal: {
                //                 width: 2,
                //                 color: new Echarts.graphic.LinearGradient(
                //                     1,
                //                     0,
                //                     0,
                //                     0,
                //                     [
                //                         {
                //                             offset: 0,
                //                             color: "rgba(3, 102, 202, 1)",
                //                         },
                //                         {
                //                             offset: 1,
                //                             color: "rgba(4, 145, 255, 0.41)",
                //                         },
                //                     ]
                //                 ),
                //             },
                //             borderColor: "rgba(0,0,0,.4)",
                //         },
                //         data: _lineVals,
                //         z: 100,
                //     },
                //     // {
                //     //     name: "销售水量",
                //     //     type: "line",
                //     //     smooth: true, //平滑曲线显示
                //     //     showAllSymbol: false,
                //     //     symbolSize: 0,
                //     //     lineStyle: {
                //     //         color: "#182733",
                //     //         width: 0,
                //     //     },
                //     //     areaStyle: {
                //     //         // color: 'rgb(16 72 110 / 45%)'
                //     //         color: new Echarts.graphic.LinearGradient(
                //     //             0,
                //     //             0,
                //     //             0,
                //     //             1,
                //     //             [
                //     //                 {
                //     //                     offset: 0,
                //     //                     color: "rgba(4, 141, 181, 1)",
                //     //                 },
                //     //                 {
                //     //                     offset: 1,
                //     //                     color: "rgba(4, 141, 181, 0.53)",
                //     //                 },
                //     //             ]
                //     //         ),
                //     //     },
                //     //     lineStyle: {
                //     //         normal: {
                //     //             width: 2,
                //     //             color: new Echarts.graphic.LinearGradient(
                //     //                 1,
                //     //                 0,
                //     //                 0,
                //     //                 0,
                //     //                 [
                //     //                     {
                //     //                         offset: 0,
                //     //                         color: "rgba(12, 233, 239, 1)",
                //     //                     },
                //     //                     {
                //     //                         offset: 1,
                //     //                         color: "rgba(4, 141, 181, 1)",
                //     //                     },
                //     //                 ]
                //     //             ),
                //     //         },
                //     //         borderColor: "rgba(0,0,0,.4)",
                //     //     },
                //     //     data: [70, 20, 90, 10, 64, 30, 10],
                //     //     z: 100,
                //     // }
                // ],
            };
            // 传入数据
            echartRef.setOption(_option);
        },
    },
};
</script>

<style lang="scss" scoped>
.dialog-chart-one-component {
    z-index: 1;
    height: 100%;
    width: 100%;
    .chart {
        height: 100%;
        width: 100%;
    }
}
</style>
