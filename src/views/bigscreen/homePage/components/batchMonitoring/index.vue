<template>
  <div
    id="todayIncome"
    class="echartDiv"
    style="width: 100%; height: 275px;"
  ></div>
</template>
<script>
import monitoringAPI from "@/api/modules/monitoring";
import * as echarts from "echarts";
export default {
  data() {
    return {
      getData: [],
      zhaoyao: [],
      wcs:[],
      totalNum:[]
    };
  },
  mounted() {
    this.getBzpcjkData();
    this.init();
  },
  methods: {
    getBzpcjkData() {
      monitoringAPI.getBzpcjkData({}).then((res) => {
        this.getData = res.list;
        this.getData.forEach((item) => {
          this.zhaoyao.push(item.credentialAbstract);
          this.totalNum.push(item.totalNum);
          var totalNumData11 = this.totalNum.map(function (item) {
            return item - 0;
          });
          this.wcs.push(item.finNum);
          var wcsNumData11 = this.wcs.map(function (item) {
            return item - 0;
          });
        });
        let chart = echarts.init(document.getElementById("todayIncome"));
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
            // data: ["冬季被装保暖南部", "冬季被装保暖南部", "冬季被装保暖南部"],
            data: this.zhaoyao,
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
            subtext: "单位（次）",
            left: 15, // 距离左边位置
            top: 10, // 距离上面位置
            subtextStyle: {
              // 设置二级标题的样式
              color: "rgba(255,255,255,0.7)",
            },
          },
          series: [
            {
              data: this.wcs,
              name: "完成数量",
              type: "bar",
              stack: "total",
              barWidth: 20,
              itemStyle: {
                normal: {
                  barBorderRadius: [20, 20, 0, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#F8D26F" },
                    { offset: 1, color: "#001e65" },
                  ]),
                },
              },
            },
            {
              barWidth: 20,
              name: "计划数量",
              stack: "total",
              data: this.totalNum,
              itemStyle: {
                normal: {
                  barBorderRadius: [20, 20, 0, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#46506F" },
                    // { offset: 1, color: "#001e65" },
                    { offset: 1, color: "#001e65" },
                  ]),
                },
              },
              type: "bar",
              barGap: "-100%", //移动第二个柱子的位置实现重叠
              z: "1", //改变这根柱子的层级使这根柱子在下面
            },
          ],
        };
        chart.setOption(option);
      });
    },
    init() {},
  },
};
</script>
<style scoped>
.eal {
    background: #8c8063;
}
</style>