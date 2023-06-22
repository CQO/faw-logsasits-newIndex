<template>
  <div class="globalMonitoring">
    <div class="top_header">
      <div class="routerBtnClick">
        <div class="leftHeaderBg" @click="toHome"></div>
        <div class="coumn leftHeadeeOne" @click="toLosit">物流态势</div>
        <div class="coumn leftHeadeeTwo" @click="toGlobalMonitoring">
          全域监控
        </div>
        <div class="coumn leftHeadeeThree" @click="toMonitoring">全程监控</div>
      </div>
      <div class="">
        <span class="text" @click="toMonitoring"
          >全&nbsp;域&nbsp;监&nbsp;控</span
        >
      </div>
      <div class="">
        <div class="coumn rightNumOne" @click="toMapGuide">地图导视</div>
        <div class="coumn rightNumTwo" @click="toYcjk">异常监控</div>
        <div class="coumn rightNumThree" @click="toGeneralOverview">
          总体概况
        </div>
        <div class="rightNumFour" @click="toXqfx">辅助决策</div>
        <div class="rightfou" @click="toLogin"></div>
      </div>
    </div>
    <div class="contentMain">
      <div class="contentMainTop">
        <div class="contentMainTop_itema">
          <div
            class=""
            style="height: 540px"
            @click="toShowList"
            v-if="showMap"
          >
            <powerMap
              style="position: absolute; left: -800px; top: -50px"
            ></powerMap>
          </div>
          <div class="" v-if="showWzlxjkList">
            <div class="top_title" @click="toShowMap">
              <div class="taskChin">
                物&nbsp;资&nbsp;流&nbsp;向&nbsp;监&nbsp;控
              </div>
              <div class="taskEng"></div>
            </div>
            <div class="">
              <materialList></materialList>
            </div>
          </div>
        </div>
        <div class="" style="width: 50%">
          <div
            class="contentmaintop_itemtop"
            style="margin-left: 20px"
            @click="showWzjkDia"
          >
            <div class="top_title">
              <div class="taskChin">物&nbsp;资&nbsp;监&nbsp;控</div>
              <div class="taskEng"></div>
            </div>
            <div class="">
              <materialMonitoring></materialMonitoring>
            </div>
          </div>
          <div
            class="contentmaintop_itemBot"
            style="margin: 10px 0 0 20px; z-index: -1; height: 55%"
          >
            <div class="top_title">
              <div class="taskChin">运&nbsp;力&nbsp;分&nbsp;析</div>
              <div class="taskEng"></div>
            </div>
            <div class="capacity" @click="showYlfxDia">
              <div class="capacityItem">
                <div class="waihuan">
                  <glEchat></glEchat>
                </div>
                <div class="">公路</div>
              </div>
              <div class="capacityItem">
                <div class="waihuan" style="">
                  <tlEchart></tlEchart>
                </div>
                <div class="">铁路</div>
              </div>
              <div class="capacityItem">
                <div class="waihuan" style="">
                  <cyEchart></cyEchart>
                </div>
                <div class="">船运</div>
              </div>
              <div class="capacityItem">
                <div class="waihuan" style="">
                  <hkEchart></hkEchart>
                </div>
                <div class="">航空</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contentMainBottom">
        <div class="bottomItem" @click="showBzpcjkDia">
          <div class="top_title">
            <div class="taskChin">
              保&nbsp;障&nbsp;批&nbsp;次&nbsp;监&nbsp;控
            </div>
            <div class="taskEng"></div>
          </div>
          <div class="">
            <guaranteeMonitoring></guaranteeMonitoring>
          </div>
        </div>
        <div
          class="bottomItem"
          style="margin-left: 15px"
          @click="toShowJhjkDia"
        >
          <div class="top_title">
            <div class="taskChin">计&nbsp;划&nbsp;监&nbsp;控</div>
            <div class="taskEng"></div>
          </div>
          <div class="">
            <planMonitoring></planMonitoring>
          </div>
        </div>
        <div
          class="bottomItem"
          style="margin-left: 15px"
          @click="toShowDdjkDia"
        >
          <div class="top_title">
            <div class="taskChin">订&nbsp;单&nbsp;监&nbsp;控</div>
            <div class="taskEng"></div>
          </div>
          <div class="">
            <orderMonitor></orderMonitor>
            <!-- <batchMonitoring></batchMonitoring> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 保障批次监控 弹出框-->
    <div class="dialogClick" v-if="clickShowDiaBzpcjk">
      <div class="close" @click="hiddenDetail" style="">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
      </div>
      <div class="" style="height: 30px; text-align: center; padding-top: 10px">
        <span style="color: #fff">{{ dialogTitle }}</span>
      </div>
      <div class="tabTdList">
        <div class="" style="">
          <el-form>
            <el-row :gutter="40">
              <el-col :md="10">
                <el-form-item label="批次号">
                  <el-input
                    v-model="formBzpcjkValue.pch"
                    style="width: 80%"
                    placeholder="请输入批次号"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleBzpcjkSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
          <!-- <div class="titlehead">
                      <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                          <div class="cbycitemlaner">受供单位</div>
                      <div class="cbycitemlaner">发物单位</div>
                      <div class="cbycitemlaner">品名代码</div>
                      <div class="cbycitemlaner">物资品名</div>
                      <div class="cbycitemlaner">需求量</div>
                      <div class="cbycitemlaner">凭证号</div>
                      <div class="cbycitemlaner">凭证字</div>
                      <div class="cbycitemlaner">签发日期</div>
                      <div class="cbycitemlaner">批次号</div>
                      <div class="cbycitemlaner">状态</div>
                      </div>
              </div> -->
          <!-- <div class="mainLisy">
                  <div class="mainListItem" v-for="item in getBzpcjkData">
                      <div class="cbycitemlaner">{{item.receiveUnit }}</div>
                      <div class="cbycitemlaner contentOver" :title="item.pmdm">{{item.sendFromUnit}}</div>
                      <div class="cbycitemlaner contentOver" :title="item.wzpm">{{item.materialCode}}</div>
                      <div class="cbycitemlaner contentOver" :title="item.material">{{item.material}}</div>
                      <div class="cbycitemlaner">{{item.num}}</div>
                      <div class="cbycitemlaner contentOver" :title="item.pmdm">{{item.credentialCode}}</div>
                      <div class="cbycitemlaner contentOver" :title="item.wzpm">{{item.credential }}</div>
                      <div class="cbycitemlaner">{{item.signDate}}</div>
                      <div class="cbycitemlaner contentOver" :title="item.batchNo">{{item.batchNo}}</div>
                      <div class="cbycitemlaner">{{item.finStatus}}</div>
                  </div> -->
          <template>
            <el-table :data="getBzpcjkData" style="width: 100%">
              <el-table-column
                prop="receiveUnit"
                label="受供单位"
                width="510"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="sendFromUnit"
                label="发物单位"
                width="510"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="materialCode"
                label="品名代码"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="material"
                label="物资品名"
                :show-overflow-tooltip="true"
                width="510"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="num"
                label="需求量"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="credentialCode"
                label="凭证号"
                width="380"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="credential"
                label="凭证字"
                width="230"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="signDate"
                label="签发日期"
                width="230"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="batchNo"
                label="批次号"
                width="230"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="finStatus"
                label="状态"
                width="230"
                align="center"
              >
              </el-table-column>
            </el-table>
            <el-pagination
              class="pageAtion"
              background
              layout="prev, pager, next"
              :total="bzpcjkTotal"
              :page-size="7"
              @size-change="handleSizeBzpcjkChange"
              @current-change="handleCurrentBzpcjkChange"
            >
            </el-pagination>
          </template>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- 运力分析弹出框 -->
    <div class="dialogClick" v-if="clickShowDiaYlfx">
      <div class="close" @click="hiddenDetail" style="">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
      </div>
      <div class="" style="height: 30px; text-align: center; padding-top: 10px">
        <span style="color: #fff">{{ dialogTitle }}</span>
      </div>
      <div class="tabTdList">
        <div class="" style="">
          <el-form>
            <el-row :gutter="40">
              <el-col :md="8">
                <el-form-item label="运力企业">
                  <el-input
                    v-model="formYlfxValue.ylqy"
                    style="width: 60%"
                    placeholder="请输入运力企业"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="9">
                <el-form-item label="运输工具类型">
                  <el-select
                    style="z-index: 2555"
                    clearable
                    placeholder="请选择"
                    v-model="formYlfxValue.workType"
                    @change="currWorkTypeChange"
                  >
                    <el-option
                      style="z-index: 2555"
                      v-for="item in getTransportTypeList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleYlfxSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
          <!-- <div class="titlehead" style="margin-top: 30px;">
                    <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                        <div class="cbycitemlaner">运力企业</div>
                    <div class="cbycitemlaner">保障区域</div>
                    <div class="cbycitemlaner">运输方式分类</div>
                    <div class="cbycitemlaner">运输工具类型</div>
                    <div class="cbycitemlaner">运输工具数量</div>
                    <div class="cbycitemlaner">工具载重量</div>
                    <div class="cbycitemlaner">工具容积</div>
                    <div class="cbycitemlaner">运输物资情况</div>
                    </div>
            </div> -->
          <!-- <div class="mainLisy">
                <div class="mainListItem" v-for="item in getYlfxData">
                    <div class="cbycitemlaner">{{item.name }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.pmdm">{{item.transportArea}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.wzpm">{{item.transportTypeName}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.material">{{item.transportToolsType}}</div>
                    <div class="cbycitemlaner">{{item.transportQuantity}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.pmdm">{{item.transportDwc}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.wzpm">{{item.transportVolume }}</div>
                    <div class="cbycitemlaner">{{item.sl}}</div>
                </div> -->
          <template>
            <el-table :data="getYlfxData" style="width: 100%">
              <el-table-column
                prop="name"
                label="运力企业"
                :show-overflow-tooltip="true"
                width="460"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="transportArea"
                label="保障区域"
                width="480"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="transportTypeName"
                label="运输方式分类"
                width="380"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="transportToolsType"
                label="运输工具类型"
                width="260"
                :show-overflow-tooltip="true"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="transportQuantity"
                label="运输工具数量"
                width="380"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="transportDwc"
                label="工具载重量"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="transportVolume"
                label="工具容积"
                width="230"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="sl"
                label="运输物资情况"
                width="430"
                align="center"
              >
              </el-table-column>
            </el-table>
            <div class="pageAtion">
              <el-pagination
                class="pageAtion"
                background
                layout="prev, pager, next"
                :total="ylfxTotal"
                :page-size="7"
                @size-change="handleSizeYlfxChange"
                @current-change="handleCurrentYlfxChange"
              >
              </el-pagination>
            </div>
          </template>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- 物资监控弹出框 -->
    <div class="dialogClick" v-if="clickShowDiaWzjk">
      <div class="close" style="" @click="hiddenDetail">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
      </div>
      <div class="" style="height: 30px; text-align: center; padding-top: 10px">
        <span style="color: #fff">{{ dialogTitle }}</span>
      </div>
      <div class="tabTdList">
        <div class="" style="">
          <el-form>
            <el-row :gutter="40">
              <el-col :md="8">
                <el-form-item label="运单号">
                  <el-input
                    v-model="formWzjkValue.ydh"
                    style="width: 60%"
                    placeholder="请输入运单号"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="9">
                <el-form-item label="运单状态">
                  <el-select
                    style="z-index: 2555"
                    clearable
                    placeholder="请选择"
                    v-model="formWzjkValue.workType"
                    @change="currWorkTypeChange"
                  >
                    <el-option
                      style="z-index: 2555"
                      v-for="item in getTransportStatuList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleWzjkSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
          <!-- <div class="titlehead">
                  <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                      <div class="cbycitemlaner">运单号</div>
                  <div class="cbycitemlaner">寄件城市</div>
                  <div class="cbycitemlaner">派件城市</div>
                  <div class="cbycitemlaner">包裹数量</div>
                  <div class="cbycitemlaner">包装体积</div>
                  <div class="cbycitemlaner">包装重量</div>
                  <div class="cbycitemlaner">运输方式</div>
                  <div class="cbycitemlaner">运单状态</div>
                  <div class="cbycitemlaner">预计完成时间</div>
                  <div class="" style="width: 150px;">运单承接物流企业</div>
                  </div>
          </div> -->
          <!-- <div class="mainLisy">
              <div class="mainListItem" v-for="item in getWzjkData">
                  <div class="cbycitemlaner contentOver" :title="item.waybillNo">{{item.waybillNo }}</div>
                  <div class="cbycitemlaner contentOver" :title="item.sendCity">{{item.sendCity}}</div>
                  <div class="cbycitemlaner contentOver" :title="item.deliverCity">{{item.deliverCity}}</div>
                  <div class="cbycitemlaner contentOver" :title="item.packageCount">{{item.packageCount}}</div>
                  <div class="cbycitemlaner">{{item.packageVolume}}</div>
                  <div class="cbycitemlaner contentOver" :title="item.packageWeight">{{item.packageWeight}}</div>
                  <div class="cbycitemlaner contentOver" :title="item.transportTypeName">{{item.transportTypeName }}</div>
                  <div class="cbycitemlaner contentOver" :title="item.waybillStatusName">{{item.waybillStatusName }}</div>
                  <div class="cbycitemlaner contentOver" :title="item.expectFinTime">{{item.expectFinTime }}</div>
                  <div class=" contentOver"  style="width: 150px;" :title="item.businessCode">{{item.businessCode }}</div>
              </div> -->
          <template>
            <el-table :data="getWzjkData" style="width: 100%">
              <el-table-column
                prop="waybillNo"
                label="运单号"
                width="460"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="sendCity"
                label="寄件城市"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="deliverCity"
                label="派件城市"
                width="380"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="packageCount"
                label="包裹数量"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="packageVolume"
                label="包装体积"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="packageWeight"
                label="包装重量"
                width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="transportTypeName"
                label="运输方式"
                width="230"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="waybillStatusName"
                label="运单状态"
                width="230"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="expectFinTime"
                label="预计完成时间"
                width="430"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="businessCode"
                label="运单承接物流企业"
                width="430"
                align="center"
              >
              </el-table-column>
            </el-table>
            <el-pagination
              class="pageAtion"
              background
              layout="prev, pager, next"
              :total="wzjkTotal"
              :page-size="7"
              @size-change="handleSizeWzjkChange"
              @current-change="handleCurrentWzjkChange"
            >
            </el-pagination>
          </template>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- 计划监控弹框列表 -->
    <div class="dialogClick" v-if="showJhjkDia">
      <div class="close" @click="hiddenDetail" style="">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
      </div>
      <div class="" style="height: 30px; text-align: center; padding-top: 10px">
        <span style="color: #fff">{{ dialogTitle }}</span>
      </div>
      <div class="tabTdList">
        <div class="" style="">
          <jhjkDialog></jhjkDialog>
        </div>
      </div>
    </div>
    <!-- 订单监控弹框列表 -->
    <div class="dialogClick" v-if="showDdjkDia">
      <div class="close" @click="hiddenDetail" style="">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
      </div>
      <div class="" style="height: 30px; text-align: center; padding-top: 10px">
        <span style="color: #fff">{{ dialogTitle }}</span>
      </div>
      <div class="tabTdList">
        <div class="" style="">
          <ddjkDialog></ddjkDialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import gsap from "gsap";
import powerMap from "./powerMap";
import globalMonitoringAPI from "@/api/modules/globalMonitoring";
import materialList from "../../../views/bigscreen/globalMonitoring/component/materialList";
import materialMonitoring from "../../../views/bigscreen/globalMonitoring/component/materialMonitoring";
import guaranteeMonitoring from "../../../views/bigscreen/globalMonitoring/component/guaranteeMonitoring";
import planMonitoring from "../../../views/bigscreen/globalMonitoring/component/planMonitoring";
import orderMonitor from "../../../views/bigscreen/globalMonitoring/component/orderMonitor";
import jhjkDialog from "../../../views/bigscreen/globalMonitoring/component/jhjkDialog";
import ddjkDialog from "../../../views/bigscreen/globalMonitoring/component/ddjkDia";
import glEchat from './component/glEchat'
import tlEchart from './component/tlEchart'
import cyEchart from './component/cyEchart'
import hkEchart from './component/hkEchart'

export default {
  name: "globalMonitoring",
  computed: {
    ...mapGetters(["roles"]),
  },
  components: {
    materialList,
    materialMonitoring,
    guaranteeMonitoring,
    planMonitoring,
    orderMonitor,
    powerMap,
    jhjkDialog,
    ddjkDialog,
    glEchat,
    tlEchart,
    cyEchart,
    hkEchart
  },
  data() {
    return {
      getTransportTypeList: [
        {
          value: 1,
          name: "公路运输工具",
        },
        {
          value: 2,
          name: "铁路运输工具",
        },
        {
          value: 3,
          name: "航空运输工具",
        },
        {
          value: 4,
          name: "水路运输工具",
        },
      ],
      getTransportStatuList: [
        {
          value: 10,
          name: "已下单",
        },
        {
          value: 30,
          name: "仓库处理中",
        },
        {
          value: 50,
          name: "运输中",
        },
        {
          value: 70,
          name: "派送中",
        },
        {
          value: 75,
          name: "领取中",
        },
        {
          value: 80,
          name: "已签收",
        },
        {
          value: -1,
          name: "异常",
        },
      ],
      dialogTitle: "",
      clickShowDiaBzpcjk: false,
      showMap: false,
      showWzlxjkList: true,
      clickShowDiaYlfx: false,
      clickShowDiaWzjk: false,
      showDdjkDia: false,
      showJhjkDia: false,
      getBzpcjkData: [],
      getYlfxData: [],
      getWzjkData: [],
      bzpcjkTotal: 0,
      ylfxTotal: 0,
      formYlfxValue: {
        page: 1,
        pageSize: 7,
        ylqy: "",
        workType: "",
      },
      formWzjkValue: {
        page: 1,
        pageSize: 7,
        ydh: "",
        workType: "",
      },
      formBzpcjkValue: {
        page: 1,
        pageSize: 7,
        pch: "",
      },
      glData: "",
      tlData: "",
      cyData: "",
      hkData: "",
      showNumber: 0,
      number: 20,
    };
  },
  computed: {
    showConta() {
      return this.showNumber.toFixed(0);
    },
  },
  mounted() {
    gsap.to(this, {
      duration: 5,
      showNumber: this.number,
    });
  },
  watch: {
    number(newVal) {
      gsap.to(this, {
        duration: 5,
        showConta: newVal,
      });
    },
  },
  created() {
    this.getQyjkYlfxData();
    this.getUserData = this.$store.state.user.sidebar.roles;
    console.log(this.getUserData,'this.getUserData...........................')
  },
  methods: {
    toShowDdjkDia() {
      this.showDdjkDia = true;
      this.dialogTitle = "订单监控";
      this.showJhjkDia = false;
      this.clickShowDiaYlfx = false;
      this.clickShowDiaBzpcjk = false;
      this.clickShowDiaWzjk = false;
    },
    toShowJhjkDia() {
      this.showJhjkDia = true;
      this.dialogTitle = "计划监控";
      this.clickShowDiaYlfx = false;
      this.clickShowDiaBzpcjk = false;
      this.clickShowDiaWzjk = false;
    },
    toShowList() {
      this.showWzlxjkList = true;
      this.showMap = false;
    },
    toShowMap() {
      this.showMap = true;
      this.showWzlxjkList = false;
    },
    handleWzjkSearch() {
      (this.formWzjkValue.page = 1), this.showWzjkDia();
    },
    handleSizeWzjkChange(val) {
      this.formWzjkValue.pageSize = val;
      this.showWzjkDia();
    },
    handleCurrentWzjkChange(val) {
      (this.formWzjkValue.page = val), this.showWzjkDia();
    },
    showWzjkDia() {
      this.clickShowDiaWzjk = true;
      this.clickShowDiaBzpcjk = false;
      this.clickShowDiaYlfx = false;
      this.showJhjkDia = false;
      this.showDdjkDia = false;
      this.dialogTitle = "物资监控";
      let param = {
        page: this.formWzjkValue.page,
        pageSize: this.formWzjkValue.pageSize,
        m: {
          waybillNo: this.formWzjkValue.ydh,
          waybillStatus: this.formWzjkValue.workType,
        },
      };
      globalMonitoringAPI.getWzjkListData(param).then((res) => {
        this.getWzjkData = res.pd.rows;
        this.wzjkTotal = res.pd.total;
      });
    },
    currWorkTypeChange() {},
    handleYlfxSearch() {
      this.formYlfxValue.page = 1;
      this.showYlfxDia();
    },
    handleBzpcjkSearch() {
      this.formBzpcjkValue.page = 1;
      this.showBzpcjkDia();
    },
    handleSizeYlfxChange(val) {
      this.formYlfxValue.pageSize = val;
      this.showYlfxDia();
    },
    handleCurrentYlfxChange(val) {
      this.formYlfxValue.page = val;
      this.showYlfxDia();
    },
    handleSizeBzpcjkChange(val) {
      this.formBzpcjkValue.pageSize = val;
      this.showBzpcjkDia();
    },
    handleCurrentBzpcjkChange(val) {
      this.formBzpcjkValue.page = val;
      this.showBzpcjkDia();
    },
    showBzpcjkDia() {
      this.clickShowDiaBzpcjk = true;
      this.clickShowDiaWzjk = false;
      this.clickShowDiaYlfx = false;
      this.showJhjkDia = false;
      this.showDdjkDia = false;
      this.dialogTitle = "保障批次监控";
      let params = {
        page: this.formBzpcjkValue.page,
        pageSize: this.formBzpcjkValue.pageSize,
        m: {
          batchNo: this.formBzpcjkValue.pch,
        },
      };
      globalMonitoringAPI.getYBzpcjkListData(params).then((res) => {
        this.getBzpcjkData = res.pd.rows;
        this.bzpcjkTotal = res.pd.total;
      });
    },
    hiddenDetail() {
      this.clickShowDiaBzpcjk = false;
      this.clickShowDiaYlfx = false;
      this.formBzpcjkValue.pch = "";
      this.clickShowDiaWzjk = false;
      this.showJhjkDia = false;
      this.showDdjkDia = false;
    },
    showYlfxDia() {
      this.clickShowDiaYlfx = true;
      this.clickShowDiaBzpcjk = false;
      this.clickShowDiaWzjk = false;
      this.showJhjkDia = false;
      this.showDdjkDia = false;
      this.dialogTitle = "运力分析";
      let params = {
        page: this.formYlfxValue.page,
        pageSize: this.formYlfxValue.pageSize,
        m: {
          name: this.formYlfxValue.ylqy,
          transportToolsType: this.formYlfxValue.workType,
        },
      };
      globalMonitoringAPI.getYlfxListData(params).then((res) => {
        this.getYlfxData = res.pd.rows;
        this.ylfxTotal = res.pd.total;
      });
    },
    toLosit() {
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
    getQyjkYlfxData() {
      globalMonitoringAPI.getYlfxData({}).then((res) => {
        console.log(res, "全域监控-运力分析======================");
        this.glData = res.m.roadRate;
        this.tlData = res.m.railwayRate;
        this.cyData = res.m.shipRate;
        this.hkData = res.m.flightRate;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.globalMonitoring {
  height: 100%;
  width: 100%;
  background-image: url("../../../assets/image/homePage/mainBg.png");
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
  color: #fff;
  background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
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
}
.contentMain {
  height: 100%;
  padding: 30px;
  padding-bottom: 100px;
}
.contentMainTop {
  width: 100%;
  height: 600px;
  height: 60%;
  display: flex;
}
.contentMainBottom {
  width: 100%;
  height: 300px;
  height: 40%;
  display: flex;
  margin-top: 15px;
}
.contentMainTop_itema {
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: 49%;
}
.contentmaintop_itemtop {
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 43%;
  width: 100%;
}
.contentmaintop_itemBot {
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 55%;
  width: 100%;
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
.bottomItem {
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 35%;
}
.capacity {
  display: flex;
  justify-content: space-around;
  padding: 20px 50px;
}
.capacityItem {
  display: flex;
  flex-direction: column;
  text-align: center;
  div:nth-child(2) {
    font-size: 18px;
    color: #27cbff;
    margin-top: 20px;
  }
}
.waihuan {
  width: 120px;
  height: 120px;
  //background-image: url("../../../assets/image/globalMonitoring/wh.png");
  //background-size: 100% 100%;
  //background-repeat: no-repeat;
  position: relative;
  margin-right: 10px;
  z-index: 0;
  border: none !important;
  text-align: center;
}
.TheCircle {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: inset 0 0 15px #27cbff;
  margin: 12px 10px 0 0;
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
    top: 13px;
    right: 16px;
    z-index: 2001;
    color: #fff;
    font-size: 22px;
    text-align: center;
  }
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
  top: 6px;
  right: 10px;
  text-align: center;
  flex-direction: column;
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
.dialogClick {
  z-index: 211;
  position: absolute;
  top: 100px;
  bottom: 260px;
  left: 355px;
  width: 1065px;
  height: 80%;
  background-image: url("../../../assets/image/content/sliceList.png");
  background-size: 100% 100%;
  .close {
    position: absolute;
    //float: right;
    right: 20px;
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
  flex: 1;
  .itemlaner {
    flex: 1;
    text-align: center;
    margin-left: 1px;
  }
}
.cbycitemlaner {
  text-align: center;
  width: 10%;
  flex: 1;
}
.cbycitemlanera {
  text-align: center;
  width: 18.6%;
  flex: 1;
}
.contentOver {
  width: 16.6%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pageAtion {
  width: 100%;
  text-align: center;
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
::v-deep .el-table th.el-table__cell {
  background: #054480;
  color: #fff;
  border-bottom: 5px solid #112d82;
}
::v-deep .el-table td.el-table__cell {
  background: #094185;
  color: #fff;
  border-bottom: 1px solid #112d82;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  border-top: 1px solid #01ffff;
  border-bottom: 1px solid #01ffff;
  background: #094185 !important;
  //box-shadow: 0 0 15px #386fcf inset;

  /* color: #f19944; */

  /* 设置文字颜色，可以选择不设置 */
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td:first-child {
  border-left: 1px solid #01ffff;

  /* color: #f19944; */

  /* 设置文字颜色，可以选择不设置 */
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover {
  box-shadow: 0 0 15px #386fcf !important;
  //border-image: linear-gradient(to right bottom, #4636ff, #00e0ff) 1 10;
  & > td {
    background-color: #094185 !important;
  }
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td:last-child {
  border-right: 1px solid #01ffff;

  /* color: #f19944; */

  /* 设置文字颜色，可以选择不设置 */
}
</style>