<template>
  <div class="" style="margin: 2px 30px;">
    <div class="headTitle">
          <div class="headItem">风险类型</div>
          <div class="headItem">数量</div>
    </div>
    <div class="contMain">
      <div class="" v-if="this.contOneData.length!=0">
        <div v-if="showContOneData" class="" v-for="ind in this.contOneData" @click="toShowDialoaas(ind)">
          <div class="contData">
            <div class="intel" style="">{{ ind.exceptionType }}</div>
            <div class="intel" style="">{{ ind.num }}</div>
          </div>
        </div>
        <div v-if="showContTwoData" class="" v-for="ind in firstNum" @click="toShowDialoaas(ind)">
          <div class="contData">
            <div class="intel" style="">{{ ind.exceptionType }}</div>
            <div class="intel" style="">{{ ind.num }}</div>
          </div>
        </div>
      </div>
      <div class="zwnr" v-else>
          <div class="">暂无内容</div>
      </div>
      <div
        class="toOne"
        style="

"
      >
        <div :class="showResult" id="oneOne" @click="toOne"></div>
        <div
          :class="one"
          id="twoTwo"
          @click="toTwo"
          style="margin-left: 10px;"
          v-if="this.headData.length>5"
        ></div>
        <!-- v-if="this.headData.length>5" -->
      </div>
    </div>
  </div>
</template>
<script>
import logisticsSituationAPI from "@/api/modules/logisticsSituation";
export default {
  data() {
    return {
      fxyjData: [],
      one: true,
      one: ["one" ? "one" : "showResult"],
      headData: [{ name: "风险类型" }, { name: "数量" }],
      showContOneData: true,
      showContTwoData: false,
      firstNum: [],
      //第一页数据
      contOneData: [
        // {
        //   exception: "数量异常",
        //   num: "10",
        // },
        // {
        //   exception: "品种异常",
        //   num: "50",
        // },
        // {
        //   exception: "重量异常",
        //   num: "100",
        // },
        // {
        //   exception: "包装损坏",
        //   num: "10",
        // },
        // {
        //   exception: "途中异常",
        //   num: "10",
        // },
        // {
        //   exception: "交接异常",
        //   num: "10",
        // },
        // {
        //   exception: "客户异常",
        //   num: "50",
        // },
        // {
        //   exception: "收货异常",
        //   num: "100",
        // },
        // {
        //   exception: "其他",
        //   num: "10",
        // },
      ],
    };
  },
  mounted() {
    this.getFxyjData();
    this.showContOneData = true;
    document.getElementById("oneOne").className = "showResult";
  },
  created() {
    this.firstNum = this.contOneData.splice(5, 4);
  },
  methods: {
    toShowDialoaas(item){
      console.log(item,'itemememememememme///////////////')
      this.$emit('passParam', item)

    },
    getFxyjData() {
      logisticsSituationAPI.getRiskWarning({}).then((res) => {
        // this.fxyjData=[{
        //   exception:'风险类型123',
        //   num:'风险数量123'
        // }]
        this.contOneData=res.list
      });
    },
    toOne() {
      this.showContOneData = true;
      this.showContTwoData = false;
      document.getElementById("oneOne").className = "showResult";
      document.getElementById("twoTwo").className = "one";
    },
    toTwo() {
      this.showContOneData = false;
      this.showContTwoData = true;
      document.getElementById("twoTwo").className = "showResult";
      document.getElementById("oneOne").className = "one";
    },
  },
};
</script>
<style scoped>
.headTitle {
  display: flex;
    height: 35px;
    line-height: 35px;
    background: #054480;
    color: aqua;
}
.contMain {
    color: #fff;
    height: 140px;
    line-height: 30px;
    margin-top: 5px;
    font-size: 14px;
    position: relative;
}
.contData {
    justify-content: space-between;
    display: flex;
    padding: 0 5px;
    height: 25px;
    line-height: 25px;
    background: #094185;
    margin-top: 3px;
}
.zwnr {
    background: #094185;
    height: 130px;
    text-align: center;
    line-height: 120px;
    font-size: 16px;
}
.intel {
    width: 50%;
    text-align: center;
}
.one {
    height: 4px;
    background: #054480;
    width: 50px;
}
.showResult {
    height: 4px;
    width: 50px;
    background: #01ffff;
    margin-left: 10px;
}
.toOne {
    width: 20%;
    margin-left: 42%;
    position: absolute;
    bottom: -20px;
    height: 1px;
    display: flex;
    text-align: center;
}
.headData{}
.headItem{
  width: 50%;
  text-align: center;
}
</style>