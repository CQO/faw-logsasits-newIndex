<template>
  <div class="powerDeployment">
    <div class="top_header">
      <div class="routerBtnClick">
        <div class="leftHeaderBg" @click="toHome"></div>
        <div class="coumn leftHeadeeOne" @click="toLogista">物流态势</div>
        <div class="coumn leftHeadeeTwo" @click="toGlobalMonitoring">
          全域监控
        </div>
        <div class="coumn leftHeadeeThree" @click="toMointor">全程监控</div>
      </div>
      <div class="">
        <span class="text">异&nbsp;常&nbsp;监&nbsp;控</span>
      </div>
      <div class="">
        <div class="coumn rightNumOne" @click="toMapGuide">地图导视</div>
        <div class="coumn rightNumTwo">异常监控</div>
        <div class="coumn rightNumThree" @click="toGeneralOverview">
          总体概况
        </div>
        <div class="rightNumFour" @click="toXqfx">辅助决策</div>
        <div class="rightfou" @click="toLogin"></div>
      </div>
    </div>
    <div class="contentMainTop_itema">
      <!-- <div class="item" style=""> -->
      <!-- <iframe :src="srcUrl" frameborder="0" width="100%" height="100%"></iframe> -->
      <!-- </div> -->
      <div class="topSearchForm">
        <el-form>
          <el-row :gutter="40" style="display: flex">
            <el-col :md="5">
              <el-form-item label="订单任务编号">
                <el-input
                  placeholder="请输入"
                  style="width: 60%"
                  v-model="form.rwbh"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="5">
              <el-form-item label="承运物流企业">
                <el-select v-model="form.qy" clearable>
                  <el-option
                    v-for="item in getQyList"
                    :key="item.supplierCode"
                    :label="item.name"
                    :value="item.supplierCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5">
              <el-form-item label="异常类型">
                <el-select v-model="form.yclx" clearable>
                  <el-option
                    v-for="item in getYcReasonTypeList"
                    :key="item.reasonCode"
                    :label="item.reasonname"
                    :value="item.reasonCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5">
              <el-form-item label="异常原因">
                <el-input
                  placeholder="请输入"
                  style="width: 60%"
                  v-model="form.ycyy"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="2">
              <div class="btnSty" @click="handleSearch">查询</div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="fxfxKcontent">
        <div class="">
          <!-- <div class="top_title">
              <div class="taskChin">费&nbsp;效&nbsp;分&nbsp;析</div>
              <div class="taskEng">COST EFFECTIVENESS ANALYSIS</div>
            </div> -->
          <div class="">
            <fxfxEchart :getData="this.echatNedDat"></fxfxEchart>
          </div>
        </div>
      </div>
      <div class="contentList">
        <div class="toptitle">
          <div class="" style="margin-left: 1px; flex: 1; display: flex">
            <!-- {{ item.name }} -->
            <div class="titleItem">订单任务编号</div>
            <div class="titleItem">运单号</div>
            <div class="titleItem">承运物流企业</div>
            <div class="titleItem">仓储中心</div>
            <div class="titleItem">目的地</div>
            <div class="titleItem">计划数量</div>
            <div class="titleItem">实到数量</div>
            <div class="titleItem">异常原因</div>
            <div class="titleItem">企业名</div>
            <div class="titleItem">异常类型</div>
            <div class="titleItem">处理意见</div>
            <div class="titleItem">反馈</div>
          </div>
        </div>
        <div class="bottomData">
          <div
            class="itemasd"
            v-for="item in getResolveData"
            @click="toShowEchat(item)"
          >
            <div class="dataitem">{{ item.planNo }}</div>
            <div class="dataitem">{{ item.waybillNo }}</div>
            <div class="dataitem">{{ item.businessCode }}</div>
            <div class="dataitem">{{ item.sendFromUnit }}</div>
            <div class="dataitem">{{ item.recipientUnit }}</div>
            <div class="dataitem">{{ item.jhsl }}</div>
            <div class="dataitem">{{ item.sdsl }}</div>
            <div class="dataitem">{{ item.exceptionReason }}</div>
            <div class="dataitem">{{ item.businessName }}</div>
            <div class="dataitem">{{ item.exceptionTypeName }}</div>
            <div class="dataitem">
              <span v-if="item.handleInfo != ''">{{ item.handleInfo }}</span>
              <div
                v-if="item.handleInfo == ''"
                class="btnStyc"
                @click="tiAdAgest(item)"
              >
                处理意见
              </div>
            </div>
            <div class="dataitem">
              <span v-if="item.feedback != ''">{{ item.feedback }}</span>
              <div
                v-if="item.feedback == ''"
                class="btnStyc"
                @click="toShowYcyy(item)"
              >
                反馈
              </div>
            </div>
          </div>
          <el-pagination
            class="pageAtion"
            background
            layout="prev, pager, next"
            :total="zqtjTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeZqtj"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 处理意见弹出框 -->
    <div class="dialogClick" v-if="clickShowDiaClyj">
      <div class="close" style="" @click="hiddenDetail">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
      </div>
      <div class="" style="height: 30px; text-align: center">
        <span style="color: #fff">处理意见</span>
      </div>
      <div class="tabTdList">
        <div class="" style="padding: 50px 30px 20px 30px">
          <el-form label-width="120">
            <el-form-item label="处理意见">
              <el-input
                v-model="formWzjkValue.ydh"
                style="width: 80%"
                placeholder="请输入处理意见"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="footerBt">
          <div class="btnSty" @click="handleClyj">提交</div>
          <div class="btnSty" style="margin-left: 20px" @click="hiddenDetail">
            取消
          </div>
        </div>
      </div>
    </div>
    <!-- 异常反馈弹出框 -->
    <div class="dialogClick" v-if="clickShowDiaYcfk">
      <div class="close" style="" @click="hiddenDetaila">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
      </div>
      <div class="" style="height: 30px; text-align: center">
        <span style="color: #fff">异常反馈</span>
      </div>
      <div class="tabTdList">
        <div class="" style="padding: 50px 30px 20px 30px">
          <el-form label-width="120">
            <el-form-item label="异常反馈">
              <el-input
                v-model="formYcfkValue.ycfk"
                style="width: 80%"
                placeholder="请输入异常反馈"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="footerBt">
          <div class="btnSty" @click="handleFkTj">提交</div>
          <div class="btnSty" style="margin-left: 20px" @click="hiddenDetaila">
            取消
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { mapGetters } from "vuex";
import fxfxEchart from "./components/fxfxEchart";
import {
  getTabListData,
  getQyListData,
  getResolveMothods,
} from "@/api/modules/anomalyMonitoring";

export default {
  computed: {
    ...mapGetters(["roles"]),
  },
  components: {
    fxfxEchart,
  },
  data() {
    return {
      clickShowDiaClyj: false,
      clickShowDiaYcfk: false,
      formYcfkValue: {
        ycfk: "",
      },
      srcUrl: window.roterFxfxUrl.srcUrl,
      getResolveData: [],
      getQyList: [],
      getClickDat: [],
      echatNedDat: {},
      form: {
        page: 1,
        pageSize: 5,
        ydh: "",
        qy: "",
        rwbh: "",
        yclx: "",
        ycyy: "",
      },
      getYcReasonTypeList: [
        {
          reasonCode: "1",
          reasonname: "数量异常",
        },
        {
          reasonCode: "2",
          reasonname: "品种异常",
        },
        {
          reasonCode: "3",
          reasonname: "质量异常",
        },
        {
          reasonCode: "4",
          reasonname: "包装损坏",
        },
        {
          reasonCode: "5",
          reasonname: "途中异常",
        },
        {
          reasonCode: "6",
          reasonname: "交接异常",
        },
        {
          reasonCode: "7",
          reasonname: "客户异常",
        },
        {
          reasonCode: "8",
          reasonname: "收货延迟",
        },
        {
          reasonCode: "9",
          reasonname: "其他",
        },
      ],
      nedClyj: "",
      nedFk: "",
      formWzjkValue: {
        ydh: "",
      },
      zqtjTotal: 1000,
      nedYear: "",
      currentMonth: "",
      startMont: [
        {
          value: "1",
          label: "1月",
        },
        {
          value: "2",
          label: "2月",
        },
        {
          value: "3",
          label: "3月",
        },
        {
          value: "4",
          label: "4月",
        },
        {
          value: "5",
          label: "5月",
        },
        {
          value: "6",
          label: "6月",
        },
        {
          value: "7",
          label: "7月",
        },
        {
          value: "8",
          label: "8月",
        },
        {
          value: "9",
          label: "9月",
        },
        {
          value: "10",
          label: "10月",
        },
        {
          value: "11",
          label: "11月",
        },
        {
          value: "12",
          label: "12月",
        },
      ],
    };
  },
  created() {
    this.getListData();
    this.getUserData = this.$store.state.user.sidebar.roles;
    console.log(
      this.getUserData,
      "this.getUserDatathis.getUserData,,,,,,,,,,,,,,,"
    );
  },
  methods: {
    hiddenDetail() {
      this.clickShowDiaClyj = false;
      this.formWzjkValue.ydh = "";
    },
    hiddenDetaila() {
      this.clickShowDiaYcfk = false;
      this.formYcfkValue.ycfk = "";
    },
    toShowYcyy(item) {
      this.clickShowDiaYcfk = true;
      this.nedFk = item.id;
    },
    handleFkTj() {
      let params = {
        m: {
          id: this.nedFk,
          xxfk: this.formYcfkValue.ycfk,
        },
      };
      getResolveMothods(params).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "提交反馈成功!",
          });
          this.clickShowDiaYcfk = false;
          this.getListData();
        } else {
          this.$message({
            type: "error",
            message: "提交反馈失败!",
          });
        }
      });
    },
    handleWzjkSearch() {},
    tiAdAgest(item) {
      this.clickShowDiaClyj = true;
      console.log(item, "item44444444444444444444444444");
      this.nedClyj = item.id;
    },
    handleClyj() {
      let params = {
        m: {
          id: this.nedClyj,
          xxcz: this.formWzjkValue.ydh,
        },
      };
      getResolveMothods(params).then((res) => {
        console.log(res, "ressss处理意见啊啊啊");
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "提交意见成功!",
          });
          this.clickShowDiaClyj = false;
          this.getListData();
        } else {
          this.$message({
            type: "error",
            message: "提交意见失败!",
          });
        }
      });
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getListData();
    },
    handleCurrentChangeZqtj(val) {
      this.form.page = val;
      this.getListData();
    },
    toShowEchat(item) {
      this.getClickDat = [];
      this.getClickDat.push(item);
      // this.$delete(this.getClickDat[0],'businessCode')
      // this.$delete(this.getClickDat[0],'name')
      // this.$delete(this.getClickDat[0],'zds')
      this.echatNedDat = this.getClickDat[0];
    },
    getListData() {
      let params = {
        page: this.form.page,
        pageSize: this.form.pageSize,
        m: {
          planNo: this.form.rwbh,
          businessCode: this.form.qy,
          exceptionType: this.form.yclx,
          exceptionReason: this.form.ycyy,
        },
      };
      getTabListData(params).then((res) => {
        this.getResolveData = res.pd.rows;
        this.zqtjTotal = res.pd.total;
      });
      getQyListData({}).then((res) => {
        this.getQyList = res.list;
      });
    },
    handleSearch() {
      this.form.page = 1;
      // let params={
      //   m:{
      //     year:this.nedYear,
      //     month:this.currentMonth
      //   }
      // }
      // console.log(params,'parammmmmmmmmmmmmmmmmmmmmaaaaaaaaapppppppppppppp')
      this.getListData();
    },
    toHome() {
      this.$router.push("/homepage");
    },
    toMointor() {
      if (this.getUserData.includes("130")) {
        this.$router.push("/monitoring");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toLogista() {
      if (this.getUserData.includes("128")) {
        this.$router.push("/logisticsSituation");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
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
  background-size: cover;
  background-position: center;
}
.text {
  font-weight: bold;
  background-image: -webkit-linear-gradient(bottom, #fff, #00e9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 3px #002153);
}
.content_main {
  height: 100%;
}
.item {
  width: 80%;
  height: 90%;
  margin: 50px 200px 50px 300px;
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
    color: #fff;
    background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
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
    left: -10px;
    width: 150px;
    height: 60px;
    background-image: url("../../../assets/image/homePage/hoverShad.png");
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
  //color: #fff;
  //background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
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
  background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
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
.topSearchForm {
  padding-top: 30px;
  padding-left: 100px;
  height: 10%;
  width: 100%;
}
.btnSty {
  width: 123px;
  height: 40px;
  background: rgba(0, 47, 81, 0.1);
  box-shadow: inset 0 0 20px 0 #00d1ff;
  border-radius: 5px 5px 5px 5px;
  opacity: 1;
  border: 1px solid #36aaff;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
.fxfxKcontent {
  width: 100%;
  padding: 0 20px;
}
.contentMainTop_itema {
  margin: 20px;
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
}
.top_title {
  padding: 20px;
  display: flex;
}
.taskChin {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 4px solid #01ffff;
}
.taskEng {
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  padding: 5px;
  border-bottom: 1px transparent solid;
  border-image: linear-gradient(to right, #27cbff, #001e65) 1 10;
}
.titlehead {
  width: 100%;
  background: #054480;
  height: 47px;
  line-height: 47px;
  color: #7bffff;
  display: flex;
  justify-content: space-around;
}
.mainListItem {
  justify-content: space-around;
  display: flex;
  color: #fff;
  background: #054480;
  height: 37px;
  line-height: 37px;
  margin-top: 5px;
  .itemlaner {
    flex: 1;
    text-align: center;
    margin-left: 1px;
  }
}
.mainListItemc {
  justify-content: space-around;
  display: flex;
  color: #fff;
  background: #054480;
  height: 37px;
  padding: 10px 5px;
  margin-top: 5px;
  .itemlanerc {
    flex: 1;
    text-align: center;
    margin-left: 1px;
  }
}
.contentList {
  padding: 0 130px;
}
.toptitle {
  height: 47px;
  background: rgba(39, 151, 255, 0.2);
  border-radius: 0 0 0 0;
  opacity: 1;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.titleItem {
  flex: 1;
  font-size: 16px;
  color: #01ffff;
  line-height: 47px;
  text-align: center;
}
.itemasd {
  height: 47px;
  background: rgba(39, 151, 255, 0.1);
  border-radius: 0 0 0 0;
  opacity: 1;
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}
.itemasd:hover {
  border: 1px solid #01ffff;
  box-shadow: 0 0 15px #386fcf inset;
}
.dataitem {
  width: 30%;
  flex: 1;
  line-height: 47px;
  font-size: 14px;
  color: #fff;
  text-align: center;
}
::v-deep .el-picker-panel {
  width: 400px !important;
}
.pageAtion {
  text-align: center;
}
.btnStyc {
  margin: auto;
  margin-top: 5px;
  width: 83px;
  height: 30px;
  background: rgba(0, 47, 81, 0.1);
  //box-shadow: inset 0 0 20px 0 #00d1ff;
  border-radius: 5px 5px 5px 5px;
  opacity: 1;
  border: 1px solid #36aaff;
  color: #fff;
  text-align: center;
  line-height: 30px;
}
.dialogClick {
  z-index: 211;
  position: absolute;
  top: 200px;
  bottom: 260px;
  left: 555px;
  width: 865px;
  height: 30%;
  background-image: url("../../../assets/image/content/sliceList.png");
  background-size: 100% 100%;
  .close {
    position: absolute;
    //float: right;
    right: 20px;
  }
}
.footerBt {
  display: flex;
  text-align: center;
  margin: auto;
  margin-top: 30px;
  margin-left: 300px;
}
</style>
  