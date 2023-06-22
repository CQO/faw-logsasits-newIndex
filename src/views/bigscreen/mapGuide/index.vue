<template>
  <div class="powerDeployment">
    <div class="routerBtnClick">
      <div class="leftHeaderBg" @click.stop="toHome"></div>
      <div class="coumn leftHeadeeOne" @click="toLogista">物流态势</div>
      <div class="coumn leftHeadeeTwo" @click="toGlobalMonitoring">
        全域监控
      </div>
      <div class="coumn leftHeadeeThree" @click="toMonitoring">全程监控</div>
    </div>
    <div class="top_header">
      <span class="text" @click="toSituation">地&nbsp;图&nbsp;导&nbsp;视</span>
    </div>
    <div class="">
      <div class="coumn rightNumOne">地图导视</div>
      <div class="coumn rightNumTwo" @click="toYcjk">异常监控</div>
      <div class="coumn rightNumThree" @click="toGeneralOverview">总体概况</div>
      <div class="rightNumFour" @click="toXqfx">辅助决策</div>
      <div class="rightfou" @click="toLogin"></div>
    </div>
    <div class="content_main">
      <div class="center_content" style="">
        <div
          class=""
          style="
            position: relative;
            display: flex;
            margin: 20px 37%;
            z-index: 0;
          "
        >
          <div :class="titleType" @click="warZone" id="warZone">战区</div>
          <div :class="titleType" @click="showForceType" id="showForceType">
            省份
          </div>
          <div :class="titleType" @click="showBaseType" id="showBaseType">
            运单
          </div>
        </div>
        <powerMap
          v-if="showPowerMap"
          style="width: 100%; height: 100%; position: relative; z-index: 0"
          @map-click="mapClick"
        ></powerMap>
        <guide-province
          v-if="showProvince"
          style="width: 100%; height: 100%; position: relative; z-index: 0"
          @map-click="mapClick"
        />
        <guideZoneMap
          v-if="showYdMap"
          ref="zoneMap"
          style="width: 100%; height: 100%; position: relative; z-index: 0"
          @map-click="mapLineClick"
        ></guideZoneMap>
      </div>
      <div class="left_contentc">
        <div class="detalList" v-if="toYunDan">
          <div
            class="completionrate"
            style="padding-top: 20px; margin-left: 10px"
            @click="showDetail"
          >
            <div class="taskChin">运&nbsp;单&nbsp;查&nbsp;询</div>
            <div class="taskEng"></div>
          </div>
          <img
            src="../../../assets/image/content/close.png"
            class="closeBtn"
            @click="closeBtn"
            alt=""
          />
          <rightTab :name="name" :type="type" v-if="showRightTab" />
          <wayBill ref="waybill" @get-waybill="getWaybill" v-if="showWaybill" />
        </div>

        <!-- <div class="detalList">
                    <img src="../../../assets/image/content/close.png" class="closeBtn" @click="hideWaybill" alt="">
                    <wayBill ref="waybill" @get-waybill="getWaybill"/>
                </div> -->
      </div>
      <div class="wrap">
        <span id="img"></span>
        <!-- <el-input v-show="showInput" v-model="keyWord" @keyup.enter.native="toSearch" type="text"
                          placeholder="输入内容" class="input_a">
                    <i slot="suffix" @click="toSearch" class="el-input__icon el-icon-search"
                       style="color: #01ffff; font-size: 18px; margin-right: 5px;"></i>
                </el-input> -->
      </div>
      <!-- <img src="../../../assets/map/search.png" style="position: absolute; right: 20px; width: 20px; height: 20px; z-index: 2010;" alt=""> -->
      <!-- <el-drawer :modal='false' style="position: absolute; z-index: 2005;" :visible.sync="drawer"
                       :with-header="false"> -->
      <div class="right_content">
        <div class="detailInformation" v-for="item in houseData">
          <div class="completionrate">
            <div class="taskChin">库&nbsp;存&nbsp;分&nbsp;布</div>
            <div class="taskEng"></div>
          </div>
          <div class="warehouse">
            <div class="nr">
              <img
                src="@/assets/image/content/warehouse.png"
                style="width: 25px"
                alt=""
              />
              <span class="numData" style="font-size: 12px">仓库</span>
            </div>
            <div class="right">
              <div class="nr">
                <span class="titName">总数(个)</span>
                <span class="numData">{{ item.num }}</span>
              </div>
              <div class="nr">
                <span class="titName">总面积(平方米)</span>
                <span class="numData">{{
                  Number(item.floorArea).toLocaleString()
                }}</span>
              </div>
            </div>
          </div>
          <div class="inventory warehouse">
            <div class="nr">
              <img
                src="@/assets/image/content/inventory.png"
                style="width: 25px"
                alt=""
              />
              <span class="numData" style="font-size: 12px">库存</span>
            </div>
            <div class="right">
              <div class="nr">
                <span class="titName">库容能力(万件)</span>
                <span class="numData">{{
                  Number(item.total).toLocaleString()
                }}</span>
              </div>
              <div class="nr">
                <span class="titName">实时库容(万件)</span>
                <span class="numData">{{
                  Number(item.surplus).toLocaleString()
                }}</span>
              </div>
            </div>
          </div>
          <div class="distribution warehouse">
            <div class="nr">
              <img
                src="@/assets/image/content/distribution.png"
                style="width: 25px"
                alt=""
              />
              <span class="numData" style="font-size: 12px">配送</span>
            </div>
            <div class="">
              <div class="" style="display: flex; flex-direction: column">
                <!-- <span class="titName">配送企业</span> -->
                <!-- <span class="numData">京东物流</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="right_content" style="position: absolute; top: 180px; right: 45px; width: 21%;">
                <div class="detailInformation">
                    <div class="detcmd">
                        <div class="mdItem" style="padding-bottom: 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                            <div class="">
                                 <img src="../../../assets/image/content/yd.png"
                                style="width: 25px; flex: 1;"
                                alt="">
                            </div>
                            <div class="" style="flex: 3; display: flex; justify-content: space-around;">
                               <div class="">
                               本月已完成运单量
                            </div>
                            <div class="">
                                <span class="numSty" style="padding-right: 20px;">295</span>
                            </div>
                            </div>
                        </div>
                        <div class="mdItems" style="margin-top: 25px;">
                            <div class="">
                                 <img src=""
                                style="width: 25px; flex: 1;"
                                alt="">
                            </div>
                            <div class="" style="flex: 3; display: flex; justify-content: space-around;">
                                <div class="stelll">
                               <div class="">仓库处理中(件)</div>
                               <div class=""><span class="numSty">0</span></div>
                            </div>
                            <div class="stelll">
                                <div class="">运输中(件)</div>
                                <div class=""><span class="numSty">33</span></div>
                            </div>
                            </div>
                        </div>
                        <div class="mdItems" style="margin-top: 35px;">
                            <div class="">
                                 <img src=""
                                style="width: 25px; flex: 1;"
                                alt="">
                            </div>
                             <div class="" style="flex: 2; display: flex; justify-content: space-around; padding-bottom: 25px; padding-left: 18px;">
                                 <div class="stelll" style="flex: 1;">
                               <div class="">派送中(件)</div>
                               <div class=""><span class="numSty">0</span></div>
                            </div>
                            <div class="stelll" style="flex: 1; padding-left: 20px;">
                                <div class="">领取中(件)</div>
                                <div class=""><span class="numSty">1</span></div>
                            </div>
                             </div>
                        </div>
                    </div>
                </div>

            </div> -->
      <div class="right_content">
        <div class="detailInformation" v-for="item in houseData">
          <div class="completionrate">
            <div class="taskChin">库&nbsp;存&nbsp;分&nbsp;布</div>
            <div class="taskEng"></div>
          </div>
          <div class="warehouse">
            <div class="nr">
              <img
                src="@/assets/image/content/warehouse.png"
                style="width: 25px"
                alt=""
              />
              <span class="numData" style="font-size: 12px">仓库</span>
            </div>
            <div class="right">
              <div class="nr">
                <span class="titName">总数(个)</span>
                <span class="numData">{{ item.num }}</span>
              </div>
              <div class="nr">
                <span class="titName">总面积(平方米)</span>
                <span class="numData">{{
                  Number(item.floorArea).toLocaleString()
                }}</span>
              </div>
            </div>
          </div>
          <div class="inventory warehouse">
            <div class="nr">
              <img
                src="@/assets/image/content/inventory.png"
                style="width: 25px"
                alt=""
              />
              <span class="numData" style="font-size: 12px">库存</span>
            </div>
            <div class="right">
              <div class="nr">
                <span class="titName">库容能力(万件)</span>
                <span class="numData">{{
                  Number(item.total).toLocaleString()
                }}</span>
              </div>
              <div class="nr">
                <span class="titName">实时库容(万件)</span>
                <span class="numData">{{
                  Number(item.surplus).toLocaleString()
                }}</span>
              </div>
            </div>
          </div>
          <div class="distribution warehouse">
            <div class="nr">
              <img
                src="@/assets/image/content/distribution.png"
                style="width: 25px"
                alt=""
              />
              <span class="numData" style="font-size: 12px">配送</span>
            </div>
            <div class="">
              <div class="" style="display: flex; flex-direction: column">
                <span class="titName">配送企业</span>
                <span class="numData">{{ item.psqy }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="wareLayout">
          <div class="completionrate" style="padding-bottom: 20px">
            <div class="taskChin">仓&nbsp;库&nbsp;布&nbsp;局</div>
            <div class="taskEng"></div>
          </div>
          <img
            src="@/assets/image/content/close.png"
            class="closeBtn"
            @click="closeBtn"
            alt=""
          />
          <!--<leftTab :war-zone="warZoneName2"/>-->
          <div class="hedContainer">
            <div class="maincont">
              <div class="hedTit">
                <div class="mcon">类型</div>
                <div class="mcon">数量(个)</div>
              </div>
              <div class="contMain" style="width: 96%">
                <div class="contInner" :style="{ top: tableTop + 'px' }">
                  <div v-for="(item, index) in tableList" :key="index">
                    <div
                      class="contData"
                      @mouseover="onHover"
                      @mouseout="onLeave"
                    >
                      <div class="intel">{{ item.type }}</div>
                      <div class="intel">{{ item.num }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="guide"></div>
      <div class="conteBo" v-if="noneClick">
        <div class="left_top" style="width: 25%" @click="toShowWtzs">
          <div
            class="completionrate"
            style="display: flex; padding-bottom: 20px"
          >
            <div class="taskChin">问题追溯</div>
            <div class="taskEng"></div>
          </div>
          <div style="height: 100%">
            <!-- <LogisticsSituation /> -->
            <OrderMonitor></OrderMonitor>
          </div>
        </div>
        <div class="center_top">
          <div class="center_half" @click="toShowCcjk">
            <div class="completionrate" style="padding-bottom: 20px">
              <div class="taskChin">仓 储 监 控</div>
              <div class="taskEng"></div>
            </div>
            <div>
              <WarehouseMonitor />
            </div>
          </div>
          <div class="center_half" @click="toShowSbjk">
            <div class="completionrate" style="padding-bottom: 20px">
              <div class="taskChin">设 备 监 控</div>
              <div class="taskEng"></div>
            </div>
            <div>
              <EquipmentMonitor />
            </div>
          </div>
        </div>
        <div class="left_top" style="width: 25%">
          <div class="completionrate">
            <div class="taskChin">计&nbsp;划&nbsp;监&nbsp;控</div>
            <div class="taskEng"></div>
          </div>
          <div class="planMain" @click="showJhsljhDia">
            <div class="">
              <div class="planTop">
                <div class="topLeft">
                  <img
                    src="../../../assets/image/homePage/planOne.png"
                    alt=""
                  />
                </div>
                <div class="topRigth">
                  <p>
                    精确申领计划(万件)：
                    <span class="topNum">
                      <animate-number
                        from="1"
                        :to="this.jqsljh"
                        :key="this.jqsljh"
                      ></animate-number>
                    </span>
                  </p>
                  <p>
                    已完成(万件)：
                    <span class="topNum">
                      <animate-number
                        from="1"
                        :to="this.jswcs"
                        :key="this.jswcs"
                      ></animate-number>
                    </span>
                  </p>
                </div>
              </div>
              <div class="planTop">
                <div class="topLeft">
                  <img
                    src="../../../assets/image/homePage/planTwo.png"
                    alt=""
                  />
                </div>
                <div class="topRigth">
                  <p>
                    发物计划(万件)：
                    <span class="bottNum">
                      <animate-number
                        from="1"
                        :to="this.fwjh"
                        :key="this.fwjh"
                      ></animate-number>
                    </span>
                  </p>
                  <p>
                    已完成(万件)：
                    <span class="bottNum">
                      <animate-number
                        from="1"
                        :to="this.fwwcs"
                        :key="this.fwwcs"
                      ></animate-number>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomTab" v-if="clickYd">
        <div class="close" @click="hiddenDetail">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
        </div>
        <div class="headerTitl">运单监控</div>
        <div class="tabList">
          <tabList
            :wayBillNo="this.getWayBillNo"
            @passParam="getParam"
          ></tabList>
        </div>
      </div>
      <div class="teSlice">
        <!-- <img src="../../assets/image/content/teSlice.png" alt="" /> -->
      </div>
      <!-- 问题追溯tab弹出框 -->
      <div class="dialogClick" v-if="showWtzsDia">
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
            <wtzsdialog></wtzsdialog>
          </div>
        </div>
      </div>
      <!-- 仓库监控tab弹出框 -->
      <div
        class="dialogClick"
        v-if="showCkjkDia"
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
            <ckjkdialog></ckjkdialog>
          </div>
        </div>
      </div>
      <!-- 设备监控tab弹出框 -->
      <div
        class="dialogClick"
        v-if="showSbjkDia"
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
            <sbjkdialog></sbjkdialog>
          </div>
        </div>
      </div>
      <!--计划（精申）监控tab弹出框 -->
      <div
        class="dialogClick"
        v-if="showJhjsDia"
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
            <jhJsdialog></jhJsdialog>
          </div>
        </div>
      </div>
      <!--计划（计划）监控tab弹出框 -->
      <div
        class="dialogClick"
        v-if="this.showJhjhDia"
        style="height: 60%; bottom: 240px"
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
        <div v-if="this.temoOne"  style="padding:30px">
          <el-form style="margin-right: 60px">
            <el-row :gutter="40">
              <el-col :md="10">
                <el-form-item label="批号">
                  <el-input
                    v-model="formJsValue.ph"
                    style="width: 80%"
                    placeholder="请输入批号"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="10">
                <el-form-item label="品名">
                  <el-input
                    v-model="formJsValue.pm"
                    style="width: 80%"
                    placeholder="请输入品名"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="4" style="display:flex">
                <div class="btnSty" @click="handleJhSearch">查询</div>
                <div class="btnSty" style="margin-left:10px" @click="handleBefoNext">返回</div>
              </el-col>
            </el-row>
          </el-form>
          <div class="tabTdList">
            <div class="">
              <!-- <jhJhdialog></jhJhdialog> -->
              <div class="titlehead">
                <div class="" style="margin-left: 1px; flex: 1; display: flex">
                  <div class="cbycitemlaner">发物单位</div>
                  <div class="cbycitemlaner">收物单位</div>
                  <div class="cbycitemlaner">签发日期</div>
                  <div class="cbycitemlaner">品名代码</div>
                  <div class="cbycitemlaner">品名</div>
                  <div class="cbycitemlaner">数量</div>
                  <div class="cbycitemlaner">批号</div>
                </div>
              </div>
              <div class="mainLisy">
                <div class="mainListItem" v-for="item in getJhData">
                  <div class="cbycitemlaner">{{ item.sendFromUnit }}</div>
                  <div
                    class="cbycitemlaner contentOver"
                    :title="item.recipientUnit"
                  >
                    {{ item.recipientUnit }}
                  </div>
                  <div class="cbycitemlaner contentOver" :title="item.signDate">
                    {{ item.signDate }}
                  </div>
                  <div
                    class="cbycitemlaner contentOver"
                    :title="item.materialCode"
                  >
                    {{ item.materialCode }}
                  </div>
                  <div class="cbycitemlaner">{{ item.material }}</div>
                  <div class="cbycitemlaner contentOver" :title="item.num">
                    {{ item.num }}
                  </div>
                  <div class="cbycitemlaner contentOver" :title="item.batchNo">
                    {{ item.batchNo }}
                  </div>
                </div>
                <el-pagination
                  class="pageAtion"
                  background
                  layout="prev, pager, next"
                  :total="jhTotal"
                  :page-size="9"
                  @size-change="handleSizeJhChange"
                  @current-change="handleCurrentJhChange"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div style="padding:30px" v-if="this.tempTwo">
          <div class="titlehead">
                  <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                      <div class="cbycitemlaner">联保中心</div>
                  <div class="cbycitemlaner">精确申领计划</div>
                  <div class="cbycitemlaner">精确申领已完成</div>
                  <div class="cbycitemlaner">发物计划</div>
                  <div class="cbycitemlaner">发物已完成</div>
                  </div>
          </div>
          <div class="mainLisy">
              <div class="mainListItem" v-for="item in getJhCenterData">
                  <div class="cbycitemlaner">{{item.center }}</div>
                  <div class="cbycitemlaner contentOver text-decoration" :title="item.jss" @click="toShowDetailInfor(item,'js')">{{item.jss}}</div>
                  <div class="cbycitemlaner contentOver text-decoration" :title="item.jswcs" @click="toShowDetailInfor(item,'js')">{{item.jswcs}}</div>
                  <div class="cbycitemlaner contentOver text-decoration" :title="item.fws" @click="toShowFwPlan(item,'js')">{{item.fws}}</div>
                  <div class="cbycitemlaner text-decoration" @click="toShowFwPlan(item,'js')">{{item.fwwcs}}</div>
              </div>
          </div>
      </div>
      <!-- 精申列表A -->
      <div style="padding:30px" v-if="this.three">
        <div style="display:flex;justify-content: space-between;" class="topForm">
        <el-form style="margin-right: 60px;margin-top:30px" label-width="70px">
          <el-row :gutter="40">
            <el-col :md="10">
              <el-form-item label="订单号">
                <el-input v-model="formJsValue.ddh" style="width: 80%;" placeholder="请输入订单号"/>
              </el-form-item>
            </el-col>
            <el-col :md="10">
              <el-form-item label="状态">
                <el-select style="z-index: 3000;" clearable="" placeholder="请选择" v-model="formJsValue.jsStatus" @change="currWorkTypeChange">
                  <el-option
                    v-for="item in this.jsStatusList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="4" style="display:flex">
              <div class="btnSty" @click="handleJsSearch">查询</div>
              <div class="btnSty" style="margin-left:10px" @click="handleBefoNext">返回</div>
            </el-col>
          </el-row>
        </el-form>
      </div>
        <div class="titlehead">
          <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
              <div class="cbycitemlaner">发物单位代码</div>
          <div class="cbycitemlaner">单位代码</div>
          <div class="cbycitemlaner">订单号</div>
          <div class="cbycitemlaner">品名代码</div>
          <div class="cbycitemlaner">物资品名</div>
          <div class="cbycitemlaner">数量</div>
          <div class="cbycitemlaner">状态</div>
          </div>
        </div>
        <div class="mainLisy">
      <div class="mainListItem" v-for="item in getJsData">
          <div class="cbycitemlaner">{{item.fwdwdm }}</div>
          <div class="cbycitemlaner contentOver" :title="item.dwdm">{{item.dwdm}}</div>
          <div class="cbycitemlaner contentOver" :title="item.orderno">{{item.orderno}}</div>
          <div class="cbycitemlaner contentOver" :title="item.pmdm">{{item.pmdm}}</div>
          <div class="cbycitemlaner contentOver">{{item.wzpm}}</div>
          <div class="cbycitemlaner contentOver" :title="item.pmsl">{{item.pmsl}}</div>
          <div class="cbycitemlaner contentOver" :title="item.type">{{item.type }}</div>
      </div>
      <el-pagination
      class="pageAtion"
background
layout="prev, pager, next"
:total="jsTotal"
:page-size="9"
@size-change="handleSizeJsChange" @current-change="handleCurrentJsChange">
</el-pagination>
  </div>
      </div>
      </div>
      <!-- 运单二级 -->
      <div class="dialogClicka" style="" v-if="this.clickShowDiaYdEj">
        <div class="closea" @click="hiddenDetaila">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="" />
        </div>
        <div class="" style="margin-top: 40px; padding: 0 90px">
          <div style="color: #fff; font-size: 22px">
            运单编号：{{ this.sonParam.row.waybillNo }}
          </div>
          <template>
            <el-table :data="getYdEjData" style="width: 100%; margin-top: 20px">
              <el-table-column
                prop="idxNum"
                label="序号"
                width="70"
                fixed="left"
                :show-overflow-tooltip="true"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="waybillNo"
                label="运单号"
                width="260"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="time"
                label="发生时间"
                width="260"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="msg"
                label="运单信息"
                fixed="right"
                :show-overflow-tooltip="true"
                align="center"
              >
              </el-table-column>
            </el-table>
            <el-pagination
              class="pageAtion"
              style="margin-top: 20px"
              background
              layout="prev, pager, next"
              :total="ydEjTotal"
              @size-change="handleSizeYdEjChange"
              @current-change="handleCurrentYdEjChange"
            >
            </el-pagination>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getPlanMonitorDataApi from "@/api/modules/homePage";
import { mapGetters } from "vuex";
import gsap from "gsap";
import leftTab from "@/views/bigscreen/components/leftTab.vue";
import rightTab from "@/views/bigscreen/components/rightTab.vue";
import powerMap from "./powerMap";
import wayBill from "./components/Waybill.vue";
import guideZoneMap from "../map/guideZoneMap.vue";
import guideProvince from "../map/guideProvince";
import mapGuide from "@/api/modules/mapGuide";
import punctSys from "../homePage/components/punctSys.vue";
import EquipmentMonitor from "../homePage/components/EquipmentMonitor";
import LogisticsSituation from "../homePage/components/LogisticsSituation";
import WarehouseMonitor from "../homePage/components/WarehouseMonitor";
import OrderMonitor from "./components/OrderMonitor";
import tabList from "./components/tabList";
import wtzsdialog from "./components/wtzsDialog";
import ckjkdialog from "./components/ckjkdialog";
import sbjkdialog from "./components/sbjkdialog";
import jhJsdialog from "./components/jhJsdialog";
import jhJhdialog from "./components/jhJhdialog";

export default {
  name: "mapGuide",
  computed: {
    ...mapGetters(["roles"]),
  },
  components: {
    leftTab,
    rightTab,
    powerMap,
    guideZoneMap,
    guideProvince,
    wayBill,
    punctSys,
    EquipmentMonitor,
    LogisticsSituation,
    WarehouseMonitor,
    OrderMonitor,
    tabList,
    wtzsdialog,
    ckjkdialog,
    sbjkdialog,
    jhJsdialog,
    jhJhdialog,
  },
  data() {
    return {
      temoOne:false,
      temoTwo:false,
      three:false,
      getJhCenterData:[],
      paramCenteValue:'',
      getJsData: [],
      jhTotal: 0,
      getJhData: [],
      formJsValue: {
        page: 1,
        pageSize: 9,
        ddh: "",
        jsStatus: "",
        ph: "",
        pm: "",
      },
      sonParam: "",
      formforms: {
        page: 1,
        pageSize: 9,
      },
      getYdEjData: [],
      ydEjTotal: 0,
      getWayBillNo: "",
      toYunDan: false,
      jqsljh: "",
      jswcs: "",
      fwjh: "",
      fwwcs: "",
      clickShowDiaYdEj: false,
      showWtzsDia: false,
      showCkjkDia: false,
      showSbjkDia: false,
      showJhjsDia: false,
      showJhjhDia: false,
      numTotal: "",
      floorArea: "",
      krTotal: "",
      surplus: "",
      psqy: "",
      detailList: true,
      titleType: true,
      data: "",
      titleType: ["titleType" ? "titleType" : "showHide"],
      drawer: false,
      ydList: false,
      showPowerMap: true,
      showInput: false,
      showRightTab: false,
      showProvince: false,
      showYdMap: false,
      houseData: [],
      certificateData: [],
      name: "",
      type: "",
      waybillList: [],
      showWaybill: false,
      keyWord: "",
      interval: null,
      tableList: [],
      tableTop: 0,
      tableTimer: null,
      count: 0,
      noneClick: true,
      clickYd: false,
      showNumber: 0,
      number: 500,
      jsStatusList:[],
      getStatusList: [
        {
          value: "0",
          name: "未下发",
        },
        {
          value: "1",
          name: "已下发",
        },
        {
          value: "2",
          name: "已提货",
        },
        {
          value: "3",
          name: "已入库",
        },
        {
          value: "4",
          name: "出库中",
        },
        {
          value: "5",
          name: "已出库",
        },
        {
          value: "6",
          name: "运输中",
        },
        {
          value: "7",
          name: "派送中",
        },
        {
          value: "8",
          name: "已签收",
        },
        {
          value: "-1",
          name: "异常",
        },
      ],
    };
  },
  computed: {
    showCounter() {
      return this.showNumber.toFixed(0);
    },
  },
  mounted() {
    document.getElementById("warZone").className = "showHide";
  },
  created() {
    this.getStatuJs()
    this.getUserData = this.$store.state.user.sidebar.roles;
    this.getData();
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
  destroyed() {
    this.clearInter();
  },
  methods: {
    handleBefoNext(){
      this.tempTwo = true;
      this.temoOne = false;
      this.three = false;
    },
    toShowFwPlan(item) {
      this.paramCenteValue=item.center
      this.toParamsPlan()
    },
    toParamsPlan(){
      this.tempTwo = false;
      this.temoOne = true;
      this.three = false;
      let params = {
        page: this.formJsValue.page,
        pageSize: this.formJsValue.pageSize,
        m: {
          batchno: this.formJsValue.ph,
          material: this.formJsValue.pm,
          center: this.paramCenteValue,
          year: sessionStorage.getItem('year'),
        },
      };
      getPlanMonitorDataApi.getPlanJhListData(params).then((res) => {
        this.getJhData = res.pd.rows;
        this.jhTotal = res.pd.total;
      });
    },
    getStatuJs(){
      getPlanMonitorDataApi.getJsStatuData({}).then(response=>{
        this.jsStatusList=response.list
      })
    },
    handleJsSearch() {
      this.formJsValue.page = 1;
      this.showJqsljhDia();
    },
    toShowDetailInfor(item, name) {
      this.paramCenteValue=item.center
      this.showJqsljhDia()
    },
    handleSizeJsChange(val) {
      this.formJsValue.pageSize = val;
      this.showJqsljhDia();
    },
    handleCurrentJsChange(val) {
      this.formJsValue.page = val;
      this.showJqsljhDia();
    },
    showJqsljhDia(){
      this.tempTwo = false;
      this.three = true;
      this.temoOne = false;
      let params = {
        page: this.formJsValue.page,
        pageSize: this.formJsValue.pageSize,
        m: {
          orderno: this.formJsValue.ddh,
          type: this.formJsValue.jsStatus,
          center: this.paramCenteValue,
          year: sessionStorage.getItem('year'),
        },
      };
      getPlanMonitorDataApi.getPlanJsListData(params).then((res) => {
        this.getJsData = res.pd.rows;
        this.jsTotal = res.pd.total;
      })
    },
    toShowJsParam(){
      this.tempTwo = false;
      this.three = true;
      this.temoOne = false;
      this.showJqsljhDia()
    },
    handleSizeJhChange(val) {
      this.formJsValue.pageSize = val;
      this.showJhsljhDia();
    },
    handleCurrentJhChange(val) {
      this.formJsValue.page = val;
      this.toParamsPlan();
    },
    // 计划监控列表条件查询
    handleJhSearch() {
      this.formJsValue.page = 1;
      this.toParamsPlan();
    },
    toParamsPlan() {
      this.tempTwo = false;
      this.temoOne = true;
      this.three = false;
      let params = {
        page: this.formJsValue.page,
        pageSize: this.formJsValue.pageSize,
        m: {
          batchno: this.formJsValue.ph,
          material: this.formJsValue.pm,
          center: this.paramCenteValue,
          year: sessionStorage.getItem("year"),
        },
      };
      getPlanMonitorDataApi.getPlanJhListData(params).then((res) => {
        this.getJhData = res.pd.rows;
        this.jhTotal = res.pd.total;
      });
    },
    getParam(param) {
      // 4. 用getParam方法处理子组件传递过来的数据
      this.sonParam = param;
      this.clickShowDiaYdEj = true;
      this.toDyDia();
    },
    toDyDia() {
      let params = {
        page: this.formforms.page,
        pageSize: this.formforms.pageSize,
        m: {
          waybillNo: this.sonParam.row.waybillNo,
          // waybillNo:'SF1370604096126'
        },
      };
      getPlanMonitorDataApi.getYdEjData(params).then((res) => {
        this.getYdEjData = res.pd.rows;
        this.ydEjTotal = res.pd.total;
      });
    },
    showJhsljhDia() {
      this.showJhjhDia = true;
      this.tempTwo=true
      this.three = false;
      this.temoOne = false;
      this.dialogTitle = "计划监控";
      this.showWtzsDia = false;
      this.showCkjkDia = false;
      this.showSbjkDia = false;
      this.showJhjsDia = false;
      // this.toParamsPlan();
      let param = {
        m: {
          year: sessionStorage.getItem('year'),
        },
      };
      getPlanMonitorDataApi.tiPlanCenter(param).then((response) => {
        this.getJhCenterData = response;
      });
    },
    toShowSbjk() {
      this.showSbjkDia = true;
      this.dialogTitle = "设备监控";
      this.showWtzsDia = false;
      this.showCkjkDia = false;
      this.showJhjsDia = false;
      this.showJhjhDia = false;
    },
    toShowCcjk() {
      this.showCkjkDia = true;
      this.dialogTitle = "仓储监控";
      this.showWtzsDia = false;
      this.showSbjkDia = false;
      this.showJhjsDia = false;
      this.showJhjhDia = false;
    },
    toShowWtzs() {
      this.showWtzsDia = true;
      this.dialogTitle = "问题追溯";
      this.showCkjkDia = false;
      this.showSbjkDia = false;
      this.showJhjsDia = false;
      this.showJhjhDia = false;
    },
    toHome() {
      this.$router.push("/homepage");
    },
    toGlobalMonitoring() {
      //全域监控
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
      //全程监控

      if (this.getUserData.includes("130")) {
        this.$router.push("/monitoring");
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
    toLogista() {
      //物流态势
      if (this.getUserData.includes("128")) {
        this.$router.push("/logisticsSituation");
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
    hiddenDetail() {
      this.showJhjhDia=false
      this.noneClick = true;
      this.clickYd = false;
      this.showWtzsDia = false;
      this.showCkjkDia = false;
      this.showSbjkDia = false;
      this.showJhjsDia = false;
    },
    hiddenDetaila() {
      this.clickShowDiaYdEj = false;
    },
    showDetail() {
      this.noneClick = false;
      //   this.clickYd=true
    },
    getData() {
      mapGuide.getPlanplanData({}).then((res) => {
        console.log(res, "resssssssss计划监控数据uuuuuu");
        this.jqsljh = res.m.jstotal;
        this.jswcs = res.m.jswcnum;
        this.fwjh = res.m.jhtotal;
        this.fwwcs = res.m.jhwcnum;
      });
      let list = [];
      for (let i = 0; i < 4; i++) {
        list.push({
          type: `单位类型${i + 1}`,
          num: "100",
          name: "单位名称",
          code: "dw000123",
          reson: "王妮娜",
          phone: "16988564523",
          mask: "正常",
        });
      }
      let rigtData = [];
      for (let i = 0; i < 4; i++) {
        rigtData.push({
          level: `${i + 1}级`,
          type: `单位类型${i + 1}`,
          name: "单位名称",
          code: "dw000123",
          reason: "王妮娜",
          mask: "正常",
        });
      }
      mapGuide.getCkbjData({}).then((res) => {
        this.tableList = res.list;
      });
      this.rigtTabData = rigtData;
      // this.tableList = list
      this.tableActionFun();
    },
    tableActionFun() {
      this.tableListSize = this.tableList.length;
      if (this.tableListSize > 6) {
        this.tableList = this.tableList.concat(this.tableList);
        this.tableTimerFun();
      }
    },

    tableTimerFun() {
      this.count = 0;
      this.tableTimer = setInterval(() => {
        if (this.count < (this.tableList.length / 2) * 15) {
          this.tableTop -= 1;
          this.count++;
        } else {
          this.count = 0;
          this.tableTop = 0;
        }
      }, 100);
    },
    onHover() {
      clearInterval(this.tableTimer);
    },
    onLeave() {
      this.tableTimerFun();
    },
    clearInter() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    toSearch() {
      this.$refs["waybill"].getWaybillList(this.keyWord);
    },
    getWaybill(waybillNo) {
      console.log(waybillNo, "waybillNowaybillNowaybillNowaybillNo");
      this.clickYd = true;
      this.$refs["zoneMap"].getData(waybillNo);
      this.getWayBillNo = waybillNo;
    },
    getStatistics(type, params) {
      mapGuide[`get${type}Statistics`](params).then((res) => {
        this.houseData = res.list;
        this.drawer = true;
      });
    },
    mapClick(data) {
      const type = data.type;
      const params = { m: {} };
      params.m[type === "Theater" ? "area" : "sf"] = data.name;
      this.clearInter();
      this.getStatistics(type, params);
      this.interval = setInterval(
        () => this.getStatistics(type, params),
        10000
      );
      if (type === "Province") {
        this.showRightTab = true;
        setTimeout(() => {
          this.name = data.name;
          this.type = type;
        }, 0);
      }

      /*if (type === 'Province') {
                    mapGuide.getProvinceList(params).then(res => {
                        this.certificateData = res.list
                        this.showRightTab = true
                    })
                }*/
    },
    mapLineClick(value) {
      this.showRightTab = value;
      this.drawer = false;
    },
    toSituation() {
      // this.$router.push({
      //     name: "logisticsSituation",
      // });
    },
    showInformation(detail) {
      this.drawer = true;
      this.detailList = true;
    },
    showForceType() {
      this.clearInter();
      this.toYunDan = false;
      this.drawer = false;
      this.showPowerMap = false;
      this.showInput = false;
      this.showProvince = true;
      this.showRightTab = false;
      this.showWaybill = false;
      this.showYdMap = false;
      this.ydList = false;
      document.getElementById("showForceType").className = "showHide";
      document.getElementById("showBaseType").className = "titleType";
      document.getElementById("warZone").className = "titleType";
    },
    showBaseType() {
      this.clearInter();
      this.toYunDan = true;
      this.showPowerMap = false;
      this.showInput = true;
      this.showProvince = false;
      this.showRightTab = false;
      this.showWaybill = true;
      this.drawer = false;
      this.showYdMap = true;
      this.ydList = true;
      document.getElementById("showBaseType").className = "showHide";
      document.getElementById("warZone").className = "titleType";
      document.getElementById("showForceType").className = "titleType";
      mapGuide.getWaybillIStatics({}).then((res) => {
        this.houseData = res.list;
      });
    },
    warZone() {
      this.toYunDan = false;
      this.clearInter();
      this.drawer = false;
      this.showInput = false;
      this.showPowerMap = true;
      this.showProvince = false;
      this.showRightTab = false;
      this.showWaybill = false;
      this.showYdMap = false;
      this.ydList = false;
      document.getElementById("warZone").className = "showHide";
      document.getElementById("showBaseType").className = "titleType";
      document.getElementById("showForceType").className = "titleType";
    },
    closeBtn() {
      this.showRightTab = false;
    },
    hideWaybill() {
      this.showWaybill = false;
      this.showInput = false;
    },
  },
};
</script>
<style lang='scss' scoped>
.changeStyle {
  color: #09c;
  background-color: #fff;
}
.powerDeployment {
  background-image: url("../../../assets/image/homePage/mainBg.png");
  margin: 0;
  height: 100%;
  z-index: -2;
  background-size: 100% 100%;
  background-repeat: no-repeat;
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
  background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
  color: #fff;
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
.routerBtnClick {
  position: absolute;
  text-align: center;
}
.hideBox {
  background-image: url("../../../assets/image/content/click.png");
  text-align: center;
  width: 130px;
}
.text {
  font-weight: bold;
  background-image: -webkit-linear-gradient(bottom, #fff, #00e9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 3px #002153);
}
.content_main {
  height: calc(100% - 70px);
  display: flex;
  justify-content: space-between;
}
.left_contentc {
  width: 19%;
  position: absolute;
  left: 30px;
  z-index: 0;
  margin-top: -10px;
}
.right_content {
  width: 24%;
  height: 500px;

  /* margin: 60px 40px 100px 0; */
  padding-bottom: 70px;
  position: absolute;
  right: 40px;
  top: 80px;
  bottom: 10px;
  z-index: 3203;
}
.wrap {
  position: relative;
  z-index: 3203;
}
.input_a {
  position: relative;
  box-shadow: 0 0 10px #386fcf inset;
  margin-top: 50px;
  background: none;
  border: 1px solid #54b7ff;
  width: 400px;
  height: 40px;
  line-height: 30px;
  position: absolute;
  right: 50px;
  z-index: 2110;
}
.input {
  width: 200px !important;
  border: none;
}
.center_content {
  width: 100%;
  height: 100%;
}
.titleType {
  background-image: url("../../../assets/image/content/top_slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 25px;
  margin-left: 30px;
  text-align: center;
  width: 130px;
  font-size: 18px;
  &:hover {
    background-image: url("../../../assets/image/content/click.png") !important;
    color: #fff;
  }
}
.detcmd {
  color: rgba(255, 255, 255, 0.7);
}
.numSty {
  color: #fff;
  font-size: 18px;
}
.mdItem {
  line-height: 30px;
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.mdItems {
  line-height: 30px;
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  margin-left: 45px;
}
.stelll {
  text-align: center;
}
.showHide {
  background-image: url("../../../assets/image/content/click.png") !important;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  padding: 10px 25px;
  margin-left: 30px;
  width: 131px;
  font-size: 18px;
  text-align: center;
}
.teSlice {
  position: absolute;
  right: 50px;
  bottom: 15px;
}
.detailInformation {
  justify-content: space-around;
  background: url("../../../assets/image/content/listSlice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 30px 50px 30px 30px;
}
.completionrate {
  padding: 0 10px;
  display: flex;
  border-bottom: 1px transparent solid;
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
.warehouse {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
}
.nr {
  display: flex;
  flex-direction: column;
}
.titName {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}
.numData {
  color: #fff;
  margin-top: 5px;
  font-size: 16px;
}
.right {
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.distribution {
  width: 48%;
}
.detalList {
  height: 630px;
  position: relative;
  margin-top: 30px;
  background: url("../../../assets/image/content/listSlice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 20 0px;
}
.wareLayout {
  height: 300px;
  position: relative;
  margin-top: 30px;
  background: url("../../../assets/image/content/listSlice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 20px;
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
.closeBtn {
  position: absolute;
  right: 20px;
  top: 5px;
}
.changeSelectAll {
  color: #09c;
}
.el-drawer {
  z-index: 3002;
  background: rgba(255, 255, 255, 0);
  box-shadow: none;
}
input::-webkit-input-placeholder {
  color: #ccc;
}
input:focus {
  outline: none;
}
.el-button {
  background-color: #031e63 !important;
  box-shadow: 0 0 10px #386fcf inset;
  border: 0 solid #54b7ff;
  color: #01ffff !important;
}
.hedContainer {
  display: flex;
  flex-direction: column;
}
.hedTit {
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  justify-content: space-around;
  line-height: 50px;
  margin-left: 25px;
  color: #01ffff;
}
.contMain {
  margin-left: 27px;
  margin-right: 30px;
}
.contTit {
  margin-top: 5px;
  margin-left: 25px;
  margin-right: 30px;
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  justify-content: space-around;
  line-height: 50px;
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  color: #01ffff !important;
}
.cmon {
  width: 50%;
  text-align: center;
}
.contMain {
  color: #fff;
  height: 240px;
  line-height: 30px;
  margin-top: 5px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
}
.contInner {
  width: 90%;
  position: absolute;
  left: 0;
  overflow: hidden;
}
.contData {
  justify-content: space-between;
  display: flex;
  padding: 0 5px;
  height: 37px;
  line-height: 37px;
  background: rgba(39, 151, 255, 0.1);
  margin-top: 3px;
  overflow: hidden;
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
.conteBo {
  padding: 20px 20px 40px 20px;
  width: 98%;
  height: 360px;
  position: absolute;
  bottom: 10px;
  left: 20px;
  z-index: 0;
  display: flex;
}
.center_top {
  width: 50%;
  display: flex;
  justify-content: space-around;
  padding: 0 !important;
}
.center_half {
  background-image: url("../../../assets/image/homePage/splice.png");
  background-size: 100% 100% !important;
  background-repeat: no-repeat;
  width: 48%;
  padding: 20px;
}
.left_top {
  background-image: url("../../../assets/image/homePage/splice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 48%;
  padding: 20px;
}
.planMain {
  padding: 20px 40px;
}
.planTop {
  margin-top: 2px;
  display: flex;
  img {
    margin-top: 15px;
  }
  p {
    color: #fff;
    font-size: 16px;
  }
}
.topRigth {
  margin-left: 30px;
}
.topNum {
  color: #27cbff;
  font-size: 18px;
}
.bottNum {
  color: #1afcb9;
  font-size: 18px;
}
.bottomTab {
  background-image: url("../../../assets/image/homePage/tabBg.png");
  background-size: 100% 100%;
  height: calc(40% - 20px);
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 3204;
  .close {
    position: absolute;
    //float: right;
    right: 20px;
  }
}
.headerTitl {
  width: 100%;
  color: #fff;
  padding-top: 15px;
  text-align: center;
}
.dialogClick {
  position: absolute;
  top: 100px;
  bottom: 300px;
  left: 375px;
  width: 1045px;
  height: 700px;
  background-image: url("../../../assets/image/content/sliceList.png");
  background-size: 100% 100%;
  .close {
    position: absolute;
    //float: right;
    right: 20px;
  }
}
.dialogClicka {
  position: absolute;
  bottom: 260px;
  left: 21%;
  width: 58%;
  height: 710px;
  background-image: url("../../../assets/image/content/sliceList.svg");
  background-size: 100% 100%;
  z-index: 10000;
  .closea {
    float: right !important;
  }
}
.closea {
  margin-right: 70px;
  margin-top: 10px;
}
.cbycitemlaner {
  text-align: center;
  width: 16.6%;
  flex: 1;
}
.btnSty{
  width: 133px;
    height: 38px;
    background: rgba(0, 47, 81, 0.1);
    box-shadow: inset 0 0 20px 0 #00d1ff;
    border-radius: 5px 5px 5px 5px;
    opacity: 1;
    border: 1px solid #36aaff;
    color: #fff;
    text-align: center;
    line-height: 35px;
}
.text-decoration{
  text-decoration:underline;
  color: #27cbff;
}
  .contentOver {
    width: 16.6%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
