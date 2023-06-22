<template>
    <div
      id="echartsLin"
      class="echartSty"
      style="width: 100%; height: 285px; margin: -10px 50px 30px 0;"
    ></div>
  </template>
  <script>
  import {getCbysList} from '@/api/modules/demandAnalysis'
  import * as echarts from "echarts";
  
  export default {
    data() {
      return {
        getCbycList:[],
        cbycMonthData:[],
        lsNumData:[],
        ycNumData:[]
      };
    },
    mounted() {
      // this.setEchart();
      this.getCbycData()
    },
    methods: {
      getCbycData(){
        getCbysList({}).then(res=>{
          console.log(res,'chubeiyucefdanhuishusjuuuu');
          this.getCbycList=res.mo
          console.log(this.getCbycList,'000000000');
          this.getCbycList.ls.forEach(item=>{
            this.cbycMonthData.push(item.mon)
            this.lsNumData.push(item.sl)
          })
          this.getCbycList.yc.forEach(item=>{
            this.ycNumData.push(item.sl)
          })
        var myChart = echarts.init(document.getElementById("echartsLin"));
        let option = {
          tooltip: {
                          trigger: "axis",
                      },
                      grid:{
                        containLabel:true
                    },
                      legend: {
                          data: ["预测需求", "历史需求"],
                          top:'10',
                          right: "60",
                          textStyle: {
                              fontSize: 10, //字体大小
                              color: "rgba(255,255,255,0.65)", //字体颜色
                          },
                      },
          xAxis: {
            type: "category",
            data: this.cbycMonthData,
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
            left: 15, // 距离左边位置
            top: 20, // 距离上面位置
            subtextStyle: {
              // 设置二级标题的样式
              color: "rgba(255,255,255,0.7)",
            },
          },
          series: [
            {
              stack: "Total",
              name: "历史需求",
              data: this.ycNumData,
              type: "line",
              smooth: true,
              symbol: "none", //是否显示实心的折线圆点
              itemStyle: {
                normal: {
                  color: "#C5961E",
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
              name: "预测需求",
              data: this.lsNumData,
              type: "line",
              smooth: true,
              symbol: "none", //是否显示实心的折线圆点
              itemStyle: {
                normal: {
                  color:'#3270DC',
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