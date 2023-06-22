<template>
    <div class="">
        <div class="material">
            <div class="materialItem" style="margin-left: 40px;">
                <div class="itemLeft">
                    <img src="../../../../../assets/image/globalMonitoring/totalKc.png" alt="">
                </div>
                <!-- <div class="itemRight">
                    <p style="color: #fff;">实时总库存</p>
                    <p>{{Number(this.sszkcData).toLocaleString()}} <span>(件)</span> </p>
                </div> -->
                <div class="statisContent">
                    <div class="chartNum">
                        <span class="orderTitle">实时总库存</span>
                        <!-- <div class="box-item">
                            <li :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
                                v-for="(item,index) in orderNum"
                                :key="index">
                                    <span v-if="!isNaN(item)">
                                      <i ref="numberItem">0123456789</i>
                                    </span>
                                <span class="comma" v-else>{{item}}</span>
                            </li>
                            <div style="margin-top: 20px;">(件)</div>
                        </div> -->
                        <div class="box-item">
                            <li
                              :class="{ 'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
                              v-for="(item, index) in orderNum"
                              :key="index"
                            >
                              <span v-if="!isNaN(item)">
                                <i ref="numberItem">0123456789</i>
                              </span>
                              <span class="comma" v-else>{{ item }}</span>
                            </li>
                            <div style="margin-top: 20px;">(件)</div>
                          </div>
                    </div>
                </div>
            </div>
            <div class="materialItem">
                <div class="itemLeft">
                    <img src="../../../../../assets/image/globalMonitoring/pszing.png" alt="">
                </div>
                <!-- <div class="itemRight">
                    <p style="color: #fff;">正在配送量</p>
                    <p>{{Number(this.zzpslData).toLocaleString()}} <span>(件)</span> </p>
                </div> -->
                <div class="statisContent">
                    <div class="chartNum">
                        <span class="orderTitle">正在配送量</span>
                        <div class="box-item">
                            <li :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
                                    <!-- <span v-if="!isNaN(item)"> -->
                                      <!-- <i ref="numberItem">0123456789</i> -->
                                    <!-- </span> -->
                                <span class="comma">{{ this.zzpslData }}</span>
                            </li>
                            <div style="margin-top: 20px;">(件)</div>
                            <!-- {{ this.zzpslData }} -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="materialItem">
                <div class="itemLeft">
                    <img src="../../../../../assets/image/globalMonitoring/psWait.png" alt="">
                </div>
                <!-- <div class="itemRight">
                    <p style="color: #fff;">待配送量</p>
                    <p>{{Number(this.dpslData).toLocaleString()}} <span>(件)</span> </p>
                </div> -->
                <div class="statisContent">
                    <div class="chartNum">
                        <span class="orderTitle">待配送量</span>
                        <div class="box-item">
                            <li :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
                                v-for="(item,index) in orderNum"
                                :key="index">
                                    <span v-if="!isNaN(item)">
                                      <i ref="numberItem">0123456789</i>
                                    </span>
                                <span class="comma" v-else>{{ this.dpslData }}</span>
                            </li>
                            <div style="margin-top: 20px;">(件)</div>
                            <!-- {{ this.dpslData }} -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import globalMonitoringAPI from '@/api/modules/globalMonitoring'
export default {
    data(){
        return{
            num:100000,
            number:'',
            sszkcData:'',
    //   orderNum: ['1', '3', ',', '7', '9', '4'],
    orderNum: ['0', '0', '0', '0', '0', '0', '0', '0'], // 默认总数
    zzpslData:'',
    dpslData:'',
    count:100,

        }
    },
    mounted(){
        globalMonitoringAPI.getQyjkWzjkData({}).then((res)=>{
        console.log(res,'全域监控-物资监控======================');
        this.number=res.m.kc
        this.zzpslData=res.m.ps
        this.dpslData=res.m.dps
      })
        setTimeout(() => {
      this.toOrderNum(this.number); // 这里输入数字即可调用
    }, 500);
    // this.increaseNumber()

    },
    created(){
    this.getQyjkWzjkData()

    },
    methods:{
        getQyjkWzjkData(){
      globalMonitoringAPI.getQyjkWzjkData({}).then((res)=>{
        console.log(res,'全域监控-物资监控======================');
        this.number=res.m.kc
        this.zzpslData=res.m.ps
        this.dpslData=res.m.dps
      })
    },
        // 设置文字滚动
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; // 拿到数字的ref，计算元素数量
      // eslint-disable-next-line no-restricted-globals
      const numberArr = this.orderNum.filter(item => !isNaN(item));
      console.log(numberItems.length, numberArr);
      // 结合CSS 对数字字符进行滚动,显示数量
      for (let index = 0; index < numberItems.length; index += 1) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
      }
    },
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
      // 数字中加入逗号
      // const length = numtext.length / 3;
      // let count = '';
      // for (let i = 0; i < length; i += 1) {
      //   if (i === 0) {
      //     count += `${numtext.slice(i, i + 3)},`;
      //     console.log(count);
      //   } else if (i === length - 1) {
      //     count += numtext.slice(i * 3, i * 3 + 3);
      //     console.log(count);
      //   } else {
      //     count += `${numtext.slice(i * 3, i * 3 + 3)},`;
      //     console.log(count);
      //   }
      // }
      // this.orderNum = count.split('');
      this.setNumberTransform();
    },
  },
        formatter: function (num) {
        return num.toFixed(2)
      },
        
}
</script>
<style lang="scss" scoped>
.material {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 15px 40px;
}
.materialItem {
    display: flex;
    margin-left: 20px;
    width: 30%;
    color: #fff;
    p {
        color: #6fffbb;
        span {
            color: rgba(255, 255, 255, 0.7);
        }
    }
}
.itemLeft {
    margin-top: 15px;
}
.itemRight {
    margin-left: 10px;
}
.statisContent {
    width: 236px;
    height: 45px;
    background-size: 100% 100%;
    justify-content: center;
    padding: 10px;
    .orderTitle {
        color: rgba(255, 255, 255, 0.7);
        font-size: 18px;
    }
    .chartNum {
        text-align: left !important;
        .box-item {
            display: flex;
            margin-left: 5px;
            margin-top: -3px;
        }
    }
    .number-item {
        width: 9px;
        height: 35px;
        list-style: none;
        margin-right: 5px;
        border-radius: 4px;
        color: #6fffbb;
        background: none !important;
        font-size: 20px;
        margin-top: 15px;
        display: inline-block;
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
        color: #6fffbb;
        font-size: 20px;
    }
    .comma {
        margin-top: 20px;
        display: inline-block;
        color: #6fffbb;
        font-size: 20px;
    }
    .mark-item {
        display: inline-block;
        color: #6fffbb;
        font-size: 20px;
    }
}
</style>