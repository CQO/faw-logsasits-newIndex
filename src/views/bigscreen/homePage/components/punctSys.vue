<template>
  <div
    id="echartsLin"
    class="echartSty"
    style="width: 420px; height: 305px; margin: -10px 50px 30px 30px;"
  ></div>
</template>
<script>
import * as echarts from "echarts";
import getPlanMonitorDataApi from '@/api/modules/homePage'

export default {
  data() {
    return {
      getMonData:[],
getbenYearData:[],
getLastYearData:[]
    };
  },
  mounted() {
    this.setEchart();
  },
  methods: {
    setEchart() {
      getPlanMonitorDataApi.getZdlfxData({}).then(res=>{
        this.getZdlfxData=res.list
        this.getZdlfxData.forEach(item=>{
        this.getMonData.push(item.mon)
        this.getbenYearData.push(item.n1)
        this.getLastYearData.push(item.n2)
        })
        var myChart = echarts.init(document.getElementById("echartsLin"));
      let option = {
        tooltip: {
                        trigger: "axis",
                    },
                    legend: {
                        data: ["本年准点率", "上年准点率"],
                        top:'10',
                        right: "60",
                        textStyle: {
                            fontSize: 10, //字体大小
                            color: "rgba(255,255,255,0.65)", //字体颜色
                        },
                    },
        xAxis: {
          type: "category",
          data: this.getMonData,
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
        animation: true,
        animationDuration: 5000,
        yAxis: [
          {
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
        title: {
          // title为标题部分，有一级标题text，二级标题subtext。这里我们使用二级标题，再修改一下这个二级标题的位置即可出现我们想要的效果了，当然样式也可以通过title.subtextStyle去配置
          subtext: "单位（%）",
          left: -5, // 距离左边位置
          top: 20, // 距离上面位置
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        },
        series: [
          {
            stack: "Total",
            name: "上年准点率",
            data: this.getLastYearData,
            type: "line",
            smooth: true,
            symbol: "none", //是否显示实心的折线圆点
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#C5961E", //折线的颜色
                },
                label: { show: false }, //是否在折线点上显示数字
              },
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#3A5268",
                },
                {
                  offset: 1,
                  color: "#012A5E",
                },
              ]),
            },
          },
          {
            name: "本年准点率",
            data: this.getbenYearData,
            type: "line",
            smooth: true,
            symbol: "none", //是否显示实心的折线圆点
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#3270DC", //折线的颜色
                },
                label: { show: false }, //是否在折线点上显示数字
              },
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#0D448C",
                },
                {
                  offset: 1,
                  color: "#012A5E",
                },
              ]),
            },
          },
        ],
      };
      myChart.setOption(option);
      })
    },
  },
};
</script>