<template>
  <div class="powerDeployment">
    <div class="top_header">
      <div class="routerBtnClick">
        <div class="leftHeaderBg" @click="toHome"></div>
        <div class="coumn leftHeadeeOne" @click="toDemandly">需求分析</div>
        <div class="coumn leftHeadeeTwo" @click="toWarehouse">仓储规划</div>
        <div class="coumn leftHeadeeThree">费效分析</div>
      </div>
      <div class="">
        <span class="text">费&nbsp;效&nbsp;分&nbsp;析</span>
      </div>
      <div class="">
        <div class="coumn rightNumOne" @click="toYlcs">运力测算</div>
        <div class="coumn rightNumTwo" @click="toLjcs">路距测算</div>
        <div class="coumn rightNumThree" @click="toZhpj">综合评价</div>
        <div class="rightNumFour" @click="toLogsitio">动态监管</div>
        <div class="rightfou" @click="toLogin"></div>
      </div>
    </div>
    <div class="content_main">
      <!-- <div class="item" style=""> -->
      <!-- <iframe :src="srcUrl" frameborder="0" width="100%" height="100%"></iframe> -->
      <!-- </div> -->
      <div class="topSearchForm">
        <el-form>
          <el-row :gutter="40" style="display: flex">
            <el-col :md="8">
              <el-form-item label="年份">
                <el-date-picker
                  style="width: 400px"
                  v-model="nedYear"
                  value-format="yyyy"
                  type="year"
                  placeholder="选择年"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="月份">
                <el-select
                  placeholder="请选择"
                  v-model="currentMonth"
                  style="width: 400px"
                >
                  <el-option
                    v-for="item in startMont"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="3">
              <div class="btnSty" @click="handleSearch">查询</div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="fxfxKcontent">
        <div class="contentMainTop_itema">
          <div class="top_title">
            <div class="taskChin">费&nbsp;效&nbsp;分&nbsp;析</div>
            <div class="taskEng"></div>
          </div>
          <div class="">
            <fxfxEchart :getData="this.echatNedDat"></fxfxEchart>
          </div>
        </div>
      </div>
      <div class="contentList">
        <div class="toptitle">
          <div class="" style="margin-left: 1px; flex: 1; display: flex">
            <!-- {{ item.name }} -->
            <div class="titleItem">单位名称</div>
            <div class="titleItem">平均费用（公里/元）</div>
            <div class="titleItem">平均耗时（小时）</div>
            <div class="titleItem">异常比率</div>
            <div class="titleItem">完成率比例</div>
            <div class="titleItem">准点率比例</div>
            <div class="titleItem">综合得分</div>
          </div>
        </div>
        <div class="bottomData">
          <div
            class="itemasd"
            v-for="item in getResolveData"
            @click="toShowEchat(item)"
          >
            <div class="dataitem">{{ item.name }}</div>
            <div class="dataitem">{{ item.dj }}</div>
            <div class="dataitem">{{ item.pjsj }}</div>
            <div class="dataitem">{{ item.ycs }}</div>
            <div class="dataitem">{{ item.wcs }}</div>
            <div class="dataitem">{{ item.zss }}</div>
            <div class="dataitem">{{ item.score }}</div>
          </div>
          <!-- <el-pagination
                    class="pageAtion"
      background
      layout="prev, pager, next"
      :total="zqtjTotal"
      @size-change="handleSizeChange" @current-change="handleCurrentChangeZqtj">
    </el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import fxfxEchart from "./components/fxfxEchart";
import getFxfxFxfxApi from "@/api/modules/fxfx";

export default {
  computed: {
    ...mapGetters(["roles"]),
  },
  components: {
    fxfxEchart,
  },
  data() {
    return {
      srcUrl: window.roterFxfxUrl.srcUrl,
      getResolveData: [],
      getClickDat: [],
      echatNedDat: {},
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
    this.getUserData = this.$store.state.user.sidebar.roles;

    this.getListData();
  },
  methods: {
    toShowEchat(item) {
      this.getClickDat = [];
      this.getClickDat.push(item);
      this.echatNedDat = this.getClickDat[0];
    },
    getListData() {
      let params = {
        m: {
          year: this.nedYear,
          month: this.currentMonth,
        },
      };
      getFxfxFxfxApi.getFxfxFxfxData(params).then((res) => {
        this.getResolveData = res.list;
      });
    },
    handleSearch() {
      this.getListData();
    },
    toHome() {
      this.$router.push("/homepage");
    },
    toDemandly() {
      if (this.getUserData.includes("70")) {
        //需求分析
        this.$router.push("/demandAnalysis");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toLogsitio() {
      if (this.getUserData.includes("128")) {
        //物流态势
        this.$router.push("/logisticsSituation");
      } else if (this.getUserData.includes("129")) {
        //全域监控
        this.$router.push("/globalMonitoring");
      } else if (this.getUserData.includes("130")) {
        //全程监控
        this.$router.push({
          name: "monitoring",
        });
      } else if (this.getUserData.includes("12")) {
        //地图导视
        this.$router.push("/mapGuide");
      } else if (this.getUserData.includes("80")) {
        //异常监控
        this.$router.push("/anomalyMonitoring");
      } else if (this.getUserData.includes("90")) {
        //总体概况
        this.$router.push("/generalOverview");
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
    toFxfx() {
      if (this.getUserData.includes("86")) {
        //费效分析
        this.$router.push("/fxfx");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toWarehouse() {
      if (this.getUserData.includes("69")) {
        //仓储规划
        this.$router.push("/warehousingPlanning");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toYlcs() {
      if (this.getUserData.includes("87")) {
        //运力测算
        this.$router.push("/ylcs");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toLjcs() {
      if (this.getUserData.includes("88")) {
        //路距测算
        this.$router.push("/ljcs");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
    },
    toZhpj() {
      if (this.getUserData.includes("89")) {
        //综合评价
        this.$router.push("/zhpj");
      } else {
        this.$message({
          type: "error",
          message: "没有权限!",
        });
      }
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
  color: #fff;
  background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
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
  padding-left: 400px;
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
  height: 50%;
  width: 100%;
  padding: 0 20px;
}
.contentMainTop_itema {
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
  margin-top: 20px;
  padding: 0 30px;
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
</style>