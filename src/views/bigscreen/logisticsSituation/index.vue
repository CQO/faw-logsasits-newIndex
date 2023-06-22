<template>
  <div class="powerDeployment">
    <div class="top_header">
      <div class="routerBtnClick">
        <div class="leftHeaderBg" @click="toHome"></div>
        <div class="coumn leftHeadeeOne">物流态势</div>
        <div class="coumn leftHeadeeTwo" @click="toGlobalMonitoring">
          全域监控
        </div>
        <div class="coumn leftHeadeeThree" @click="toMonitoring">全程监控</div>
      </div>
      <div class="">
        <span class="text">物&nbsp;流&nbsp;态&nbsp;势</span>
      </div>
    </div>
    <div class="">
      <div class="coumn rightNumOne" @click="toMapGuide">地图导视</div>
      <div class="coumn rightNumTwo" @click="toYcjk">异常监控</div>
      <div class="coumn rightNumThree" @click="toGeneralOverview">总体概况</div>
      <div class="rightNumFour" @click="toXqfx">辅助决策</div>
      <div class="rightfou" @click="toLogin"></div>
    </div>
    <div class="content_main">
      <div class="cont_top_cont" style="">
        <div class="left_top" style="width: 25%" @click="showDetail">
          <div class="completionrate">
            <div class="taskChin">任&nbsp;务&nbsp;动&nbsp;态</div>
            <div class="taskEng"></div>
          </div>
          <div class="jdBack" style="">
            <div class="" style="width: 100px; height: 100px">
              <div class="waihuan" style="">
                <div class="waterBw">
                  <!-- <div class="TheCircle">
                    <div class="Water">
                      <span style="">
                        <animate-number
                          from="1"
                          :to="this.completionRate"
                          :key="this.completionRate"
                        ></animate-number>
                      </span>
                      <span style="margin-left: 20px; margin-top: 10px">%</span>
                    </div>
                  </div>-->
                <glEchat></glEchat>
                </div> 
              </div>
            </div>
            <div style="display:flex;flex-direction:column;float:right">
              <div class="spanTotal">
                <span style="color: #27cbff; font-size: 14px">总数(个)：</span>
                <span style="color: #27cbff; font-size: 18px">
                  <animate-number
                    style=""
                    from="1"
                    :to="this.zongshu"
                    :key="this.zongshu"
                  ></animate-number>
                </span>
              </div>
              <div class="spanTotal">
                <span style="color: #27cbff; font-size: 14px">正常数(个)：</span>
                <span style="color: #27cbff; font-size: 18px">
                  <animate-number
                    style=""
                    from="1"
                    :to="this.zhengcs"
                    :key="this.zhengcs"
                  ></animate-number>
                </span>
              </div>
              <div class="spanTotal">
                <span style="color: #27cbff; font-size: 14px">异常数(个)：</span>
                <span style="color: #ff3535; font-size: 18px">
                  <animate-number
                    style=""
                    from="1"
                    :to="this.baifenbi"
                    :key="this.baifenbi"
                  ></animate-number>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="yearSelect">
          <DataSelect></DataSelect>
        </div>
        <div class="center_top">
          <div>
            <div class="" style="display: flex">
              <div class="ct_ct">
                <div class="">
                  <div class="LogisticsInstruction">
                    <div class="">1</div>
                  </div>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="spt">已下单时间</span>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="data">{{ this.jdData.status10 }}</span>
                </div>
              </div>
              <div class="jt">
                <img
                  src="../../../assets/image/logisticsSituation/vector.png"
                  alt=""
                />
              </div>
              <div class="ct_ct">
                <div class="">
                  <div class="LogisticsInstruction">
                    <div class="">2</div>
                  </div>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="spt">仓库处理中时间</span>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="data">{{ this.jdData.status30 }}</span>
                </div>
              </div>
              <div class="jt">
                <img
                  src="../../../assets/image/logisticsSituation/vector.png"
                  alt=""
                />
              </div>
              <div class="ct_ct">
                <div class="">
                  <div class="LogisticsInstruction">
                    <div class="">3</div>
                  </div>
                </div>
                <div class=""></div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="spt">运输中时间</span>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="data">{{ this.jdData.status50 }}</span>
                </div>
              </div>
              <div class="jt">
                <img
                  src="../../../assets/image/logisticsSituation/vector.png"
                  alt=""
                />
              </div>
              <div class="ct_ct">
                <div class="">
                  <div class="LogisticsInstruction">
                    <div class="">4</div>
                  </div>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="spt">派送中时间</span>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="data">{{ this.jdData.status70 }}</span>
                </div>
              </div>
            </div>
            <div class="" style="display: flex; height: 50%">
              <div class="ct_ct" style="width: 35%">
                <div class="">
                  <div class="LogisticsInstruction">
                    <div class="">5</div>
                  </div>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="spt">领取中时间</span>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="data">{{ this.jdData.status75 }}</span>
                </div>
              </div>
              <div class="jt">
                <img
                  src="../../../assets/image/logisticsSituation/vector.png"
                  alt=""
                />
              </div>
              <div class="ct_ct" style="width: 35%">
                <div class="">
                  <div class="LogisticsInstruction">
                    <div class="">6</div>
                  </div>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="spt">已签收时间</span>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="data">{{ this.jdData.status80 }}</span>
                </div>
              </div>
              <div class="jt">
                <img
                  src="../../../assets/image/logisticsSituation/vector.png"
                  alt=""
                />
              </div>
              <div class="ct_ct" style="width: 35%">
                <div class="">
                  <div class="LogisticsInstruction">
                    <div class="">7</div>
                  </div>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="spt">异常时间</span>
                </div>
                <div class="" style="text-align: center; width: 100%">
                  <span class="data">{{ this.jdData.status1 }}</span>
                </div>
              </div>
              <div class="jt">
                <!-- <img
                  src="../../../assets/image/logisticsSituation/vector.png"
                  alt=""
                /> -->
              </div>

              <!-- <div class="ct_ct">
                <div class="">
                  <div class="LogisticsInstruction">
                    <div class="">8</div>
                  </div>
                </div>
                <div class="" style="text-align: center; width: 75px;">
                  <span class="spt">接收指令</span>
                </div>
                <div class="">
                  <span class="data">2022-11-14</span>
                </div>
              </div> -->
              <!-- <div class="jt">
                <img
                  src="../../../assets/image/logisticsSituation/vector.png"
                  alt=""
                />
              </div> -->
              <!-- <div class="ct_ct">
                <div class="">
                  <div class="LogisticsInstruction">
                    <div class="">9</div>
                  </div>
                </div>
                <div class="" style="text-align: center; width: 75px;">
                  <span class="spt">接收指令</span>
                </div>
                <div class="">
                  <span class="data">2022-11-14</span>
                </div>
              </div> -->
            </div>
          </div>
          <div class="dialogClicka" v-if="showZxdtDia" style="">
            <div class="close" @click="hiddenDetail" style="">
              <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
            </div>
            <div class="" style="height: 30px; text-align: center">
              <span style="color: #fff">最新动态</span>
            </div>
            <div class="tabTdList">
              <div class="" style="">
                <zxdtdialog></zxdtdialog>
              </div>
            </div>
          </div>
        </div>
        <div class="left_top" style="width: 25%">
          <div class="completionrate" style="padding-bottom: 10px">
            <div class="taskChin">风&nbsp;险&nbsp;预&nbsp;警</div>
            <div class="taskEng"></div>
          </div>
          <div class="">
            <warningOfRisks @passParam="toShowFxyj" />
            <!-- @click="toShowFxyj" -->
          </div>
        </div>
      </div>
      <div class="cont_bottom_cont" style="" v-if="noneClick">
        <div class="left_bot">
          <div class="left_top" style="height: 50%" @click="toShowGydtDia">
            <div class="completionrate">
              <div class="taskChin">供&nbsp;应&nbsp;动&nbsp;态</div>
              <div class="taskEng"></div>
            </div>
            <div class="" style="">
              <DynamicsSupply></DynamicsSupply>
            </div>
          </div>
          <div class="left_top" style="height: 50%; margin-top: 10px">
            <div
              class="completionrate"
              style="display: flex; flex-direction: column"
              @click="toShowTyrk"
            >
              <div class="" style="display: flex">
                <div class="taskChin">提&nbsp;运&nbsp;入&nbsp;库</div>
                <div class="taskEng"></div>
              </div>
              <div class="" style="display: flex;margin-top">
                <ljfjlProgress></ljfjlProgress>
              </div>
            </div>
            <div
              class="completionrate"
              style="display: flex; flex-direction: column; margin-top: -50px"
              @click="toShowFjps"
            >
              <div class="" style="display: flex">
                <div class="taskChin">分&nbsp;拣&nbsp;配&nbsp;送</div>
                <div class="taskEng"></div>
              </div>
              <div class="" style="display: flex; margin-top: 30px">
                <ljtyl></ljtyl>
              </div>
            </div>
          </div>
        </div>
        <div class="center_bot" style="width: 50%">
          <cbData />
        </div>
        <div class="right_bot">
          <div class="left_top" style="height: 50%">
            <div class="completionrate">
              <div class="taskChin">工&nbsp;厂&nbsp;动&nbsp;态</div>
              <div class="taskEng"></div>
            </div>
            <div class="">
              <div
                class="echart"
                id="mychart"
                style="width: 100%; height: 286px; margin: 10px 0 10px 20px"
              ></div>
            </div>
          </div>
          <div
            class="left_top"
            style="height: 50%; margin-top: 20px"
            @click="toShowKcdt"
          >
            <div class="completionrate">
              <div class="taskChin">库&nbsp;存&nbsp;动&nbsp;态</div>
              <div class="taskEng"></div>
            </div>
            <div class="">
              <InventoryDynamics></InventoryDynamics>
            </div>
          </div>
        </div>
      </div>
      <div class="dialogClick" v-if="clickYd" style="">
        <div class="close" @click="hiddenDetail">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
        </div>
        <div class="headerTitl">任务动态</div>
        <div class="tabList">
          <pressConfigation></pressConfigation>
        </div>
      </div>
      <!--供应动态tab弹出框 -->
      <div
        class="dialogClick"
        v-if="showGydtDia"
      >
        <div class="close" @click="hiddenDetail">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
        </div>
        <div
          class=""
          style="height: 30px; text-align: center; padding-top: 10px"
        >
          <span style="color: #fff">{{ dialogTitle }}</span>
        </div>
        <div class="tabTdList">
          <div class="" style="">
            <gydtdialog></gydtdialog>
          </div>
        </div>
      </div>
      <!--提运入库tab弹出框 -->
      <div
        class="dialogClick"
        v-if="showTyrkDia"
        style="height: 80%; bottom: 240px; z-index: 211"
      >
        <div class="close" @click="hiddenDetail">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
        </div>
        <div
          class=""
          style="height: 30px; text-align: center; padding-top: 10px"
        >
          <span style="color: #fff">{{ dialogTitle }}</span>
        </div>
        <div class="tabTdList">
          <div class="" style="">
            <tyrkdialog></tyrkdialog>
          </div>
        </div>
      </div>
      <!--分拣配送tab弹出框 -->
      <div
        class="dialogClick"
        v-if="showFjpsDia"
        style="height: 80%; bottom: 240px"
      >
        <div class="close" @click="hiddenDetail">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
        </div>
        <div
          class=""
          style="height: 30px; text-align: center; padding-top: 10px"
        >
          <span style="color: #fff">{{ dialogTitle }}</span>
        </div>
        <div class="tabTdList">
          <div class="" style="">
            <fjpsdialog></fjpsdialog>
          </div>
        </div>
      </div>
      <!--风险预警tab弹出框 -->
      <div
        class="dialogClick"
        v-if="showFxyjDia"
        style="height: 80%x; bottom: 240px"
      >
        <div class="close" @click="hiddenDetail">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
        </div>
        <div
          class=""
          style="height: 30px; text-align: center; padding-top: 10px"
        >
          <span style="color: #fff">{{ dialogTitle }}</span>
        </div>
        <div class="tabTdList">
          <div class="" style="">
            <fxyjdialog></fxyjdialog>
          </div>
        </div>
      </div>
      <!--库存动态tab弹出框 -->
      <div
        class="dialogClick"
        v-if="showKcdtDia"
        style="height: 80%x; bottom: 240px"
      >
        <div class="close" @click="hiddenDetail">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
        </div>
        <div
          class=""
          style="height: 30px; text-align: center; padding-top: 10px"
        >
          <span style="color: #fff">{{ dialogTitle }}</span>
        </div>
        <div class="tabTdList">
          <div class="" style="">
            <kcdtdialog></kcdtdialog>
          </div>
        </div>
      </div>
      <div class="zxdt" @click="toShyowZxdt">
        <img src="../../../assets/image/logisticsSituation/zxdt.png" alt="" />
        <span style="color: #cba46b">最新动态</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import countTo from "vue-count-to";
import gsap from "gsap";
import logisticsSituationAPI from "@/api/modules/logisticsSituation";
import * as echarts from "echarts";
import FactoryActivity from "@/views/bigscreen/logisticsSituation/compontent/FactoryActivity";
import cbData from "@/views/bigscreen/logisticsSituation/compontent/cbData";
import warningOfRisks from "@/views/bigscreen/logisticsSituation/compontent/warningOfRisks";
import InventoryDynamics from "@/views/bigscreen/logisticsSituation/compontent/InventoryDynamics";
import DynamicsSupply from "@/views/bigscreen/logisticsSituation/compontent/DynamicsSupply";
import ljtyl from "@/views/bigscreen/logisticsSituation/compontent/ljtyl";
import ljfjlProgress from "@/views/bigscreen/logisticsSituation/compontent/ljfjlProgress";
import pressConfigation from "./compontent/pressConfigation";
import gydtdialog from "./compontent/gydtdialog";
import tyrkdialog from "./compontent/tyrkdialog";
import fjpsdialog from "./compontent/fjpsdialog";
import fxyjdialog from "./compontent/fxyjdialog";
import kcdtdialog from "./compontent/kcdtdialog";
import zxdtdialog from "./compontent/zxdtDialog";
import glEchat from './compontent/glEchat';
import DataSelect from '@/views/bigscreen/homePage/components/dataSelect';

export default {
  name: "logisticsSituation",
  computed: {
    ...mapGetters(["roles"]),
  },
  components: {
    cbData,
    warningOfRisks,
    FactoryActivity,
    InventoryDynamics,
    DynamicsSupply,
    ljtyl,
    ljfjlProgress,
    pressConfigation,
    countTo,
    gydtdialog,
    tyrkdialog,
    fjpsdialog,
    fxyjdialog,
    kcdtdialog,
    zxdtdialog,
    DataSelect,
    glEchat
  },
  data() {
    return {
      showGydtDia: false,
      showTyrkDia: false,
      showFjpsDia: false,
      showFxyjDia: false,
      showKcdtDia: false,
      showZxdtDia: false,
      jdData: [],
      dialogTitle: "",
      startVal: 0,
      endVal: 2137,
      xData: ["1月", "2月", "3月", "4月", "5月", "6月"], //横坐标
      yData: [870, 920, 890, 580, 780, 780], //数据,
      totalAnomaly: "",
      completionRate: "",
      noneClick: true,
      clickYd: false,
      showNumber: 0,
      showNumbefen: 0,
      number: 60,
      baifenbi: "",
      zongshu: "",
      zhengcs: "",
    };
  },
  computed: {
    zongshu() {
      return this.showNumber.toFixed(0);
    },
    baifens() {
      // return this.showNumbefen.toFixed(0);
    },
  },
  mounted() {
    this.initEcharts();
    // this.getCompletionProgress()
  },
  created() {
    this.getUserData = this.$store.state.user.sidebar.roles;
    console.log(
      this.getUserData,
      "this.getUserDatathis.getUserData,,,,,,,,,,,,,,,"
    );
    this.getRwjdPre();
    this.getCompletionProgress();
    this.getKcdtData();
    this.getByrkData();
    this.getFjpsData();
    gsap.to(this, {
      duration: 5,
      showNumber: this.number,
      showNumbefen: this.baifenbi,
    });
  },
  watch: {
    number(newVal) {
      gsap.to(this, {
        duration: 2,
        showNumber: newVal,
      });
    },
    // baifenbi(newVal){
    //   gsap.to(this, {
    //     duration: 5,
    //     showNumbefen: newVal,
    //   });
    // }
  },
  methods: {
    getRwjdPre() {
      let params = {
        m: {
          orderCode: "",
        },
      };
      logisticsSituationAPI.getJdProgessData(params).then((res) => {
        this.jdData = res.list[0];
      });
    },
    toShowKcdt() {
      this.showKcdtDia = true;
      this.dialogTitle = "库存动态";
      this.showGydtDia = false;
      this.showTyrkDia = false;
      this.showFjpsDia = false;
      this.showFxyjDia = false;
      this.showZxdtDia = false;
    },
    toShowFxyj() {
      this.showFxyjDia = true;
      this.dialogTitle = "风险预警";
      this.showGydtDia = false;
      this.showTyrkDia = false;
      this.showFjpsDia = false;
      this.showKcdtDia = false;
      this.showZxdtDia = false;
    },
    toShowFjps() {
      this.showFjpsDia = true;
      this.dialogTitle = "分拣配送";
      this.showGydtDia = false;
      this.showTyrkDia = false;
      this.showFxyjDia = false;
      this.showKcdtDia = false;
      this.showZxdtDia = false;
    },
    toShowTyrk() {
      this.showTyrkDia = true;
      this.dialogTitle = "提运入库";
      this.showGydtDia = false;
      this.showFjpsDia = false;
      this.showFxyjDia = false;
      this.showKcdtDia = false;
      this.showZxdtDia = false;
    },
    toShowGydtDia() {
      this.showGydtDia = true;
      this.dialogTitle = "供应动态";
      this.showTyrkDia = false;
      this.showFjpsDia = false;
      this.showFxyjDia = false;
      this.showKcdtDia = false;
      this.showZxdtDia = false;
    },
    formatter: function (num) {
      return num.toFixed(2);
    },
    toHome() {
      this.$router.push("/homepage");
    },
    toXqfx() {
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
    toLogin() {
      this.$router.push("/login");
    },
    showDetail() {
      // this.noneClick = false;
      this.clickYd = true;
    },
    toShyowZxdt() {
      this.showZxdtDia = true;
      this.noneClick = true;
      this.clickYd = false;
      this.showGydtDia = false;
      this.showTyrkDia = false;
      this.showFjpsDia = false;
      this.showFxyjDia = false;
      this.showKcdtDia = false;
    },
    hiddenDetail() {
      this.noneClick = true;
      this.clickYd = false;
      this.showGydtDia = false;
      this.showTyrkDia = false;
      this.showFjpsDia = false;
      this.showFxyjDia = false;
      this.showKcdtDia = false;
      this.showZxdtDia = false;
    },
    toGlobalMonitoring() {
      if (this.getUserData.includes("129")) {
        this.$router.push("/globalMonitoring");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toMonitoring() {
      if (this.getUserData.includes("130")) {
        this.$router.push({
          name: "monitoring",
        });
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toGeneralOverview() {
      if (this.getUserData.includes("90")) {
        this.$router.push("/generalOverview");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toMapGuide() {
      if (this.getUserData.includes("12")) {
        this.$router.push("/mapGuide");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toYcjk() {
      if (this.getUserData.includes("80")) {
        this.$router.push("/anomalyMonitoring");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    //任务完成进度
    getCompletionProgress() {
      logisticsSituationAPI.getTaskProgress({}).then((res) => {
        console.log(res, "res任务完成进度======================");
        this.baifenbi = res.m.excNum + "%";
        this.zongshu = res.m.total;
        this.zhengcs = res.m.normal;
        console.log(
          this.baifenbi,
          "this.baifenbithis.baifenbithis.baifenbithis.baifenbi"
        );
        this.completionRate = res.m.normalRate;
        console.log(
          this.completionRate,
          "this.completionRatethis.completionRatethis.completionRate"
        );
      });
    },
    getKcdtData() {
      logisticsSituationAPI.getInventoryDynamics({}).then((res) => {
        console.log(res, "res库存动态======================");
      });
    },
    getByrkData() {
      logisticsSituationAPI.getIntoStorage({}).then((res) => {
        console.log(res.m, "res搬运入库======================");
      });
    },
    getFjpsData() {
      logisticsSituationAPI.getSorting({}).then((res) => {
        console.log(res.m, "res分拣配送======================");
      });
    },
    initEcharts() {
      // 基本柱状图
      const option = {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: this.xData,
          axisLine: {
            //x轴线的颜色以及宽度
            show: true,
            lineStyle: {
              color: "#fff",
              width: 0,
              type: "dashed",
            },
          },
        },
        yAxis: {
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
          left: -5, // 距离左边位置
          top: 10, // 距离上面位置
          subtextStyle: {
            // 设置二级标题的样式
            color: "rgba(255,255,255,0.7)",
          },
        },
        series: [
          {
            type: "bar", //形状为柱状图
            data: this.yData,
            barWidth: 20,
            itemStyle: {
              //
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#1AFCB9" },
                  { offset: 1, color: "#1B5A9B" },
                ]),
              },
            },
          },
        ],
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.powerDeployment {
  background-image: url("../../../assets/image/homePage/mainBg.png");
  margin: 0;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.top_header {
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
  background-image: url("../../../assets/image/homePage/btnBorder.png");
  background-size: 100% 100%;
  position: absolute;
  color: #3dd0ff;
  font-size: 18px;
  line-height: 40px;
  &:hover {
    background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
    color: #fff;
  }
}
.leftHeaderBg {
  width: 120px;
  height: 40px;
  background-image: url("../../../assets/image/homePage/homeBtn.png");
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
    background-image: url("../../../assets/image/homePage/hoverShad.png");
  }
}
.leftHeadeeOne {
  margin-left: 20px;
  background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
  color: #fff;
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
}
.rightNumFour {
  width: 120px;
  height: 40px;
  background-image: url("../../../assets/image/homePage/dynasupervision.png");
  background-size: 100% 100%;
  position: absolute;
  top: 5px;
  right: 30px;
  font-size: 18px;
  color: #27cbff;
  line-height: 40px;
  text-align: center;
  &:hover {
    background-image: url("../../../assets/image/homePage/auxiliary.png");
    color: #fff;
  }
}
.text {
  font-weight: bold;
  background-image: -webkit-linear-gradient(bottom, #fff, #00e9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 3px #002153);
}
.content_main {
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
  margin: 0 25px;
  justify-content: space-between;
  padding: 20px 0;
}
.cont_top_cont {
  display: flex;
  justify-content: space-between;
  flex: 1;
  height: 30%;
}
.center_top {
  padding: 0 20px;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 50px;
  height: 30% !important;
}
.ct_ct {
  display: flex;
  flex-direction: column;
  width: 20%;
  text-align: cneter;
}
.jt {
  width: 10%;
  margin-top: 30px;
  margin-left: 10px;
  //padding: 60px 30px;
  img {
    height: 15px;
  }
}
.spt {
  color: #00e9ff;
  margin-top: 20px;
  font-size: 16px;
}
.data {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}
.LogisticsInstruction {
  width: 85px;
  height: 85px;
  background-image: url("../../../assets/image/logisticsSituation/instruction.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  //padding: 45px 55px 45px 55px;
  margin-left: 18px;
  font-size: 20px;
  color: #00e9ff;
  font-weight: bold;
  text-align: center;
  line-height: 85px;
}
.cont_bottom_cont {
  padding-top: 10px;
  height: 70%;
  display: flex;
}
.center_bot {
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 0 15px;
  height: 100%;
}
.left_bot {
  width: 25%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.right_bot {
  width: 25%;
  height: 98%;
}
.left_top {
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.completionrate {
  padding: 20px;
  display: flex;
}
.taskChin {
  line-height: 30px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 4px solid #01ffff;
}
.taskEng {
  width: 70%;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  padding: 5px;
  border-bottom: 1px transparent solid;
  border-image: linear-gradient(to right, #27cbff, #001e65) 1 10;
}
.jianl {
  .ljjyl {
    .el-progress-bar__inner {
      background-color: unset; // 将进度条默认的颜色给去除掉，若不生效就再加个!important
      background-image: linear-gradient(
        90deg,
        #31ceff 0%,
        #206ee3 100%
      ); // 给进度条加上渐变色
    }
  }
  .ljfjl {
    .el-progress-bar__inner {
      background-color: unset; // 将进度条默认的颜色给去除掉，若不生效就再加个!important
      background-image: linear-gradient(
        90deg,
        #25f2ff 0%,
        #0098a1 100%
      ); // 给进度条加上渐变色
    }
  }
}
.abnormal {
  margin-top: 25px;
  height: 80px;
  width: 240px;
  border-radius: 75px;
  background-image: linear-gradient(to left, #094185, #001e65);
  color: #27cbff;
  padding: 25px 0 25px 105px;
  z-index: 11111;
  position: absolute;
  left: 180px;
}
.neihuan {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: #001e65;
  box-shadow: inset 0 0 15px 1px #27cbff;
  margin: 5px 7px;
  color: #fff;
  line-height: 80px;
  text-align: center;
}
.waihuan {
  position: relative;
  width: 120px;
  height: 115px;
  border-radius: 50%;
  //border: 15px solid rgba(61, 144, 240, 0.2);
  z-index: 12345;
}
.total {
  display: flex;
  margin: 20px 70px;
}
.jdBack {
  display:flex;
  justify-content: space-between;
  position: relative;
  width: 65%;
  background:rgba(255,255,255,0.1);
  //background-image: url("../../../assets/image/logisticsSituation/Group 380.png");
  background-size: 100% 100%;
  margin-left: 20%;
  margin-top: 8%;
  border-top-right-radius:50px;
  border-bottom-right-radius:50px;
  border-top-left-radius:50px;
  border-bottom-left-radius:50px;
}
.TheCircle {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: inset 0 0 15px #27cbff;
}
.Water {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background-image: linear-gradient(bottom #03eefa, #237ce0);
  box-shadow: inset 0 0 15px #27cbff;
  background: #03eefa;
  border-radius: 50%;
  overflow: hidden;
  span {
    position: absolute;
    top: 12px;
    right: 16px;
    z-index: 2001;
    color: #fff;
    font-size: 18px;
    text-align: center;
  }
}
.rightfou {
  width: 20px;
  height: 20px;
  background-image: url("../../../assets/image/login/logout.png");
  background-size: 100% 100%;
  position: absolute;
  top: 15px;
  right: 5px;
}
.rightfou:hover {
  width: 20px;
  height: 20px;
  background-image: url("../../../assets/image/login/logouta.png");
  background-size: 100% 100%;
  position: absolute;
  top: 15px;
  right: 5px;
}
.Water::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 150%;
  height: 170%;
  border-radius: 40%;
  background-color: #001e65;
  animation: real 5s linear infinite;
  box-shadow: inset 0 0 15px 1px #27cbff;
}
@keyframes real {
  0% {
    transform: translate(-50%, -65%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -65%) rotate(360deg);
  }
}
.Water::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 60%;
  height: 60%;
  border-radius: 42%;
  background-color: rgb(240, 228, 228, 0.2);
  animation: virtual 7s linear infinite;
}
@keyframes virtual {
  0% {
    transform: translate(-50%, -60%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -60%) rotate(360deg);
  }
}
.waterBw {
  display: flex;
  position: absolute;
  top: -20px;
  right: 15px;
  text-align: center;
  flex-direction: column;
}
.spanTotal {
  float: right;
  //display: flex;
  flex-direction: column;
  text-align: center;
  margin: 5px 10px 0px 50px;
}
.bottomTab {
  background-image: url("../../../assets/image/homePage/tabBg.png");
  background-size: 100% 100%;
  height: calc(40% - 70px);
  position: absolute;
  bottom: 0;
  width: 100%;
}
.headerTitl {
  width: 100%;
  color: #fff;
  padding-top: 15px;
  text-align: center;
}
.announce {
  background-image: url("../../../assets/image/homePage/tabBg.png");
  background-size: 100% 100%;
  padding-top: 10px;
  margin-top: 10px;
  height: 30% !important;
  position: relative;
}
.dialogClick {
  z-index: 211;
  position: absolute;
  top: 70px;
  left: 25%;
  width: 75%;
  height: 92%;
  margin-left:10px;
  background-image: url("../../../assets/image/content/sliceList.png");
  background-size: 100% 100%;
  background-size: 100% 100%;
  animation: bounceInLeft 1s cubic-bezier(0.215, 0.61, 0.355, 1);
    .close {
    position: absolute;
    //float: right;
    right: 20px;
  }
}
@keyframes bounceInLeft {
  0% {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  100% {
    transform: none;
  }
}
.dialogClicka {
  z-index: 211;
  position: absolute;
  //top: 100px;
  // bottom: 300px;
  //left: 30%;
  width: 45%;
  height: 30% !important;
  background-image: url("../../../assets/image/content/sliceList.png");
  background-size: 100% 100%;
  .close {
    position: absolute;
    //float: right;
    right: 20px;
  }
}
.close {
  position: absolute;
  //float: right;
  right: 20px;
}
.zxdt {
  position: absolute;
  top: 290px;
  right: 540px;
  display: flex;
  flex-direction: column;
  z-index: 0;
  img {
    width: 50px;
    margin-left: 10px;
  }
}
.yearSelect{
  position: absolute;
  top: 90px;
  right: 28%;
}
</style>