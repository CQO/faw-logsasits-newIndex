<template>
  <div
    id="map"
    style="width: 100%; height: 230px; margin: 10px 0 30px 20px;"
  ></div>
</template>
<script>
import logisticsSituationAPI from "@/api/modules/logisticsSituation";
import * as echarts from "echarts";
export default {
  data() {
    return {
      numData: [],
      monthData: [],
      needData: [
        {num:1200,
         month:1
        },
        {
          num:5555,
          month:2
        },
        {
          num:3210,
          month:3
        },
        {
          num:1111,
          month:4
        },
        {
          num:6200,
          month:5
        },
        {
          num:2222,
          month:6
        }
      ],
      seriesNumData: [],
      seriesMonthData: [],
    };
  },
  mounted() {
    this.getGydtData()
    // this.getMap();
  },
  methods: {
    getGydtData(){
      let params={
        year: sessionStorage.getItem('year'),
      }
      logisticsSituationAPI.getSupplyDynamics(params).then((res) => {
      this.needData = res.list;
      this.needData.forEach((item) => {
        this.numData.push(item.num);
        this.monthData.push(item.month);
      });
      this.seriesNumData = this.numData.map(function (item, index, array) {
        return item - 0;
      });
      this.seriesMonthData = this.monthData.map(function (item, index, array) {
        return item - 0;
      });
      this.getMap();
    });
    },
    getMap() {
      var myChart = echarts.init(document.getElementById("map"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          // data: this.dataX,
          // data: ["1月", "2月", "3月", "4月", "5月", "6月"],
          data: this.seriesMonthData,
          boundaryGap: false, //控制日期是否在中间显示
          axisLabel: {
            show: true, //是否显示日期
            interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
            textStyle: {
              color: "#fff", //日期的颜色
              fontSize: 12, //字体的大小
            },
          },
          axisLine: {
            lineStyle: {
              color: "#113d5e", // x轴的颜色
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#113d5e",
            },
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#fff", //数字的颜色
            },
            inside: false, //控制数据是否在内侧还是外侧显示
          },
          axisLine: {
            lineStyle: {
              color: "#ccc", // 折线的颜色
            },
          },
        },
        title: {
          // title为标题部分，有一级标题text，二级标题subtext。这里我们使用二级标题，再修改一下这个二级标题的位置即可出现我们想要的效果了，当然样式也可以通过title.subtextStyle去配置
          subtext: "单位（万件）",
          left: -5, // 距离左边位置
          top: 10, // 距离上面位置
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        },
        series: [
          {
            // data: this.dataY,
            // data: [480, 900, 690, 900, 780, 800, 780, 800, 600, 800, 780],
            data: this.seriesNumData,
            type: "line",
            symbol: "none", //是否显示实心的折线圆点
            smooth: true, //让折线有弧度
            symbolSize: 7, //折线圆点的大小
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3,
                  //color: "#54B7FF", //折线的颜色
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: '#06DBF3'
                                    }, {
                                        offset: 1,
                                        color: '#0051EE'
                                    }])
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
      myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
.a {
    background: #137ecb;
}
</style>
