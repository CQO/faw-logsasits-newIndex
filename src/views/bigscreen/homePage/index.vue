<template>
  <div class="powerDeployment">
    <!-- 三维地图总容器 -->
    <map-container></map-container>
    <!-- 地图 end -->
    <div class="top_header">
      <div class="routerBtnClick">
    </div>
    <div class="leftOnDa">
      当前批次：<span class="leftTxt">2020夏装</span>
    </div>
    <div class="coumn leftHeadeeThree" @click.stop="toBigScreen">力量部署</div>
      <div class="rightTree" @click="toMainjsp">业务管理</div>
      <span class="text"
        >军&nbsp;民&nbsp;融&nbsp;合&nbsp;被&nbsp;装&nbsp;物&nbsp;流&nbsp;监&nbsp;控&nbsp;平&nbsp;台</span
      >
      <div class="rightOnu" @click="toLogsitio">动态监管</div>
      <div class="rightTnu" @click="toXqfx">辅助决策</div>
      <div class="rightTwo">作战时间：2023 06-11 10：32</div>
      <div class="rightfou" @click="toLogin"></div>
    </div>
      <div class="screenCont">
        <div class="left_bot">
          <div class="left_top" style="height: 24%;">
            <div class="completionrate">
              <div class="leftTitName">批&nbsp;次&nbsp;计&nbsp;划&nbsp;|<span class="dw">&nbsp;批/个</span></div>
              <div class="detailloK">查看详情</div>
            </div>
            <div class="" style="" @click="showJhsljhDia">
              <div class="planMoitHeader">
                <div class="hedRigh">
                  <div class="">
                    <div>精确申领</div>
                    <div class="numDey">{{Number(this.jszslData).toLocaleString()}}</div>
                  </div>
                  <div class="">
                    <div>已完成</div>
                    <div class="numDey">{{Number(this.jswcslData).toLocaleString()}}</div>
                  </div>
                </div>
              </div>
              <div class="planMoitHeader">
                <div class="hedRigh">
                  <div class="">
                    <div>调拨计划</div>
                    <div class="numDey">{{Number(this.jszslData).toLocaleString()}}</div>
                  </div>
                  <div class="">
                    <div>已完成</div>
                    <div class="numDey">{{Number(this.jswcslData).toLocaleString()}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left_top" style="height: 24%;margin-top:30px" @click="showDdjkDia">
            <div class="completionrate">
              <div class="leftTitName">订&nbsp;单&nbsp;监&nbsp;控&nbsp;|<span class="dw">&nbsp;个</span></div>
              <div class="detailloK">查看详情</div>
            </div>
            <div class="orderDetail">
               <div class="orderLeft">
                 <div class="orderLefin"></div>
               </div>
               <div class="orderRight">
                <div class="orderRightTop">
                  <div class="orderTopNum">492910</div>
                  <div class="orderTopTex">已完成</div>
                </div>
                <div class="orderRightBot">
                  <div class="orderTopNum">0</div>
                  <div class="orderTopTex">异常</div>
                </div>
               </div>
            </div>
          </div>
          <div class="left_top" style="height: 24%;" @click="showHyzsDia">
            <div class="completionrate">
              <div class="leftTitName">运&nbsp;单&nbsp;监&nbsp;控&nbsp;|<span class="dw">&nbsp;单</span></div>
            <div class="detailloK">查看详情</div>
            </div>
            <div class="orderDetail">
                <div class="YdMonitorLeft">
                  <div class="orderLefin"></div>
                </div>
                <div class="orderRight">
                 <div class="orderRightTop">
                   <div class="orderTopNum">492910</div>
                   <div class="orderTopTex">已完成</div>
                 </div>
                 <div class="orderRightBot">
                   <div class="orderTopNum">0</div>
                   <div class="orderTopTex">异常</div>
                 </div>
                </div>
             </div>
          </div>
          <div class="left_top" style="height: 24%;"  @click="showWltsfxDia">
            <div class="completionrate" style="display: flex;">
                <div class="leftTitName">物&nbsp;资&nbsp;态&nbsp;势&nbsp;|<span class="dw">&nbsp;件</span></div>
                <div class="detailloK">查看详情</div>
            </div>
            <div class="wztsDetail">
                <div class="logationTop">
                    <div class="logatTopLeft">
                        <div class="leftLeft"></div>
                        <div class="leftRight">
                            <div class="leftRightTxt">物资入库</div>
                            <div class="leftRightNum">92589</div>
                        </div>
                    </div>
                    <div class="logatTopLeft">
                        <div class="leftLeft"></div>
                        <div class="leftRight">
                            <div class="leftRightTxt">待配送量</div>
                            <div class="leftRightNum">0</div>
                        </div>
                    </div>
                </div>
                <div class="logationBot">
                    <div class="logatTopLeft">
                        <div class="leftLeft"></div>
                        <div class="leftRight">
                            <div class="leftRightTxt">物资出库</div>
                            <div class="leftRightNum">9252</div>
                        </div>
                    </div>
                    <div class="logatTopLeft">
                        <div class="leftLeft"></div>
                        <div class="leftRight">
                            <div class="leftRightTxt">库存总量</div>
                            <div class="leftRightNum">9482</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="center_bot">
          <div style="display:flex">
            <div class="item">
                <div class="item_box">
                  物资流向监控
                </div>
              </div>
              <div class="item">
                <div class="item_box">
                  陆运运力监控
                </div>
              </div>
              <div class="item">
                <div class="item_box">
                  航空运力监控
                </div>
              </div>
              <div class="item">
                <div class="item_box">
                  总体概况
                </div>
              </div>
          </div>
          <!-- <div class="centBotBotLeft"></div>
          <div class="centBotBotRight"></div> -->
        </div>
        <div class="right_bot">
            <div class="left_top" style="height: 24%;">
                <div class="completionrate">
                  <div class="leftTitName">货&nbsp;运&nbsp;指&nbsp;数&nbsp;|<span class="dw">&nbsp;%</span></div>
                  <div class="detailloK">查看详情</div>
                </div>
                <div class="" style="" @click="showJhsljhDia">
                    <hyzsModel></hyzsModel>
                </div>
              </div>
              <div class="left_top" style="height: 24%;margin-top:30px;" @click="showDdjkDia">
                <div class="completionrate">
                  <div class="leftTitName">航&nbsp;空&nbsp;数&nbsp;据&nbsp;|<span class="dw">&nbsp;班</span></div>
                  <div class="detailloK">查看详情</div>
                </div>
                <div class="orderDetail">
                   <hksj></hksj>
                </div>
              </div>
              <div class="left_top" style="height: 24%;" @click="showHyzsDia">
                <div class="completionrate">
                  <div class="leftTitName">车&nbsp;辆&nbsp;数&nbsp;据&nbsp;|<span class="dw">&nbsp;辆</span></div>
                <div class="detailloK">查看详情</div>
                </div>
                <div class="orderDetail">
                    <div class="YdMonitorLeft">
                      <div class="orderLefin"></div>
                    </div>
                    <div class="orderRight">
                     <div class="orderRightTop">
                       <div class="orderTopNum">492910</div>
                       <div class="orderTopTex">已完成</div>
                     </div>
                     <div class="orderRightBot">
                       <div class="orderTopNum">0</div>
                       <div class="orderTopTex">异常</div>
                     </div>
                    </div>
                 </div>
              </div>
              <div class="left_top" style="height: 25%; margin-bottom: 10px"  @click="showWltsfxDia">
                <div class="completionrate" style="display: flex;">
                    <div class="leftTitName">准&nbsp;点&nbsp;率&nbsp;趋&nbsp;势&nbsp;|<span class="dw">&nbsp;%</span></div>
                    <div class="detailloK">查看详情</div>
                </div>
                <div>
                </div>
              </div>
          </div>
      </div>
        <div class="dialogClick" v-if="this.clickYda">
          <div class="close" @click="hiddenDetail">
            <img src="../../../assets/image/homePage/closeBtn.png" alt="">
          </div>
          <div class="tabTdList">
            <div class="topEchart">
              <echartList></echartList>
            </div>
            <div class="botTab" v-if="this.tempTwoYd" style="padding:15px 30px 30px 30px">
              <div class="titlehead">
                      <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                          <div class="cbycitemlaner">联保中心</div>
                      <div class="cbycitemlaner">已下单</div>
                      <div class="cbycitemlaner">仓库处理中</div>
                      <div class="cbycitemlaner">运输中</div>
                      <div class="cbycitemlaner">派送中</div>
                      <div class="cbycitemlaner">领取中</div>
                      <div class="cbycitemlaner">已签收</div>
                      <div class="cbycitemlaner">异常</div>
                      </div>
              </div>
              <div class="mainLisy">
                  <div class="mainListItem" v-for="(item,index) in getYdCenterData" @click="toShowDetailYd(item,'js')" :key="index">
                    <div class="cbycitemlaner">{{item.center }}</div>
                      <div class="cbycitemlaner">{{item.num1 }}</div>
                      <div class="cbycitemlaner contentOver" :title="item.num2" @click="toShowDetailYd(item,'js')">{{item.num2}}</div>
                      <div class="cbycitemlaner contentOver" :title="item.num3" @click="toShowDetailYd(item,'js')">{{item.num3}}</div>
                      <div class="cbycitemlaner contentOver" :title="item.num4">{{item.num4}}</div>
                      <div class="cbycitemlaner">{{item.num5}}</div>
                      <div class="cbycitemlaner">{{item.num6}}</div>
                      <div class="cbycitemlaner">{{item.num7}}</div>
                  </div>
              </div>
          </div>
            <tabList @toBefo="toBefoNex" @passParam="getParam" v-if="this.toDetailTdList" :getParamVal="this.paramCenteValue"></tabList>
          </div>
        </div>
        <!-- 计划精申列表弹出框-->
    <div class="dialogClick" v-if="this.clickShowDiaJs">
      <div class="close" @click="hiddenDetaila">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="">
        </div>
      <div class="tabTdList">
        <div style="margin-top:20px" class="topEchart">
          <echartList></echartList>
        </div>
          <div class="botTab" style="">
            <div style="display:flex;justify-content: space-between;" class="topForm">
              <div style="color: #fff;line-height:60px">
                <span>精申列表</span>
              </div>
            <el-form style="margin-right: 60px" label-width="120px">
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
                        v-for="item in jsStatus"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="3">
                  <div class="btnSty" @click="handleJsSearch">查询</div>
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
                  <div class="mainListItem" v-for="(item,index) in getJsData" :key="index">
                      <div class="cbycitemlaner">{{item.fwdwdm }}</div>
                      <div class="cbycitemlaner contentOver" :title="item.dwdm">{{item.dwdm}}</div>
                      <div class="cbycitemlaner contentOver" :title="item.orderno">{{item.orderno}}</div>
                      <div class="cbycitemlaner contentOver" :title="item.pmdm">{{item.pmdm}}</div>
                      <div class="cbycitemlaner">{{item.wzpm}}</div>
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
  </div>
  <!-- 计划列表弹出框 -->
  <div class="dialogClick" v-if="this.clickShowDiaPlanJh">
    <div class="close" @click="hiddenDetaila">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="">
      </div>
    <div class="tabTdList">
      <div class="topEchart">
        <echartList></echartList>
      </div>
        <div class="botTab" style="" v-if="this.temoOne">
          <div style="display:flex;justify-content: space-between;" class="topForm">
            <div style="color: #fff;line-height:60px">
              <span>{{dialogTitle}}</span>
            </div>
            <el-form style="margin-right: 60px">
            <el-row :gutter="40">
              <el-col :md="10">
                <el-form-item label="批号">
                  <el-input v-model="formJsValue.ph" style="width: 80%;" placeholder="请输入批号"/>
                </el-form-item>
              </el-col>
              <el-col :md="10">
                <el-form-item label="品名">
                  <el-input v-model="formJsValue.pm" style="width: 80%;" placeholder="请输入品名"/>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleJhSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
          </div>
            <div class="titlehead">
                    <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
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
                <div class="mainListItem" v-for="(item,index) in getJhData" :key="index">
                    <div class="cbycitemlaner">{{item.sendFromUnit }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.recipientUnit">{{item.recipientUnit}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.signDate">{{item.signDate}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.materialCode">{{item.materialCode}}</div>
                    <div class="cbycitemlaner">{{item.material}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.num">{{item.num}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.batchNo">{{item.batchNo }}</div>
                </div>
                <el-pagination
                class="pageAtion"
  background
  layout="prev, pager, next"
  :total="jhTotal"
  :page-size="9"
  @size-change="handleSizeJhChange" @current-change="handleCurrentJhChange">
</el-pagination>
            </div>
        </div>
        <div class="botTab" style="" v-if="this.tempTwo">
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
                <div class="mainListItem" v-for="(item,index) in getJhCenterData" :key="index">
                    <div class="cbycitemlaner">{{item.center }}</div>
                    <div class="cbycitemlaner contentOver text-decoration" :title="item.jss" @click="toShowDetailInfor(item,'js')">{{item.jss}}</div>
                    <div class="cbycitemlaner contentOver text-decoration" :title="item.jswcs" @click="toShowDetailInfor(item,'js')">{{item.jswcs}}</div>
                    <div class="cbycitemlaner contentOver text-decoration" :title="item.fws" @click="toShowFwPlan(item,'js')">{{item.fws}}</div>
                    <div class="cbycitemlaner text-decoration" @click="toShowFwPlan(item,'js')">{{item.fwwcs}}</div>
                </div>
            </div>
        </div>
        <div class="botTab" style="" v-if="this.three">
          <div style="display:flex;justify-content: space-between;" class="topForm">
          <div style="color: #fff;line-height:60px">
            <span>精申列表</span>
          </div>
          <el-form style="margin-right: 60px" label-width="120px">
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
              <el-col :md="3">
                <div class="btnSty" @click="handleJsSearch">查询</div>
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
        <div class="mainListItem" v-for="(item,index) in getJsData" :key="index">
            <div class="cbycitemlaner">{{item.fwdwdm }}</div>
            <div class="cbycitemlaner contentOver" :title="item.dwdm">{{item.dwdm}}</div>
            <div class="cbycitemlaner contentOver" :title="item.orderno">{{item.orderno}}</div>
            <div class="cbycitemlaner contentOver" :title="item.pmdm">{{item.pmdm}}</div>
            <div class="cbycitemlaner">{{item.wzpm}}</div>
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
</div>
<!-- 订单监控弹出框 -->
<div class="dialogClick" v-if="clickShowDiaDdjk">
  <div class="close" @click="hiddenDetaila">
      <img src="../../../assets/image/homePage/closeBtn.png" alt="">
    </div>
  <div class="tabTdList">
    <div class="topEchart">
      <echartList></echartList>
    </div>
    <div class="botTab" style="" v-if="this.tempTwoDd">
      <div class="titlehead">
              <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                  <div class="cbycitemlaner">联保中心</div>
              <div class="cbycitemlaner">异常数</div>
              <div class="cbycitemlaner">完成数</div>
              <div class="cbycitemlaner">总数</div>
              </div>
      </div>
      <div class="mainLisy">
          <div class="mainListItem" v-for="(item, index) in getOrderCenterData" :key="index">
              <div class="cbycitemlaner">{{item.center }}</div>
              <div class="cbycitemlaner contentOver" :title="item.ycs" @click="toShowDetailOrder(item,'js')">{{item.ycs}}</div>
              <div class="cbycitemlaner contentOver" :title="item.wcs" @click="toShowDetailOrder(item,'js')">{{item.wcs}}</div>
              <div class="cbycitemlaner contentOver" :title="item.zs" @click="toShowDetailOrder(item,'js')">{{item.zs}}</div>
          </div>
      </div>
  </div>
      <div class="botTab" style="" v-if="this.oneOrder">
        <div style="display:flex;justify-content: space-between;" class="topForm">
          <div style="color: #fff;line-height:60px">
             <span>{{dialogTitle}}</span>
           </div>
        <el-form label-width="120px" style="margin-right: 20px">
          <el-row :gutter="40">
            <el-col :md="10">
              <el-form-item label="凭证号">
                <el-input v-model="formJsValue.pzh" clearable style="width: 80%;" placeholder="请输入凭证号"/>
              </el-form-item>
            </el-col>
            <el-col :md="10">
              <el-form-item label="状态">
                <el-select style="z-index: 3000;" clearable placeholder="请选择" v-model="formJsValue.ddStatus" @change="currWorkTypeChange">
                  <el-option
                    v-for="item in ddStatus"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="3">
              <div class="btnSty" @click="handleOrderjkSearch">查询</div>
            </el-col>
          </el-row>
        </el-form>
        </div>
          <div class="titlehead">
                  <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                      <div class="cbycitemlaner">凭证号(订单号)</div>
                  <div class="cbycitemlaner">发物单位</div>
                  <div class="cbycitemlaner">收物单位</div>
                  <div class="cbycitemlaner">签发日期</div>
                  <div class="cbycitemlaner">品名代码</div>
                  <div class="cbycitemlaner">品名</div>
                  <div class="cbycitemlaner">数量</div>
                  <div class="cbycitemlaner">状态</div>
                  </div>
          </div>
          <div class="mainLisy">
              <div class="mainListItem" v-for="(item,index) in getDdjkData" :key="index">
                  <div class="cbycitemlaner">{{item.orderCode }}</div>
                  <div class="cbycitemlaner contentOver" :title="item.sendFromUnit">{{item.sendFromUnit}}</div>
                  <div class="cbycitemlaner contentOver" :title="item.recipientUnit">{{item.recipientUnit}}</div>
                  <div class="cbycitemlaner contentOver" :title="item.signDate">{{item.signDate}}</div>
                  <div class="cbycitemlaner">{{item.materialCode}}</div>
                  <div class="cbycitemlaner contentOver" :title="item.material">{{item.material}}</div>
                  <div class="cbycitemlaner contentOver" :title="item.num">{{item.num }}</div>
                  <div class="cbycitemlaner contentOver" :title="item.finStatus">{{item.finStatus }}</div>
              </div>
              <el-pagination
              class="pageAtion"
background
layout="prev, pager, next"
:total="ddjkTotal"
:page-size="7"
@size-change="handleSizeDdChange" @current-change="handleCurrentDdChange">
</el-pagination>
          </div>
      </div>
  </div>
</div>
<!-- 物流态势分析弹出框 -->
<div class="dialogClick" v-if="clickShowDiaWltsfx">
  <div class="close" @click="hiddenDetaila">
      <img src="../../../assets/image/homePage/closeBtn.png" alt="">
    </div>
  <!-- <div class="" style=" height: 30px; text-align: center; padding-top: 25px;">
      <span style="color: #fff;">{{dialogTitle}}</span>
  </div> -->
  <div class="tabTdList">
    <div class="topEchart">
      <echartList></echartList>
    </div>
      <div class="botTab" style="">
          <wltsfx></wltsfx>
      </div>
  </div>
</div>
<!-- 仓储监控弹出框 -->
<div class="dialogClick" v-if="clickShowDiaCcjk">
  <div class="close" @click="hiddenDetaila">
      <img src="../../../assets/image/homePage/closeBtn.png" alt="">
    </div>
  <!-- <div class="" style=" height: 30px; text-align: center; padding-top: 25px;">
      <span style="color: #fff;">{{dialogTitle}}</span>
  </div> -->
  <div class="tabTdList">
    <div class="topEchart">
      <echartList></echartList>
    </div>
      <div class="botTab" style="">
          <Ccjk></Ccjk>
      </div>
  </div>
</div>
<!-- 设备监控弹出框 -->
<div class="dialogClick" v-if="clickShowDiaSbjk">
  <div class="close" @click="hiddenDetaila">
      <img src="../../../assets/image/homePage/closeBtn.png" alt="">
    </div>
  <!-- <div class="" style=" height: 30px; text-align: center; padding-top: 25px;">
      <span style="color: #fff;">{{dialogTitle}}</span>
  </div> -->
  <div class="tabTdList">
    <div class="topEchart">
      <echartList></echartList>
    </div>
      <div class="botTab" style="">
          <Sbjk></Sbjk>
      </div>
  </div>
</div>
<!-- 货运指数弹出框 -->
<div class="dialogClick" v-if="clickShowDiaHyzs">
  <div class="close" @click="hiddenDetaila">
      <img src="../../../assets/image/homePage/closeBtn.png" alt="">
    </div>
  <!-- <div class="" style=" height: 30px; text-align: center; padding-top: 25px;">
      <span style="color: #fff;">{{dialogTitle}}</span>
  </div> -->
  <div class="tabTdList">
      <div class="" style="">
        <div class="topEchart">
          <echartList></echartList>
        </div>
        <div class="botTab">
          <Hyzs></Hyzs>
        </div>
      </div>
  </div>
</div>
<!-- 准点率分析弹出框 -->
<div class="dialogClick" v-if="clickShowDiaZdlfx">
  <div class="close" @click="hiddenDetaila">
      <img src="../../../assets/image/homePage/closeBtn.png" alt="">
    </div>
  <!-- <div class="" style=" height: 30px; text-align: center; padding-top: 25px;">
      <span style="color: #fff;">{{dialogTitle}}</span>
  </div> -->
  <div class="tabTdList">
    <div style="margin-top:5px" class="topEchart">
      <echartList></echartList>
    </div>
      <div class="botTab" style="">
          <Zdlfx></Zdlfx>
      </div>
  </div>
</div>
<div class="dialogClicka" style="" v-if="this.clickShowDiaYdEj">
  <div class="closea" @click="hiddenDetaila">
    <img src="../../../assets/image/homePage/closeBtn.png" alt="">
  </div>
  <div class="" style="margin-top:40px;padding:0 90px" >
    <div style="color:#fff;font-size:22px">运单编号：{{this.sonParam.row.waybillNo}}</div>
    <template>
      <el-table
      :data="getYdEjData"
      style="width: 100%;margin-top:20px">
      <el-table-column
        prop="idxNum"
        label="序号"
        width="70"
        fixed='left'
        :show-overflow-tooltip='true'
        align="center">
      </el-table-column>
      <el-table-column
        prop="waybillNo"
        label="运单号"
        width="260"
        align="center">
      </el-table-column>
      <el-table-column
        prop="time"
        label="发生时间"
        width="260"
        align="center">
      </el-table-column>
      <el-table-column
        prop="msg"
        label="运单信息"
        width="610"
        fixed="right"
:show-overflow-tooltip='true'
        align="center">
      </el-table-column>
    </el-table>
    <el-pagination
            class="pageAtion"
            style="margin-top:20px"
background
layout="prev, pager, next"
:total="ydEjTotal"
@size-change="handleSizeYdEjChange" @current-change="handleCurrentYdEjChange">
  </el-pagination>
     </template>
     </div>
</div>

      </div>
</template>

<script>
import { mapGetters } from "vuex";
import gsap from "gsap";
import getPlanMonitorDataApi from "@/api/modules/homePage";
// import PunctualityAnalysis from "./components/PunctualityAnalysis";
import punctSys from "./components/punctSys";
import WarehouseMonitor from "./components/WarehouseMonitor";
import EquipmentMonitor from "./components/EquipmentMonitor";
import wltsfx from "./components/wltsfx";
import Ccjk from "./components/ccjk";
import Sbjk from "./components/sbjk";
import Hyzs from "./components/hyzs";
import Zdlfx from "./components/zdlfx";
import MapContainer from "./mapContainer"; // 三维地图总容器
import tabList from "./components/tabList";
import echartList from "./components/echartList";
import hksj from "./components/hksj"
import hyzsModel from "./components/hyzsModel"

export default {
  name: "index",
  computed: {
    ...mapGetters(["roles"]),
  },
  components: {
    echartList,
    WarehouseMonitor,
    EquipmentMonitor,
    MapContainer,
    punctSys,
    tabList,
    wltsfx,
    Ccjk,
    Sbjk,
    Hyzs,
    Zdlfx,
    hksj,
    hyzsModel
  },
  data() {
    return {
      paramCenteValue: "",
      getUserData: "",
      temoOne: false,
      tempTwo: true,
      tempTwoDd: false,
      oneOrder: false,
      clickShowDiaJs: false,
      toDetailTdList: false,
      tempTwoYd: false,
      clickShowDiaPlanJh: false,
      clickShowDiaDdjk: false,
      clickShowDiaWltsfx: false,
      clickShowDiaCcjk: false,
      clickShowDiaSbjk: false,
      clickShowDiaHyzs: false,
      clickShowDiaZdlfx: false,
      clickShowDiaYdEj: false,
      three: false,
      dialogTitle: "",
      getJsData: [],
      getOrderCenterData: [],
      getYdCenterData: [],
      getJhData: [],
      getYdEjData: [],
      getJhCenterData: [],
      psnTableData: {},
      jsTotal: 0,
      jhTotal: 0,
      wltsfxTotal: 0,
      formJsValue: {
        page: 1,
        pageSize: 9,
        ddh: "",
        jsStatus: "",
        ph: "",
        pm: "",
      },
      jsStatusList: [],
      jsStatus: [
        {
          value: "111111DDZT4",
          name: "确认收货",
        },
        {
          value: "111111DDZT1",
          name: "正常",
        },
        {
          value: "111111DDZT2",
          name: "作废",
        },
        {
          value: "111111DDZT3",
          name: "发货",
        },
      ],
      ddStatus: [
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
      formforms: {
        page: 1,
        pageSize: 9,
      },
      showNumber: 0,
      ydEjTotal: 0,
      number: 500,
      wareHouserTotal: 100000,
      orderNum: ["1", "3", ",", "7", "9", "4"],
      count: 100,
      noneClick: true,
      clickYda: false,
      getYdList: [],
      getPlanList: [],
      getDdjkData: [],
      getWltsfxData: [],
      sonParam: "",
      centerName: "",
      ddjkTotal: 0,
      getYdTotal: "",
      getFinishData: "",
      getFinishRateData: "",
      getYcslData: "",
      getYcRate: "",
      jszslData: "",
      jswcslData: "",
      fwjhslData: "",
      fwwcslData: "",
      ckzs: "",
      ckzl: "",
      dckl: "",
      dpsl: "",
      parValue: {
        pageNum: 1,
        pageSize: 4,
      },
    };
  },
  computed: {
    showCounter() {
      return this.showNumber.toFixed(0);
    },
    totalWealHouse() {
      return this.showNumber.toFixed(0);
    },
    applyPlan() {
      return this.showNumber.toFixed(0);
    },
    getBtnPower() {
      return this.$store.state.buttonPower;
    },
    // roles(){
    //         return this.$store.state.sidebar
    //     }
  },
  mounted() {
    this.increaseNumber();
    gsap.to(this, {
      duration: 5,
      showNumber: this.number,
    });
    gsap.to(this, {
      duration: 5,
      showNumber: this.wareHouserTotal,
    });
  },
  watch: {
    number(newVal) {
      gsap.to(this, {
        duration: 5,
        showNumber: newVal,
      });
    },
    wareHouserTotal(valsd) {
      gsap.to(this, {
        duration: 5,
        showNumber: valsd,
      });
    },
  },
  created() {
    this.getUserData = this.$store.state.user.sidebar.roles;
    if (!this.getUserData) {
      this.$message({
        type: "error",
        message: "没有权限!",
      });
      this.$router.push("/login");
    }

    this.getPlanData();
    this.getStatuJs();
    this.getYdOrderData();
    this.getTjList();
  },
  destroyed() {},
  methods: {
    toBefo() {
      (this.clickShowDiaYdEj = false), (this.toDetailTdList = true);
    },
    toShowDetailInfor(item, name) {
      this.paramCenteValue = item.center;
      this.toShowJsParam();
    },
    toShowJsParam() {
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
          year: sessionStorage.getItem("year"),
        },
      };
      getPlanMonitorDataApi.getPlanJsListData(params).then((res) => {
        this.getJsData = res.pd.rows;
        this.jsTotal = res.pd.total;
      });
    },
    toShowFwPlan(item) {
      this.paramCenteValue = item.center;
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
    toBefoNex() {
      this.toDetailTdList = false;
      this.tempTwoYd = true;
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
    handleSizeYdEjChange(val) {
      this.formforms.pageSize = val;
      this.toDyDia();
    },
    handleCurrentYdEjChange(val) {
      this.formforms.page = val;
      this.toDyDia();
    },
    handleJhSearch() {
      this.formJsValue.page = 1;
      this.toParamsPlan();
    },
    handleJsSearch() {
      this.formJsValue.page = 1;
      this.toShowJsParam();
    },
    showZdlfxDia() {
      this.clickShowDiaZdlfx = true;
      this.clickShowDiaHyzs = false;
      this.clickShowDiaWltsfx = false;
      this.clickShowDiaCcjk = false;
      this.clickShowDiaSbjk = false;
      this.clickShowDiaJs = false;
      this.clickShowDiaPlanJh = false;
      this.clickShowDiaDdjk = false;
      this.clickShowDiaYdEj = false;
      this.dialogTitle = "准点率分析";
    },
    showHyzsDia() {
      this.clickShowDiaHyzs = true;
      this.clickShowDiaZdlfx = false;
      this.clickShowDiaWltsfx = false;
      this.clickShowDiaCcjk = false;
      this.clickShowDiaSbjk = false;
      this.clickShowDiaJs = false;
      this.clickShowDiaPlanJh = false;
      this.clickShowDiaDdjk = false;
      this.clickShowDiaYdEj = false;
      this.dialogTitle = "货运指数";
    },
    showSbjkDia() {
      this.clickShowDiaSbjk = true;
      this.clickShowDiaHyzs = false;
      this.clickShowDiaZdlfx = false;
      this.clickShowDiaWltsfx = false;
      this.clickShowDiaCcjk = false;
      this.clickShowDiaJs = false;
      this.clickShowDiaPlanJh = false;
      this.clickShowDiaDdjk = false;
      this.clickShowDiaYdEj = false;
      this.dialogTitle = "设备监控";
    },
    showCcjkDia() {
      this.clickShowDiaCcjk = true;
      this.clickShowDiaHyzs = false;
      this.clickShowDiaZdlfx = false;
      this.clickShowDiaWltsfx = false;
      this.clickShowDiaSbjk = false;
      this.clickShowDiaJs = false;
      this.clickShowDiaPlanJh = false;
      this.clickShowDiaDdjk = false;
      this.clickShowDiaYdEj = false;
      this.dialogTitle = "仓储监控";
    },
    showWltsfxDia() {
      this.clickShowDiaWltsfx = true;
      this.clickShowDiaHyzs = false;
      this.clickShowDiaZdlfx = false;
      this.clickShowDiaCcjk = false;
      this.clickShowDiaSbjk = false;
      this.clickShowDiaJs = false;
      this.clickShowDiaPlanJh = false;
      this.clickShowDiaDdjk = false;
      this.clickShowDiaYdEj = false;
      this.dialogTitle = "物流态势分析";
    },
    handleSizeDdChange(val) {
      this.formJsValue.pageSize = val;
      this.showDdjkDia();
    },
    handleCurrentDdChange(val) {
      this.formJsValue.page = val;
      this.showDdjkDia();
    },
    showDdjkDia() {
      this.clickShowDiaDdjk = true;
      this.clickShowDiaHyzs = false;
      this.clickShowDiaZdlfx = false;
      this.clickShowDiaWltsfx = false;
      this.clickShowDiaCcjk = false;
      this.clickShowDiaSbjk = false;
      this.clickShowDiaJs = false;
      this.clickShowDiaPlanJh = false;
      this.clickShowDiaYdEj = false;
      this.clickYda = false;
      this.tempTwoDd = true;
      this.tempTwoYd = false;
      this.tempTwo = false;
      this.oneOrder = false;
      this.dialogTitle = "订单监控";
      let param = {
        m: {
          year: sessionStorage.getItem("year"),
        },
      };
      getPlanMonitorDataApi.tiOrderCenter(param).then((response) => {
        this.getOrderCenterData = response;
      });
    },
    toShowDetailOrder(item) {
      this.paramCenteValue = item.center;
      this.toParamOrder();
    },
    toParamOrder() {
      (this.oneOrder = true), (this.tempTwoDd = false);
      let params = {
        page: this.formJsValue.page,
        pageSize: this.formJsValue.pageSize,
        m: {
          orderCode: this.formJsValue.pzh,
          finStatus: this.formJsValue.ddStatus,
          center: this.paramCenteValue,
          year: sessionStorage.getItem("year"),
        },
      };
      getPlanMonitorDataApi.getDdjkListData(params).then((res) => {
        this.getDdjkData = res.pd.rows;
        this.ddjkTotal = res.pd.total;
      });
    },
    handleSizeJhChange(val) {
      this.formJsValue.pageSize = val;
      this.showJhsljhDia();
    },
    handleCurrentJhChange(val) {
      this.formJsValue.page = val;
      this.showJhsljhDia();
    },
    showJhsljhDia() {
      this.clickShowDiaPlanJh = true;
      this.clickShowDiaHyzs = false;
      this.clickShowDiaZdlfx = false;
      this.clickShowDiaWltsfx = false;
      this.clickShowDiaCcjk = false;
      this.clickShowDiaSbjk = false;
      this.clickShowDiaJs = false;
      this.clickShowDiaDdjk = false;
      this.clickShowDiaYdEj = false;
      this.temoOne = false;
      this.tempTwo = true;
      this.tempTwoYd = false;
      this.tempTwoDd = false;
      this.three = false;
      this.dialogTitle = "计划列表";

      let param = {
        m: {
          year: sessionStorage.getItem("year"),
        },
      };
      getPlanMonitorDataApi.tiPlanCenter(param).then((response) => {
        this.getJhCenterData = response;
      });
    },
    handleSizeJsChange(val) {
      this.formJsValue.pageSize = val;
      this.showJqsljhDia();
    },
    handleCurrentJsChange(val) {
      this.formJsValue.page = val;
      this.showJqsljhDia();
    },
    hiddenDetaila() {
      this.clickShowDiaHyzs = false;
      this.clickShowDiaZdlfx = false;
      this.clickShowDiaWltsfx = false;
      this.clickShowDiaCcjk = false;
      this.clickShowDiaSbjk = false;
      this.clickShowDiaJs = false;
      this.clickShowDiaPlanJh = false;
      this.clickShowDiaDdjk = false;
      this.clickShowDiaYdEj = false;
    },
    handleOrderjkSearch() {
      this.formJsValue.page = 1;
      this.toParamOrder();
    },
    showJqsljhDia() {
      this.clickShowDiaJs = true;
      this.clickShowDiaHyzs = false;
      this.clickShowDiaZdlfx = false;
      this.clickShowDiaWltsfx = false;
      this.clickShowDiaCcjk = false;
      this.clickShowDiaSbjk = false;
      this.clickShowDiaPlanJh = false;
      this.clickShowDiaDdjk = false;
      this.clickShowDiaYdEj = false;
      this.dialogTitle = "精申列表";
      let params = {
        page: this.formJsValue.page,
        pageSize: this.formJsValue.pageSize,
        m: {
          orderno: this.formJsValue.ddh,
          type: this.formJsValue.jsStatus,
        },
      };
      getPlanMonitorDataApi.getPlanJsListData(params).then((res) => {
        this.getJsData = res.pd.rows;
        this.jsTotal = res.pd.total;
      });
    },
    getTjList() {
      getPlanMonitorDataApi.getDbtjData({}).then((res) => {
        this.ckzs = res.m.cks;
        this.ckzl = res.m.kcl;
        this.dckl = res.m.dckl;
        this.dpsl = res.m.dpsl;
      });
    },
    getYdOrderData() {
      let params = {
        m: {
          year: sessionStorage.getItem("year"),
        },
      };
      getPlanMonitorDataApi.getYdjkData(params).then((res) => {
        this.getYdList = res.m;
        this.getYdTotal = res.m.total;
        this.getFinishData = res.m.fin;
        this.getFinishRateData = res.m.finRate;
        this.getYcslData = res.m.ex;
        this.getYcRate = res.m.exRate;
      });
    },
    getPlanData() {
      getPlanMonitorDataApi.getPlanMonitorData({}).then((res) => {
        this.getPlanList = res.list;
        this.getPlanList.forEach((item) => {
          this.jszslData = item.jszsl;
          this.jswcslData = item.jswcsl;
          this.fwjhslData = item.ddzsl;
          this.fwwcslData = item.ddwcsl;
        });
      });
    },
    getStatuJs() {
      getPlanMonitorDataApi.getJsStatuData({}).then((response) => {
        console.log(response, "...........................");
        this.jsStatusList = response.list;
      });
    },

    toShowDetailYdMonitor() {
      this.noneClick = false;
      this.clickYda = true;
      this.toDetailTdList = false;
      this.clickShowDiaYdEj = false;
      this.clickShowDiaDdjk = false;
      this.clickShowDiaPlanJh = false;
      this.clickShowDiaJs = false;
      this.tempTwoYd = true;
      let params = {
        page: this.parValue.pageNum,
        pageSize: this.parValue.pageSize,
        m: {
          year: sessionStorage.getItem("year"),
        },
      };
      getPlanMonitorDataApi.tiYdCenter(params).then((response) => {
        this.getYdCenterData = response;
      });
    },
    toShowDetailYd(item) {
      this.toDetailTdList = true;
      this.tempTwoYd = false;
      this.paramCenteValue = item.center;
    },
    hiddenDetail() {
      this.noneClick = true;
      this.clickYda = false;
    },
    // 设置文字滚动
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; // 拿到数字的ref，计算元素数量
      const numberArr = this.orderNum.filter((item) => !isNaN(item));
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
      }
    },
    // 处理总订单数字
    toOrderNum(num) {
      num = num.toString();
      // 把订单数变成字符串
      if (num.length < 5) {
        num = "0" + num; // 如未满八位数，添加"0"补位
        this.toOrderNum(num); // 递归添加"0"补位
      } else if (num.length === 5) {
        // 订单数中加入逗号
        num = num.slice(0, 2) + "," + num.slice(2, 5);
        this.orderNum = num.split(""); // 将其便变成数据，渲染至滚动数组
      }
    },
    increaseNumber() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let self = this;
      this.timer = setInterval(() => {
        self.count = self.count + this.getRandomNumber(1, 100);
        this.toOrderNum(self.count);
        this.$nextTick(() => {
          self.setNumberTransform(self.count);
        });
      }, 3000);
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
      //随机生成
    },
    toMainjsp() {
      // this.$router.push("/mainjsp");
      window.open(window.roterYwglUrl.srcUrl, "_blank");
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
    toBigScreen() {
      // debugger
      if (this.getUserData.includes("100")) {
        //力量部署
        this.$router.push("/big/screen/index");
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
@media only screen and (min-width: 1766px) {
  .main-big {
    background-color: blue;
    height: 95%;
    width: 90%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.12);
  }
}
@media only screen and (max-width: 1766px) {
  .main-big {
    background-color: wheat;
    height: 120%;
    width: 80%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.12);
  }
}
// 整体层叠关系
.top_header, .left_bot, .right_bot, .center_bot{
  position: relative;
  z-index: 10;
}

.powerDeployment {
  background-image: url("../../../assets/image/homePage/mainBg.png");
  background-size:100% 100% ;
  //background: #01132d;
  margin: 0;
  height: 100%;
  position: relative;
  padding-bottom: 10px;
}
.top_header {
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  font-size: 30px;
  text-align: center;
  height: 70px;
  padding-top: 10px;
  line-height: 25px;
  background-image: url("../../../assets/image/top_header/titleBg.png");
  font-family: PangMenZhengDao-3, PangMenZhengDao;
  background-position: center;
}
.text {
  font-weight: bold;
  background-image: -webkit-linear-gradient(top, #fff, #009cff);
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
  position: absolute;
  width: 100%;
  top: 70px;
}
.cont_top_cont {
  // display: flex;
  // justify-content: space-between;
  // flex: 1;
  position: absolute;
  top: 70px;
  height: 60%;
  width: 100%;
}
.center_top {
  width: 54%;
  display: flex;
  justify-content: space-around;
  padding: 0 13px;
}
.center_half {
  background-image: url("../../../assets/image/homePage/splice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 48%;
}
.ct_ct {
  display: flex;
  flex-direction: column;
}
.jt {
  width: 10%;
  padding: 60px 30px;
}
.spt {
  color: #00e9ff;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
.data {
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: 14px;
}
.LogisticsInstruction {
  background-image: url("../../../assets/image/logisticsSituation/instruction.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 45px 55px 45px 55px;
  font-size: 40px;
  color: #00e9ff;
  font-weight: bold;
}
.cont_bottom_cont {
  padding-top: 10px;
  height: calc(40% - 110px);
  display: flex;
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.bottomTab {
  background-image: url("../../../assets/image/homePage/tabBg.png");
  background-size: 100% 100%;
  height: calc(40% - 40px);
  position: absolute;
  bottom: 0;
  margin-top: 10px;
  width: 100%;
  z-index: 10;
}
.headerTitl {
  width: 100%;
  color: #fff;
  padding-top: 10px;
  text-align: center;
}
.left_bot {
  width: 20%;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
}
.right_bot {
  width: 20%;
  margin-top: 60px;

}
.completionrate {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background-image: url("../../../assets/image/homePage/titLabelBg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-left: 20px;
  font-family: PangMenZhengDao-3, PangMenZhengDao;
  font-weight: normal;
  color: #ffffff;
  line-height: 27px;
  letter-spacing: 1px;
}
.taskEng {
  width: 70%;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  padding: 5px;
  border-bottom: 1px transparent solid;
  border-image: linear-gradient(to right, #27cbff, #001e65) 1 10;
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
  border: 15px solid rgba(61, 144, 240, 0.2);
  z-index: 12345;
}
.total {
  display: flex;
  margin: 20px 70px;
}
.jdBack {
  position: relative;
  width: 58%;
  height: 40%;
  background-image: url("../../../assets/image/logisticsSituation/Group 380.png");
  background-size: 100% 100%;
  margin-left: 20%;
  margin-top: 8%;
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
.spanTotal {
  float: right;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 30px 30px;
}
.planMoitHeader {
  margin-top: 10px;
  display: flex;
  padding: 0 10px;
  background-image: url('../../../assets/image/homePage/slPlan.png');
  background-size: 100% 100%;
  justify-content: space-around;
  padding: 20px 30px;
}
.hedRigh {
  color: #fff;
  margin-left: 30px;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-left: 70px;
  font-weight: 500;
}
.numDey {
  color: #27cbff;
  font-size: 24px;
  font-weight: bold;
}
.rightDey {
  color: #1afcb9;
  font-size: 18px;
}
.hedImag {
  margin-top: 25px;
}
.contentPlane {
  width: 100%;
  height: 100%;
  display: flex;
}
.contentPlane_left {
  width: 49%;
  height: 100%;
  text-align: center;
}
.contentPlane_right {
  width: 49%;
  height: 100%;
  text-align: center;
}
.planeNum {
  width: 100%;
  font-size: 16px;
  margin-top: 5px;
  font-weight: 400;
  color: #24caff;
  &.red {
    color: #f94b4b;
  }
}
.cankPla {
  font-size: 18px;
  color: #fff;
}
.goncPla {
  color: #d9ff6f;
  font-size: 16px;
  margin-top: 15px;
}
.jjt {
  position: relative;
  .cangku {
    .el-progress-bar__inner {
      background-color: unset;
      // 将进度条默认的颜色给去除掉，若不生效就再加个!important
      background-image: linear-gradient(
        90deg,
        #049595 0%,
        #6fffbb 50%,
        #049595 100%
      ) !important;
    }
  }
  .stepClas {
    width: 100px;
    height: 105px;
    position: absolute !important;
    height: 80px;
    top: 12px;
    right: 58px;
  }
  .progresNum {
    position: absolute;
    color: #fff;
    font-size: 20px;
    right: 74px;
    top: 35px;
  }
}
.analyLeft {
  width: 33%;
  height: 100%;
}
.analyRight {
  width: 67%;
  height: 100%;
}
.el-progress {
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
.header {
  width: 226px;
  height: 42px;
  background: #011e42;
  border: 1px solid #01387e;
  background-image: url("../../../assets/images/text-bg.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .header_text {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    span {
      font-size: 20px;
      color: #fff;
    }
  }
}
.center_bot {
  width: 60%;
  display: flex;
  justify-content: space-around;
  margin-top: 90px;
  padding:0 100px;
  position:relative;
  height: 65px;
  .item {
    width: 215px;
height: 53px;
    background-image: url("../../../assets/image/homePage/topCentBg.png");
    background-size: 100% 100%;
    .item_box {
        color:#fff;
      margin-top: 10px;
      text-align: center;
      font-size:20px
    }
  }
}
.toPathBt {
  width: 150px;
  height: 50px;
  background-image: url("../../../assets/image/homePage/toScreenInd.png");
  background-size: 100% 100%;
  position: absolute;
  top: 10px !important;
  bottom: auto !important;
  left: 10px;
  //right: 180%;
  &:hover {
    width: 170px;
    height: 80px;
    background-size: 100% 100%;
    background-image: url("../../../assets/image/homePage/hoverDv.png") !important;
    position: absolute;
    top: 545px !important;
    bottom: auto !important;
    right: 178%;
  }
}
.leftHeaderBg {
  width: 120px;
  height: 40px;
  background-image: url("../../../assets/image/homePage/homeBtn.png");
  background-size: 100% 100%;
  position: absolute;
  top: 5px;
  left: 10px;
}
.rightOnu {
  width: 120px;
  height: 40px;
  background-image: url("../../../assets/image/homePage/dynasupervision.png");
  background-size: 100% 100%;
  position: absolute;
  top: 5px;
  right: 420px;
  font-size: 18px;
  color: #fff;
  line-height: 40px;
  &:hover {
    //background-image: url("../../../assets/image/homePage/auxiliary.png");
    //color: #fff;
  }
}
.rightTree {
  width: 120px;
  height: 40px;
  background-image: url("../../../assets/image/homePage/anniu.png");
  background-size: 100% 100%;
  position: absolute;
  top: 5px;
  left: 420px;
  font-size: 18px;
  color: #fff;
  line-height: 40px;
  &:hover {
    //background-image: url("../../../assets/image/homePage/auxiliary.png");
    //color: #fff;
  }
}
.rightTnu {
  width: 120px;
  height: 40px;
  background-image: url("../../../assets/image/homePage/dynasupervision.png");
  background-size: 100% 100%;
  position: absolute;
  top: 5px;
  right: 280px;
  color: #fff;
  font-size: 18px;
  line-height: 40px;
  &:hover {
    //background-image: url("../../../assets/image/homePage/auxiliary.png");
    //color: #fff;
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
.el-progress__text {
  font-size: 22px !important;
}
.statisContent {
  width: 236px;
  height: 45px;
  background-image: url("../../../assets/images/text-bg.png");
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
.close {
  position: absolute;
  //float: right;
  right: 20px;
}
.dialogClick {
  position: absolute;
  //bottom: 260px;
  bottom: 10px;
  padding-left: 40px;
  top: 70px;
  left: 21%;
  width: 79%;
  height: 93%;
  background-image: url("../../../assets/image/content/sliceList.svg");
  background-size: 103% 103%;
  animation: bounceInLeft 1s cubic-bezier(0.215, 0.61, 0.355, 1);
  z-index: 20;
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
  position: absolute;
  bottom: 260px;
  left: 21%;
  width: 58%;
  height: 710px;
  background-image: url("../../../assets/image/content/sliceList.svg");
  background-size: 100% 100%;
  z-index: 10;
  .closea {
    float: right !important;
  }
}
.closea {
  margin-right: 70px;
  margin-top: 10px;
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
  &:hover {
    border: 1px solid #01ffff;
    box-shadow: 0 0 15px #386fcf !important;
  }
  .itemlaner {
    flex: 1;
    text-align: center;
    margin-left: 1px;
  }
}
.cbycitemlaner {
  text-align: center;
  width: 16.6%;
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
  box-shadow: none !important;
  border-radius: 5px 5px 5px 5px;
  opacity: 1;
  border: 1px solid #36aaff;
  color: #fff;
  text-align: center;
  line-height: 40px;

  &:hover {
    box-shadow: inset 0 0 20px 0 #00d1ff !important;
  }
}
.bmct {
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}
::v-deep .el-table th.el-table__cell {
  background: #054480 !important;
  color: #fff;
  border-bottom: 7px solid #002445 !important;
}
.el-table td.el-table__cell {
  //border-bottom: 4px solid #002445 !important;
}
::v-deep .el-table td.el-table__cell {
  background: #094185;
  color: #fff;
  border-bottom: 1px solid #112d82;
}
::v-deep .el-table--enable-row-transition .el-table__body td.el-table__cell {
  background: #094185 !important;
  color: #fff;
  //border-bottom: 2px solid #002445 !important;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  border-top: 1px solid #01ffff;
  border-bottom: 1px solid #01ffff !important;
  background: #094185 !important;
  //box-shadow: 0 0 15px #386fcf inset;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td:first-child {
  border-left: 1px solid #01ffff;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover {
  box-shadow: 0 0 15px #386fcf !important;
  border-bottom: 1px solid #01ffff !important;
  //border-image: linear-gradient(to right bottom, #4636ff, #00e0ff) 1 10;
  & > td {
    background-color: #094185 !important;
  }
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td:last-child {
  border-right: 1px solid #01ffff;
}
::v-deep .el-table::before {
  background: none !important;
}
::v-deep .el-input__inner {
  height: 30px !important;
}
.topEchart {
  height: 30% !important;
}
.botTab {
  height: 57%;
}
.leftHeadeeThree {
  width: 120px;
  height: 40px;
  background-image: url("../../../assets/image/homePage/anniu.png");
  background-size: 100% 100%;
  position: absolute;
  top: 5px;
  left: 290px;
  font-size: 18px;
  color: #fff;
  line-height: 40px;
  &:hover {
    //background-image: url("../../../assets/image/homePage/auxiliary.png");
    //color: #fff;
  }
}
.el-table--enable-row-transition .el-table__body td.el-table__cell {
  border-bottom: none !important;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  border-bottom: 1px solid #01ffff !important;
  background: #09315a !important;
}
.text-decoration {
  text-decoration: underline;
  color: #27cbff;
}
.leftOnDa {
  position: absolute;
  top: 10px;
  left: 30px;
  font-size: 20px;
  color: #fff;
}
.leftTxt {
  font-weight: bold;
  background-image: -webkit-linear-gradient(top, #fff, #ff7e2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 3px #002153);
}
.rightTwo {
  position: absolute;
  top: 10px;
  right: 36px;
  font-size: 14px;
  color: #fff;
}
.leftTitName{
  float:left;
  margin-left:25px;
  font-size: 24px;
}
.detailloK{
  float:right;
  color:#07B0FF;
  font-size:14px
}
.dw{
  font-size: 18px;
}
.orderLeft {
  width: 133px;
  height: 133px;
  border-radius: 50%;
  background: linear-gradient(0deg, #0055FF 0%, #5BD9FF 100%);
  position: relative;
}

.orderLefin {
  position: absolute;
  left: 7px;
  top: 7px;
  width: 119px;
  height: 119px;
  border-radius: 50%;
  background-color: #001125;
}
.YdMonitorLeft{
    width: 133px;
  height: 133px;
  border-radius: 50%;
  background: linear-gradient(0deg, #00B5D3 0%, #FF7E2B 100%);
  position: relative;
}
.orderDetail{
  padding:20px 10px 10px 10px;
  display:flex;
  justify-content:space-around;
}
.orderRight{

}
.orderRightBot{
    margin-top:10px;
}
.orderTopNum{
  font-size: 24px;
  color:#fff;
  width: 138px;
  height: 54px;
  text-align:center;
  line-height:42px;
  background-image:url('../../../assets/image/homePage/ddjka.png')
}
.orderTopTex{
  font-size: 16px;
  text-align: center;
  color:#fff
}
.screenCont{
    display:flex;
    padding:30px 20px
}
.left_top{
}
.leftLeft{
    width: 68px;
    height:80px;
    background-image:url('../../../assets/image/homePage/wztsa.png');
    background-size:100% 100%
}
.logationTop,.logationBot{
    display:flex;
    margin-top:10px;
}
.logatTopLeft{
    display:flex;
    width:70%;
}
.leftRightTxt{
    color:#fff;
    font-size:18px;
}
.leftRightNum{
    color:#fff;
    font-size:24px;
}
.leftRight{
    margin:10px 20px
}
.centBotBotLeft{
    position:absolute;
    bottom:60px;
    left:110px;
    width:253px;
    height:184px;
    background:rgba(10, 59, 137, 0.4);
    border: 1px solid;
border-image: linear-gradient(to right, #207AFF, #3BE1F6) 1;
}
.centBotBotRight{
    position:absolute;
    bottom:60px;
    right:35px;
    width:465px;
    height:184px;
    background:rgba(10, 59, 137, 0.4);
    border: 1px solid;
border-image: linear-gradient(to right, #207AFF, #3BE1F6) 1;
}
</style>
