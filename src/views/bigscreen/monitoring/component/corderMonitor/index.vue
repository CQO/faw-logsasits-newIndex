<template>
  <div
    id="echartLine"
    class="echartDiv"
    style="width: 95%; height: 365px; margin-left: 40px;"
  ></div>
</template>
<script>
import monitoringAPI from "@/api/modules/monitoring";
import * as echarts from "echarts";
export default {
  data() {
    return {
      getData: [],
      centerList: [],
      planData: [],
      finData: [],
    };
  },
  mounted() {
    this.setup();
    this.getDdjkData();
  },
  methods: {
    getDdjkData() {
      monitoringAPI.getDdjkData().then((res) => {
        this.getData = res.list;
        this.getData.forEach((item) => {
          this.centerList.push(item.sendFromUnit),
            this.planData.push(item.totalNum);
            var getPlanData = this.planData.map(function (item) {
               return item - 0;
            });
            this.finData.push(item.finNum);
        });
      var myChart = echarts.init(document.getElementById("echartLine"));
      // 指定图表的配置项和数据
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
          type: "category",
          // data: ["无锡中心", "桂林中心", "西宁中心","沈阳中心","郑州中心"],
          data: this.centerList,
          axisLabel: {
            interval:0,  
   rotate:30  ,
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
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
            // data: [2900, 3800, 2650,3680,2990],
            data: this.finData,
            name: "完成数量",
            type: "bar",
            stack: "total",
            barWidth: 20,
            type: "pictorialBar", //设置类型为象形柱状图
            symbol: "rect", //图形类型，带圆角的矩形
            symbolMargin: "1", //图形垂直间隔
            symbolRepeat: true,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 0, color: "#03EEFA" },
                  { offset: 1, color: "#237CE0" },
                ]),
              },
            },
            barGap: "-100%", //移动第二个柱子的位置实现重叠
          },
          {
            barWidth: 20,
            name: "计划数量",
            stack: "total",
            // data: [4600, 5000, 4000,4500,5400],
            data: this.planData,
            itemStyle: {
              color: "none",
              borderWidth: 1,
              borderColor: "#27CBFF",
            },
            type: "bar",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      });
    },
    setup() {
      var myChart = echarts.init(document.getElementById("echartLine"));
      // 指定图表的配置项和数据
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
          type: "category",
          // data: ["无锡中心", "桂林中心", "西宁中心","沈阳中心","郑州中心"],
          data: this.centerList,
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
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
            // data: [2900, 3800, 2650,3680,2990],
            data: this.finData,
            name: "完成数量",
            type: "bar",
            stack: "total",
            barWidth: 20,
            type: "pictorialBar", //设置类型为象形柱状图
            symbol: "rect", //图形类型，带圆角的矩形
            symbolMargin: "1", //图形垂直间隔
            symbolRepeat: true,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 0, color: "#03EEFA" },
                  { offset: 1, color: "#237CE0" },
                ]),
              },
            },
            barGap: "-100%", //移动第二个柱子的位置实现重叠
          },
          {
            barWidth: 20,
            name: "计划数量",
            stack: "total",
            // data: [4600, 5000, 4000,4500,5400],
            data: this.planData,
            itemStyle: {
              color: "none",
              borderWidth: 1,
              borderColor: "#27CBFF",
            },
            type: "bar",
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