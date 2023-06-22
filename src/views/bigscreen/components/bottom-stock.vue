<template>
    <div class="bottom-stock-component">
        <img src="/images/visualise/layout-bottom-stock.png" class="bottom-stock-bg" >
        <img src="/images/visualise/icon-kcpx.png" class="bottom-stock-bg-icon" >
        <div class="title">库存平效</div>
        <div class="num">{{ totalNum || 0 }}件</div>
        <div ref="num-chart-kcpx" class="chart"></div>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
const Echarts = require('echarts')
export default {
    name: 'BottomStockComponent',
    data() {
        return {
            totalNum: 0,
            area: 1000,
        }
    },
    // mounted() {
    //     this.$nextTick(() => {
    //         this.numChart1 = Echarts.init(this.$refs['num-chart-kcpx'])
    //         this.renderChart(this.numChart1);
    //     })
    // },
    mounted() {
        this.fetchDatas();
    },
    methods: {
        fetchDatas() {
            HomeAPI.fetchCenterStockFlatEffect({}).then(res => {
                this.totalNum = res.data.totalNum;
                this.renderChart(Echarts.init(this.$refs['num-chart-kcpx']), res.data.list);
            }).catch((e) => {
                this.renderChart(Echarts.init(this.$refs['num-chart-kcpx']), []);
            })
        },
        calcPercent(num, total) {
            if (!total || total <= 0) return 0;
            return Math.round(num / total * 10000) / 100;
        },
        renderChart(echartRef, datas = []) {
            let _titles = ['00:00-08:00', '08:00-16:00', '16:00-24:00'];
            let _datas = [ 0, 0, 0 ];
            datas.map(r => {
                let _pos = _titles.indexOf(r.time);
                if (_pos > -1) {
                    // _datas[_pos] = this.calcPercent(r.avg_usable_num || 0, this.area);
                    _datas[_pos] = r.avg_usable_num || 0;
                }
            })
            let _max = Math.max(..._datas);
            let _maxDatas = [ _max || 1, _max || 1, _max || 1 ];
            let _option = {
                grid: {
                    left: '50%',
                    right: '19%',
                    bottom: '1%',
                    top: '1%',
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
.bottom-stock-component {
    margin-top: 20px;
    position: absolute;
    bottom: 120px;
    left: 576px;
    z-index: 1;
    .bottom-stock-bg {
        width: 289px;
    }
    .bottom-stock-bg-icon {
        position: absolute;
        right: 14px;
        bottom: 20px;
        width: 20px;
    }
    .title {
        font-size: 12px;
        color: #fffdfd;
        position: absolute;
        top: 10px;
        left: 66px;
    }
    .num {
        font-size: 17px;
        font-weight: bold;
        color: #cc5f66;
        position: absolute;
        top: 42px;
        left: 42px;
    }
    .chart {
        position: absolute;
        right: 50px;
        bottom: 14px;
        width: 120px;
        height: 50px;
    }
}
</style>
