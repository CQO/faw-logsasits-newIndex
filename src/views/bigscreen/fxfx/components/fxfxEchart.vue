<template>
    <div
    id="echartLine"
    class="annualSummary"
    style="width: 95%; height: 485px; margin-left: 40px;"
  ></div>
</template>
<script>
import getFxfxFxfxApi from '@/api/modules/fxfx'
import * as echarts from "echarts";
export default {
  props: {
    getData: {
                type: Object,
                default: false
            }
        },
  data() {
    return {
      mounthData:[],
      wcsData:[],
      planData:[],
      getYData:[],
      getTabList:[]
    };
  },
  created(){
    getPjsTjData=['0','0','0','0','0','0']
      data=['0','0','0','0','0','0']
  },
  watch:{
    'getData'(value){
      this.getYData=[]
      this.getYData.push(value.dj,value.pjsj,value.score,value.wcs,value.ycs,value.zss)
    this.getEchart(this.getYData);
    }
  },
  methods: {
    getEchart(data) {
        let params={
        m:{
          year:'',
          month:''
        }
      }
      getFxfxFxfxApi.getFxfxFxfxData(params).then(res=>{
        this.getTabList=res.list
        var getPjsTjData=[]
        var nedScoreData=[]
        var nedDjData=[]
        var nedPjhsData=[]
        var nedYcblData=[]
        var nedWclblData=[]
        var nedZdlblData=[]

        var alreadZhdfResult=[]
        var alreadDjResult=[]
        var alreadPjhsResult=[]
        var alreadYcblResult=[]
        var alreadWclblResult=[]
        var alreadZdlblResult=[]
        for (let i = 0; i < this.getTabList.length; i += 1) {
          // console.log(this.getTabList,'99999999999999999999999999999999')
          // console.log(data,'dataaaaaaaaaaaaaaaaaaaaaaa')
          // 综合得分
          nedScoreData.push(this.getTabList[i].score)
          // 单价
          nedDjData.push(this.getTabList[i].dj)
          // 平均耗时
          nedPjhsData.push(this.getTabList[i].pjsj)
          nedYcblData.push(this.getTabList[i].ycs)
          nedWclblData.push(this.getTabList[i].wcs)
          nedZdlblData.push(this.getTabList[i].zss)
          alreadZhdfResult=nedScoreData.map(Number)
          alreadDjResult=nedDjData.map(Number)
          alreadPjhsResult=nedPjhsData.map(Number)
          alreadYcblResult=nedYcblData.map(Number)
alreadWclblResult=nedWclblData.map(Number)
alreadZdlblResult=nedZdlblData.map(Number)
          // 综合得分平均数
          var getZhdfData=data[2]/(alreadZhdfResult[0]+alreadZhdfResult[1]+alreadZhdfResult[2])
          // 单价
          var getDjData=data[0]/(alreadDjResult[0]+alreadDjResult[1]+alreadDjResult[2])
          // 平均耗时
          var getPjhsData=data[1]/(alreadPjhsResult[0]+alreadPjhsResult[1]+alreadPjhsResult[2])
          var getYclData=data[4]/(alreadYcblResult[0]+alreadYcblResult[1]+alreadYcblResult[2])
          var getWclData=data[3]/(alreadWclblResult[0]+alreadWclblResult[1]+alreadWclblResult[2])
          var getZdblData=data[5]/(alreadZdlblResult[0]+alreadZdlblResult[1]+alreadZdlblResult[2])
          getPjsTjData.push((getDjData*100).toFixed(2),(getPjhsData*100).toFixed(2),(getZhdfData*100).toFixed(2),(getWclData*100).toFixed(2),(getYclData*100).toFixed(2),(getZdblData*100).toFixed(2))
          getPjsTjData= getPjsTjData.filter(item => item!=='NaN');
          // console.log(getPjsTjData,'**********************************************')
        }
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
          data: ["单价", "平均耗时", "综合得分", "完成率比例", "异常比率","准点率比例"],
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
            // data: [210, 200, 155, 230, 170,160,210,110,240,205,185,225],
            data:data,
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
            data: getPjsTjData,
            type: "line",
            name: "服务平均值",
            label:{
              normal: {
        show: true,
        formatter:function(params){ //标签内容
          return  params.value + '%'
          // console.log(params.value+'%','paramsssss///ssssssssssssssssssssss')
        },
      }
            },
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
      
    }
  },
};
</script>
<style lang="scss">
</style>