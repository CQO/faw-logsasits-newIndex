<template>
  <div
    id="orderMonitor"
    style="width: 97%; height: 286px; margin: -30px 25px 30px 20px;"
  ></div>
</template>
<script>
import * as echarts from "echarts";
import globalMonitoringAPI from "@/api/modules/globalMonitoring";
export default {
  data() {
    return {
      getData:[],
      slData:[],
      cbdwData:[]
    };
  },
  mounted() {
    this.getOrderMonitor();
  },
  methods: {
    getOrderMonitor() {
      globalMonitoringAPI.getDdjkData({}).then((res) => {
        console.log(res, "全域监控-订单监控======================");
        this.getData=res.list
        this.getData.forEach((item)=>{
          this.slData.push(item.num)
          this.cbdwData.push(item.undertakeUnit)
        })
        var myChart = echarts.init(document.getElementById("orderMonitor"));
      let option = {
        color: ["#157ef5"], // 设置柱状图的颜色
        textStyle: {
          color: "#fff",
          fontSize:'22'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          left: "3%",
          right: "14%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          // 设置x轴显示几段
          min: 0,
          max: 700,
          interval: 100,
          axisTick: { show: true },
          splitLine:{
            show:true,
            lineStyle:{
                type:'dashed',
                color:'#062F7D'
            }
          },
          axisLine: {
            lineStyle: {
                type:'dashed',
              color: "#062F7D",
            },
          },
        },
        yAxis: {
          type: "category",
          // data: ["京东", "顺丰", "邮政"],
          data:this.cbdwData,
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              type:'dashed',
              color: "#062F7D",
            },
          },
          inside: true,
          textStyle: {
            color: "#000",
            fontSize:'16'
          },
        },
        title: {
          subtext: "单位（次）",
          right: -5,
          bottom: 0,
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              color: "#072F7B", // 定义柱形的背景色
              borderRadius: [0, 0, 0, 0], //定义背景柱形的圆角
            },
            barGap: "-100%", //设置柱形重合的重要步骤
            data: [700, 700, 700],
            animation: false, // 关闭动画效果
            barWidth: "22px", // 设置柱形宽度
          },
          {
            label:{
                show:true,
                position:'right',
                textStyle:{
                  color:'#03EEFA',
                  fontSize:'18'
                }
              },
            type: "bar",
            // data: [650, 510, 620],
            data:this.slData,
            barWidth: "10px",
            barGap: "-72%", //设置柱形重合的重要步骤
            itemStyle: {
              borderRadius: [0, 0, 0, 0], // 定义柱形的圆角
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#03EEFA",
                  },
                  {
                    offset: 1,
                    color: "#237CE0",
                  },
                ],
                global: false,
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      });
    },
  },
};
</script>
<style lang="scss">
</style>