<template>
  <div
    id="echartLine"
    class="echartDiv"
    style="width: 470px; height: 260px; margin: -30px 0 10px 20px;"
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
      logisticsSituationAPI.getInventoryDynamics({}).then((res) => {
      // this.needWeathData = res.mo.东部战区;
      // this.nedSouthData=res.mo.南部战区
      // this.nedWesteData=res.mo.西部战区
      // this.nedNorthData=res.mo.北部战区
      // this.nedCentData=res.mo.中部战区
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
        legend: {
          top:'40',
          right:40,
          data: [ '入库量','出库量','划转量','库存量','吞吐量','周转率'],
          textStyle: {
                            fontSize: 10, //字体大小
                            color: "rgba(255,255,255,0.65)", //字体颜色
                        },
        },
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
          y: 100,
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
            interval: 0,
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
          top: 60, // 距离上面位置
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        },
        series: [
          //1
          {
            type: "line",
            name: "入库量",
            stack: "Total",
            smooth: true,
            endLabel: {
              show: false,
              color:'#FFB801',
            },
            
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#60C2E1", //折线的颜色
                },
              },
            },
            showSymbol: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,255,255,0.1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0.1)',
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [410,410,420,720,800,820,740,710,840,810,940,920],
          },
          //2
          {
            type: "line",
            name: "出库量",
            stack: "Total",
            smooth: true,
            endLabel: {
              show: false,
              color: "#FFF06C",
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#7D8AFF", //折线的颜色
                },
                label: { show: true }, //是否在折线点上显示数字
              },
            },
            showSymbol: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,255,255,0.1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0.1)',
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [420,420,400,720,710,740,740,710,840,810,840,820],
          },
          //3
          {
            type: "line",
            stack: "Total",
            name: "划转量",
            smooth: true,
            endLabel: {
              color: "#89E843",
              show: false,
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#02A57E", //折线的颜色
                },
                label: { show: true }, //是否在折线点上显示数字
              },
            },
            showSymbol: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,255,255,0.1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0.1)',
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data:[300,380,390,400,420,510,430,480,560,520,600,590],
          },
          //4
          {
            type: "line",
            stack: "Total",
            name: "库存量",
            smooth: true,
            endLabel: {
              show: false,
              color: "#50CAFF",
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#BAAA17", //折线的颜色
                },
                label: { show: true }, //是否在折线点上显示数字
              },
            },
            showSymbol: false,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,255,255,0.1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0.1)',
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [200,380,290,300,220,280,330,430,320,400,400,390],
          },
          //5
          {
            type: "line",
            name: "吞吐量",
            stack: "Total",
            smooth: true,
            endLabel: {
              show: false,
              color: "#01FFFF",
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#D37F00", //折线的颜色
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,255,255,0.1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0.1)',
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [180,180,190,200,220,210,230,230,280,300,260,310],
          },
          //6
          {
            type: "line",
            name: "周转率",
            stack: "Total",
            smooth: true,
            endLabel: {
              show: false,
              color: "gray",
            },
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#FF6523", //折线的颜色
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,255,255,0.1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0.1)',
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [120,320,120,220,130,120,260,160,80,50,70,20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>