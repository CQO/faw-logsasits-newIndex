<template>
    <div
    id="echartLine"
    class="annualSummary"
    style="width: 95%; height: 485px; margin-left: 40px;"
  ></div>
</template>
<script>
import generalOverviewAPI from '@/api/modules/generalOverview'
import * as echarts from "echarts";
export default {
  data() {
    return {
      getData:[],
      mounthData:[],
      wcsData:[],
      planData:[]
    };
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    getEchart() {
      generalOverviewAPI.getNdhzData({}).then((res)=>{
        // console.log(res,'总体概况-年度汇总======================');
        // this.getData=res.list
        // this.getData.forEach((item)=>{
        //   this.mounthData.push(item.mon)
        //   this.wcsData.push(item.order)
        //   this.planData.push(item.plan)
        // })
        var myChart = echarts.init(document.getElementById("echartLine"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
      type: 'shadow'
    },
        },
        legend: {
          data: ["服务平均值", "该企业数量"],
          right: "60",
          textStyle: {
            fontSize: 10, //字体大小
            color: "rgba(255,255,255,0.65)", //字体颜色
          },
        },
        xAxis: {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月","6月","7月", "8月", "9月", "10月", "11月","12月"],
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
          left: 125, // 距离左边位置
          top: 10, // 距离上面位置
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        },
        series: [
          {
            data: [210, 200, 155, 230, 170,160,210,110,240,205,185,225],
            name: "该企业数量",
            type: "bar",
            stack: "total",
            barWidth: 40,
            symbolRepeat: true,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#03EEFA" },
                  { offset: 1, color: "#6C47FF" },
                ]),
              },
            },
            barGap: "-100%", //移动第二个柱子的位置实现重叠
          },
        {
            data: [75, 140, 110, 160, 105, 115, 110, 105, 115, 95, 140, 125],
            type: "line",
            name: "服务平均值",
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
                                        color: '#FFB774'  
                                    }, {  
                                        offset: 1,  
                                        color: '#6C47FF'  
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
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    //color: "#00D7BD",
                    // color: 'rgba(255,255,255, 0.1)'
                     color:'rgba(91, 255, 209, 0.2)'
                  },
                  {
                    offset: 1,
                    color: "#0B5CB6",
                  },
                ],
                global: false,
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      })
    },
  },
};
</script>
<style lang="scss">
</style>