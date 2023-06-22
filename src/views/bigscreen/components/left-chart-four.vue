<template>
    <div class="left-chart-four-component">
        <div ref="block-chart" class="chart"></div>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
const Echarts = require("echarts");
export default {
    name: "LeftChartFourComponent",
    data() {
        return {};
    },
    mounted() {
        this.fetchDatas();
    },
    methods: {
        fetchDatas() {
            HomeAPI.fetchLeftLastMonthTansferLibrary({}).then(res => {
                this.renderChart(Echarts.init(this.$refs['block-chart']), res.data);
                this.$emit('on-bring', res.data)
            }).catch((e) => {
                this.renderChart(Echarts.init(this.$refs['block-chart']), []);
            })
        },
        renderChart(echartRef, data = {}) {
            let _carImgBase64 = 'data:image/png;base64,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';
            let _option = {
                xAxis: [
                    {
                        type: "category",
                        show: false,
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        show: false,
                    },
                ],
                graphic: {
                    elements: [
                    //     {
                    //     type: "image",
                    //     z: 3,
                    //     style: {
                    //         image: img,
                    //         width: 178,
                    //         height: 178
                    //     },
                    //     left: 'center',
                    //     top:  'center',
                    //     position: [100, 100]
                    // },
                    {
                        style: {
                            image: _carImgBase64,
                            width: 40,
                        },
                        type: "image",
                        z: 4,
                        left: 'center',
                        // top:  'center',
                        position: [20, 58]
                    }]
                },
                series: [
                    {
                        type: "pie",
                        radius: ["47%", "65%"],
                        startAngle: [110],
                        label: {
                            show: false,
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    type: "solid",
                                    color: "#333333",
                                },
                                length: 10,
                                length2: 10,
                            },
                        },
                        data: [
                            {
                                value: data.transfer_num,
                                name: "上月销售订单",
                                itemStyle: {
                                    normal: {
                                        color: "#2D90DA",
                                    },
                                },
                            },
                            {
                                value: data.not_transfer_num,
                                name: "上月非移库订单",
                                itemStyle: {
                                    normal: {
                                        color: "#EDAF47",
                                    },
                                },
                            },
                        ],
                    },
                ],
            };
            // 传入数据
            echartRef.setOption(_option);
        },
    },
};
</script>

<style lang="scss" scoped>
.left-chart-four-component {
    z-index: 1;
    height: 100%;
    width: 100%;
    .chart {
        height: 100%;
        width: 100%;
    }
}
</style>
