<template>
  <div>
    <div style="margin-bottom: 20px; display: flex; justify-content: center;">
      <div class="statisContent">
        <div class="chartNum">
            <span class="orderTitle">订单总数(万件):{{this.number}}</span>
            <div class="box-item">
              <li :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
                  v-for="(item,index) in orderNum"
                  :key="index">
                      <span v-if="!isNaN(item)">
                        <i ref="numberItem">0123456789</i>
                      </span>
                  <span class="comma" v-else>{{item}}</span>
              </li>
          </div>
        </div>
    </div>
    </div>
    <div class="title">
      已完成数(万件)：<span class="num">{{ this.compleNum }}
        <!-- <animate-number from="1" :to="this.compleNum" :key="this.compleNum"></animate-number> -->
      </span>
    </div>
    <div id="chart1" class="chart" style="width: 98%; height: 50px;"></div>
    <div class="title red">
      异常数量(件)：<span class="num">{{ this.ycZsl }}</span>
    </div>
    <div id="chart2" style="width: 97%; height: 50px;"></div>
  </div>
</template>

<script>
// import vns from 'vue-number-scroll'
import gsap from "gsap";
import * as echarts from "echarts";
import getPlanMonitorDataApi from '@/api/modules/homePage'

export default {
  name: "OrderMonitor",
  data() {
    return {
      accumulativeNum: "", //累计提运数
      accumulativeTotal: "", //累计提运总数,
      ycZsl:'',
      compleNum:'',
      getPlanList:[],
      returnData: {
        total: '',
        finNum: 500, //完成数
        waitNum: 10, //等待数
        finRate: "", //完成百分比
        finYcRate: "", //等待百分比
      },
      showNumber: 0,
      number: '',
      orderNum: ['0', '0', '0', '0', '0', '0', '0', '0'], // 默认总数
      count:100,
      // showCounter:''
    };
  },
  computed: {
    showCounter() {
      return this.showNumber.toFixed(0);
    },
  },
  created() {
    gsap.to(this, {
      duration: 5,
      showNumber: this.number,
    });
  },
  mounted() {
    this.getOrderData()
    // this.increaseNumber()
    this.getTyrkData();
    this.toOrderNum(this.number); // 这里输入数字即可调用
    gsap.to(this, {
      duration: 5,
      showNumber: this.number,
    });
  },
  watch: {
    number(newVal) {
      gsap.to(this, {
        duration: 5,
        showNumber: newVal,
      });
    },
  },
  beforeDestroy() {
    this.$eventBus.$off("left-chart-three-refresh");
  },
  methods: {
    // 设置文字滚动
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; // 拿到数字的ref，计算元素数量
      // eslint-disable-next-line no-restricted-globals
      const numberArr = this.orderNum.filter(item => !isNaN(item));
      // 结合CSS 对数字字符进行滚动,显示数量
      if(numberItems){
        for (let index = 0; index < numberItems.length; index += 1) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
      }
      }
      
    },
     // 处理总订单数字
     toOrderNum(num) {
            const numtext = num.toString();
      if (this.length) {
        if (numtext.length < this.length) {
          const numlist = `0${numtext}`; // 如未满固定数，添加"0"补位
          this.toOrderNum(numlist); // 递归添加"0"补位
        } else if (numtext.length === num.length) {
          this.orderNum = numtext.split(''); // 将其便变成数据，渲染至滚动数组
        }
      } else {
        this.orderNum = numtext.split('');
      }
      this.setNumberTransform();

    },
    getOrderData(){
      let params={
        m:{
          year:sessionStorage.getItem('year')
        }
      }
      getPlanMonitorDataApi.getOrderMonitorData(params).then(res=>{
        this.getPlanList=res.list
        this.getPlanList.forEach(item=>{
          this.number=item.ddzsl
          this.compleNum=item.ddwcsl
          this.ycZsl=item.ddycsl
          this.returnData.finRate=item.wcRate
          this.returnData.finYcRate=item.ycRate
        })
        this.getTyrkData()
      })
    },
    getTyrkData() {
      this.accumulativeNum = Number(
        (this.returnData.finNum / this.returnData.total) * 100
      ).toFixed(1);
      this.accumulativeTotal = this.accumulativeNum += "%";
      this.renderChart("chart1", ["#288DFF", "#64FFFF"]);
      this.renderChart("chart2", ["#F94B82", "#FFA98E"]);
    },
    renderChart(id, colors) {
      var myChart = echarts.init(document.getElementById('chart1'));
      var myCharta = echarts.init(document.getElementById('chart2'));
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
          max: this.number,
        },
        animation: true,
        animationDuration: 5000,
        yAxis: [
          {
            show: "true",
            type: "category",
            inverse: true,
            axisLabel: {
              color: "#fff",
              // textStyle: {
              // },
            },
            axisLabel: {
              verticalAlign: "bottom",
              color: "#fff",
              // align: 'left',
              padding: [0, -4, -9, -10], //文字与柱状图的距离
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
            data: [""],
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
              padding: [0, -4, -10, -4], //文字与柱状图的距离
              textStyle: {
                color: "#00C2FF",
                fontSize: "16",
              },
            },

            data: [ this.returnData.finRate+'%'],
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
            data: [this.number],
            itemStyle: {
              normal: {
                color: "transparent",
                barBorderRadius: 0,
                borderColor: "#00538F",
                borderWidth: 1,
                borderType: "solid",
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
            zlevel: 2,
            stack: "total",
            barWidth: 20,
            type: "pictorialBar", //设置类型为象形柱状图
            symbol: "rect", //图形类型，带圆角的矩形
            symbolMargin: "1", //图形垂直间隔
            symbolRepeat: true,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#288DFF",
                  },
                  {
                    offset: 1,
                    color: '#64FFFF',
                  },
                ]),
                borderColor: "#00538F",
                borderWidth: 1,
                borderType: "solid",
              },
            },
            labelLine: {
              show: true,
            },
            barWidth: 15,
            data: [this.compleNum],
          },
        ],
      };
      let optiona = {
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
          max: this.number,
        },
        animation: true,
        animationDuration: 5000,
        yAxis: [
          {
            show: "true",
            type: "category",
            inverse: true,
            axisLabel: {
              color: "#fff",
              // textStyle: {
              // },
            },
            axisLabel: {
              verticalAlign: "bottom",
              color: "#fff",
              // align: 'left',
              padding: [0, -4, -9, -10], //文字与柱状图的距离
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
            data: [""],
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
              padding: [0, -4, -10, -4], //文字与柱状图的距离
              textStyle: {
                color: "#00C2FF",
                fontSize: "16",
              },
            },

            data: [ this.returnData.finYcRate+'%'],
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
            data: [this.number],
            itemStyle: {
              normal: {
                color: "transparent",
                barBorderRadius: 0,
                borderColor: "#00538F",
                borderWidth: 1,
                borderType: "solid",
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
            zlevel: 2,
            stack: "total",
            barWidth: 20,
            type: "pictorialBar", //设置类型为象形柱状图
            symbol: "rect", //图形类型，带圆角的矩形
            symbolMargin: "1", //图形垂直间隔
            symbolRepeat: true,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#F94B82',
                  },
                  {
                    offset: 1,
                    color: '#FFA98E',
                  },
                ]),
                borderColor: "#00538F",
                borderWidth: 1,
                borderType: "solid",
              },
            },
            labelLine: {
              show: true,
            },
            barWidth: 15,
            data: [this.ycZsl],
          },
        ],
      };
      myChart.setOption(option);
      myCharta.setOption(optiona);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
    width: 226px;
    height: 42px;
    background: #011e42;
    border: 1px solid #01387e;
    background-image: url("../../../../assets/images/text-bg.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.7);
        span {
            font-size: 20px;
            color: #fff;
        }
    }
}
.title {
    font-size: 16px;
    font-weight: 400;
    color: #27cbff;
    padding-left: 30px;
    &.red {
        color: #f94b4b;
    }
    .num {
        font-size: 18px;
        color: #fff;
    }
}
.statisContent {
    width: 236px;
    height: 45px;
    background-image: url("../../../../assets/images/text-bg.png");
    background-size: 100% 100%;
    justify-content: center;
    padding: 10px;
    .orderTitle {
        color: rgba(255, 255, 255, 0.7);
        font-size: 18px;
    }
    .chartNum {
        display: flex;
        .box-item {
            margin-left: 5px;
            margin-top: -3px;
        }
    }
    .number-item {
        width: 10px;
        height: 35px;
        list-style: none;
        margin-right: 5px;
        border-radius: 4px;
        color: #fff;
        display: inline-block;
        font-size: 20px;
        & > span {
            position: relative;
            display: inline-block;
            margin-right: 10px;
            width: 100%;
            height: 100%;
            writing-mode: vertical-rl;
            text-orientation: upright;
            overflow: hidden;
            & > i {
                font-style: normal;
                position: absolute;
                top: 7px;
                left: 50%;
                transform: translate(-50%, 0);
                transition: transform 1s ease-in-out;
                letter-spacing: 10px;
            }
        }
    }
    .number-item:last-child {
        margin-right: 0;
    }
    .comma {
        display: inline-block;
        color: #fff;
        font-size: 30px;
    }
    .mark-item {
        display: inline-block;
    }
}
</style>
