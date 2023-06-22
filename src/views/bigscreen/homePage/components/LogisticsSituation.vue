<template>
    <div
        id="echartAnalyData"
        class="echartDiv"
        style="width: 95%; height: 275px; margin: 0 50px 0 20px;overflow:hidden"
    ></div>
</template>
<script>
    import * as echarts from "echarts";
import getPlanMonitorDataApi from '@/api/modules/homePage'
    export default {
        data() {
            return {
                xData: ["1月", "2月", "3月", "4月", "5月"], //横坐标
                yData: [210, 220, 209, 145, 170],
                getWlData:[],
                monData:[],
                numData:[],
                lastNumData:[]
            };
        },
        mounted() {
            this.setup();
            setTimeout(() => {// 解决echarts图表放大溢出父容器
                    const resizeOb = new ResizeObserver((entries) => {
                        for (const entry of entries) {
                            echarts.getInstanceByDom(entry.target).resize();
                        }
                    });
                    resizeOb.observe(document.getElementById('echartAnalyData'));
                });
        },
        methods: {
            setup() {
                getPlanMonitorDataApi.getWtsfxData({}).then(res=>{
                    this.getWlData=res.list;
                    this.getWlData.forEach(item=>{
                        this.monData.push(item.mon)
                        this.numData.push(item.num)
                        this.lastNumData.push(item.numt)
                    })
                    var myChart = echarts.init(document.getElementById("echartAnalyData"));
                // 指定图表的配置项和数据
                const option = {
                    tooltip: {
                        trigger: "axis",
                    },
                    legend: {
                        data: ["本年运单量", "上年运单量"],
                        right: "60",
                        textStyle: {
                            fontSize: 10, //字体大小
                            color: "rgba(255,255,255,0.65)", //字体颜色
                        },
                    },
                    xAxis: {
                        data: this.monData,
                        axisLine: {
                            //x轴线的颜色以及宽度
                            show: true,
                            lineStyle: {
                                color: "#fff",
                                width: 0,
                                type: "dashed",
                            },
                        },
                    },
                    animation: true,
        animationDuration: 5000,
                    yAxis: [
                        {
                            splitLine: {
                                //分割线配置
                                show: true,
                                lineStyle: {
                                    type: "dashed",
                                    color: "#113d5e",
                                },
                            },
                            axisLabel: {
                                //y轴文字的配置
                                textStyle: {
                                    color: "#fff", //Y轴内容文字颜色
                                },
                            },
                        },
                    ],
                    title: {
                        // title为标题部分，有一级标题text，二级标题subtext。这里我们使用二级标题，再修改一下这个二级标题的位置即可出现我们想要的效果了，当然样式也可以通过title.subtextStyle去配置
                        subtext: "单位（万件）",
                        left: -5, // 距离左边位置
                        top: 20, // 距离上面位置
                        subtextStyle: {
                            // 设置二级标题的样式
                            color: "rgba(255,255,255,0.7)",
                        },
                    },
                    series: [
                        {
                            type: "bar", //形状为柱状图
                            name: "本年运单量",
                            // yAxisIndex:1,
                            data: this.numData,
                            barWidth: 10,
                            itemStyle: {
                                //
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#1AFCB9"},
                                        {offset: 1, color: "#1B5A9B"},
                                    ]),
                                },
                            },
                        },
                        {
                            // data: this.dataY,
                            data: this.lastNumData,
                            type: "bar",
                            name: "上年运单量",
                            barWidth: 10,
                            itemStyle: {
                                //
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#03B0FA"},
                                        {offset: 1, color: "#0070FF"},
                                    ]),
                                },
                            },
                        },
                    ],
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                window.addEventListener("resize", () => {
				      if(myChart){
						  myChart.resize()
					  }
				})
                })
                
            },
        },
    };
</script>
<style scoped>
    .a {
        background: #847d39;
    }
</style>
