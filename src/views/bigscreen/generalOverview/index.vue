<template>
  <div class="generalOverview">
    <div class="generalOverview_header">
      <div class="routerBtnClick">
        <div class="leftHeaderBg" @click="toHome"></div>
        <div class="coumn leftHeadeeOne" @click="toLogistion">物流态势</div>
        <div class="coumn leftHeadeeTwo" @click="toGlobalMonitor">全域监控</div>
        <div class="coumn leftHeadeeThree" @click="toMointor">全程监控</div>
    </div>
      <div class="">
        <span class="text">总&nbsp;体&nbsp;概&nbsp;况</span>
      </div>
      <div class="">
        <div class="coumn rightNumOne" @click="toMapguide">地图导视</div>
        <div class="coumn rightNumTwo" @click="toYcjk">异常监控</div>
        <div class="coumn rightNumThree">总体概况</div>
        <div class=" rightNumFour" @click="toXqfx">辅助决策</div>
      <div class="rightfou" @click="toLogin"></div>
    </div>
    </div>
    <div class="generalOverview_content">
      <div class="leftContent">
        <div class="leftContent_header" @click="toShowZtjdDia">
          <div class="completionrate">
            <div class="taskChin">
              完&nbsp;成&nbsp;进&nbsp;度
            </div>
            <div class="taskEng"></div>
          </div>
          <div class="overallCont">
              <div style="width: 0; height: 0;"> 
                  <svg width="100%" height="100%" style="margin-top: -50px;"> 
                      <defs> 
                          <linearGradient id="write" x1="0%" y1="0%" x2="100%" y2="0%"> 
                              <stop offset="0%" style="stop-color: #ecbf4c;" stop-opacity="0.8"></stop> // offset 设置起始 stop-color 设置起始位置的颜色 
                              <stop offset="100%" style="stop-color: #53bcd3;" stop-opacity="1"></stop> // offset 设置起始 stop-color 设置起始位置的颜色 
                          </linearGradient> 
                      </defs> 
                  </svg> 
                </div> 
              
              <div class="stepClas">
                <img src="../../../assets/image/generalOverview/overall.png" class="" alt=""></img>
                <div class="progress" style=" margin-top: -170px; margin-left: 40px;">
                  <el-progress  define-back-color='none' type="circle" width="122" stroke-width='5' text-size='30px' text-color="#fff" :percentage="showConta"></el-progress>
              <div class="asd" style=" margin-top: -120px; margin-left: -10px;">完成率</div>

              </div>
              </div>
              <!-- <div class="wanchenglv">完成率</div> -->
          </div>
        </div>
        <div class="leftContent_foot">
           <div class="completionrate" @click="toShowNdhz">
              <div class="taskChin">
                年&nbsp;度&nbsp;汇&nbsp;总
              </div>
              <div class="taskEng"></div>
           </div>
           <div class="summary">
               <annualSummary></annualSummary>
           </div>
        </div>
      </div>
      <div class="rightContent">
        <div class="rightContent_header">
            <div class="completionrate">
              <div class="taskChin">
                当&nbsp;前&nbsp;任&nbsp;务
              </div>
              <div class="taskEng"></div>
           </div>
           <div class="currentTask">
               <currentTask></currentTask>
           </div>
        </div>
        <div class="rightContent_header rightcontent_foot" @click="toShowWtjkDia">
            <div class="completionrate">
              <div class="taskChin">
                问&nbsp;题&nbsp;监&nbsp;控
              </div>
              <div class="taskEng"></div>
           </div>
           <div class="problem">
               <problem></problem>
           </div>
        </div>
      </div>
    </div>
    <!--总体进度tab弹出框 -->
    <div class="dialogClick" v-if="showZtjdDia" style="height: 80%; bottom: 240px;">
      <div class="close" @click="hiddenDetail" >
          <img src="../../../assets/image/homePage/closeBtn.png" alt="">
        </div>
      <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
          <span style="color: #fff;">{{dialogTitle}}</span>
      </div>
      <div class="tabTdList">
          <div class="" style="">
              <ztjddialog></ztjddialog>
          </div>
      </div>
  </div>
  <!--问题监控tab弹出框 -->
  <div class="dialogClick" v-if="showWtjkDia" style="height: 80%; bottom: 240px;">
    <div class="close" @click="hiddenDetail" >
        <img src="../../../assets/image/homePage/closeBtn.png" alt="">
      </div>
    <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
        <span style="color: #fff;">{{dialogTitle}}</span>
    </div>
    <div class="tabTdList">
        <div class="" style="">
            <wtjkdialog></wtjkdialog>
        </div>
    </div>
</div>
<!--年度汇总tab弹出框 -->
<div class="dialogClick" v-if="showNdhzDia" style="height: 80%; bottom: 240px;">
  <div class="close" @click="hiddenDetail" >
      <img src="../../../assets/image/homePage/closeBtn.png" alt="">
    </div>
  <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
      <span style="color: #fff;">{{dialogTitle}}</span>
  </div>
  <div class="tabTdList">
      <div class="" style="">
          <ndhzdialog></ndhzdialog>
      </div>
  </div>
</div>
  </div>
</template>
<script>
import gsap from "gsap";
import { mapGetters } from "vuex";
import generalOverviewAPI from '@/api/modules/generalOverview'
import annualSummary from './components/annualSummary'
import currentTask from './components/currentTask'
import problem from './components/problem'
import ztjddialog from './components/ztjddialog'
import wtjkdialog from './components/wtjkdialog'
import ndhzdialog from './components/ndhzdialog'
export default {
  computed: {
    ...mapGetters(["roles"]),
  },
  components:{
        annualSummary,
        currentTask,
        problem,
        ztjddialog,
        wtjkdialog,
        ndhzdialog
      },
  data() {
    return {
      showNdhzDia:false,
      showZtjdDia:false,
      showWtjkDia:false,
      dialogTitle:'',
      showConta:'',
      showNumber: 0,
        number:'',
    };
  },
  computed:{
    // showConta() {
    //   return this.showNumber.toFixed(0);
    // },
  },
  mounted() {
    gsap.to(this, {
      duration: 5,
      showNumber: this.number,
    });
  },
  watch:{
    // number(newVal) {
    //   gsap.to(this, {
    //     duration: 5,
    //     showConta: newVal,
    //   });
    // },
  },
  created(){
    this.getUserData = this.$store.state.user.sidebar.roles;
    console.log(
      this.getUserData,
      "this.getUserDatathis.getUserData,,,,,,,,,,,,,,,"
    );
    this.getZtjdData()
  },
  methods:{
    toShowNdhz(){
      this.showNdhzDia=true
      this.dialogTitle='年度汇总'
      this.showZtjdDia=false
      this.showWtjkDia=false
    },
    toShowWtjkDia(){
      this.showWtjkDia=true
      this.dialogTitle='问题监控'
      this.showZtjdDia=false
      this.showNdhzDia=false
    },
    hiddenDetail(){
      this.showZtjdDia=false
      this.showWtjkDia=false
      this.showNdhzDia=false
    },
    toShowZtjdDia(){
      this.showZtjdDia=true
      this.dialogTitle='完成进度'
      this.showWtjkDia=false
      this.showNdhzDia=false
    },
    toHome(){
                this.$router.push('/homepage')
            },
    toLogistion(){
      if (this.getUserData.includes("128")) {
        this.$router.push("/logisticsSituation");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
toGlobalMonitor(){
  if (this.getUserData.includes("129")) {
        this.$router.push("/globalMonitoring");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
},
    toMointor(){
      if (this.getUserData.includes("130")) {
        this.$router.push("/monitoring");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toMapguide(){
      if (this.getUserData.includes("12")) {
        this.$router.push("/mapGuide");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toYcjk(){
      if (this.getUserData.includes("80")) {
        this.$router.push("/anomalyMonitoring");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toXqfx(){
      if (this.getUserData.includes("70")) {
        //需求分析
        this.$router.push("/demandAnalysis");
      } else if (this.getUserData.includes("69")) {
        //仓储规划
        this.$router.push("/warehousingPlanning");
      } else if (this.getUserData.includes("86")) {
        //费效分析
        this.$router.push({
          name: "fxfx",
        });
      } else if (this.getUserData.includes("87")) {
        //运力测算
        this.$router.push("/ylcs");
      } else if (this.getUserData.includes("88")) {
        //路距测算
        this.$router.push("/ljcs");
      } else if (this.getUserData.includes("89")) {
        //综合评价
        this.$router.push("/zhpj");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
},
toLogin(){
  this.$router.push("/login");
},
    getZtjdData(){
      generalOverviewAPI.getZtjdData({}).then((res)=>{
        console.log(res,'总体概况-总体进度======================');
        this.showConta=res.m.rate
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.generalOverview {
    background-image: url("../../../assets/image/homePage/mainBg.png");
    margin: 0;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.generalOverview_header {
    font-size: 30px;
    text-align: center;
    height: 70px;
    padding-top: 20px;
    line-height: 25px;
    background-image: url("../../../assets/image/top_header/titleBg.svg");
    background-position: center;
}
.coumn {
    width: 120px;
    height: 40px;
    background-image: url('../../../assets/image/homePage/btnBorder.png');
    background-size: 100% 100%;
    position: absolute;
    color: #3dd0ff;
    font-size: 18px;
    line-height: 40px;
    &:hover {
        background-image: url('../../../assets/image/homePage/btnBoxShadow.png');
        color: #fff;
    }
}
.leftHeaderBg {
    width: 120px;
    height: 40px;
    background-image: url('../../../assets/image/homePage/homeBtn.png');
    background-size: 100% 100%;
    position: absolute;
    color: #3dd0ff;
    font-size: 18px;
    line-height: 40px;
    top: 5px;
    left: 10px;
    &:hover {
        top: 0;
        left: 0;
        width: 150px;
        height: 60px;
        background-image: url('../../../assets/image/homePage/hoverShad.png');
    }
}
.leftHeadeeOne {
    margin-left: 20px;
    top: 5px;
    left: 140px;
}
.leftHeadeeTwo {
    margin-left: 20px;
    top: 5px;
    left: 270px;
}
.leftHeadeeThree {
    margin-left: 20px;
    top: 5px;
    left: 400px;
}
.rightNumOne {
    text-align: center;
    right: 450px;
    top: 5px;
}
.rightNumTwo {
    text-align: center;
    right: 320px;
    top: 5px;
}
.rightNumThree {
    text-align: center;
    right: 190px;
    top: 5px;
    background-image: url('../../../assets/image/homePage/btnBoxShadow.png');
    color: #fff;
}
.rightNumFour {
    width: 120px;
    height: 40px;
    background-image: url('../../../assets/image/homePage/dynasupervision.png');
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 30px;
    font-size: 18px;
    color: #27cbff;
    line-height: 40px;
    text-align: center;
    &:hover {
        background-image: url('../../../assets/image/homePage/auxiliary.png');
        color: #fff;
    }
}
.rightfou {
    width: 20px;
    height: 20px;
    background-image: url('../../../assets/image/login/logout.png');
    background-size: 100% 100%;
    position: absolute;
    top: 15px;
    right: 5px;
}
.rightfou:hover {
    width: 20px;
    height: 20px;
    background-image: url('../../../assets/image/login/logouta.png');
    background-size: 100% 100%;
    position: absolute;
    top: 15px;
    right: 5px;
}
.text {
    font-weight: bold;
    background-image: -webkit-linear-gradient(bottom, #fff, #00e9ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(2px 2px 3px #002153);
}
.generalOverview_content {
    display: flex;
    height: calc(100% - 70px);
    margin: 0 25px;
    justify-content: space-between;
    padding: 20px 0;
}
.leftContent {
    width: 45%;
    //background: yellow;
}
.leftContent_header {
    height: 37%;
    background-image: url("../../../assets/image/logisticsSituation/slice.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
}
.completionrate {
    padding: 20px;
    display: flex;
}
.taskChin {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 4px solid #01ffff;
    line-height:30px;
}
.taskEng {
  width:70%;
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    padding: 5px;
    border-bottom: 1px transparent solid;
    border-image: linear-gradient(to right, #27cbff, #001e65) 1 10;
}
.leftContent_foot {
    height: 60%;
    margin-top: 20px;
    background-image: url("../../../assets/image/logisticsSituation/slice.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.rightContent {
    width: 55%;
    margin-left: 10px !important;
}
.overallCont {
    width: 227px;
    height: 227px;
    margin-left: 180px;
    //background-image: url('../../../assets/image/generalOverview/overall.png');
    //background-size: 100% 100%;
    //background-repeat: no-repeat;
}
.wanchenglv {
    width: 307px;
    height: 99px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    color: #01ffff;
    font-size: 18px;
    line-height: 99px;
    text-align: right;
    padding-right: 80px;
    margin-left: 100px;
}
.progress {
    padding-top: -50px !important;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    //background: #001e65;
    //top: 37px;
    //left: 47px;
    position: absolute;
    //margin: 60px 70px;
}
.asd {
    text-align: right;
    padding-right: 20px;
    width: 120%;
    color: #01ffff;
    font-size: 18px;
    line-height: 82px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    //background: #001e65;
    //top: 37px;
    //left: 47px;
    //position: absolute;
    //margin: 60px 70px;
}
.stepClas {
    width: 217px;
    height: 217px;
    position: relative !important;
    height: 80px;
    padding: 50px;
    //top: 27px;
    //left: 33px;
}
.el-progress {
    font-size: 50px;
    svg > path:nth-child(2) {
        stroke: url(#write); // #write 此处的id就是定义的svg标签id 做替换即可
    }
}
.progreb {
    .el-progress {
        svg > path:nth-child(2) {
            stroke: url(#black); // #write 此处的id就是定义的svg标签id 做替换即可
        }
    }
}
.el-progress--circle .el-progress__text {
    font-size: 30px !important;
}
.rightContent_header {
    width: 100% !important;
    margin-left: 20px !important;
    height: 48%;
    background-image: url("../../../assets/image/logisticsSituation/slice.png");
    background-size: 100% 100% !important;
    background-repeat: no-repeat;
}
.rightcontent_foot {
    background-image: url("../../../assets/image/logisticsSituation/slice.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 49%;
    margin-top: 20px;
}
.currentTask {
}
.dialogClick {
    position: absolute;
    top: 100px;
    bottom: 300px;
    left: 375px;
    width: 1045px;
    height: 80%;
    background-image: url('../../../assets/image/content/sliceList.png');
    background-size: 100% 100%;
    .close {
        position: absolute;
        //float: right;
        right: 20px;
    }
}
.tabTdList {
    margin-top: 0.9375rem;
    width: 100%;
    padding: 1.5625rem;
}
</style>