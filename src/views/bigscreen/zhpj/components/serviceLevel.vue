<template>
    <div
      class="planMonitoring"
      id="planMonitoring"
      style="width: 100%; height: 315px;"
    ></div>
  </template>
  <script>
  import * as echarts from "echarts";
  import getZhpjDataApi from '@/api/modules/zhpj'
  export default {
    props: {
      getSevelData: {
                type: Array,
                default: false
            }
        },
    data() {
      return{
        getData:[],
      cslData:[],
      dwData:[],
      yzData:[],
      tabList:[]
      }
    },
    mounted() {
      this.getPlanData();
    },
    watch:{
            'getSevelData'(value){
        this.getData=[]
                this.tabList=value
                this.getPlanData()
    }
  },
    methods: {
      getPlanData() {
        this.cslData=[]
        this.dwData=[]
        this.yzData=[]
        this.getData=this.tabList
        if(this.getData.length==0){
          this.getData=[]
          this.cslData=[0,0,0,0,0]
          this.dwData=[0,0,0,0,0]
          this.yzData=[0,0,0,0,0]
          this.cslData.push(0,0,0,0,0)
              this.dwData.push(0,0,0,0,0)
              this.yzData.push(0,0,0,0,0)
        }
          this.getData.forEach((item)=>{
              if(item.name=='京东'){
              this.cslData.push(item.zhf,item.rwf,item.myd,item.feef,item.zdl)
            }
            if(item.name=='顺丰'){
              this.dwData.push(item.zhf,item.rwf,item.myd,item.feef,item.zdl)
            }
            if(item.name=='邮政'){
              this.yzData.push(item.zhf,item.rwf,item.myd,item.feef,item.zdl)
            }
              
            
          })
        let chart = echarts.init(document.getElementById("planMonitoring"));
        let option = {
          title: {
          },
          legend: {
          data: ["京东", "顺丰","邮政"],
          right: "60",
          textStyle: {
            fontSize: 10, //字体大小
            color: "rgba(255,255,255,0.65)", //字体颜色
          },
          },
          radar: {
            splitNumber:5,
            indicator: [
              { text: "综合得分",  },
              { text: "任务量得分",  },
              { text: "满意度得分",  },
              { text: "物流经典得分",  },
              { text: "时效率得分",  },
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
              return `${a}\n${data[i]}`
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#014FAA", // 设置网格的颜色
                shadowBlur: 10,
                type: "dashed",
              },
            },
          },
          title: {
            subtext: "单位（次）",
            right: 25,
            top: 20,
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
                  // value: [4200, 12000, 16000, 18100, 15500],
                  value:this.cslData,
                  name:'京东',
                //   value:this.cslData,
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
                  smooth: false,
                },
                {
                  // value: [5200, 8000, 6000, 28100, 1500],
                  value:this.dwData,
                  name:'顺丰',
                //   value:this.cslData,
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
                    color: "#4B00EA",
                  },
                  smooth: false,
                },
                {
                  // value: [2200, 28000, 16000, 8100, 9500],
                  value:this.yzData,
                  name:'邮政',
                //   value:this.cslData,
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
                    color: "#D4AD1F",
                  },
                  smooth: false,
                },
              ],
            },
          ],
        };
        chart.setOption(option);
        // })
        
      },
    },
  };
  </script>
  <style lang="scss">
  </style>