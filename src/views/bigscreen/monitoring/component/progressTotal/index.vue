<template>
  <div class="" style="margin: 80px;">
    <div class="totalressage">
      <div class="element1">
        <div class="child1">
          <div
            class=""
            id="childChart"
            style="width: 100%; height: 100%;"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  mounted() {
    this.getChildCharts();
  },
  methods: {
    getChildCharts() {
      var myChart = echarts.init(document.getElementById("childChart"));
      var assistdata = [];
      for (let i = 0; i < 60; i++) {//这里可以通过更改数值进行设置格子宽度，数值越小格子越宽
        assistdata.push({
          name: "1",
          value: 1
        });
      }
      var option = {
        title:{
        },
        color: [
          "#00101d",
          "#FF8033",
        ],
        legend: {
          orient: 'vertical',
          x: 'left',
          show:false
        },
        tooltip: {
          trigger: 'item',
          formatter: "{d}%",
          show:false
        },
        graphic:[
          {
            type:'text',
            left:'center',
            top:(this.width>603)?(this.width>700?'62px':'34px'):'34px',
            z:2,
            zlevel:100,
            style:{
              // text:'在线率',
              fill:"#6AC5FC",
              font:'bold 14px Microsoft YaHei',
              fontSize:this.width>603?14:12,
            }
          },
          {
            type:'text',
            left:'center',
            top:(this.width>603)?(this.width>700?'80px':'52px'):'70px',
            z:2,
            zlevel:100,
            style:{
              text:60 + '%',
              fill:"#01FFFF",
              fontWeight:700,
              fontSize:30,
            }
          },
        ],
        series: [
          {
            // name: "在线率",
            type: "pie",
            silent: true,
            radius: this.width>603?(this.width>700?["56%", "70%"]:["66%", "85%"]):["66%", "90%"],
            center: (this.width>603)?(this.width>700?["50%", "45%"]:["50%", "50%"]):["50%", "50%"],
            avoidLabelOverlap: false,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#03EEFA" },
                  { offset: 1, color: "#237CE0" },
                ]),
            hoverAnimation: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              show: false,
              borderColor: "#094185",
              borderWidth:2,
            },
            data: assistdata
          },
          {
            name: "百分比",
            type: "pie",
            silent: true,
            radius: this.width>603?(this.width>700?["56%", "70%"]:["66%", "85%"]):["66%", "90%"],
            center: (this.width>603)?(this.width>700?["50%", "45%"]:["50%", "50%"]):["50%", "50%"],
            avoidLabelOverlap: false,
            color: ["transparent", "#094185"],
            hoverAnimation: false,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                name: "使用",
                value: 60
              },
              {
                name: "未使用",
                value: 100-60
              },
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
.totalressage {
    width: 200px;
    height: 200px;
    background-image: url("../../../../../assets/image/monitoring/totalressage.gif");
    background-size: 100% 100%;
    padding-top: 1px;
}
.element1 {
    width: 193px;
    height: 194px;
    background-color: #094185;
    border-radius: 50%;
    margin: 4px;
}
.child1 {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    position: relative;
    background: #031e63;
    top: 10px;
    left: 10px;
}
</style>