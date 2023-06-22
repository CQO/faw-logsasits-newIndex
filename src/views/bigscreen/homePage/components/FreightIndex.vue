<template>
  <div id="my-chart" style="width: 100%; height: 240px;"></div>
</template>

<script>
import getPlanMonitorDataApi from "@/api/modules/homePage";
import * as echarts from "echarts";
import pieBg from "@/assets/images/pie_bg.gif";

export default {
  name: "FreightIndex",
  data() {
    return {
      getHyzsData: [],
      contList: [],
    };
  },
  mounted() {
    this.initChart();
    // this.interval = setInterval(() => this.doing(), 200)
  },
  methods: {
    initChart() {
      getPlanMonitorDataApi.getHyzsData({}).then((res) => {
        this.getHyzsData = res.list.map((item) => {
          return { value: item.num, name: item.transportType };
        });
        const myChart = echarts.init(document.getElementById("my-chart"));
        const option = {
          title: {
            borderColor: "#27A4FF",
          },
          tooltip: {
            trigger: "item",
            // 修改显示数据
            // formatter: "{a} <br/>{b} : {c} ({d}%)",
            axisPointer: {},
            textStyle: {
              color: "#27A4FF",
            },
          },
          legend: {
            textStyle: {
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
            },
            orient: "vertical",
            right: 40,
            top: 40,
            bottom: 20,
          },
          graphic: [
            {
              type: "image",
              left: "35%",
              top: "38%",
              z: 2,
              bounding: "raw",
              scale: [1, 1], //缩放
              style: {
                image: require("@/assets/image/homePage/ecBingBg.png"),
                opacity: 1,
              },
            },
          ],
          series: [
            {
              name: "",
              type: "pie",
              radius: [30, 70],
              center: ["40%", "50%"],
              itemStyle: {
                borderRadius: 5,
              },
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
              startAngle: 360,
              data: this.getHyzsData,
            },
          ],
        };
        myChart.setOption(option);
      });
    },
    doing() {
      this.option.series[0].startAngle -= 5;
      this.myChart.setOption(this.option);
    },
  },
};
</script>

<style lang="scss" scoped>
.rotate {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    -webkit-transition: -webkit-transform 1s linear;
    transition: transform 1s linear;
}
</style>
