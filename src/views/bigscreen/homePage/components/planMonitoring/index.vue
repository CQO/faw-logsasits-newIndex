<template>
  <div
    class="planMonitoring"
    id="planMonitoring"
    style="width: 100%; height: 275px;"
  ></div>
</template>
<script>
import * as echarts from "echarts";
import globalMonitoringAPI from '@/api/modules/globalMonitoring'
export default {
  data() {
    return{
      getData:[],
    cslData:[],
    dwData:[]
    }
  },
  mounted() {
    this.getPlanData();
  },
  methods: {
    getPlanData() {
      globalMonitoringAPI.getJhjkData({}).then((res)=>{
        console.log(res,'全域监控-计划监控======================');
        this.getData=res.list
        this.getData.forEach((item)=>{
          this.cslData.push(item.num)
          this.dwData.push(item.recipientUnit)
        })
      let chart = echarts.init(document.getElementById("planMonitoring"));
      let option = {
        title: {
          // text: "Basic Radar Chart",
        },
        legend: {
          // data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          splitNumber:5,
          // shape: 'circle',
          indicator: [
            { name: "海军" },
            { name: "武警部队" },
            { name: "陆军"},
            { name: "联勤保障部队"},
            { name: "战略支援部队" },
            { name: "火箭军"},
            { name: "空军"},
          ],
          splitArea: {
            areaStyle: {
              color: ["#021C67", "#021C67", "#021C67", "#021C67"],
              shadowColor: "#014FAA",
              shadowBlur: 15,
            },
          },
          name: {
            //修改indicator文字的颜色
            textStyle: {
              fontSize: "16",
            },
            label: {
              position: "top",
            },
          },
          formatter:(a,b)=>{
            i++;
            // console.log(`${a}\n${data[i]}`,'`${a}\n${data[i]}`=======');
            return `${a}\n${data[i]}`
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#014FAA", // 设置网格的颜色
              shadowBlur: 10,
            },
          },
        },
        title: {
          subtext: "单位（次）",
          right: 45,
          top: -13,
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        },
        series: [
          {
            type: "radar",
            data: [
              {
                // value: [4200, 12000, 16000, 18100, 15500, 25000, 15400],
                value:this.cslData,
                lineStyle: {
                  type: "dashed",
                  color: "none",
                },
                // label: {
                //   show: true,
                //   position: "left",
                //   distance: 15,
                //   formatter: function (params) {
                //     return params.value;
                //   },
                //   normal: {
                //     show: true,
                //     textStyle: {
                //       //更改数值样式
                //       color: "#00FFC2",
                //     },
                //   },
                // },
                label: {
                  show: true,
                  position: "bottom",
                  distance: -6,
                  formatter: function (params) {
                    return params.value;
                  },
                  // normal: {
                    // show: true,
                    textStyle: {
                      //更改数值样式
                      color: "#00FFC2",
                      fontSize:'16'
                    },
                  // },
                },
                areaStyle: {
                  color: "#1D93A2",
                },
                itemStyle: {
                  color: "none",
                },
                smooth: true,
              },
            ],
          },
        ],
      };
      chart.setOption(option);
      })
      
    },
  },
};
</script>
<style lang="scss">
</style>