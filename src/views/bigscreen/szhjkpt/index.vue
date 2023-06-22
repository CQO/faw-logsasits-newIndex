<template>
    <div class="powerDeployment">
      <!-- 地图 -->
      <div class="mapContent">
          <map3d></map3d>
      </div>
      <!-- 地图 end -->
      <div class="top_header">
        <span class="text"
          >数&nbsp;字&nbsp;化&nbsp;监&nbsp;控&nbsp;平&nbsp;台</span
        >
        <!-- <div class="rightTree" @click="toMainjsp">业务管理</div>
        <div class="rightOnu" @click="toLogsitio">动态监管</div>
        <div class="rightTnu" @click="toXqfx">辅助决策</div> -->
      </div>
      <!-- <div class="content_main">
          </div> -->
      <!-- <div class="cont_top_cont" style="">
              </div> -->
        <div class="left_bot">
          <div class="left_top" style="height: 50%;">
            <div class="completionrate">
              <div class="taskChin">作&nbsp;业&nbsp;量&nbsp;统&nbsp;计</div>
              <div class="taskEng">WORK VOLUME STATISTICS</div>
            </div>
            <div class="" style="padding: 0 20px;">
              <div class="" style="display: flex; float: right; margin-top: 10px;">
                <div class="niank">年</div>
                <div class="niank">月</div>
                <div class="niank">日</div>
              </div>
              <div class="">
                <zyltj></zyltj>
              </div>
            </div>
          </div>
          <div class="left_top" style="height: 50%; margin-top: 10px;" @click="showDdjkDia">
            <div class="completionrate" style="padding-bottom: 0;">
              <div class="taskChin">电&nbsp;子&nbsp;秤&nbsp;作&nbsp;业&nbsp;监&nbsp;控</div>
              <div class="taskEng">JOB MONITORING</div>
            </div>
            <div style="padding: 0 10px;">
              <div class="dzcTopCont">
                <div class=" dzcItem dzcItema">
                  <div class="imger">
                    <img src="../../../assets/image/smallHomePage/spacea.png" alt="">
                  </div>
                  <div class="dvt">
                    <div>#1电子秤</div>
                    <div style="margin-top: 5px;">重量: <span class="speciText">0.25</span> <span style="color: rgba(255, 255, 255, 0.7);">吨</span></div>
                  </div>
                </div>
                <div class="dzcItem dzcItemb">
                  <div class="imger">
                    <img src="../../../assets/image/smallHomePage/worka.png" alt="">
                  </div>
                  <div class="dvt">
                    <div>#2电子秤</div>
                    <div style="margin-top: 5px;">重量: <span class="speciText">0.25</span> <span style="color: rgba(255, 255, 255, 0.7);">吨</span></div>
                  </div>
                </div>
              </div>
              <div class="dzcTopCont">
                <div class="dzcItem dzcItemc">
                  <div class="imger">
                    <img src="../../../assets/image/smallHomePage/dxa.png" alt="">
                  </div>
                  <div class="dvt">
                    <div>#3电子秤</div>
                    <div style="margin-top: 5px;">重量: <span class="speciText">0.25</span> <span style="color: rgba(255, 255, 255, 0.7);">吨</span></div>
                  </div>
                </div>
                <div class="dzcItem dzcItema">
                  <div class="imger">
                    <img src="../../../assets/image/smallHomePage/spacea.png" alt="">
                  </div>
                  <div class="dvt">
                    <div>#4电子秤</div>
                    <div style="margin-top: 5px;">重量: <span class="speciText">0.25</span> <span style="color: rgba(255, 255, 255, 0.7);">吨</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="center_bot" style="width: 50%;">    
            </div> -->
        <div class="center_bot_header" style="padding-top: 10px;">
          <div style='width: 70%; display: flex; padding-left: 30px;'>
            <span style='color: #fff; font-size: 18px; line-height: 50px;'>
              累计库存总量：
            </span>
            <div class="box-item">
              <li :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
                v-for="(item,index) in orderNum"
                :key="index">
                  <span v-if="!isNaN(item)">
                    <i ref="numberItem">0123456789</i>
                  </span>
                <span class="comma" v-else>{{item}}</span>
              </li>
            </div>
          </div>
          <div class="" style="float: right; width: 30%; display: flex;">
            <div class="" style=" margin-right: 30px;">
              <div style="color: #fff; font-size: 16px;">月入库量/吨</div>
              <div style="color: #7bffff; font-size: 30px;">78.799</div>
            </div>
            <div class="">
              <div style="color: #fff; font-size: 16px;">月出库量/吨</div>
              <div style="color: #62f3b7; font-size: 30px;">78.799</div>
            </div>
          </div>
        </div>
        <div class="right_bot">
          <!-- <div class=""> -->
            <div class="left_top" style="height: 50%;" @click="showHyzsDia">
              <div class="completionrate" style="padding-bottom: 10px;">
                <div class="taskChin">库&nbsp;存&nbsp;物&nbsp;资&nbsp;结&nbsp;构&nbsp;图</div>
                <div class="taskEng">INVEVTORY STRUCTURE</div>
              </div>
              <div style="height: 100%;">
                <!-- <FreightIndex /> -->
                <kcwzjgt></kcwzjgt>
              </div>
            </div>
            <div class="left_top" style="height: 48%; margin-top: 10px; margin-bottom: 10px;"  @click="showDetail">
              <div class="completionrate" style="margin-bottom: -10px;">
                <div class="taskChin">实&nbsp;时&nbsp;装&nbsp;卸&nbsp;动&nbsp;态</div>
                <div class="taskEng">REAL TIME DYNAMIC</div>
              </div>
              <div class="contentPlane">
                <div class="sszxdtItem">
                  <div class="sszxdtatopa sszxdtatop">80，000</div>
                  <div class="sszxdtatoptxt sszxdtatoptxta">待入库(件)</div>
                </div>
                <div class="sszxdtItem">
                  <div class="sszxdtatop sszxdtatopb">80，000</div>
                  <div class="sszxdtatoptxt sszxdtatoptxtb">待出库(件)</div>
                </div>
                <div class="sszxdtItem">
                  <div class="sszxdtatop sszxdtatopc">80，000</div>
                  <div class="sszxdtatoptxt sszxdtatoptxtc">待放行(件)</div>
                </div>
              </div>
            </div>
          </div>
          <div class="cont_bottom_cont" style="" v-if="noneClick">
            
            <div class="left_top" style="width: 25%;" @click="showWltsfxDia">
              <div class="completionrate" style="display: flex;">
                <div class="taskChin">运输统计</div>
                <div class="taskEng">TRANSPORTATION STATISTICS</div>
              </div>
              <div style="height: 100%; padding: 0 20px;">
                <div class="transportTop">
                  <div style="width: 100%;">
                    <div class="transpItema">
                      <span style="margin-left: 30px;">汽 车</span>
                      <span style="float: right;">
                        <img src="../../../assets/image/smallHomePage/transporta.png" alt="" style="margin-right: 10px; height: 30px;">
                      </span>
                    </div>
                    <div class="bt"></div>
                    <div class="transpItemb">
                      <div>
                        <div class="brdd">本日-到达</div>
                        <div class="wj"> <span class="speciTxt">10000</span>万件 </div>
                      </div>
                      <div>
                        <div class="brdd">本日-到达</div>
                        <div class="wj"> <span class="speciTxt">10000</span>万件 </div>
                      </div>
                      <div>
                        <div class="brdd">本日-到达</div>
                        <div class="wj"> <span class="speciTxt">10000</span>万件 </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="transportTop" style="margin-top: 30px;">
                  <div style="width: 100%;">
                    <div class="transpItema">
                      <span style="margin-left: 30px;">火 车</span>
                      <span style="float: right;">
                        <img src="../../../assets/image/smallHomePage/transporta.png" alt="" style="margin-right: 10px; height: 30px;">
                      </span>
                    </div>
                    <div class="bt"></div>
                    <div class="transpItemb">
                      <div>
                        <div class="brdd">本日-到达</div>
                        <div class="wj"> <span class="speciTxtc">10000</span>万件 </div>
                      </div>
                      <div>
                        <div class="brdd">本日-到达</div>
                        <div class="wj"> <span class="speciTxtc">10000</span>万件 </div>
                      </div>
                      <div>
                        <div class="brdd">本日-到达</div>
                        <div class="wj"> <span class="speciTxtc">10000</span>万件 </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="center_top">
              <div class="completionrate">
                <div class="taskChin" style="height: 40px;">库&nbsp;区&nbsp;作&nbsp;业&nbsp;统&nbsp;计</div>
                <div class="taskEng" style="height: 40px;">OPERATION TIME</div>
              </div>
              <div>
                <kqzytj></kqzytj>
              </div>
            </div>
            <div class="left_top" style="width: 25%;" @click="showZdlfxDia">
              <div class="completionrate">
                <div class="taskChin">入&nbsp;库&nbsp;车&nbsp;辆&nbsp;作&nbsp;业&nbsp;用&nbsp;时</div>
                <div class="taskEng">OPERATION TIME</div>
              </div>
              <div>
                <!-- <PunctualityAnalysis/> -->
                <!-- <punctSys></punctSys> -->
                <rkclzyys></rkclzyys>
              </div>
            </div>
          </div>
          <div class="bottomTab" v-if="clickYd">
            <div class="close" @click="hiddenDetail">
              <img src="../../../assets/image/homePage/closeBtn.png" alt="">
            </div>
            <div class="headerTitl">运单监控</div>
            <div class="tabList">
              <!-- <tabList></tabList> -->
            </div>
          </div>
          <!-- 计划精申列表弹出框-->
      <div class="dialogClick" v-if="clickShowDiaJs">
        <div class="close" @click="hiddenDetaila">
            <img src="../../../assets/image/homePage/closeBtn.png" alt="">
          </div>
        <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
            <span style="color: #fff;">{{dialogTitle}}</span>
        </div>
        <div class="tabTdList">
            <div class="" style="">
              <el-form>
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
      @size-change="handleSizeJsChange" @current-change="handleCurrentJsChange">
    </el-pagination>
                </div>
            </div>
        </div>
    </div>
    <!-- 计划列表弹出框 -->
    <div class="dialogClick" v-if="clickShowDiaPlanJh">
      <div class="close" @click="hiddenDetaila">
          <img src="../../../assets/image/homePage/closeBtn.png" alt="">
        </div>
      <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
          <span style="color: #fff;">{{dialogTitle}}</span>
      </div>
      <div class="tabTdList">
          <div class="" style="">
            <el-form>
              <el-row :gutter="40">
                <el-col :md="10">
                  <el-form-item label="批号">
                    <el-input v-model="formJsValue.ph" style="width: 80%;" placeholder="请输入订单号"/>
                  </el-form-item>
                </el-col>
                <el-col :md="10">
                  <el-form-item label="品名">
                    <el-input v-model="formJsValue.pm" style="width: 80%;" placeholder="请输入订单号"/>
                  </el-form-item>
                </el-col>
                <el-col :md="3">
                  <div class="btnSty" @click="handleJhSearch">查询</div>
                </el-col>
              </el-row>
            </el-form>
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
    @size-change="handleSizeJhChange" @current-change="handleCurrentJhChange">
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
    <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
        <span style="color: #fff;">{{dialogTitle}}</span>
    </div>
    <div class="tabTdList">
        <div class="" style="">
          <el-form>
            <el-row :gutter="40">
              <el-col :md="10">
                <el-form-item label="凭证号">
                  <el-input v-model="formJsValue.pzh" clearable style="width: 80%;" placeholder="请输入订单号"/>
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
    <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
        <span style="color: #fff;">{{dialogTitle}}</span>
    </div>
    <div class="tabTdList">
        <div class="" style="">
            <wltsfx></wltsfx>
        </div>
    </div>
  </div>
  <!-- 仓储监控弹出框 -->
  <div class="dialogClick" v-if="clickShowDiaCcjk">
    <div class="close" @click="hiddenDetaila">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="">
      </div>
    <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
        <span style="color: #fff;">{{dialogTitle}}</span>
    </div>
    <div class="tabTdList">
        <div class="" style="">
            <Ccjk></Ccjk>
        </div>
    </div>
  </div>
  <!-- 设备监控弹出框 -->
  <div class="dialogClick" v-if="clickShowDiaSbjk">
    <div class="close" @click="hiddenDetaila">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="">
      </div>
    <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
        <span style="color: #fff;">{{dialogTitle}}</span>
    </div>
    <div class="tabTdList">
        <div class="" style="">
            <Sbjk></Sbjk>
        </div>
    </div>
  </div>
  <!-- 货运指数弹出框 -->
  <div class="dialogClick" v-if="clickShowDiaHyzs">
    <div class="close" @click="hiddenDetaila">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="">
      </div>
    <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
        <span style="color: #fff;">{{dialogTitle}}</span>
    </div>
    <div class="tabTdList">
        <div class="" style="">
            <Hyzs></Hyzs>
        </div>
    </div>
  </div>
  <!-- 准点率分析弹出框 -->
  <div class="dialogClick" v-if="clickShowDiaZdlfx">
    <div class="close" @click="hiddenDetaila">
        <img src="../../../assets/image/homePage/closeBtn.png" alt="">
      </div>
    <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
        <span style="color: #fff;">{{dialogTitle}}</span>
    </div>
    <div class="tabTdList">
        <div class="" style="">
            <Zdlfx></Zdlfx>
        </div>
    </div>
  </div>
        </div>
  </template>
  
  <script>
  import gsap from "gsap";
  import getPlanMonitorDataApi from '@/api/modules/homePage'
  // import PunctualityAnalysis from "./components/PunctualityAnalysis";
  import map3d from "../homePage/map3d/map3dContainer";
  import rkclzyys from "./components/rkclzyys";
  import kcwzjgt from "./components/kcwzjgt";
  import zyltj from "./components/zyltj";
  import kqzytj from "./components/kqzytj";

  
  export default {
    name: "index",
    components: {
      map3d,
      rkclzyys,
      kcwzjgt,
      zyltj,
      kqzytj
    },
    data() {
      return {
        orderNum: ['0', '0', ',', '0', '0', '0', ',', '0', '0', '0'], // 默认订单总数
        clickShowDiaJs:false,
        clickShowDiaPlanJh:false,
        clickShowDiaDdjk:false,
        clickShowDiaWltsfx:false,
        clickShowDiaCcjk:false,
        clickShowDiaSbjk:false,
        clickShowDiaHyzs:false,
        clickShowDiaZdlfx:false,
        dialogTitle:'',
        getJsData:[],
        getJhData:[],
        jsTotal:0,
        jhTotal:0,
        wltsfxTotal:0,
        formJsValue:{
          page:1,
          pageSize:10,
          ddh:'',
          jsStatus:'',
          ph:'',
          pm:''
        },
        jsStatus:[
          {
            value:'111111DDZT4',
            name:'确认收货'
          },
          {
            value:'111111DDZT1',
            name:'正常'
          },
          {
            value:'111111DDZT2',
            name:'作废'
          },
          {
            value:'111111DDZT3',
            name:'发货'
          },
        ],
        ddStatus:[
          {
            value:'0',
            name:'未下发'
          },
          {
            value:'1',
            name:'已下发'
          },
          {
            value:'2',
            name:'已提货'
          },
          {
            value:'3',
            name:'已入库'
          },
          {
            value:'4',
            name:'出库中'
          },
          {
            value:'5',
            name:'已出库'
          },
          {
            value:'6',
            name:'运输中'
          },
          {
            value:'7',
            name:'派送中'
          },
          {
            value:'8',
            name:'已签收'
          },
          {
            value:'-1',
            name:'异常'
          },
        ],
        showNumber: 0,
        number: 500,
        wareHouserTotal:100000,
        count:100,
        noneClick:true,
        clickYd:false,
        getYdList:[],
        getPlanList:[],
        getDdjkData:[],
        getWltsfxData:[],
  ddjkTotal:0,
        getYdTotal:'',
        getFinishData:'',
        getFinishRateData:'',
        getYcslData:'',
        getYcRate:'',
        jszslData:'',
        jswcslData:'',
        fwjhslData:'',
        fwwcslData:'',
        ckzs:'',
  ckzl:'',
  dckl:'',
  dpsl:''
      };
    },
    computed: {
      showCounter() {
        return this.showNumber.toFixed(0);
      },
      totalWealHouse(){
        return this.showNumber.toFixed(0);
      },
      applyPlan(){
        return this.showNumber.toFixed(0);
      }
    },
    mounted() {
      this.toOrderNum(3560.21); // 这里输入数字即可调用
      this.increaseNumber()
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
      wareHouserTotal(valsd){
        gsap.to(this, {
          duration: 5,
          showNumber: valsd,
        });
      }
    },
    created() {
      this.getPlanData()
      this.getYdOrderData()
      this.getTjList()
    },
    destroyed() {},
    methods: {
    //   setNumberTransform () {
    //   const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量
    //   const numberArr = this.orderNum.filter(item => !isNaN(item))
    //   // 结合CSS 对数字字符进行滚动,显示订单数量
    //   for (let index = 0; index < numberItems.length; index++) {
    //     const elem = numberItems[index]
    //     elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
    //   }
    // },
      handleJhSearch(){
        this.formJsValue.page=1
        this.showJhsljhDia()
      },
      handleJsSearch(){
        this.formJsValue.page=1
        this.showJqsljhDia()
      },
      showZdlfxDia(){
        this.clickShowDiaZdlfx=true
        this.clickShowDiaHyzs=false
        this.clickShowDiaWltsfx=false
        this.clickShowDiaCcjk=false
        this.clickShowDiaSbjk=false
        this.clickShowDiaJs=false
        this.clickShowDiaPlanJh=false
        this.clickShowDiaDdjk=false
        this.dialogTitle='准点率分析'
      },
      showHyzsDia(){
        this.clickShowDiaHyzs=true
        this.clickShowDiaZdlfx=false
        this.clickShowDiaWltsfx=false
        this.clickShowDiaCcjk=false
        this.clickShowDiaSbjk=false
        this.clickShowDiaJs=false
        this.clickShowDiaPlanJh=false
        this.clickShowDiaDdjk=false
        this.dialogTitle='货运指数'
      },
      showSbjkDia(){
        this.clickShowDiaSbjk=true
        this.clickShowDiaHyzs=false
        this.clickShowDiaZdlfx=false
        this.clickShowDiaWltsfx=false
        this.clickShowDiaCcjk=false
        this.clickShowDiaJs=false
        this.clickShowDiaPlanJh=false
        this.clickShowDiaDdjk=false
        this.dialogTitle='设备监控'
      },
      showCcjkDia(){
        this.clickShowDiaCcjk=true
        this.clickShowDiaHyzs=false
        this.clickShowDiaZdlfx=false
        this.clickShowDiaWltsfx=false
        this.clickShowDiaSbjk=false
        this.clickShowDiaJs=false
        this.clickShowDiaPlanJh=false
        this.clickShowDiaDdjk=false
        this.dialogTitle='仓储监控'
      },
      showWltsfxDia(){
        this.clickShowDiaWltsfx=true
        this.clickShowDiaHyzs=false
        this.clickShowDiaZdlfx=false
        this.clickShowDiaCcjk=false
        this.clickShowDiaSbjk=false
        this.clickShowDiaJs=false
        this.clickShowDiaPlanJh=false
        this.clickShowDiaDdjk=false
        this.dialogTitle='物流态势分析'
      },
      handleSizeDdChange(val){
    this.formJsValue.pageSize=val
        this.showDdjkDia()
  },
  handleCurrentDdChange(val){
    this.formJsValue.page=val
        this.showDdjkDia()
  },
      showDdjkDia(){
        this.clickShowDiaDdjk=true
        this.clickShowDiaHyzs=false
        this.clickShowDiaZdlfx=false
        this.clickShowDiaWltsfx=false
        this.clickShowDiaCcjk=false
        this.clickShowDiaSbjk=false
        this.clickShowDiaJs=false
        this.clickShowDiaPlanJh=false
        this.dialogTitle='订单监控'
        let params={
          page:this.formJsValue.page,
          pageSize:this.formJsValue.pageSize,
          m:{
            orderCode:this.formJsValue.pzh,
            finStatus:this.formJsValue.ddStatus
          }
        }
        getPlanMonitorDataApi.getDdjkListData(params).then(res=>{
          this.getDdjkData=res.pd.rows
          this.ddjkTotal=res.pd.total
        })
      },
      handleSizeJhChange(val){
        this.formJsValue.pageSize=val
        this.showJhsljhDia()
      },
  handleCurrentJhChange(val){
    this.formJsValue.page=val
        this.showJhsljhDia()
  },
      showJhsljhDia(){
        this.clickShowDiaPlanJh=true
        this.clickShowDiaHyzs=false
        this.clickShowDiaZdlfx=false
        this.clickShowDiaWltsfx=false
        this.clickShowDiaCcjk=false
        this.clickShowDiaSbjk=false
        this.clickShowDiaJs=false
        this.clickShowDiaDdjk=false
        this.dialogTitle='计划列表'
        let params={
          page:this.formJsValue.page,
          pageSize:this.formJsValue.pageSize,
          m:{
            batchno:this.formJsValue.ph,
            material:this.formJsValue.pm
          }
        }
        getPlanMonitorDataApi.getPlanJhListData(params).then(res=>{
          this.getJhData=res.pd.rows
          this.jhTotal=res.pd.total
        })
      },
      handleSizeJsChange(val){
        this.formJsValue.pageSize=val
        this.showJqsljhDia()
      },
  handleCurrentJsChange(val){
    this.formJsValue.page=val
    this.showJqsljhDia()
  },
      hiddenDetaila(){
        this.clickShowDiaHyzs=false
        this.clickShowDiaZdlfx=false
        this.clickShowDiaWltsfx=false
        this.clickShowDiaCcjk=false
        this.clickShowDiaSbjk=false
        this.clickShowDiaJs=false
        this.clickShowDiaPlanJh=false
        this.clickShowDiaDdjk=false
      },
      handleOrderjkSearch(){
        this.formJsValue.page=1
        this.showDdjkDia()
      },
      showJqsljhDia(){
        this.clickShowDiaJs=true
        this.clickShowDiaHyzs=false
        this.clickShowDiaZdlfx=false
        this.clickShowDiaWltsfx=false
        this.clickShowDiaCcjk=false
        this.clickShowDiaSbjk=false
        this.clickShowDiaPlanJh=false
        this.clickShowDiaDdjk=false
        this.dialogTitle='精申列表'
        let params={
          page:this.formJsValue.page,
          pageSize:this.formJsValue.pageSize,
          m:{
            orderno:this.formJsValue.ddh,
            type:this.formJsValue.jsStatus
          }
        }
        getPlanMonitorDataApi.getPlanJsListData(params).then(res=>{
          this.getJsData=res.pd.rows
          this.jsTotal=res.pd.total
        })
      },
      getTjList(){
        getPlanMonitorDataApi.getDbtjData({}).then(res=>{
          this.ckzs=res.m.cks
          this.ckzl=res.m.kcl
          this.dckl=res.m.dckl
          this.dpsl=res.m.dpsl
        })
      },
      getYdOrderData(){
        getPlanMonitorDataApi.getYdjkData({}).then(res=>{
          this.getYdList=res.m
          this.getYdTotal=res.m.total
          this.getFinishData=res.m.fin
          this.getFinishRateData=res.m.finRate
          this.getYcslData=res.m.ex
          this.getYcRate=res.m.exRate
          console.log(res,'运单监控数据');
        })
      },
      getPlanData(){
        console.log(9999999999);
        console.log(getPlanMonitorDataApi.getPlanMonitorData,'getPlanMonitorDatagetPlanMonitorDatagetPlanMonitorDatagetPlanMonitorData');
        getPlanMonitorDataApi.getPlanMonitorData({}).then((res=>{
          console.log(res,'resssss...........////////')
          this.getPlanList=res.list
          this.getPlanList.forEach(item=>{
          this.jszslData=item.jszsl
          this.jswcslData=item.jswcsl
          this.fwjhslData=item.ddzsl
          this.fwwcslData=item.ddwcsl
          })
        }))
      },
      
      showDetail(){
        this.noneClick=false
        this.clickYd=true
      },
      hiddenDetail(){
        this.noneClick=true
        this.clickYd=false
      },
      // 设置文字滚动
      setNumberTransform () {
            const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量
            const numberArr = this.orderNum.filter(item => !isNaN(item))
            // 结合CSS 对数字字符进行滚动,显示订单数量
            for (let index = 0; index < numberItems.length; index++) {
              const elem = numberItems[index]
              elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
            }
          },
          // 处理总订单数字
          toOrderNum(num) {
            num = num.toString()
            // 把订单数变成字符串
            if (num.length < 5) {
              num = '0' + num // 如未满八位数，添加"0"补位
              this.toOrderNum(num) // 递归添加"0"补位
            } else if (num.length === 5) {
              // 订单数中加入逗号
              num = num.slice(0, 2) + ',' + num.slice(2, 5) 
              this.orderNum = num.split('') // 将其便变成数据，渲染至滚动数组
            }
          },
      increaseNumber () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            let self = this
            this.timer = setInterval(() => {
              self.count = self.count + this.getRandomNumber(1, 100)
              this.toOrderNum(self.count)
              this.$nextTick(() => {
                  self.setNumberTransform(self.count)
              })
            }, 3000)
          },
          // getRandomNumber (min, max) {
          //   return Math.floor(Math.random() * (max - min + 1) + min)
          //   //随机生成
          // },
      toMainjsp(){
        this.$router.push("/mainjsp");
      },
      toBigSvrenInd() {
        this.$router.push("/big/screen/index");
      },
      toLogsitio(){
        this.$router.push("/logisticsSituation");
      },
  toXqfx(){
    this.$router.push("/demandAnalysis");
  }
    },
  };
  </script>
  <style lang='scss' scoped>
.powerDeployment {
    background-image: url("../../../assets/image/homePage/mainBg.png");
    background-size: 100% 100%;
    //background: #1d3582;
    margin: 0;
    height: 100%;
    height: 100%;
    width: 100%;
    position: relative;
}
.mapContent {
    position: absolute;
    top: 148px;
    left: 494px;
    right: 494px;
    height: 570px;
}
.top_header {
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    font-size: 30px;
    text-align: center;
    height: 70px;
    padding-top: 20px;
    line-height: 25px;
    background-image: url("../../../assets/image/top_header/titleBg.svg");
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
    width: 50%;
    padding: 0 13px;
    background-image: url("../../../assets/image/homePage/splice.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
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
    height: calc(40% - 70px);
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
}
.bottomTab {
    background-image: url('../../../assets/image/homePage/tabBg.png');
    background-size: 100% 100%;
    height: calc(40% - 70px);
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 10;
}
.headerTitl {
    width: 100%;
    color: #fff;
    padding-top: 5px;
    text-align: center;
}
// .center_bot {
//     background-size: 100% 100%;
//     background-repeat: no-repeat;
//     margin: 0 15px;
//     height: 100%;
//     width: 50%;
//     left: 25%;
//     position: absolute;
//     top: 70px;
// }
.left_bot {
    width: 25%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 70px;
    height: 60%;
}
.right_bot {
    width: 25%;
    position: absolute;
    top: 70px;
    right: 0;
    height: 60%;
}
.left_top {
    background-image: url("../../../assets/image/homePage/splice.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
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
}
.taskEng {
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
    display: flex;
    padding: 0 70px;
}
.hedRigh {
    color: #fff;
    margin-left: 30px;
    font-size: 16px;
}
.numDey {
    color: #27cbff;
    font-size: 18px;
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
    z-index: 2;
    .cangku {
        .el-progress-bar__inner {
            background-color: unset;
            // 将进度条默认的颜色给去除掉，若不生效就再加个!important
            background-image:
                linear-gradient(
                    90deg,
                    #049595 0%,
                    #6fffbb 50%,
                    #049595 100%
                ) !important;
        }
    }
    .stepClas {
        position: absolute !important;
        height: 80px;
        top: 10px;
        right: 78px;
        z-index: 1;
    }
    .progresNum {
        position: absolute;
        z-index: 2;
        color: #fff;
        font-size: 20px;
        right: 82px;
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
.center_bot_header {
    // background: #001e65;
    position: absolute;
    top: 70px;
    left: 25%;
    width: 50%;
    height: 73px;
    display: flex;
    .item {
        width: calc((100% - 114px) / 4);
        height: 100%;
        background: linear-gradient(180deg, rgba(19, 44, 85, 0) 0%, #0b54a8 100%);
        border: 1px solid #0060d1;
        background-image: url("../../../assets/images/small_bg.png");
        background-size: 100% 100%;
        .item_box {
            margin-top: 10px;
            text-align: center;
            .name {
                font-size: 16px;
                color: #fff;
            }
            .num {
                margin-top: 5px;
                font-size: 22px;
                color: #3dd0ff;
                &.green {
                    color: #62f3b7;
                }
            }
        }
    }
}
.toPathBt {
    width: 150px;
    height: 50px;
    background-image: url('../../../assets/image/homePage/toScreenInd.png');
    background-size: 100% 100%;
    position: absolute;
    top: 550px !important;
    bottom: auto !important;
    right: 180%;
    &:hover {
        width: 170px;
        height: 80px;
        background-size: 100% 100%;
        background-image: url('../../../assets/image/homePage/hoverDv.png') !important;
        position: absolute;
        top: 545px !important;
        bottom: auto !important;
        right: 178%;
    }
}
.leftHeaderBg {
    width: 120px;
    height: 40px;
    background-image: url('../../../assets/image/homePage/homeBtn.png');
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    left: 10px;
}
.rightOnu {
    width: 120px;
    height: 40px;
    background-image: url('../../../assets/image/homePage/dynasupervision.png');
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 170px;
    font-size: 18px;
    color: #27cbff;
    line-height: 40px;
    &:hover {
        background-image: url('../../../assets/image/homePage/auxiliary.png');
        color: #fff;
    }
}
.rightTree {
    width: 120px;
    height: 40px;
    background-image: url('../../../assets/image/homePage/dynasupervision.png');
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 310px;
    font-size: 18px;
    color: #27cbff;
    line-height: 40px;
    &:hover {
        background-image: url('../../../assets/image/homePage/auxiliary.png');
        color: #fff;
    }
}
.rightTnu {
    width: 120px;
    height: 40px;
    background-image: url('../../../assets/image/homePage/dynasupervision.png');
    background-size: 100% 100%;
    position: absolute;
    top: 5px;
    right: 30px;
    color: #27cbff;
    font-size: 18px;
    line-height: 40px;
    &:hover {
        background-image: url('../../../assets/image/homePage/auxiliary.png');
        color: #fff;
    }
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
    top: -30px;
    left: 940px;
}
.dialogClick {
    position: absolute;
    bottom: 260px;
    left: 355px;
    width: 1065px;
    height: 660px;
    background-image: url('../../../assets/image/content/sliceList.png');
    background-size: 100% 100%;
    .close {
        position: absolute;
        top: -27px;
        left: 500px;
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
.bmct {
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
}
.dzcTopCont {
    width: 100%;
    height: 50%;
    display: flex;
    color: #fff;
    font-size: 16px;
    .imger {
        width: 30%;
        padding: 25px 10px;
    }
    .dvt {
        width: 70%;
        flex: 1;
        padding: 20px 0;
    }
}
.dzcItem {
    margin: 11px;
    display: flex;
    flex: 1;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.dzcItema {
    background-image: url('../../../assets/image/smallHomePage/space.png');
}
.dzcItemb {
    background-image: url('../../../assets/image/smallHomePage/work.png');
}
.dzcItemc {
    background-image: url('../../../assets/image/smallHomePage/dx.png');
}
.speciText {
    color: #3dd0ff;
    font-size: 18px;
}
.transpItema {
    color: #0085ff;
    text-align: center;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
}
.bt {
    height: 5px;
    background-image: url('../../../assets/image/smallHomePage/transportb.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.transpItemb {
    color: #fff;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
}
.brdd {
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
}
.speciTxt {
    color: #edaf47;
    font-size: 18px;
}
.speciTxtc {
    color: #59afff;
    font-size: 18px;
}
.wj {
    margin-top: 5px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
}
.contentPlane {
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
}
.sszxdtItem {
    width: 31%;
}
.sszxdtatop {
    text-align: center;
    height: 50%;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #fff;
    font-size: 18px;
}
.sszxdtatopa {
    background-image: url('../../../assets/image/smallHomePage/sszxa.png');
}
.sszxdtatopb {
    background-image: url('../../../assets/image/smallHomePage/sszxb.png');
}
.sszxdtatopc {
    background-image: url('../../../assets/image/smallHomePage/sszxc.png');
}
.sszxdtatoptxt {
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
}
.sszxdtatoptxta {
    color: #d1b440;
}
.sszxdtatoptxtb {
    color: #6d8fff;
}
.sszxdtatoptxtc {
    color: #23cae0;
}
.niank {
    width: 40px;
    height: 20px;
    background: rgba(1, 42, 94, 0.5);
    border-radius: 3px 3px 3px 3px;
    opacity: 1;
    border: 1px solid #0072ff;
    color: #0072ff;
    text-align: center;
    line-height: 20px;
    margin-right: 10px;
}
.box-item {
    position: relative;
    height: 100px;
    font-size: 54px;
    line-height: 41px;
    text-align: center;
    list-style: none;
    color: #2d7cff;
    writing-mode: vertical-lr;
    text-orientation: upright;
    margin-top: 0;
    margin-bottom: 10px;

    /* 文字禁止编辑 */
    -moz-user-select: none; /* 火狐 */
    -webkit-user-select: none; /* webkit浏览器 */
    -ms-user-select: none; /* IE10 */
    -khtml-user-select: none; /* 早期浏览器 */
    user-select: none;

    /* overflow: hidden; */
}

/* 默认逗号设置 */
.mark-item {
    width: 10px;
    height: 100px;
    margin-right: 5px;
    line-height: 10px;
    font-size: 48px;
    position: relative;
    & > span {
        position: absolute;
        width: 100%;
        bottom: 30px;
        color: #03eefa;
        writing-mode: vertical-rl;
        text-orientation: upright;
    }
}

/* 滚动数字设置 */
.number-item {
    width: 41px;
    height: 55px;
    background: #000;
    color: #03eefa;
    list-style: none;
    margin-right: 5px;
    border-radius: 4px;
    font-size: 34px;
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
            color: #03eefa;
            font-style: normal;
            position: absolute;
            top: 11px;
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
  </style>
  