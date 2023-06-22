<template>
    <div class="wave-echart" id='waveCHkEchart' ref='waveCHkEchart' style="width:140px;height:140px" ></div>
</template>
<script>
import * as echarts from "echarts";
import globalMonitoringAPI from "@/api/modules/globalMonitoring";
import echartsLiquidfill from 'echarts-liquidfill'
export default {
data() {
return{
getData:[],
zyData:[],
zsData:[],
wcsData:[],
hkData:''
}
},
mounted() {
this.initWave();
},
methods: {
initWave (ref) {
globalMonitoringAPI.getYlfxData({}).then((res) => {
this.hkData =  res.m.flightRate/100;
let chart = echarts.init(document.getElementById("waveCHkEchart"));
// 把配置和数据放这里
let option={
  title: {// 标题
    // text: '补贴资金剩余',
    textStyle: {// 标题的样式
      color: '#fff', // 字体颜色
      fontFamily: 'Microsoft YaHei', // 字体
      fontSize: 14,
      fontWeight: '400',
      align: 'center', // 文字的水平方式
      baseline: 'middle',
      position: 'inside',
      verticalAlign: 'middle'// 文字的垂直方式
    },
    left: 'center', // 定位
    top: '10%'
  },
  graphic: [
    {
      type: "image",
       left: "2%",
      top: "2%",
      z: 2,
      bounding: "raw",
      scale: [1, 1], //缩放
      style: {
        image: require("@/assets/image/globalMonitoring/wh.png"),
        opacity: 1,
      },
    },
  ],
  series: [{
    type: 'liquidFill',
    radius: '71%',
    waveAnimation: true,
    data: [{
      value: this.hkData,
      direction: 'left',
      itemStyle: {
        normal: {
          color: '#03eefa'
        }
      }
    }],
    outline: {
      // show: true , //是否显示轮廓 布尔值
      borderDistance: 1, // 外部轮廓与图表的距离 数字
      itemStyle: {
        borderColor: '#27CBFF', // 边框的颜色
        borderWidth: 1, // 边框的宽度
         shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
        // shadowColor: '#000' //外部轮廓的阴影颜色
      }
    },
    itemStyle: {
      opacity: 0.9, // 波浪的透明度
      shadowBlur: 0 // 波浪的阴影范围
    },
    backgroundStyle: {
      color: '#001e65' // 图表的背景颜色
    },
    label: { // 数据展示样式
      show: true,
      color: '#fff',
      insideColor: '#fff',
      fontSize: 20,
      fontWeight: 400,
      align: 'center',
      baseline: 'middle',
      position: 'inside'
    }
  }]
}
chart.setOption(option)
});

}
},
};
</script>
<style lang="scss">
.guaranteeMonitor {
width: 100%;
height: 315px;
}
.totalEcha{
width: 130px;
height: 130px;
background-image: url("../../../../../assets/image/globalMonitoring/wh.png");
background-size: 100% 100%;
background-repeat: no-repeat;
position: relative;
}