<template>
    <div class="top-center-num-component">
        <div class="num-row">
            <div class="num-item dialog-item" @click="$refs.deliverRateDialog.show()">
                <div class="left-chart">
                    <div ref="num-chart-1" class="chart"></div>
                </div>
                <div class="right-infos">
                    <div class="num">
                        {{ jsjfRate }}%
                    </div>
                    <div class="text">
                        及时交付率
                    </div>
                </div>
            </div>
            <div class="num-item">
                <div class="left-chart">
                    <div ref="num-chart-2" class="chart"></div>
                </div>
                <div class="right-infos">
                    <div class="num">
                        {{ cjrkRate }}%
                    </div>
                    <div class="text">
                        采购入库时限遵守率
                    </div>
                </div>
            </div>
            <div class="num-item">
                <div class="left-chart">
                    <div ref="num-chart-3" class="chart"></div>
                </div>
                <div class="right-infos">
                    <div class="num">
                        {{ ckRate }}%
                    </div>
                    <div class="text">
                        出库及时率
                    </div>
                </div>
            </div>
        </div>
        <DeliverRateDialog ref="deliverRateDialog"></DeliverRateDialog>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
import DeliverRateDialog from '@/views/bigscreen/components/deliver-rate-dialog'
const Echarts = require('echarts')
export default {
    name: 'TopCenterNumComponent',
    components: {
        DeliverRateDialog
    },
    data() {
        return {
            jsjfRate: 0,
            cjrkRate: 0,
            ckRate: 0,
            numChart1: undefined,
            numChart2: undefined,
            numChart3: undefined
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        this.fetchDatas();
        // this.$nextTick(() => {
        //     // this.numChart1 = Echarts.init(this.$refs['num-chart-1'])
        //     // this.renderChart(this.numChart1, 70);
        //     // this.numChart2 = Echarts.init(this.$refs['num-chart-2'])
        //     // this.renderChart(this.numChart2, num);
        //     // this.numChart3 = Echarts.init(this.$refs['num-chart-3'])
        //     // this.renderChart(this.numChart3, num);
        // })

        this.$eventBus.$on('top-num-refresh', () => {
            this.fetchDatas()
        })
    },
    beforeDestroy() {
        this.$eventBus.$off('top-num-refresh')
    },
    methods: {
        fetchDatas() {
            HomeAPI.fetchTopTimelyDeliveryRate({}).then(res => {
                if (res.data.rate && res.data.rate === '100.00') {
                    res.data.rate = 100;
                }
                this.jsjfRate = res.data.rate || 100;
                if (res.data.rate === '0.00') {
                    this.jsjfRate = 100;
                }
            }).catch(() => {
                this.jsjfRate = 100;
            }).finally(() => {
                this.numChart1 = Echarts.init(this.$refs['num-chart-1'])
                this.renderChart(this.numChart1, this.jsjfRate);
            })
            HomeAPI.fetchTopPurchaseInstoreQtyRate({}).then(res => {
                if (res.data.rate && res.data.rate === '100.00') {
                    res.data.rate = 100;
                }
                this.cjrkRate = res.data.rate || 100;
            }).catch(() => {
                this.cjrkRate = 100;
            }).finally(() => {
                this.numChart2 = Echarts.init(this.$refs['num-chart-2'])
                this.renderChart(this.numChart2, this.cjrkRate);
            })
            HomeAPI.fetchTopOutStoreRate({}).then(res => {
                if (res.data.rate && res.data.rate === '100.00') {
                    res.data.rate = 100;
                }
                this.ckRate = res.data.rate || 100;
            }).catch(() => {
                this.ckRate = 100;
            }).finally(() => {
                this.numChart3 = Echarts.init(this.$refs['num-chart-3'])
                this.renderChart(this.numChart3, this.ckRate);
            })
        },
        renderChart(echartRef, num = 0) {
            let _option = {
                title: [ {
                    text: num,
                    x: 'center',
                    top: 'center',
                    textStyle: {
                        fontSize: '12',
                        color: '#66FFFF',
                        fontFamily: 'DINAlternate-Bold, DINAlternate',
                        foontWeight: '600',
                    },
                }],
                // backgroundColor: '#111',
                polar: {
                    radius: ['74%', '84%'],
                    center: ['50%', '50%'],
                },
                angleAxis: {
                    max: 100,
                    show: false,
                },
                radiusAxis: {
                    type: 'category',
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
                    // 内圆
                    {
                        type: 'pie',
                        radius: ['0', '49%'],
                        center: ['50%', '50%'],
                        z: 0,
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(18 49 115 / 66%)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(18 49 115 / 66%)'
                                    }
                                ]),
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                        },
                        label: {
                            normal: {
                                position: "center",

                            }
                        },
                        data: [100],
                    }, {
                        name: '',
                        type: 'bar',
                        roundCap: true,
                        barWidth: 12,
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(66, 66, 66, .3)',
                        },
                        data: [num],
                        coordinateSystem: 'polar',

                        itemStyle: {
                            normal: {
                                color: new Echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: '#F7B500',
                                    },
                                    {
                                        offset: 1,
                                        color: '#66FFFF',
                                    },
                                ]),
                            },
                        },
                    },
                    {
                        name: '',
                        type: 'pie',
                        startAngle: 80,
                        radius: ['56%'],
                        hoverAnimation: false,
                        center: ['50%', '50%'],
                        itemStyle: {
                            color: 'rgba(66, 66, 66, .1)',
                            borderWidth: 1,
                            borderColor: 'rgb(55 144 198 / 25%)',
                        },
                        data: [100],
                    }
                    // ,
                    // {
                    //     name: '',
                    //     type: 'pie',
                    //     startAngle: 80,
                    //     radius: ['38%'],
                    //     hoverAnimation: false,
                    //     center: ['50%', '50%'],
                    //     itemStyle: {
                    //         color: 'rgba(66, 66, 66, .1)',
                    //         borderWidth: 1,
                    //         borderColor: 'rgb(18 49 115 / 86%)',
                    //     },
                    //     data: [100],
                    // }
                ],

            };
            // 传入数据
            echartRef.setOption(_option)
        }
    }
}
</script>

<style lang="scss" scoped>
.top-center-num-component {
    margin-top: 20px;
    position: relative;
    z-index: 1;
    .num-row {
        width: 540px;
        margin: 0 auto !important;
        display: flex;
        .num-item {
            color: white;
            border: 1px solid #08296c;
            padding: 10px 6px;
            display: flex;
            flex-direction: row;
            .left-chart {
                width: 50px;
                height: 100%;
                .chart {
                    height: 100%;
                    width: 100%;
                }
            }
            .right-infos {
                flex: 1px;
                padding-left: 6px;
                text-align: center;
                .num {
                    font-size: 27px;
                    font-weight: bold;
                    position: relative;
                    top: -4px;
                }
                .text {
                    color: white;
                    font-size: 13px;
                }
            }
            &:nth-child(1) {
                margin-right: 5px;
                width: 170px;
                .num {
                    color: #2d90da;
                }
            }
            &:nth-child(2) {
                margin-left: 5px;
                margin-right: 5px;
                width: 200px;
                .num {
                    color: #00f39d;
                }
            }
            &:nth-child(3) {
                margin-left: 5px;
                width: 170px;
                .num {
                    color: #5fe6fc;
                }
            }
        }
        .dialog-item {
            cursor: pointer;
        }
    }
}
</style>
