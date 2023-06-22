<template>
  <div class="guaranteeMonitor" id="guaranteeMonitor"></div>
</template>
<script>
import * as echarts from "echarts";
import globalMonitoringAPI from "@/api/modules/globalMonitoring";
export default {
  data() {
    return{
      getData:[],
      zyData:[],
      zsData:[],
      wcsData:[]
    }
  },
  mounted() {
    this.getInit();
  },
  methods: {
    getInit() {
      globalMonitoringAPI.getBzpcjkData({}).then((res) => {
        this.getData=res.list
        this.getData.forEach((item)=>{
          this.zyData.push(item.credentialAbstract)
          this.zsData.push(item.totalNum)
          this.wcsData.push(item.finNum)
        })
        let chart = echarts.init(document.getElementById("guaranteeMonitor"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["计划数量", "完成数量"],
          right: "60",
          textStyle: {
            fontSize: 10, //字体大小
            color: "rgba(255,255,255,0.65)", //字体颜色
          },
        },
        xAxis: {
          // data: ["桂林", "桂林", "桂林", "桂林", "桂林", "桂林"],
          data:this.zyData,
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        color: ["#ccc", "red"],
        yAxis: {
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
        title: {
          // title为标题部分，有一级标题text，二级标题subtext。这里我们使用二级标题，再修改一下这个二级标题的位置即可出现我们想要的效果了，当然样式也可以通过title.subtextStyle去配置
          subtext: "单位（万件）",
          left: 15, // 距离左边位置
          top: 10, // 距离上面位置
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        },
        series: [
          {
            name: "完成数量",
            stack: "total",
            type: "bar",
            // data: [480, 300, 265, 330, 210, 690],
            data:this.wcsData,
            barWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#438EFF" },
                  { offset: 0.5, color: "#3DB9FF" },
                  { offset: 1, color: "#002D9F" },
                ]),
              },
            },
          },
          {
            name: "计划数量",
            barWidth: 20,
            stack: "total",
            // data: [500, 500, 300, 610, 560, 720],
            data:this.zsData,
            itemStyle: {
              borderWidth: 1,
              borderColor: "#54B7FF",
              barBorderRadius: [20, 20, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#094185" },
                // { offset: 1, color: "#001e65" },
                { offset: 1, color: "#094185" },
              ]),
            },
            type: "bar",
            z: "1",
            barGap: "-100%",
          },
        ],
      };
      chart.setOption(option);
      });
    },
  },
};
</script>
<style lang="scss">
.guaranteeMonitor {
    width: 100%;
    height: 315px;
}
</style>