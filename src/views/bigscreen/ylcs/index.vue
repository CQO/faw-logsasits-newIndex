<template>
  <div class="powerDeployment">
    <div class="top_header">
      <div class="routerBtnClick">
        <div class="leftHeaderBg" @click="toHome"></div>
        <div class="coumn leftHeadeeOne" @click="toDemandly">需求分析</div>
        <div class="coumn leftHeadeeTwo" @click="toWarehouse">仓储规划</div>
        <div class="coumn leftHeadeeThree" @click="toFxfx">费效分析</div>
      </div>
      <div class="">
        <span class="text">运&nbsp;力&nbsp;测&nbsp;算</span>
      </div>
      <div class="">
        <div class="coumn rightNumOne">运力测算</div>
        <div class="coumn rightNumTwo" @click="toLjcs">路距测算</div>
        <div class="coumn rightNumThree" @click="toZhpj">综合评价</div>
        <div class="rightNumFour" @click="toLogsitio">动态监管</div>
        <div class="rightfou" @click="toLogin"></div>
      </div>
    </div>
    <div class="content_main">
      <!-- <div class="item" style="">
                <iframe :src="srcUrl" frameborder="0" width="100%" height="100%"></iframe>
            </div> -->
      <div class="contentLeft">
        <div class="contleftone">
          <div style="width: 0; height: 0; background: red">
            <svg width="90%" height="90%">
              <defs>
                <linearGradient id="write" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style="stop-color: #6ff"
                    stop-opacity="0.8"
                  ></stop>
                  // offset 设置起始 stop-color 设置起始位置的颜色
                  <stop
                    offset="100%"
                    style="stop-color: #5affa3"
                    stop-opacity="1"
                  ></stop>
                  // offset 设置起始 stop-color 设置起始位置的颜色
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="">
            <el-progress
              class="jdjd"
              define-back-color="rgba(255,255,255,0.1)"
              color="#6FFFBB"
              type="circle"
              width="100"
              stroke-width="12"
              text-size="22px"
              text-color="#ffffff"
              :percentage="this.zcData"
            ></el-progress>
            <img
              src="../../../assets/image/content/processBg.png"
              alt=""
              class="stepClas"
            />
            <span class="progresNum">{{ this.zcData }}%</span>
          </div>
          <div class="spanSty">整车运力</div>
        </div>
        <div class="contlefttw0">
          <div style="width: 0; height: 0">
            <svg width="100%" height="100%">
              <defs>
                <linearGradient id="write" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style="stop-color: #6ff"
                    stop-opacity="0.8"
                  ></stop>
                  // offset 设置起始 stop-color 设置起始位置的颜色
                  <stop
                    offset="100%"
                    style="stop-color: #5affa3"
                    stop-opacity="1"
                  ></stop>
                  // offset 设置起始 stop-color 设置起始位置的颜色
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="">
            <el-progress
              class="jdjd"
              define-back-color="rgba(255,255,255,0.1)"
              color="#6FFFBB"
              type="circle"
              width="100"
              stroke-width="12"
              text-size="22px"
              text-color="#ffffff"
              :percentage="this.tlData"
            ></el-progress>
            <img
              src="../../../assets/image/content/processBg.png"
              alt=""
              class="stepClas"
            />
            <span class="progresNum">{{ this.tlData }}%</span>
          </div>
          <div class="spanSty">铁路运力</div>
        </div>
        <div class="contleftone">
          <div style="width: 0; height: 0">
            <svg width="100%" height="100%">
              <defs>
                <linearGradient id="write" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style="stop-color: #6ff"
                    stop-opacity="0.8"
                  ></stop>
                  // offset 设置起始 stop-color 设置起始位置的颜色
                  <stop
                    offset="100%"
                    style="stop-color: #5affa3"
                    stop-opacity="1"
                  ></stop>
                  // offset 设置起始 stop-color 设置起始位置的颜色
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="">
            <el-progress
              class="jdjd"
              define-back-color="rgba(255,255,255,0.1)"
              color="#6FFFBB"
              type="circle"
              width="100"
              stroke-width="12"
              text-size="22px"
              text-color="#ffffff"
              :percentage="this.hkData"
            ></el-progress>
            <img
              src="../../../assets/image/content/processBg.png"
              alt=""
              class="stepClas"
            />
            <span class="progresNum">{{ this.hkData }}%</span>
          </div>
          <div class="spanSty">空运运力</div>
        </div>
        <div class="contlefttw0">
          <div style="width: 0; height: 0">
            <svg width="100%" height="100%">
              <defs>
                <linearGradient id="write" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style="stop-color: #6ff"
                    stop-opacity="0.8"
                  ></stop>
                  // offset 设置起始 stop-color 设置起始位置的颜色
                  <stop
                    offset="100%"
                    style="stop-color: #5affa3"
                    stop-opacity="1"
                  ></stop>
                  // offset 设置起始 stop-color 设置起始位置的颜色
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="">
            <el-progress
              class="jdjd"
              define-back-color="rgba(255,255,255,0.1)"
              color="#6FFFBB"
              type="circle"
              width="100"
              stroke-width="12"
              text-size="22px"
              text-color="#ffffff"
              :percentage="this.syData"
            ></el-progress>
            <img
              src="../../../assets/image/content/processBg.png"
              alt=""
              class="stepClas"
            />
            <span class="progresNum">{{ this.syData }}%</span>
          </div>
          <div class="spanSty">水运运力</div>
        </div>
      </div>
      <div class="contentRight">
        <div class="righttopform">
          <el-form>
            <el-row :gutter="28" style="display: flex">
              <el-col :md="6">
                <el-form-item label="发物仓库" style="color: #fff">
                  <el-select v-model="form.fwck" @change="handleFwckChange">
                    <el-option
                      v-for="item in getFwdwList"
                      :key="item.vectorPosition"
                      :label="item.name"
                      :value="item.vectorPosition"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6">
                <el-form-item label="保障时间">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="form.date"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :md="7">
                <el-form-item label="保障需求物资上传">
                  <el-input
                    placeholder="请输入内容"
                    style="width: 60%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="2">
                <!-- <div class="btnSty" @click="uploadIn">文件选择</div> -->
                <el-upload
                  class="btn"
                  action="#"
                  :http-request="httpRequest"
                  :show-file-list="false"
                  :on-change="handleChange"
                  :before-upload="beforeAvatarUpload"
                  multiple
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                >
                  <div
                    class="btnSty"
                    style="position: relative; right: 15px"
                    size="small"
                  >
                    文件选择
                  </div>
                </el-upload>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :md="6">
                <el-form-item label="保障地点">
                  <el-select
                    placeholder="请选择"
                    v-model="form.province"
                    @change="currStationChange"
                  >
                    <el-option
                      v-for="item in getProvinList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="5">
                <el-select
                  placeholder="请选择"
                  v-model="form.sj"
                  @change="currStationXjChange"
                >
                  <el-option
                    v-for="item in getSjData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :md="4">
                <el-select
                  placeholder="请选择"
                  v-model="form.xj"
                  @change="currStationXjDataChange"
                >
                  <el-option
                    v-for="item in getXjData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :md="4" style="display: flex">
                <!-- <div class="btnSty">确认上传</div> -->
                <div class="btnSty" @click="dropdown">模板下载</div>
                <div
                  class="btnSty"
                  style="margin-left: 5px"
                  @click="showFaysData"
                >
                  方案预算
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="rightbottab" v-if="tabListData">
          <div class="toptitle">
            <div class="titleItem">品名</div>
            <div class="titleItem">型号</div>
            <div class="titleItem">数量(万件)</div>
            <div class="titleItem">重量(kg)</div>
            <div class="titleItem">体积(m3)</div>
          </div>
          <div class="bottomData">
            <div class="itemasd" v-for="item in tableData">
              <div class="dataitem">{{ item.pm }}</div>
              <div class="dataitem">{{ item.hx }}</div>
              <div class="dataitem">{{ item.sl }}</div>
              <div class="dataitem">{{ item.zl }}</div>
              <div class="dataitem">{{ item.tj }}</div>
            </div>
          </div>
          <div
            class="toptitle"
            style="margin-top: 7px"
            v-for="index in footerData"
          >
            <div class="titleItem">合计</div>
            <div class="titleItem"></div>
            <div class="titleItem">{{ index.sl }}</div>
            <div class="titleItem">{{ index.zl }}</div>
            <div class="titleItem">{{ index.tj }}</div>
          </div>
          <div
            class=""
            style="
              position: absolute;
              width: 100%;
              text-align: center;
              bottom: -50px;
              margin-left: 70px;
            "
          >
            <el-pagination
              small
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="20"
              layout="prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="dialogClick" v-if="faysTab">
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
              <div class="titlehead">
                <div
                  class="mainListItem"
                  style="margin-left: 1px; flex: 1; display: flex"
                >
                  <!-- {{ item.name }} -->
                  <div class="itemlaner">方案名称</div>
                  <div class="itemlaner" style="width: 250px">
                    物资调拨基本信息
                  </div>
                  <div class="itemlaner">运输方案</div>
                  <div class="itemlaner">需要运载工具数量</div>
                  <div class="itemlaner">优点</div>
                  <div class="itemlaner">预估花费时间</div>
                  <div class="itemlaner">详情</div>
                </div>
              </div>
              <div class="mainLisy">
                <div class="mainListItemc" v-for="item in getFaysData">
                  <div class="itemlanerc special">{{ item.famc }}</div>
                  <div class="itemlanerc" style="width: 250px">
                    {{ item.xx }}
                  </div>
                  <div class="itemlanerc special">{{ item.ysfs }}</div>
                  <div class="itemlanerc special">{{ item.gjsl }}</div>
                  <div class="itemlanerc special">{{ item.yd }}</div>
                  <div class="itemlanerc special">{{ item.sj }}</div>
                  <div
                    class="itemlanerc special"
                    @click="downLoadOutDown(item)"
                  >
                    详情下载
                  </div>
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
      </div>
      <!-- <div class="contentRight">
        <Mapmenu style="width: 100%; height: 100%; position: relative; z-index: 3203;"></Mapmenu>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ylcsApi from "@/api/modules/ylcs";
import Mapmenu from "./map.vue";
export default {
  computed: {
    ...mapGetters(["roles"]),
  },
  components: {
    Mapmenu,
  },
  data() {
    return {
      tabListData: true,
      faysTab: false,
      queryParams: {
        page: 1,
        pageSize: 10,
      },
      form: {
        fwck: "",
        date: "",
        province: "",
        sj: "",
        xj: "",
      },
      total: 0,
      getYltjData: [],
      getResolveData: [],
      currentPage3: 0,
      srcUrl: window.roterYlcsUrl.srcUrl,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      dataForm: {
        fileFileName: "",
        file: null,
      },
      queryParamsValue: {
        namea: "",
        nameb: "",
        namec: "",
        jwda: "",
        jwdc: "",
        fwckm: "",
      },
      fileList: [],
      tableData: [],
      footerData: [],
      getFwdwList: [],
      getProvinList: [],
      getSjData: [],
      getXjData: [],
      getFaysData: [],
      syData: "",
      zcData: "",
      hkData: "",
      tlData: "",
      dialogTitle: "",
    };
  },
  created() {
    this.getUserData = this.$store.state.user.sidebar.roles;
    this.getSyylData();
    this.getTableList();
    this.getFwdwData();
    this.getProvinceData();
  },
  methods: {
    downLoadOutDown(item) {
      let params = {
        m: {
          name: item.famc,
          xx: item.xx,
          ysfs: item.ysfs,
          gjsl: item.gjsl,
          jl: item.jl,
          sj: item.sj,
          yd: item.yd,
        },
      };
      ylcsApi.getfananysExportList(params).then((res) => {
        const link = document.createElement("a"); //创建a标签
        let blob = new Blob([res], { type: "application/vnd.ms-excel" }); // response就是接口返回的文件流
        let objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = "方案预算详情数据"; // 自定义文件名
        link.click(); // 下载文件
        URL.revokeObjectURL(objectUrl); // 释放内存
      });
    },
    handleFwckChange(val) {
      this.queryParamsValue.jwda = val;
      this.getFwdwList.filter((item) => {
        if (item.vectorPosition == val) {
          this.queryParamsValue.fwckm = item.name;
        }
      });
    },
    hiddenDetail() {
      this.tabListData = true;
      this.faysTab = false;
      this.getFaysData = [];
    },
    dropdown() {
      const link = document.createElement("a");
      //_blank表示在新窗口打开链接
      link.target = "_blank";
      link.href = window.routeRulUploadYlcs.srcUrl + "/template/ylcs.xls";
      link.setAttribute("download", "文件名字" + Date.now() + ".xls"); // 下载文件的名称及文件类型后缀
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // 下载完成移除元素
    },
    // 判断文件个数
    handleChange(file, fileList) {
      if (fileList.length >= 2) {
        return;
      }
      if (fileList.length === 1) {
        this.hasFile = true;
      }
      this.dataForm.fileFileName = fileList[0].name;
      this.dataForm.file = file;
    },
    // 导入
    httpRequest(param) {
      let formData = new FormData();
      formData.append("file", this.dataForm.file.raw);
      let configHeaders = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      ylcsApi.getdropDownIn(formData).then((res) => {
        // if (res.code == 200) {
        //   this.$message({
        //     type: 'success',
        //     message: '导入成功!'
        //   });
        this.getTableList(this.data);
        // } else {
        //   this.$message({
        //     type: 'error',
        //     message: res.msg
        // });
        // }
      });
    },
    //验证文件类型
    beforeAvatarUpload(file) {
      const isXls =
        file.type === "application/vnd.ms-excel"
          ? true
          : file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ? true
          : false;
      if (!isXls) {
        alert("上传的文件只能是xls以及xlsx格式!");
      }
      return isXls;
    },
    currStationChange(val) {
      this.getProvinList.filter((item) => {
        if (item.id == this.form.province) {
          this.queryParamsValue.namea = item.name;
        }
      });
      let params = {
        m: {
          pid: val,
        },
      };
      ylcsApi.getSqListData(params).then((response) => {
        this.getSjData = response.list;
      });
    },
    currStationXjChange(val) {
      this.getSjData.filter((item) => {
        if (item.id == this.form.sj) {
          this.queryParamsValue.nameb = item.name;
        }
      });
      let params = {
        m: {
          pid: val,
        },
      };
      ylcsApi.getSqListData(params).then((response) => {
        this.getXjData = response.list;
      });
    },
    currStationXjDataChange(val) {
      this.getXjData.filter((item) => {
        if (item.id == this.form.xj) {
          this.queryParamsValue.jwdc = item.lon + "," + item.lat;
          this.queryParamsValue.namec = item.name;
        }
      });
    },
    showFaysData() {
      this.dialogTitle = "方案预算";
      this.getFaysData = [];
      this.tabListData = false;
      this.faysTab = true;
      let params = {
        m: {
          fwck: this.queryParamsValue.fwckm,
          bzqy:
            this.queryParamsValue.namea +
            "," +
            this.queryParamsValue.nameb +
            "," +
            this.queryParamsValue.namec,
          time: this.form.date,
          fwzb: this.queryParamsValue.jwda,
          bzzb: this.queryParamsValue.jwdc,
          tyjl: 5550,
          qyjl: 600,
        },
      };
      ylcsApi.getfananysList(params).then((res) => {
        this.getFaysData = res.list;
      });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getTableList();
    },
    getSyylData() {
      ylcsApi.getSyylData().then((res) => {
        this.getYltjData = res.list[0];
        this.syData = this.getYltjData.水运;
        this.zcData = this.getYltjData.整车;
        this.hkData = this.getYltjData.航空;
        this.tlData = this.getYltjData.铁路;
      });
    },
    getTableList() {
      ylcsApi.getSyylListData(this.queryParams).then((res) => {
        this.tableData = res.pd.rows;
        this.footerData = res.pd.footer;
        this.total = res.pd.total;
      });
    },
    getFwdwData() {
      ylcsApi.getSFwdwlListData({}).then((res) => {
        this.getFwdwList = res.list;
      });
    },

    getProvinceData() {
      ylcsApi.getProvinceListData({}).then((res) => {
        this.getProvinList = res.list;
      });
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
  },
};
</script>
<style lang='scss' scoped>
.powerDeployment {
  background-image: url("../../../assets/image/homePage/mainBg.png");
  margin: 0;
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  vertical-align: middle;
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
  display: flex;
  justify-content: space-between;
}
.contentLeft {
  width: 10%;
  height: 100%;
  margin: 50px 100px;
}
.contleftone {
  position: relative;
  width: 100%;
  height: 20%;
  background-image: url("../../../assets/image/content/bianzua.png");
  background-size: 100% 100%;
}
.contlefttw0 {
  position: relative;
  width: 100%;
  height: 20%;
  background-image: url("../../../assets/image/content/bianzub.png");
  background-size: 100% 100%;
}
.contentRight {
  margin-top: 90px;
  width: 70%;
  height: 100%;
  margin-right: 200px;
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
    left: 0;
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
  margin-left: 20px;
  top: 5px;
  left: 400px;
}
.rightNumOne {
  color: #fff;
  background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
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
.el-form-item__label {
  color: #fff !important;
}
.toptitle {
  height: 47px;
  background: rgba(39, 151, 255, 0.2);
  border-radius: 0 0 0 0;
  opacity: 1;
  display: flex;
  justify-content: space-around;
}
.titleItem {
  flex: 1;
  font-size: 16px;
  color: #01ffff;
  line-height: 47px;
  width: 20%;
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
.dataitem {
  width: 20%;
  flex: 1;
  line-height: 47px;
  font-size: 14px;
  color: #fff;
  text-align: center;
}
.rightbottab {
  position: relative;
  margin-bottom: 100px;
}
.jdjd {
  width: 70%;
  height: 8%;
  margin: 70px 50px;
}
.spanSty {
  position: absolute;
  bottom: 20px;
  left: 60px;
  font-size: 18px;
  color: #7bffff;
}
.stepClas {
  position: absolute !important;
  height: 90px;
  top: 75px;
  right: 47px;
  z-index: 1;
}
.progresNum {
  position: absolute;
  z-index: 2;
  color: #fff;
  font-size: 20px;
  right: 58px;
  top: 105px;
}
.dialogClick {
  position: relative;
  margin-bottom: 100px;
  width: 90%;
  height: 600px;
  background-image: url("../../../assets/image/content/sliceList.png");
  background-size: 100% 100%;
  z-index: 2555;
  .close {
    position: absolute;
    top: -27px;
    left: 570px;
  }
}
.tabTdList {
  width: 100%;
  padding: 25px;
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
    width: 140px;
    text-align: center;
    margin-left: 1px;
  }
}
.mainListItemc {
  justify-content: space-around;
  display: flex;
  color: #fff;
  background: #054480;
  height: 150px;
  padding: 10px 5px;
  margin-top: 5px;
  .itemlanerc {
    width: 140px;
    text-align: center;
    margin-left: 1px;
  }
}
.special {
  line-height: 150px;
}
</style>