<template>
  <div
    id="echartAnalyData"
    class="echartDiv"
    style="width: 95%; height: 365px; margin: 0 80px 0 0;"
  ></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      xData: ["1月", "2月", "3月", "4月", "5月"], //横坐标
      yData: [210, 220, 209, 145, 170],
    };
  },
  mounted() {
    this.setup();
  },
  methods: {
    setup() {
      var myChart = echarts.init(document.getElementById("echartAnalyData"));
      // 指定图表的配置项和数据
      const option = {
        title: {
          text: "Weather Statistics",
        },
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
          data: this.xData,
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
            max:300,
            min:0,
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
          {
            max:300,
            min:0,
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
        title: [
          {
          // title为标题部分，有一级标题text，二级标题subtext。这里我们使用二级标题，再修改一下这个二级标题的位置即可出现我们想要的效果了，当然样式也可以通过title.subtextStyle去配置
          subtext: "单位（万件）",
          left: -5, // 距离左边位置
          top: 20, // 距离上面位置
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        },
        {
          // title为标题部分，有一级标题text，二级标题subtext。这里我们使用二级标题，再修改一下这个二级标题的位置即可出现我们想要的效果了，当然样式也可以通过title.subtextStyle去配置
          subtext: "单位（万件）",
          right: -5, // 距离左边位置
          top: 20, // 距离上面位置
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        }
        ],
        series: [
          {
            type: "bar", //形状为柱状图
            name: "计划数量",
            // yAxisIndex:1,
            data: this.yData,
            barWidth: 20,
            itemStyle: {
              //
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#1AFCB9" },
                  { offset: 1, color: "#1B5A9B" },
                ]),
              },
            },
          },
          {
            // data: this.dataY,
            data: [75, 140, 110, 160, 105, 115, 110, 105, 115, 95, 140, 125],
            type: "line",
            name: "完成数量",
            symbol: "none", //是否显示实心的折线圆点
            smooth: true, //让折线有弧度
            symbolSize: 7, //折线圆点的大小
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#54B7FF", //折线的颜色
                },
                label: { show: true }, //是否在折线点上显示数字
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,255,255,0.1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,255,255,0.1)",
                  },
                ],
                global: false,
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
.a {
    background: #847d39;
}
</style>