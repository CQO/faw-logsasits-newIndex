<template>
    <div id="block-chart" class="chart" style=" width: 100%; height: 100px;"></div>
</template>

<script>
import logisticsSituationAPI from "@/api/modules/logisticsSituation";
import * as echarts from "echarts";
export default {
  name: "LeftChartThreeComponent",
  data() {
    return {
      accumulativeNum:'',//累计提运数
      accumulativeTotal:'',//累计提运总数
      returnData:{
        total:'',
        finNum:'',//完成数
        waitNum:'',//等待数
        finRate:'',//完成百分比
        waitRate:''//等待百分比
      }
    };
  },
  mounted() {
    this.getTyrkData()
  },
  beforeDestroy() {
    this.$eventBus.$off("left-chart-three-refresh");
  },
  methods: {
    getTyrkData(){
      let params={
        m:{
          year: sessionStorage.getItem('year'),
        }
      }
      this.accumulativeNum=Number(this.returnData.finNum/this.returnData.total*100).toFixed(1)
      this.accumulativeTotal=this.accumulativeNum+= "%"
      logisticsSituationAPI.getIntoStorage(params).then((res)=>{
        this.returnData.total=res.m.total
        this.returnData.finNum=res.m.finNum
        this.returnData.waitNum=res.m.waitNum
        this.returnData.finRate=res.m.finRate
        this.returnData.waitRate=res.m.waitRate
    this.renderChart();
      })
    },
    renderChart() {
      var myChart = echarts.init(document.getElementById("block-chart"));
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
          max: this.returnData.total,
        },
        yAxis: [
          {
            show:'true',
            type: "category",
            inverse: true,
            axisLabel: {
                    color: '#fff',
                padding: [ 0, 0, 100, 0 ],
                // textStyle: {
                // },
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
            data: ['累计提运量','剩余待运量'],
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
                color: "#00C2FF",
                fontSize: "16",
              },
            },
            data: [this.returnData.finRate+'%',this.returnData.waitRate+'%'],
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
            data: [this.returnData.total,this.returnData.total],
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
            zlevel:2,
            stack: "total",
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#206EE3",
                  },
                  {
                    offset: 1,
                    color: "#31CEFF",
                  },
                ]),
              },
            },
            barWidth: 2,
            data: [this.returnData.finNum,this.returnData.waitNum],
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
