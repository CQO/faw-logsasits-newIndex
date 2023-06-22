<template>
    <div class="center-dialog-bar-chart-component">
        <div ref="num-chart" class="chart"></div>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
const Echarts = require('echarts')
export default {
    name: 'CenterDialogBarChartComponent',
    data() {
        return {
        }
    },
    computed: {

    },
    props: {
        cardType: {
            type: Number,
            default: 0
        }
    },
    mounted() {
        this.fetchDatas();
    },
    methods: {
        fetchDatas() {
            if (!this.cardType) return;
            let _api = null;
            let _field = '';
            // 计算中间图表 -> 当日累计入库
            if (this.cardType === 1) {
                _field = 'sum_real_instore_qty_new'
                _api = HomeAPI.fetchCenterCurrDaySumInStore;
            }
            // 计算中间图表 -> 当日累计出库
            else if (this.cardType === 2) {
                _field = 'sum_real_out_qty_new'
                _api = HomeAPI.fetchCenterCurrDaySumOutStore;
            }
            // 计算中间图表 -> 获取当前库存数量
            else if (this.cardType === 3) {
                _field = 'value'
                _api = HomeAPI.fetchCenterOutstoreQtyTrend;
            }
            // 计算中间图表 -> 紧急订单及时出库率
            else if (this.cardType === 4) {
                _field = 'sum_real_out_qty_new'
                _api = HomeAPI.fetchCenterOutStoreRate;
            }
            _api({}).then(res => {
                if (this.cardType === 3) {
                    HomeAPI.fetchCenterCurrStockPreDay({}).then(res1 => {
                        this.renderChart(Echarts.init(this.$refs['num-chart']), (res1.data.list || []).reverse(), '', true);
                    })
                } else {
                    this.renderChart(Echarts.init(this.$refs['num-chart']), res.data.list || [], _field);
                }


                this.$emit('on-bring', res.data)
            }).catch((e) => {
                this.renderChart(Echarts.init(this.$refs['num-chart']), [], _field);
            })
        },
        renderChart(echartRef, datas = [], field, isCurrStock) {
            let _titles = [];
            let _datas = [];
            let _max = 0;
            let _maxDatas = [];
            if (isCurrStock == true) {
                datas.map(r => {
                    _titles.push(r.convert_date)
                    _datas.push(r.curr_usable_num)
                })
            } else {
                _titles = ['00:00-08:00', '08:00-16:00', '16:00-24:00'];
                _datas = [ 0, 0, 0 ];
                datas.map(r => {
                    let _pos = _titles.indexOf(r.time);
                    if (_pos > -1) {
                        _datas[_pos] = r[field];
                    }
                })
            }
            _max = Math.max(..._datas);
            _maxDatas = [ _max || 1, _max || 1, _max || 1 ];
            let _option = {
                grid: {
                    left: '45%',
                    right: '19%',
                    bottom: '0%',
                    top: '15%',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    formatter: function(params) {
                        return params[0].name + '<br/>' +
                            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                            params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' 万<br/>'
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
                        textStyle: {
                            color: '#D9D9D9',
                            fontSize: '8'
                        },
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
                    data: _titles
                }, {
                    type: 'category',
                    inverse: true,
                    axisTick: 'none',
                    axisLine: 'none',
                    show: true,
                    axisLabel: {
                        margin: 0,
                        textStyle: {
                            color: '#D9D9D9',
                            fontSize: '8'
                        },
                        formatter: function(value) {
                            if (value >= 10000) {
                                return (value / 10000).toLocaleString() + '万';
                            } else {
                                return value.toLocaleString();
                            }
                        },
                    },
                    data: _datas
                }],
                series: [{
                        name: '件数',
                        type: 'bar',
                        zlevel: 1,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 4,
                                color: new Echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#48A9F8'
                                }, {
                                    offset: 1,
                                    color: '#48A9F8'
                                }]),
                            },
                        },
                        barWidth: 4,
                        data: _datas
                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: 4,
                        barGap: '-100%',
                        data: _maxDatas,
                        itemStyle: {
                            normal: {
                                color: 'rgba(24,31,68,1)',
                                barBorderRadius: 4,
                            }
                        },
                    },
                ]
            };
            // 传入数据
            echartRef.setOption(_option)
        }
    }
}
</script>

<style lang="scss" scoped>
.center-dialog-bar-chart-component {
    height: 50px;
    width: 120px;
    .chart {
        width: 100%;
        height: 100%;
    }
}
</style>
