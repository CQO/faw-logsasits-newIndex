<template>
    <div id="ljfjl_char" class="chart" style="margin-top: -20px; width: 100%; height: 100px;"></div>
</template>

<script>
import logisticsSituationAPI from "@/api/modules/logisticsSituation";
import * as echarts from "echarts";
export default {
  name: "LeftChartThreeComponent",
  data() {
    return {
      total:'',
      haveCompleted:'',//已完成
      PercentageCompleted:'',//已完成百分比
      incomplete:'',//未完成
      notCompletedPercent:''//未完成百分比
    };
  },
  mounted() {
    this.getFjpsData()
  },
  beforeDestroy() {
    this.$eventBus.$off("left-chart-three-refresh");
  },
  methods: {
    getFjpsData(){
      let params={
        m:{
          year: sessionStorage.getItem('year'),
        }
      }
      logisticsSituationAPI.getSorting(params).then((res)=>{
        this.total=res.m.total//总数
        this.haveCompleted=res.m.finNum//已完成数
        this.PercentageCompleted=res.m.finRate//已完成百分比数
        this.incomplete=res.m.waitNum//未完成数
        this.notCompletedPercent=res.m.waitRate//等待百分比数
        this.renderChart()
      })
    },
    renderChart() {
      var myChart = echarts.init(document.getElementById("ljfjl_char"));
      let option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "0%",
          top: "5%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
        },
        xAxis: {
          show: false,
          type: "value",
          max: this.total,
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
                padding: [ 0, 0, 100, 0 ],
                textStyle: {
                    color: '#fff'
                },
            },
            axisLabel: {
              verticalAlign: "bottom",
              color:'#fff',
              // align: 'left',
              padding: [0, 0, -9, 10], //文字与柱状图的距离
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: ['累计分拣量','剩余待分拣'],
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              verticalAlign: "bottom",
              // align: 'left',
              padding: [0, 0, -10, 10], //文字与柱状图的距离
              textStyle: {
                color: "#25F2FF",
                fontSize: "16",
              },
            },
            data: [this.PercentageCompleted+'%',this.notCompletedPercent+'%'],
          },
        ],
        series: [
            //外环方
          {
            name: "背景",
            tooltip: {
              show: false,
            },
            type: "bar",
            barWidth: 18,
            zlevel: 1,
            barGap: "-80%",
            data: [this.total,this.total],
            itemStyle: {
              normal: {
                color: "#263458",
                barBorderRadius: 0,
              },
            },
          },
          // 间隔
          {
            type: "bar",
            tooltip: {
              show: false,
            },
            barWidth: "10px",
            stack: "total",
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              color: "transparent", //每个数据的颜色
            },
            data: [1, 1, 1, 1, 1, 1],
          },
          //内环
          {
            name: "件数",
            type: "bar",
            stack: "total",
            zlevel:2,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#0098A1",
                  },
                  {
                    offset: 1,
                    color: "#25F2FF",
                  },
                ]),
              },
            },
            barWidth: 2,
            data: [this.haveCompleted,this.incomplete],
          },
          // 间隔
          {
            type: "bar",
            zlevel:2,
            tooltip: {
              show: false,
            },
            barWidth: "1px",
            stack: "total",
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: "#fff", //每个数据的颜色
              },
            },
            data: [1, 1, 1, 1, 1, 1],
          },
        ],
      };
      // 传入数据
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.left-chart-three-component {
    z-index: 1;
    height: 100%;
    width: 100%;
    .chart {
        height: 100%;
        width: 100%;
    }
}
</style>
