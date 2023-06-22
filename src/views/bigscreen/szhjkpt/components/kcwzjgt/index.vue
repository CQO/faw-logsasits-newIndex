<template>
    <div id="my-chart" style="width: 100%; height: 240px;"></div>
</template>

<script>
    import * as echarts from "echarts";
    import pieBg from '@/assets/images/pie_bg.gif'

    export default {
        name: "FreightIndex",
        data() {
            return {

            }
        },
        mounted() {
            this.initChart()
            // this.interval = setInterval(() => this.doing(), 200)
        },
        methods: {
            initChart() {
                const myChart = echarts.init(document.getElementById("my-chart"));
                const option = {
                    title: {
                        borderColor: '#27A4FF'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        axisPointer: {},
                        textStyle: {
                            color: '#27A4FF'
                        }
                    },
                    legend: {
                        data: [
                            '类型1',
                            '类型2',
                            '类型3',
                            '类型4',
                            '类型5',
                            '类型6'
                        ],
                        textStyle: {
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: 14
                        },
                        orient: 'vertical',
                        right: 30,
                        top: 50,
                        bottom: 20,
                    },
                    graphic: [
                        {
                            type: 'image',
                            left: '10%',
                            top: '-20%',
                            z: 2,
                            bounding: 'raw',
                            scale: [1.0, 1.0], //缩放
                            style: {
                                // image: pieBg
                            }
                        },
                    ],
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: [20, 80],
                            center: ['40%', '50%'],
                            itemStyle: {
                                borderRadius: 5
                            },
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            startAngle: 360,
                            data: [
                                {value: 40, name: '类型1'},
                                {value: 33, name: '类型2'},
                                {value: 28, name: '类型3'},
                                {value: 22, name: '类型4'},
                                {value: 20, name: '类型5'},
                                {value: 15, name: '类型6'},
                                {value: 12, name: '类型7'},
                                {value: 10, name: '类型8'}
                            ]
                        }
                    ]
                }
                myChart.setOption(option)
            },
            doing() {
                this.option.series[0].startAngle -= 5;
                this.myChart.setOption(this.option);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rotate {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
        -webkit-transition: -webkit-transform 1s linear;
        transition: transform 1s linear;
    }
</style>
