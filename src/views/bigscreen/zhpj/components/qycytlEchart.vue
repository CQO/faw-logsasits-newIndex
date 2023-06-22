<template>
    <div
        id="echartAnalyData"
        class="echartDiv"
        style="width: 100%; height: 285px; margin: 30px 25px 30px 20px;"
    ></div>
</template>
<script>
import {getZhpjQycytlData} from '@/api/modules/zhpj'
    import * as echarts from "echarts";

    export default {
        props: {
            serachData: {
                type: Array,
                default: false
            }
        },
        data() {
            return {
                getKcData:[],
                zqNameData:[],
                jdData:[],
                sfData:[],
                yzData:[],
                xData: ["陆运能力", "空运能力", "水运能力", "海运能力"], //横坐标
                yData: [210, 220, 209, 145],
            };
        },
        mounted() {
            // this.setup();
            this.getDemandData()
        },
        watch:{
            'serachData'(value){
                this.tableList=value
                this.getDemandData()
    }
  },
        methods: {
            getDemandData(){
                this.getKcData=[]
                this.jdData=[]
                this.sfData=[]
                this.yzData=[]
                this.zqNameData=[]
                let params={
                    m:{
                        year:'',
                        month:''
                    }
                }
                    this.getKcData=this.tableList
                if(this.getKcData.length==0){
                    this.getKcData=[]
                }
                    this.getKcData.forEach(item=>{
                        this.zqNameData.push(item.transportTypeName)
                        this.jdData.push(item.京东)
                        this.sfData.push(item.顺丰)
                        this.yzData.push(item.邮政)
                    })
                var myChart = echarts.init(document.getElementById("echartAnalyData"));
                // 指定图表的配置项和数据
                const option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
      type: 'shadow'
    },
                    },
                    grid:{
                        containLabel:true
                    },
                    legend: {
                        data: ["京东", "顺丰","邮政"],
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
                            name: "京东",
                            // yAxisIndex:1,
                            // data: this.cbData,
                            data:this.jdData,
                            barWidth: 15,
                            itemStyle: {
                                //
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#03CEFA"},
                                        {offset: 1, color: "#004346"},
                                    ]),
                                },
                            },
                        },
                        {
                            data: this.dataY,
                            // data: this.ckData,
                            data:this.sfData,
                            type: "bar",
                            name: "顺丰",
                            barWidth: 15,
                            itemStyle: {
                                //
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#6DEDA0"},
                                        {offset: 1, color: "#064835"},
                                    ]),
                                },
                            },
                        },
                        {
                            data: this.yzData,
                            // data: this.ckData,
                            type: "bar",
                            name: "邮政",
                            barWidth: 15,
                            itemStyle: {
                                //
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#DAC34B"},
                                        {offset: 1, color: "#4A3E1D"},
                                    ]),
                                },
                            },
                        },
                    ],
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                // })
            }
            
        },
    };
</script>
<style scoped>
    .a {
        background: #847d39;
    }
</style>
