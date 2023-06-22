<template>
  <div
    id="echartLine"
    class="echartDiv"
    style="width: 100%; height: 230px; margin: 10px 0 10px 20px;"
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
      seriesNumData: [],
      seriesMonthData: [],
      needWeathData:[],
      nedSouthData:[],
nedWesteData:[],
nedNorthData:[],
nedCentData:[],
    };
  },
  mounted() {
    this.getKcdtData()
  },
  methods: {
    getKcdtData(){
      let params={
        m:{
          year: sessionStorage.getItem('year'),
        }
      }
      logisticsSituationAPI.getInventoryDynamics(params).then((res) => {
      this.needWeathData = res.mo.东部战区;
      this.nedSouthData=res.mo.南部战区
      this.nedWesteData=res.mo.西部战区
      this.nedNorthData=res.mo.北部战区
      this.nedCentData=res.mo.中部战区
      // this.needData.forEach((item) => {
      //   this.numData.push(item.num);
      //   this.monthData.push(item.month);
      // });
      this.seriesNumData = this.numData.map(function (item, index, array) {
        return item - 0;
      });
      this.seriesMonthData = this.monthData.map(function (item, index, array) {
        return item - 0;
      });
      this.setup();
    });
    },
    setup() {
      var myChart = echarts.init(document.getElementById("echartLine"));
      // 指定图表的配置项和数据
      let option = {
        color: ["#FFBF00", "#FF0087", "#37A2FF", "#00DDFF", "#80FFA5"],
        title: {
          // text: "Gradient Stacked Area Chart",
        },
        // legend: {
        //   orient: "vertical",
        //   x: "right",
        //   y: "center",
        //   // top:'90',
        //   padding: [0, 0, 0, 150],
        //   data: [
        //     {
        //       name: "无锡中心",
        //       textStyle: {
        //         color: "#01FFFF",
        //       },
        //     },
        //     {
        //       name: "桂林中心",
        //       textStyle: {
        //         color: "#50CAFF",
        //       },
        //     },
        //     {
        //       name: "西宁中心",
        //       textStyle: {
        //         color: "#89E843",
        //       },
        //     },
        //     {
        //       name: "沈阳中心",
        //       textStyle: {
        //         color: "#FFF06C",
        //       },
        //     },
        //     {
        //       name: "郑州中心",
        //       textStyle: {
        //         color: "#FFB801",
        //       },
        //     },
        //   ],
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          x: 50,
          y: 50,
          x2: 90,
          y2: 30,
        },
        // legend: {
        // data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
        // },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["1月", "2月", "3月", "4月", "5月","6月", "7月", "8月", "9月", "10月","11月","12月"],
            // data:this.seriesMonthData,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#113d5e",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        animation: true,
        animationDuration: 10000,
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
          //1
          {
            type: "line",
            name: "东部战区",
            stack: "Total",
            smooth: true,
            endLabel: {
              show: true,
              color:'#FFB801',
              formatter: function (params) {
                // console.log(params,'params=======');
                return params.seriesName+ ": " + params.value;
              },
            },
            
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#C5961E", //折线的颜色
                },
              },
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#3A5268",
                },
                {
                  offset: 1,
                  color: "#3A5268",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.needWeathData,
          },
          //2
          {
            type: "line",
            name: "南部战区",
            stack: "Total",
            smooth: true,
            endLabel: {
              show: true,
              color: "#FFF06C",
              formatter: function (params) {
                return params.seriesName+ ": " + params.value;
              },
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#B6B152", //折线的颜色
                },
                label: { show: true }, //是否在折线点上显示数字
              },
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#2C5377",
                },
                {
                  offset: 1,
                  color: "#2C5377",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.nedSouthData,
          },
          //3
          {
            type: "line",
            stack: "Total",
            name: "西部战区",
            smooth: true,
            endLabel: {
              color: "#89E843",
              show: true,
              formatter: function (params) {
                return params.seriesName+ ": " + params.value;
              },
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#5EB45E", //折线的颜色
                },
                label: { show: true }, //是否在折线点上显示数字
              },
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#174C7C",
                },
                {
                  offset: 1,
                  color: "#174C7C",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data:this.nedWesteData,
          },
          //4
          {
            type: "line",
            stack: "Total",
            name: "北部战区",
            smooth: true,
            endLabel: {
              show: true,
              color: "#50CAFF",
              formatter: function (params) {
                return params.seriesName+ ": " + params.value;
              },
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#3270DC", //折线的颜色
                },
                label: { show: true }, //是否在折线点上显示数字
              },
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#0D448C",
                },
                {
                  offset: 1,
                  color: "#0D448C",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.nedNorthData,
          },
          //5
          {
            type: "line",
            name: "中部战区",
            stack: "Total",
            smooth: true,
            endLabel: {
              show: true,
              color: "#01FFFF",
              formatter: function (params) {
                return params.seriesName+ ": " + params.value;
              },
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#0D8BC4", //折线的颜色
                },
                label: { show: true }, //是否在折线点上显示数字
              },
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,255,255,0.2)",
                },
                {
                  offset: 1,
                  color: "rgba(0,180,255,0.3)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: this.nedCentData,
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
    background: #73928b;
}
</style>