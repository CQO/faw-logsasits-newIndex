<template>
    <div
        id="echartAnalyData"
        class="echartDiv"
        style="width: 100%; height: 285px; margin: -20px 50px 0 -10px;"
    ></div>
</template>
<script>
import {getAreaDemandKcList} from '@/api/modules/demandAnalysis'
    import * as echarts from "echarts";

    export default {
        data() {
            return {
                getKcData:[],
                zqNameData:[],
                cbData:[],
                ckData:[],
                xData: ["东部战区", "南部战区", "西部战区", "北部战区", "中部战区"], //横坐标
                yData: [210, 220, 209, 145, 170],
            };
        },
        mounted() {
            // this.setup();
            this.getDemandData()
        },
        methods: {
            getDemandData(){
                getAreaDemandKcList({}).then((res)=>{
                    this.getKcData=res.list
                    this.getKcData.forEach(item=>{
                        this.zqNameData.push(item.zq)
                        this.cbData.push(item.xqNum)
                        this.ckData.push(item.kcNum)
                    })
                var myChart = echarts.init(document.getElementById("echartAnalyData"));
                // 指定图表的配置项和数据
                const option = {
                    tooltip: {
                        trigger: "axis",
                    },
                    grid:{
                        containLabel:true
                    },
                    legend: {
                        data: ["需求", "库存"],
                        right: "60",
                        textStyle: {
                            fontSize: 10, //字体大小
                            color: "rgba(255,255,255,0.65)", //字体颜色
                        },
                    },
                    xAxis: {
                        data: this.zqNameData,
                        xAxis:{
                            textStyle:{
                                size:'5'
                            }
                        },
                        axisLine: {
                            //x轴线的颜色以及宽度
                            show: true,
                            lineStyle: {
                                color: "#fff",
                                width: 0,
                                type: "dashed",
                            },
                        },
                        axisLabel: {  
   interval:0,  
   rotate:30  
}  
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
                        left: 15, // 距离左边位置
                        top: 20, // 距离上面位置
                        subtextStyle: {
                            // 设置二级标题的样式
                            color: "rgba(255,255,255,0.7)",
                        },
                    },
                    series: [
                        {
                            type: "bar", //形状为柱状图
                            name: "需求",
                            // yAxisIndex:1,
                            data: this.cbData,
                            // data:this.yData,
                            barWidth: 15,
                            itemStyle: {
                                //
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#FFC977"},
                                        {offset: 1, color: "#2C251B"},
                                    ]),
                                },
                            },
                        },
                        {
                            // data: this.dataY,
                            data: this.ckData,
                            // data:this.yData,
                            type: "bar",
                            name: "库存",
                            barWidth: 20,
                            itemStyle: {
                                //
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#54DED6"},
                                        {offset: 1, color: "#193F3D"},
                                    ]),
                                },
                            },
                        },
                    ],
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
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
