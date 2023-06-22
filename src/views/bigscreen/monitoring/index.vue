<template>
  <div class="monitoring">
    <div class="top_header">
      <div class="routerBtnClick">
        <div class="leftHeaderBg" @click="toHome"></div>
        <div class="coumn leftHeadeeOne" @click="toLogista">物流态势</div>
        <div class="coumn leftHeadeeTwo" @click="toGlobalMonitoring">
          全域监控
        </div>
        <div class="coumn leftHeadeeThree">全程监控</div>
      </div>
      <div class="">
        <span class="text">全程监控</span>
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
    <div class="cont_main">
      <div class="main_tophead">
        <div class="batchMonitoring" @click="toShowBzpcjk">
          <div class="top_title">
            <div class="taskChin">
              保&nbsp;障&nbsp;批&nbsp;次&nbsp;监&nbsp;控
            </div>
            <div class="taskEng"></div>
          </div>
          <div class="">
            <batchMonitoring></batchMonitoring>
          </div>
        </div>
        <div class="batchMonitoring" @click="toShowJhjkDia">
          <div class="top_title">
            <div class="taskChin">计&nbsp;划&nbsp;监&nbsp;控</div>
            <div class="taskEng"></div>
          </div>
          <div class="contentPlane">
            <div class="contentPlane_left">
              <div style="width: 0; height: 0">
                <svg width="100%" height="100%">
                  <defs>
                    <linearGradient
                      id="write"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style="stop-color: #049595"
                        stop-opacity="0.8"
                      ></stop>
                      // offset 设置起始 stop-color 设置起始位置的颜色
                      <stop
                        offset="100%"
                        style="stop-color: #6fffbb"
                        stop-opacity="1"
                      ></stop>
                      // offset 设置起始 stop-color 设置起始位置的颜色
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="jjt progrea">
                <el-progress
                  define-back-color="#042A72"
                  type="circle"
                  width="150"
                  stroke-width="15"
                  text-color="#fff"
                  :percentage="showConta"
                ></el-progress>
              </div>
              <div class="planeNum" style="margin-top: 15px">
                计划数量(件): &nbsp;&nbsp;
                <div style="color: #6fffbb; font-size: 14px">
                  <animate-number
                    from="1"
                    :to="this.getCkPlanData"
                    :key="this.getCkPlanData"
                  ></animate-number>
                </div>
              </div>
              <div class="planeNum" style="margin-top: 20px">
                完成数量(件): &nbsp;&nbsp;
                <div style="color: #6fffbb; font-size: 14px">
                  <animate-number
                    from="1"
                    :to="this.getCkFinishData"
                    :key="this.getCkFinishData"
                  ></animate-number>
                </div>
              </div>
              <!-- {{Number(this.getCkPlanData).toLocaleString()}} -->
              <div class="cankPla">仓库发物计划</div>
            </div>
            <div class="contentPlane_right">
              <div style="width: 0; height: 0">
                <svg width="100%" height="100%">
                  <defs>
                    <linearGradient
                      id="black"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style="stop-color: #677e09"
                        stop-opacity="0.8"
                      ></stop>
                      // offset 设置起始 stop-color 设置起始位置的颜色
                      <stop
                        offset="100%"
                        style="stop-color: #d9ff6f"
                        stop-opacity="1"
                      ></stop>
                      // offset 设置起始 stop-color 设置起始位置的颜色
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="jjt progreb">
                <el-progress
                  class="progreb"
                  type="circle"
                  define-back-color="#102B68"
                  color="#7A931A"
                  width="150"
                  stroke-width="15"
                  text-color="#fff"
                  :percentage="planFwData"
                >
                  <animate-number
                    from="1"
                    :to="this.completionRate"
                    :key="this.completionRate"
                  ></animate-number>
                </el-progress>
              </div>
              <div class="planeNum" style="margin-top: 15px">
                计划数量(件): &nbsp;&nbsp;<span
                  style="color: #d9ff6f; font-size: 14px"
                  ><animate-number
                    from="1"
                    :to="this.getGwPlanData"
                    :key="this.getGwPlanData"
                  ></animate-number
                ></span>
              </div>
              <div class="planeNum" style="margin-top: 20px">
                完成数量(件): &nbsp;&nbsp;<span
                  style="color: #d9ff6f; font-size: 14px"
                  ><animate-number
                    from="1"
                    :to="this.getGwFinishData"
                    :key="this.getGwFinishData"
                  ></animate-number
                ></span>
              </div>
              <!-- </animate-number>{{Number(this.getGwFinishData).toLocaleString()}}</span> -->
              <div class="goncPla">工场发物计划</div>
            </div>
          </div>
        </div>
        <div class="batchMonitoring" @click="toShowYdjkDia">
          <div class="top_title">
            <div class="taskChin">运&nbsp;单&nbsp;监&nbsp;控</div>
            <div class="taskEng"></div>
          </div>
          <div class="">
            <corderMonitor></corderMonitor>
          </div>
        </div>
      </div>
      <div class="main_bot">
        <div class="materialMonitoring">
          <div class="top_title">
            <!-- @click="toShowWzjkDia" -->
            <div class="taskChin">物&nbsp;资&nbsp;监&nbsp;控</div>
            <div class="taskEng"></div>
          </div>
          <div class="">
            <suppliesList @passParam="toShowWzjkDia"></suppliesList>
          </div>
        </div>
        <div class="materialMonitoring" @click="toShowSjfxDia">
          <div class="top_title">
            <div class="taskChin">统&nbsp;计&nbsp;分&nbsp;析</div>
            <div class="taskEng"></div>
          </div>
          <div class="" style="display: flex">
            <div class="analyLeft">
              <span style="color: #01ffff; font-size: 16px; margin-left: 60px"
                >总体进度</span
              >
              <progressTotal></progressTotal>
            </div>
            <div class="analyRight">
              <span style="color: #01ffff; font-size: 16px; margin-left: 60px"
                >保障趋势分析</span
              >
              <analysisOfData></analysisOfData>
            </div>
          </div>
        </div>
      </div>
      <!-- 物资监控弹出框tab列表 -->
      <!-- 物资监控弹出框 -->
      <div class="dialogClick" v-if="clickShowDiaWzjk">
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
            <el-form>
              <el-row :gutter="40">
                <el-col :md="8">
                  <el-form-item label="机构编号">
                    <el-input
                      v-model="formWzjkValue.jgbh"
                      style="width: 60%"
                      placeholder="请输入机构编号"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="9">
                  <el-form-item label="仓储中心名字">
                    <el-select
                      style="z-index: 2555"
                      placeholder="请选择"
                      v-model="formWzjkValue.cczxmz"
                      @change="currWorkTypeChange"
                    >
                      <el-option
                        style="z-index: 2555"
                        v-for="item in cczxmz"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="3">
                  <div class="btnSty" @click="handleWzjkcSearch">查询</div>
                </el-col>
              </el-row>
            </el-form>
            <!-- <div class="titlehead">
                    <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                        <div class="cbycitemlaner">机构编码</div>
                    <div class="cbycitemlaner">仓储中心名称</div>
                    <div class="cbycitemlaner">品名代码</div>
                    <div class="cbycitemlaner">物资品名</div>
                    <div class="cbycitemlaner">号型</div>
                    <div class="cbycitemlaner">正常库存余量</div>
                    <div class="cbycitemlaner">异常库存余量</div>
                    <div class="cbycitemlaner">待运输物资</div>
                    </div>
            </div> -->
            <!-- <div class="mainLisy">
                <div class="mainListItem" v-for="item in getWzjkData">
                    <div class="cbycitemlaner contentOver" :title="item.baseCode">{{item.baseCode }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.name">{{item.name}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.pmCode">{{item.pmCode}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.pm">{{item.pm}}</div>
                    <div class="cbycitemlaner">{{item.hx}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.num">{{item.num}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.ycsl">{{item.ycsl }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.dysl">{{item.dysl }}</div>
                </div> -->
            <template>
              <el-table :data="getWzjkData" style="width: 100%">
                <el-table-column
                  prop="baseCode"
                  label="机构编码"
                  width="260"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="仓储中心名称"
                  width="480"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="pmCode"
                  label="品名代码"
                  width="380"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="pm"
                  label="物资品名"
                  width="410"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="hx"
                  label="号型"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="正常库存余量"
                  width="380"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="ycsl"
                  label="异常库存余量"
                  width="260"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="dysl"
                  label="待运输物资"
                  width="260"
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
      <!-- 保障批次监控 -->
      <div class="dialogClick" v-if="clickShowDiaBzpcjk">
        <div class="close" @click="hiddenDetail" style="">
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
            <el-form>
              <el-row :gutter="40">
                <el-col :md="8">
                  <el-form-item label="批次号">
                    <el-input
                      v-model="formBzpcjkValue.pch"
                      style="width: 60%"
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
                    <div class="cbycitemlaner contentOver" :title="item.receiveUnit">{{item.receiveUnit }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.sendFromUnit">{{item.sendFromUnit}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.materialCode">{{item.materialCode}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.material">{{item.material}}</div>
                    <div class="cbycitemlaner">{{item.num}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.credentialCode">{{item.credentialCode}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.credential">{{item.credential }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.signDate">{{item.signDate }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.batchNo">{{item.batchNo }}</div>
                    <div class="cbycitemlaner">{{item.finStatus}}</div>
                </div> -->
            <template>
              <el-table :data="getBzpcjkData" style="width: 100%">
                <el-table-column
                  prop="receiveUnit"
                  label="受供单位"
                  width="310"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="sendFromUnit"
                  label="发物单位"
                  width="260"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="materialCode"
                  label="品名代码"
                  width="260"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="material"
                  label="物资品名"
                  width="260"
                  :show-overflow-tooltip="true"
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
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="credential"
                  label="凭证字"
                  width="260"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="signDate"
                  label="签发日期"
                  width="260"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="batchNo"
                  label="批次号"
                  width="260"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="finStatus"
                  label="状态"
                  width="260"
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

      <!-- 运单监控弹出框 -->
      <div class="dialogClick" v-if="clickShowDiaYdjk" style="">
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
            <el-form>
              <el-row :gutter="40">
                <el-col :md="9">
                  <el-form-item label="订单状态">
                    <el-select
                      placeholder="请选择"
                      clearable
                      style="z-index: 2550"
                      v-model="formYdjkValue.ddStatu"
                      @change="currDdStatuChange"
                    >
                      <el-option
                        v-for="item in getDdStatuList"
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
                        <div class="cbycitemlaner">收物单位</div>
                    <div class="cbycitemlaner">发物单位</div>
                    <div class="cbycitemlaner">品名代码</div>
                    <div class="cbycitemlaner">物资品名</div>
                    <div class="cbycitemlaner">需求量</div>
                    <div class="cbycitemlaner">凭证号</div>
                    <div class="cbycitemlaner">凭证字</div>
                    <div class="cbycitemlaner">签发日期</div>
                    <div class="cbycitemlaner">状态</div>
                    </div>
            </div> -->
            <!-- <div class="mainLisy">
                <div class="mainListItem" v-for="item in getYdjkData">
                    <div class="cbycitemlaner contentOver" :title="item.receiveUnit">{{item.receiveUnit }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.sendFromUnit">{{item.sendFromUnit}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.materialCode">{{item.materialCode}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.material">{{item.material}}</div>
                    <div class="cbycitemlaner">{{item.num}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.credentialCode">{{item.credentialCode}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.credential">{{item.credential }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.signDate">{{item.signDate }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.finStatus">{{item.finStatus }}</div>
                </div> -->
            <template>
              <el-table :data="getYdjkData" style="width: 100%">
                <el-table-column
                  prop="receiveUnit"
                  label="收物单位"
                  width="260"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="sendFromUnit"
                  label="发物单位"
                  width="260"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="materialCode"
                  label="品名代码"
                  width="260"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="material"
                  label="物资品名"
                  width="260"
                  :show-overflow-tooltip="true"
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
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="credential"
                  label="凭证字"
                  width="260"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="signDate"
                  label="签发日期"
                  width="260"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="finStatus"
                  label="状态"
                  width="260"
                  align="center"
                >
                </el-table-column>
              </el-table>
              <el-pagination
                class="pageAtion"
                background
                layout="prev, pager, next"
                :total="ydjkTotal"
                :page-size="7"
                @size-change="handleSizeYdjkChange"
                @current-change="handleCurrentYdjkChange"
              >
              </el-pagination>
            </template>
            <!-- </div> -->
          </div>
        </div>
      </div>

      <!-- 数据分析弹出框 -->
      <div class="dialogClick" v-if="clickShowDiaSjfx" style="height: 80%">
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
            <el-form>
              <el-row :gutter="28">
                <el-col :md="6">
                  <el-form-item label="收物单位">
                    <el-input
                      v-model="formSjfxValue.sjtjswdw"
                      style="width: 60%"
                      placeholder="请输入收物单位"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="6">
                  <el-form-item label="物资品名">
                    <el-select
                      placeholder="请选择"
                      clearable
                      style="width: 60%"
                      v-model="formSjfxValue.sjtjwzpm"
                      @change="currWorkTypeChange"
                    >
                      <el-option
                        v-for="item in getWzpmNameData"
                        :key="item.material"
                        :label="item.material"
                        :value="item.material"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="6">
                  <el-form-item label="凭证号">
                    <el-input
                      v-model="formSjfxValue.sjtjpzh"
                      style="width: 60%"
                      placeholder="请输入凭证号"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :md="6">
                  <el-form-item label="保障单位">
                    <el-input
                      v-model="formSjfxValue.sjtjbzdw"
                      style="width: 60%"
                      placeholder="请输入保障单位"
                    />
                  </el-form-item>
                </el-col>
                <el-col :md="3" style="float: right; margin-right: 195px">
                  <div class="btnSty" @click="handleSjtjSearch">查询</div>
                </el-col>
              </el-row>
            </el-form>
            <!-- <div class="titlehead" style="margin-top: 5px;">
                    <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                    <div class="cbycitemlaner">收物单位</div>
                    <div class="cbycitemlaner">保障单位</div>
                    <div class="cbycitemlaner">品名代码</div>
                    <div class="cbycitemlaner">物资品名</div>
                    <div class="cbycitemlaner">保障量</div>
                    <div class="cbycitemlaner">凭证号</div>
                    <div class="cbycitemlaner">凭证字</div>
                    <div class="cbycitemlaner">签发日期</div>
                    </div>
            </div> -->
            <!-- <div class="mainLisy">
                <div class="mainListItem" v-for="item in getSjfxData">
                    <div class="cbycitemlaner contentOver" :title="item.recipientUnit">{{item.recipientUnit }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.sendFromUnit">{{item.sendFromUnit}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.materialCode">{{item.materialCode}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.material">{{item.material}}</div>
                    <div class="cbycitemlaner">{{item.num}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.credentialCode">{{item.credentialCode}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.credential">{{item.credential }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.signDate">{{item.signDate }}</div>
                </div> -->
            <template>
              <el-table :data="getSjfxData" style="width: 100%">
                <el-table-column
                  prop="recipientUnit"
                  label="收物单位"
                  width="460"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="sendFromUnit"
                  label="保障单位"
                  width="480"
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
                  width="410"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="保障量"
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
                  width="360"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="signDate"
                  label="签发日期"
                  width="360"
                  align="center"
                >
                </el-table-column>
              </el-table>
              <el-pagination
                class="pageAtion"
                background
                layout="prev, pager, next"
                :total="sjfxTotal"
                :page-size="7"
                @size-change="handleSizeSjfxChange"
                @current-change="handleCurrentSjfxChange"
              >
              </el-pagination>
            </template>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <!-- 计划监控弹框列表 -->
      <div class="dialogClick" v-if="showJhjkDia">
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
            <jhjkDialog></jhjkDialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import gsap from "gsap";
import monitoringAPI from "@/api/modules/monitoring";
import batchMonitoring from "@/views/bigscreen/monitoring/component/batchMonitoring";
import corderMonitor from "@/views/bigscreen/monitoring/component/corderMonitor";
import suppliesList from "@/views/bigscreen/monitoring/component/suppliesList";
import analysisOfData from "@/views/bigscreen/monitoring/component/analysisOfData";
import progressTotal from "@/views/bigscreen/monitoring/component/progressTotal";
import jhjkDialog from "@/views/bigscreen/monitoring/component/jhjkDialog";
export default {
  computed: {
    ...mapGetters(["roles"]),
  },
  name: "monitoring",
  components: {
    batchMonitoring,
    corderMonitor,
    suppliesList,
    progressTotal,
    analysisOfData,
    jhjkDialog,
  },
  data() {
    return {
      formWzjkValue: {
        jgbh: "",
        cczxmz: "",
        page: 1,
        pageSize: 7,
      },
      formSjfxValue: {
        page: 1,
        pageSize: 7,
        sjtjswdw: "",
        sjtjbzdw: "",
        sjtjwzpm: "",
        sjtjpzh: "",
      },
      formBzpcjkValue: {
        page: 1,
        pageSize: 7,
        pch: "",
      },
      formYdjkValue: {
        page: 1,
        pageSize: 7,
        ddStatu: "",
      },
      getWzjkData: [],
      getBzpcjkData: [],
      getWzpmNameData: [],
      getDdStatuList: [
        {
          value: 0,
          name: "未下发",
        },
        {
          value: 1,
          name: "已下发",
        },
        {
          value: 2,
          name: "已提货",
        },
        {
          value: 3,
          name: "已入库",
        },
        {
          value: 4,
          name: "出库中",
        },
        {
          value: 5,
          name: "已出库",
        },
        {
          value: 6,
          name: "运输中",
        },
        {
          value: 7,
          name: "派送中",
        },
        {
          value: 8,
          name: "已签收",
        },
        {
          value: -1,
          name: "异常",
        },
      ],
      getYdjkData: [],
      sonParam: "",
      getSjfxData: [],
      cczxmz: [],
      dialogTitle: "",
      clickShowDiaWzjk: false,
      clickShowDiaBzpcjk: false,
      clickShowDiaYdjk: false,
      clickShowDiaSjfx: false,
      showJhjkDia: false,
      wzjkTotal: 0,
      ydjkTotal: 0,
      sjfxTotal: 0,
      showNumber: 0,
      number: 20,
      planNumer: 0,
      finisNumer: 0,
      planFw: 0,
      getPlanNum: 30000,
      getFinishNum: 550000,
      getPlanFwData: 60,
      getCkPlanData: "",
      getCkFinishData: "",
      getGwPlanData: "",
      getGwFinishData: "",
    };
  },
  computed: {
    // showConta() {
    //   return this.showNumber.toFixed(0);
    // },
    planNum() {
      return this.planNumer.toFixed(0);
    },
    finishNum() {
      return this.finisNumer.toFixed(0);
    },
    // planFwData(){
    //   return this.planFw.toFixed(0);
    // },
  },
  created() {
    this.getUserData = this.$store.state.user.sidebar.roles;
    console.log(this.getUserData, "................................");
    this.getJhjkData();
    this.getCczxmzData();
    this.getWzpmNameDataa();
  },
  mounted() {
    gsap.to(this, {
      duration: 5,
      showNumber: this.number,
      planNumer: this.getPlanNum,
      finisNumer: this.getFinishNum,
      planFw: this.getPlanFwData,
    });
  },
  //   watch: {
  //     number(newVal) {
  //       gsap.to(this, {
  //         duration: 5,
  //         showConta: newVal,
  //       });
  //     },
  //     getPlanNum(newVal) {
  //       gsap.to(this, {
  //         duration: 5,
  //         showConta: newVal,
  //       });
  //     },
  //     getFinishNum(newVal) {
  //       gsap.to(this, {
  //         duration: 5,
  //         showConta: newVal,
  //       });
  //     },
  //     planFwData(newVal){
  //         gsap.to(this, {
  //         duration: 5,
  //         showConta: newVal,
  //       });
  //     }
  //   },
  methods: {
    getParam(param) {
      // 4. 用getParam方法处理子组件传递过来的数据
      this.sonParam = param;
      console.log(this.sonParam, "this.sonParamthis.sonParamthis.sonParam");
      this.clickShowDiaWzjk = true;
    },
    handleSjtjSearch() {
      (this.formWzjkValue.page = 1), this.toShowSjfxDia();
    },
    getWzpmNameDataa() {
      monitoringAPI.getWzpmNameListData({}).then((res) => {
        this.getWzpmNameData = res.list;
        console.log(
          this.getWzpmNameData,
          "this.getWzpmNameDatathis.getWzpmNameDatathis.getWzpmNameDatathis.getWzpmNameData"
        );
      });
    },
    handleWzjkcSearch() {
      this.formWzjkValue.page = 1;
      this.toShowWzjkDia();
    },
    currDdStatuChange() {},
    handleBzpcjkSearch() {
      this.formSjfxValue.page = 1;
      this.toShowBzpcjk();
    },
    handleSizeSjfxChange(val) {
      this.formSjfxValue.pageSize = val;
      this.toShowSjfxDia();
    },
    handleCurrentSjfxChange(val) {
      this.formSjfxValue.page = val;
      this.toShowSjfxDia();
    },
    getCczxmzData() {
      monitoringAPI.getcczxmzListData({}).then((res) => {
        this.cczxmz = res.list;
      });
    },
    toShowJhjkDia() {
      this.showJhjkDia = true;
      this.dialogTitle = "计划监控";
      this.clickShowDiaWzjk = false;
      this.clickShowDiaBzpcjk = false;
      this.clickShowDiaYdjk = false;
      this.clickShowDiaSjfx = false;
    },
    toShowSjfxDia() {
      this.clickShowDiaSjfx = true;
      this.clickShowDiaWzjk = false;
      this.clickShowDiaBzpcjk = false;
      this.clickShowDiaYdjk = false;
      this.showJhjkDia = false;
      this.dialogTitle = "统计分析";
      let param = {
        page: this.formSjfxValue.page,
        pageSize: this.formSjfxValue.pageSize,
        m: {
          recipientUnit: this.formSjfxValue.sjtjswdw,
          sendFromUnit: this.formSjfxValue.sjtjbzdw,
          material: this.formSjfxValue.sjtjwzpm,
          credentialCode: this.formSjfxValue.sjtjpzh,
        },
      };
      monitoringAPI.getzjfxListData(param).then((res) => {
        this.getSjfxData = res.pd.rows;
        this.sjfxTotal = res.pd.total;
      });
    },
    handleSizeYdjkChange(val) {
      this.formYdjkValue.pageSize = val;
      this.toShowYdjkDia();
    },
    handleCurrentYdjkChange(val) {
      this.formYdjkValue.page = val;
      this.toShowYdjkDia();
    },
    toShowYdjkDia() {
      this.clickShowDiaYdjk = true;
      this.clickShowDiaSjfx = false;
      this.clickShowDiaWzjk = false;
      this.clickShowDiaBzpcjk = false;
      this.showJhjkDia = false;
      this.dialogTitle = "运单监控";
      let param = {
        page: this.formYdjkValue.page,
        pageSize: this.formYdjkValue.pageSize,
        m: {
          finStatus: this.formYdjkValue.ddStatu,
        },
      };
      monitoringAPI.getYdjkListData(param).then((res) => {
        this.getYdjkData = res.pd.rows;
        this.ydjkTotal = res.pd.total;
      });
    },
    handleSizeBzpcjkChange(val) {
      this.formBzpcjkValue.pageSize = val;
      this.toShowBzpcjk();
    },
    handleCurrentBzpcjkChange(val) {
      this.formBzpcjkValue.page = val;
      this.toShowBzpcjk();
    },
    toShowBzpcjk() {
      this.clickShowDiaBzpcjk = true;
      this.clickShowDiaYdjk = false;
      this.clickShowDiaSjfx = false;
      this.clickShowDiaWzjk = false;
      this.showJhjkDia = false;
      this.dialogTitle = "保障批次监控";
      let param = {
        page: this.formBzpcjkValue.page,
        pageSize: this.formBzpcjkValue.pageSize,
        m: {
          batchNo: this.formBzpcjkValue.pch,
        },
      };
      monitoringAPI.getBzpcjkListData(param).then((res) => {
        this.getBzpcjkData = res.pd.rows;
        this.bzpcjkTotal = res.pd.total;
      });
    },
    toShowWzjkDia(param) {
      this.sonParam = param;
      (this.clickShowDiaWzjk = true), (this.clickShowDiaYdjk = false);
      this.clickShowDiaSjfx = false;
      this.clickShowDiaBzpcjk = false;
      this.showJhjkDia = false;
      this.dialogTitle = "物资监控";
      let params = {
        page: this.formWzjkValue.page,
        pageSize: this.formWzjkValue.pageSize,
        m: {
          name: this.formWzjkValue.cczxmz,
          baseCode: this.formWzjkValue.jgbh,
        },
      };
      monitoringAPI.getWzjkListData(params).then((res) => {
        this.getWzjkData = res.pd.rows;
        this.wzjkTotal = res.pd.total;
      });
    },
    currWorkTypeChange() {},
    handleWzjkSearch() {
      this.formWzjkValue.page = 1;
      this.toShowYdjkDia();
    },
    handleSizeWzjkChange(val) {
      this.formWzjkValue.pageSize = val;
      this.toShowWzjkDia();
    },
    handleCurrentWzjkChange(val) {
      this.formWzjkValue.page = val;
      this.toShowWzjkDia();
    },
    hiddenDetail() {
      this.clickShowDiaWzjk = false;
      this.clickShowDiaBzpcjk = false;
      this.clickShowDiaYdjk = false;
      this.clickShowDiaSjfx = false;
      this.showJhjkDia = false;
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
    // toMointor() {
    //   if (this.getUserData.includes("130")) {
    //     this.$router.push("/monitoring");
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: "没有权限!",
    //     });
    //   }
    // },
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
    toMonitoring() {},
    getJhjkData() {
      monitoringAPI.getJhjkData().then((res) => {
        // this.getCkPlanData=res.m.ckjh
        this.getCkPlanData = res.m.ckjh;
        this.getCkFinishData = res.m.ckwc;
        this.getGwPlanData = res.m.gcjh;
        this.getGwFinishData = res.m.gcwc;
        this.showConta = res.m.ckRate;
        this.planFwData = res.m.gcRate;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.monitoring {
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
  background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
  color: #fff;
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
.cont_main {
  height: 100%;
  padding: 30px;
}
.main_tophead {
  display: flex;
  justify-content: space-between;
  height: 46%;
}
.main_bot {
  display: flex;
  justify-content: space-between;
  height: 47%;
  margin: 10px 0;
}
.batchMonitoring {
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 33%;
}
.materialMonitoring {
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 49%;
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
.contentPlane {
  width: 100%;
  height: 100%;
  display: flex;
}
.contentPlane_left {
  width: 49%;
  height: 100%;
  padding: 30px 50px 0 100px;
  text-align: center;
}
.contentPlane_right {
  width: 49%;
  height: 100%;
  padding: 30px 100px 0 50px;
  text-align: center;
}
.planeNum {
  width: 100%;
  color: #fff;
  display: flex;
  font-size: 16px;
  margin-top: -5px;
  height: 20px;
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
.cankPla {
  color: #6dfdbb;
  font-size: 16px;
  margin-top: 15px;
}
.goncPla {
  color: #d9ff6f;
  font-size: 16px;
  margin-top: 15px;
}
.jjt {
  .cangku {
    .el-progress-bar__inner {
      background-color: unset;
      // 将进度条默认的颜色给去除掉，若不生效就再加个!important
      background-image: linear-gradient(
        90deg,
        #049595 0%,
        #6fffbb 50%,
        #049595 100%
      );
    }
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
.pie {
  display: inline-block;
  position: relative;
  width: 150px;
  height: 150px;
  margin-top: 40px;
  border-radius: 50%;
  background: #ccc;
  background-image: linear-gradient(to right, transparent 50%, #4479fd 0);
  color: transparent;
  text-align: center;
}
.pie::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  border-radius: 0 100% 100% 0 / 50%;
  background-color: inherit;
  transform-origin: left;
  animation: spin 5s linear infinite, bg 10s step-end infinite;
}
@keyframes spin {
  to {
    transform: rotate(0.5turn);
  }
}
@keyframes bg {
  50% {
    background: #4479fd;
  }
}
.dialogClick {
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
::v-deep .el-table::before {
  background: none !important;
}
</style>