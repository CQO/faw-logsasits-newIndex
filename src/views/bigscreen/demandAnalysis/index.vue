<template>
    <div class="demandAnalysis">
        <div class="top_header">
            <div class="routerBtnClick">
                <div class="leftHeaderBg" @click="toHome"></div>
                <div class="coumn leftHeadeeOne">需求分析</div>
                <div class="coumn leftHeadeeTwo" @click="toWarehouse">仓储规划</div>
                <div class="coumn leftHeadeeThree" @click="toFxfx">费效分析</div>
            </div>
            <div class="">
                <span class="text">需&nbsp;求&nbsp;分&nbsp;析</span>
            </div>
            <div class="">
                <div class="coumn rightNumOne" @click="toYlcs">运力测算</div>
                <div class="coumn rightNumTwo" @click="toLjcs">路距测算</div>
                <div class="coumn rightNumThree" @click="toZhpj">综合评价</div>
                <div class=" rightNumFour" @click="toLogsitio">动态监管</div>
      <div class="rightfou" @click="toLogin"></div>
            </div>
        </div>
        <div class="mainCont">
            <div class="jjfa" @click="showJjfa">
                <div class="jjfaImaa">
                    <!-- <img src="../../../assets/image/content/vector.png" alt="" style='margin-top: 8px;'> -->
                </div>
                <span style="color: #f90; font-size: 12px; margin-top: 15px; margin-left: 5px;">解决方案</span>
            </div>
            <div class="" style="width: 100%; height: 100%;">
                <div class="" style="position: absolute; z-index: 3002; display: flex; margin: 20px 37%;">
                    <!-- <div :class="titleType" @click="showWarZone" id="warZone">战区</div> -->
                </div>
                <zqMap style="width: 100%; height: 100%; position: relative; z-index: 1500;"
                       :war-zone="warZoneName"></zqMap>
            </div>
            <div class="left_content">
                <div class="warZone"
                     v-for="(item,index) in zoneTypes"
                     :key="index"
                     @click="setWarZone(item)">{{item}}
                </div>
            </div>
            <div class="needData">
                <div class="statisContent">
                    <div class="chartNum" @click="getXqzlData">
                        <span class="orderTitle">需求总量(万件):</span>
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
                </div>
                <div class="needType">
                        <div class="">
                            <div style="padding-left: 5px;">
                                作&nbsp;训&nbsp;类&nbsp;需&nbsp;求：
                            </div>
                            <div class=""><span class="textNum">{{Number(this.zxl).toLocaleString()}}</span> 件</div>
                        </div>
                        <div class="">
                            <div style="padding-left: 5px;">常&nbsp;服&nbsp;类&nbsp;需&nbsp;求：</div>
                            <div class=""><span class="textNum">{{Number(this.cfl).toLocaleString()}}</span> 件</div>
                        </div>
                        <div class="">
                            <div style="padding-left: 5px;">礼&nbsp;服&nbsp;类&nbsp;需&nbsp;求：</div>
                            <div class=""><span class="textNum">{{Number(this.lfl).toLocaleString()}}</span> 件</div>
                        </div>
                        <div class="">
                            <div>体能训练类需求：</div>
                            <div class=""><span class="textNum">{{Number(this.tnl).toLocaleString()}}</span> 件</div>
                        </div>
                        <div class="">
                            <div>标志服装类需求：</div>
                            <div class=""><span class="textNum">{{Number(this.bzl).toLocaleString()}}</span> 件</div>
                        </div>
                        <div class="">
                            <div>卧具装具类需求：</div>
                            <div class=""><span class="textNum">{{Number(this.wjl).toLocaleString()}}</span> 件</div>
                        </div>
                </div>
            </div>
            <div class="rightContent">
                <div class="rightHeader" @click="getXqfbList">
                    <div class="completionrate">
                        <div class="taskChin">需求分布</div>
                        <div class="taskEng"></div>
                      </div>
                    <div class="">
                        <demandList :propNameer="propName"></demandList>
                    </div>
                </div>
                <div class="rightHeader" @click="getXqkcList">
                    <div class="completionrate">
                        <div class="taskChin">需求与库存</div>
                        <div class="taskEng"></div>
                      </div>
                    <div class="">
                        <inventoryDat></inventoryDat>
                    </div>
                </div>
                <div class="rightHeader" @click="getXqcbycList">
                    <div class="completionrate">
                        <div class="taskChin">储备需求预测</div>
                        <div class="taskEng"></div>
                      </div>
                    <div class="">
                        <forecast></forecast>
                    </div>
                </div>
            </div>
            <div class="centfoot">
                <div class="footItem" @click="getDbTjList">
                    <div class="itemTop">
                        <p class="dataa">
                            {{this.dbNum }}
                            <!-- <animate-number v-if="this.dbNum" style="" from="1" :to="this.dbNum" :key="this.dbNum"></animate-number> -->
                        </p>
                        <p class="datab">万件</p>
                    </div>
                    <div class="itemBot">东部战区</div>
                </div>
                <div class="footItem" @click="getNbTjList">
                    <div class="itemTopa">
                        <p class="dataa" style="color: #ffb11b;">
                            {{ this.nbNum }}
                            <!-- <animate-number v-if="this.nbNum" style="" from="1" :to="this.nbNum" :key="this.nbNum"></animate-number> -->
                        </p>
                        <p class="datab">万件</p>
                    </div>
                    <div class="itemBot">南部战区</div>
                </div>
                <div class="footItem" @click="getXbTjList">
                    <div class="itemTop">
                        <p class="dataa">
                            {{ this.xbNum }}
                            <!-- <animate-number v-if="this.xbNum" style="" from="1" :to="this.xbNum" :key="this.xbNum"></animate-number> -->
                        </p>
                        <p class="datab">万件</p>
                    </div>
                    <div class="itemBot">西部战区</div>
                </div>
                <div class="footItem" @click="getBbTjList">
                    <div class="itemTopa">
                        <p class="dataa" style="color: #ffb11b;">
                            {{ this.bbNum }}
                            <!-- <animate-number v-if="this.bbNum" style="" from="1" :to="this.bbNum" :key="this.bbNum"></animate-number> -->
                        </p>
                        <p class="datab">万件</p>
                    </div>
                    <div class="itemBot">北部战区</div>
                </div>
                <div class="footItem" @click="getZbTjList">
                    <div class="itemTop">
                        <p class="dataa">
                            {{ this.zbNum }}
                            <!-- <animate-number v-if="this.zbNum" style="" from="1" :to="this.zbNum" :key="this.zbNum"></animate-number> -->
                        </p>
                        <p class="datab">万件</p>
                    </div>
                    <div class="itemBot">中部战区</div>
                </div>
            </div>
            <div class="dialogClick" v-if="clickShowDiaXqfb">
                <div class="close" @click="hiddenDetail">
                    <img src="../../../assets/image/homePage/closeBtn.png" alt="">
                  </div>
                <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
                    <span style="color: #fff;">{{dialogTitle}}</span>
                </div>
                <div class="tabTdList">
                    <div class="" style="">
                        <div class="titlehead">
                            <!-- <div class="" style="width: 12.5%; text-align: center;" v-for="item in xqfbTitleList"> -->
                                <div class="mainListItem" style=" margin-left: 1px; flex: 1; display: flex;">
                                    <!-- {{ item.name }} -->
                                    <div class="itemlaner">收物单位</div>
                                    <div class="itemlaner">发物单位</div>
                                    <div class="itemlaner">品名代码</div>
                                    <div class=""  style="width: 18%; text-align: center;">物资品名</div>
                                    <div class="itemlaner">需求量</div>
                                    <div class="itemlaner">凭证号</div>
                                    <div class="itemlaner">凭证字</div>
                                    <div class="itemlaner">签发日期</div>

                                </div>
                            <!-- </div> -->
                        </div>
                        <div class="mainLisy">
                            <div class="mainListItem" v-for="item in contData">
                                <div class="itemlaner">{{item.recipientUnit}}</div>
                                <div class="itemlaner contentOver" :title="item.sendFromUnit">{{item.sendFromUnit}}</div>
                                <div class="itemlaner">{{item.materialCode}}</div>
                                <div class="contentOver" style="width: 18%; text-align: center;" :title="item.material">{{item.material}}</div>
                                <div class="" style="width: 12%; text-align: center;">{{item.num}}</div>
                                <div class="itemlaner">{{item.credentialCode}}</div>
                                <div class="itemlaner">{{item.credential}}</div>
                                <div class="itemlaner">{{item.signDate}}</div>
                            </div>
                            <el-pagination
                            class="pageAtion"
              background
              layout="prev, pager, next"
              :total="total"
              @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialogClick" style="height: 650px;" v-if="clickShowDiaXqkc">
                <div class="close" @click="hiddenDetail">
                    <img src="../../../assets/image/homePage/closeBtn.png" alt="">
                  </div>
                <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
                    <span style="color: #fff;">{{dialogTitle}}</span>
                </div>
                <div class="tabTdList">
                    <div class="" style="">
                        <div class="titlehead">
                            <div class="" style="width: 12.5%; text-align: center;" v-for="item in xqkcTitleList">
                                <div class="" style=" margin-left: 1px; flex: 1;">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                        <div class="mainLisy">
                            <div class="mainListItem" v-for="item in getXqkcData">
                                <div class="itemlaner">{{item.area}}</div>
                                <div class="itemlaner contentOver" :title="item.name">{{item.name}}</div>
                                <div class="itemlaner">{{item.pmCode}}</div>
                                <div class="contentOver" style="width: 14%; text-align: center;" :title="item.pm">{{item.pm}}</div>
                                <div class="" style="width: 12%; text-align: center;">{{item.hx}}</div>
                                <div class="itemlaner">{{item.xql}}</div>
                                <div class="itemlaner">{{item.kcl}}</div>
                                <div class="itemlaner">{{item.qk}}</div>
                            </div>
                            <div class="uploadOut" @click="exportUploadOut">导出</div>
                            <el-pagination
                            class="pageAtiona"
              background
              layout="prev, pager, next"
              :total="xqkcTotal"
              @size-change="handleSizeChange" @current-change="handleCurrentChangeXqkc">
            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialogClick" v-if="clickShowDiaXqcbyc">
                <div class="close" @click="hiddenDetail">
                    <img src="../../../assets/image/homePage/closeBtn.png" alt="">
                  </div>
                <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
                    <span style="color: #fff;">{{dialogTitle}}</span>
                </div>
                <div class="tabTdList">
                    <div class="" style="">
                        <div class="titlehead">
                                <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                                    <div class="cbycitemlaner">历史签发月份</div>
                                <div class="cbycitemlaner">品名代码</div>
                                <div class="cbycitemlaner">物资品名</div>
                                <div class="cbycitemlaner">需求量</div>
                                <div class="cbycitemlaner">预测月份</div>
                                <div class="cbycitemlaner">预测需求量</div>
                                </div>
                        </div>
                        <div class="mainLisy">
                            <div class="mainListItem" v-for="item in getXqcbycData">
                                <div class="cbycitemlaner">{{item.mon}}</div>
                                <div class="cbycitemlaner contentOver" :title="item.pmdm">{{item.pmdm}}</div>
                                <div class="cbycitemlaner contentOver" :title="item.wzpm">{{item.wzpm}}</div>
                                <div class="cbycitemlaner">{{item.sl}}</div>
                                <div class="cbycitemlaner">{{item.ycmon}}</div>
                                <!-- <div class="cbycitemlaner contentOver" :title="item.pmdm">{{item.pmdm}}</div> -->
                                <!-- <div class="cbycitemlaner contentOver" :title="item.wzpm">{{item.wzpm}}</div> -->
                                <div class="cbycitemlaner">{{item.ycsl}}</div>
                            </div>
                            <div class="uploadOut"  @click="exportCbycUploadOut">导出</div>
                            <el-pagination
                            class="pageAtion"
              background
              layout="prev, pager, next"
              :total="xqcbycTotal"
              @size-change="handleSizeChange" @current-change="handleCurrentChangeXqcbyc">
            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialogClick" v-if="clickShowDiaZqtj">
                <div class="close" @click="hiddenDetail">
                    <img src="../../../assets/image/homePage/closeBtn.png" alt="">
                  </div>
                <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
                    <span style="color: #fff;">{{dialogTitle}}</span>
                </div>
                <div class="tabTdList">
                    <div class="" style="">
                        <div class="titlehead">
                            <!-- <div class="" style="width: 12.5%; text-align: center;" v-for="item in zqtjList">
                                <div class="" style=" margin-left: 1px; flex: 1;">
                                    {{ item.name }}
                                </div>
                            </div> -->
                            <div class="mainListItem" style=" margin-left: 1px; flex: 1; display: flex;">
                                <!-- {{ item.name }} -->
                                <div class="itemlaner">收物单位</div>
                                <div class="itemlaner">发物单位</div>
                                <div class="itemlaner">品名代码</div>
                                <div class=""  style="width: 18%; text-align: center;">物资品名</div>
                                <div class="itemlaner">需求量</div>
                                <div class="itemlaner">凭证号</div>
                                <div class="itemlaner">凭证字</div>
                                <div class="itemlaner">签发日期</div>

                            </div>
                        </div>
                        <div class="mainLisy">
                            <div class="mainListItem" v-for="item in getZqtjData">
                                <div class="itemlaner">{{item.recipientUnit}}</div>
                                <div class="itemlaner contentOver" :title="item.sendFromUnit">{{item.sendFromUnit}}</div>
                                <div class="itemlaner">{{item.materialCode}}</div>
                                <div class="contentOver" :title="item.material" style="">
                                    {{item.material}}
                                </div>
                                <div class="" style="width: 12%; text-align: center;">{{item.num}}</div>
                                <div class="itemlaner">{{item.credentialCode}}</div>
                                <div class="itemlaner">{{item.credential}}</div>
                                <div class="itemlaner">{{item.signDate}}</div>
                            </div>
                            <el-pagination
                            class="pageAtion"
              background
              layout="prev, pager, next"
              :total="zqtjTotal"
              @size-change="handleSizeChange" @current-change="handleCurrentChangeZqtj">
            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 解决方案 -->
            <div class="dialogClick" v-if="jjfaDia">
                <div class="close" @click="hiddenDetail">
                    <img src="../../../assets/image/homePage/closeBtn.png" alt="">
                  </div>
                <div class="" style=" height: 30px; text-align: center; padding-top: 10px;">
                    <span style="color: #fff;">{{dialogTitle}}</span>
                </div>
                <div class="tabTdList">
                    <div class="" style="">
                        <div class="titlehead">
                            <div class="mainListItem" style=" margin-left: 1px; flex: 1; display: flex;">
                                <!-- {{ item.name }} -->
                                <div class="itemlaner">方案名称</div>
                                <div class="itemlaner">方案内容</div>
                                <div class="itemlaner">附件下载</div>

                            </div>
                        </div>
                        <div class="mainLisy">
                            <div class="mainListItemc" v-for="item in getResolveData">
                                <div class="itemlanerc">{{item.title}}</div>
                                <div class="itemlanerc">{{item.content}}</div>
                                <div class="itemlanerc" @click="downLoadIn(item)">下载</div>
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
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import gsap from "gsap";
import { Message } from "element-ui";
    import demandList from "./components/demandList.vue";
    import inventoryDat from "./components/inventoryDat.vue";
    import forecast from "./components/forecast.vue";
    import zqMap from "./itemMap";
    import {getAreaXqcbycDiaListExport,
        getAreaXqkcDiaListExport,
        getXqfxJjfaStatusList,
        getXqfxJjfaData,
        getXqfxJjfaList,
        getAreaData,getDemandTjData
        ,getTypeTjData,getAreaDiaList
        ,getAreaXqkcDiaList,getCbysDiaList
        ,getZqTjList,getXqfxFltjList} from '@/api/modules/demandAnalysis'

    $(document).ready(function () {
        $('.left_content').on('click', 'div', function () {
            $(this).addClass('clickStylec')
            $(this).siblings().removeClass('clickStylec')
        })
    })
    export default {
        name: "demandAnalysis",
        computed: {
    ...mapGetters([
      'roles'
    ])
  },
        components: {
            zqMap,
            demandList,
            inventoryDat,
            forecast
        },
        data() {
            return {
                clickShowDiaXqfb:false,
                clickShowDiaXqkc:false,
                clickShowDiaXqcbyc:false,
                clickShowDiaZqtj:false,
                jjfaDia:false,
                getXqkcData:[],
                dialogTitle:'',
                formQuers:{
                    page:1,
                    pageSize:10,
                    m:{
                        area:''
                    }
                },
                formXqkcQuers:{
                    page:1,
                    pageSize:10
                },
                formXqcbycQuers:{
                    page:1,
                    pageSize:10
                },
                xqfbTitleList:[
                {
                    name:'收物单位'
                },
                {
                    name:'发物单位'
                },
                {
                    name:'品名代码'
                }, {
                    name:'物资品名'
                }, {
                    name:'需求量'
                }, {
                    name:'凭证号'
                }, {
                    name:'凭证字'
                }, {
                    name:'签发日期'
                }
            ],
            xqkcTitleList:[
                {
                    name:'所属战区'
                },
                {
                    name:'仓库中心名称'
                },
                {
                    name:'品名代码'
                }, {
                    name:'物资品名'
                },
                {
                    name:'号型'
                }, {
                    name:'需求量'
                }, {
                    name:'实际库存'
                }, {
                    name:'缺口'
                }
            ],
            xqcbycTitleList:[
                {
                    name:'历史签发月份'
                },
                {
                    name:'品名代码'
                }, {
                    name:'物资品名'
                }, {
                    name:'需求量'
                },
                {
                    name:'预测月份'
                },
                // {
                //     name:'预测品名代码'
                // }, {
                //     name:'预测物资品名'
                // },
                 {
                    name:'预测需求量'
                }
            ],
            zqtjList:[
                {
                    name:'收物单位'
                },
                {
                    name:'发物单位'
                },
                {
                    name:'品名代码'
                }, {
                    name:'物资品名'
                }, {
                    name:'需求量'
                }, {
                    name:'凭证号'
                }, {
                    name:'凭证字'
                }, {
                    name:'签发日期'
                }
            ],
            jjfaList:[
                {
                    name:'方案名称'
                },
                {
                    name:'方案内容'
                },
                {
                    name:'附件下载'
                },
            ],
getXqcbycData:[],
            contData:[],
                getAfteTypeData:[],
                getZqtjData:[],
                getResolveData:[],
                bbNum:'',
                nbNum:'',
                xbNum:'',
                dbNum:'',
                zbNum:'',
                zxl:'',
                getWarZonNameData:'',
cfl:'',
lfl:'',
tnl:'',
bzl:'',
wjl:'',
                showNumber: 0,
                getStatusData:'',
      number: '',
      propName:'',
                titleType: ["titleType" ? "titleType" : "showHide"],
                zoneTypes: ['东部战区', '南部战区', '西部战区', '北部战区', '中部战区'],
                warZoneName: '',
                getNeedTotalNumData: [666666666],
                textNumStyle: ['textNumStyle' ? 'textNumStyle' : 'specialNumStyle'],
                needData: [1111],
                interval: null,
                total:0,
                xqkcTotal:0,
                xqcbycTotal:0,
                zqtjTotal:0,
                orderNum: ['0', '0', ',', '0', '0', '0', ',', '0', '0', '0'], // 默认订单总数
            };
        },
        computed: {
  },
  watch: {
    getStatusData(value){
    }
  },
  created(){
    this.getDemandTjList()
    this.getUserData=this.$store.state.user.sidebar.roles
  },
        mounted() {
            getTypeTjData({}).then(res=>{
                    this.zxl=res.mo.zxl
                    this.cfl=res.mo.cfl
                    this.lfl=res.mo.lfl
                    this.tnl=res.mo.tnl
                    this.bzl=res.mo.bzl
                    this.wjl=res.mo.wjl
                    this.number=res.mo.zl
      this.toOrderNum(this.number); // 这里输入数字即可调用
      this.setNumberTransform()
                })
            this.getData()
            this.interval = setInterval(() => this.getData(), 10000)
            gsap.to(this, {
      duration: 5,
      showNumber: this.number,
    });
        },
        destroyed() {
            this.clearInter()
        },
        methods: {
            exportCbycUploadOut(){
                getAreaXqcbycDiaListExport({}).then(res=>{
                    this.exportCbycFile(res, '需求储备预测列表信息')
                })
            },
            exportCbycFile: function(obj, name = Date.now(), suffix = "xlsx") {
      const url = window.URL.createObjectURL(
        new Blob([obj], { type: "application/vnd.ms-excel" })
      )
      const aDOM = document.createElement("a")
      aDOM.style.display = "none"
      aDOM.href = url
      const fileName = name + "." + suffix
      aDOM.setAttribute("download", fileName)
      document.body.appendChild(aDOM)
      aDOM.click()
      document.body.removeChild(aDOM)
    },
            exportUploadOut(){
                getAreaXqkcDiaListExport({}).then(response=>{
                    this.exportFile(response, '需求与库存列表信息')
                })
            },
            exportFile: function(obj, name = Date.now(), suffix = "xlsx") {
      const url = window.URL.createObjectURL(
        new Blob([obj], { type: "application/vnd.ms-excel" })
      )
      const aDOM = document.createElement("a")
      aDOM.style.display = "none"
      aDOM.href = url
      const fileName = name + "." + suffix
      aDOM.setAttribute("download", fileName)
      document.body.appendChild(aDOM)
      aDOM.click()
      document.body.removeChild(aDOM)
    },
    downLoadIn(item){
        let params={
            m:{
                id:item.id,
                reGen:''
            }
        }
                getXqfxJjfaData(params).then(respon=>{
                        if(!respon){
                            // setInterval(()=>{
                                const timer =setInterval(function(){
                                getXqfxJjfaStatusList({m:{id:item.id}}).then(response=>{
                                    if(response.list[0].status=='0'){
                                    }  else if(response.list[0].status=='1'){
                                        // alert('文件正在生成中')
                                        Message({
                                            type: 'error',
                                            message: '文件正在生成中'
                                        })
                                    } else if(response.list[0].status=='2'){
                                        this.getStatusData=2
                                        if (response.list[0].url) {
                                            const link = document.createElement('a')
                                            //_blank表示在新窗口打开链接
                                            link.target = '_blank'
                                            link.href = window.ipConfig.baseUrl+response.list[0].url
                                            link.setAttribute('download', '文件名字' + Date.now() + '.xlsx') // 下载文件的名称及文件类型后缀
                                            document.body.appendChild(link)
                                            link.click()
                                            document.body.removeChild(link) // 下载完成移除元素
                                            clearInterval(timer)
                                         }
                                    }
                                })
                            },10000)
//   },2000)
                        }
                })
    },
            showJjfa(){
                this.jjfaDia=true
    this.dialogTitle='解决方案'
                getXqfxJjfaList({}).then(res=>{
                    this.getResolveData=res.list
                })
            },
            handleSizeChange(val){
            },
handleCurrentChange(val){
    this.formQuers.page=val
    this.getXqfbList()
},
handleCurrentChangeZqtj(val){
    this.formQuers.page=val
    this.getDbTjList()
},
handleCurrentChangeXqkc(val){
    this.formXqkcQuers.page=val
    this.getXqkcList()
},
handleCurrentChangeXqcbyc(val){
    this.formXqcbycQuers.page=val
    this.getXqcbycList()
},
toZqtjList(){
    this.getZqtjData=[]
    getZqTjList(this.formQuers).then((res)=>{
                    this.getZqtjData=res.pd.rows
                    this.zqtjTotal=res.pd.total
                })
},
getXqzlData(){
    this.getZqtjData=[]
    this.clickShowDiaZqtj=true
    this.clickShowDiaXqkc=false;this.clickShowDiaXqfb=false;this.clickShowDiaXqcbyc=false;this.jjfaDia=false
    this.dialogTitle='分类统计列表'
    getXqfxFltjList(this.formXqkcQuers).then(res=>{
        this.getZqtjData=res.pd.rows
        this.zqtjTotal=res.pd.total
    })
},
getXqcbycList(){
    this.getXqcbycData=[]
    this.clickShowDiaXqcbyc=true
    this.clickShowDiaXqkc=false;this.clickShowDiaXqfb=false;this.clickShowDiaZqtj=false;this.jjfaDia=false
    this.dialogTitle='需求储备预测'
    getCbysDiaList(this.formXqcbycQuers).then(res=>{
        this.getXqcbycData=res.mo.pd.rows
        this.xqcbycTotal=res.mo.pd.total
    })
},
            getXqfbList(){
                this.contData=[]
                this.clickShowDiaXqfb=true
                this.clickShowDiaXqkc=false;this.clickShowDiaXqcbyc=false;this.clickShowDiaZqtj=false;this.jjfaDia=false
                this.dialogTitle='需求分布'
                this.formQuers.m.area=this.getWarZonNameData
                getAreaDiaList(this.formQuers).then(res=>{
                    this.contData=res.pd.rows
                    this.total=res.pd.total
                })
            },
            getDbTjList(){
                this.dialogTitle='战区统计'
                this.clickShowDiaZqtj=true
                this.clickShowDiaXqkc=false;this.clickShowDiaXqcbyc=false;this.clickShowDiaXqfb=false;this.jjfaDia=false
                this.formQuers.m.area='东部战区'
                this.toZqtjList()
            },
            getNbTjList(){
                this.dialogTitle='战区统计'
                this.clickShowDiaZqtj=true
                this.clickShowDiaXqkc=false;this.clickShowDiaXqcbyc=false;this.clickShowDiaXqfb=false;this.jjfaDia=false
                this.formQuers.m.area='南部战区'
                this.toZqtjList()
            },
            getXbTjList(){
                this.dialogTitle='战区统计'
                this.clickShowDiaZqtj=true
                this.clickShowDiaXqkc=false;this.clickShowDiaXqcbyc=false;this.clickShowDiaXqfb=false;this.jjfaDia=false
                this.formQuers.m.area='西部战区'
                this.toZqtjList()
            },
            getBbTjList(){
                this.dialogTitle='战区统计'
                this.clickShowDiaZqtj=true
                this.clickShowDiaXqkc=false;this.clickShowDiaXqcbyc=false;this.clickShowDiaXqfb=false;this.jjfaDia=false
                this.formQuers.m.area='北部战区'
                this.toZqtjList()
            },
            getZbTjList(){
                this.dialogTitle='战区统计'
                this.clickShowDiaZqtj=true
                this.clickShowDiaXqkc=false;this.clickShowDiaXqcbyc=false;this.clickShowDiaXqfb=false;this.jjfaDia=false
                this.formQuers.m.area='中部战区'
                this.toZqtjList()
            },
            getXqkcList(){
                this.getXqkcData=[]
                this.clickShowDiaXqkc=true
    this.clickShowDiaZqtj=false;this.clickShowDiaXqfb=false;this.clickShowDiaXqcbyc=false;this.jjfaDia=false
                this.dialogTitle='需求与库存'
                getAreaXqkcDiaList(this.formXqkcQuers).then(res=>{
                    this.getXqkcData=res.pd.rows
                    this.xqkcTotal=res.pd.total
                })
            },

            hiddenDetail(){
                this.clickShowDiaXqfb=false
                this.clickShowDiaXqkc=false
                this.formQuers.page=1
                this.formQuers.m.area==''
                this.formXqkcQuers.page=1
                this.clickShowDiaXqcbyc=false
                this.formXqcbycQuers.page=1
                this.clickShowDiaZqtj=false
                this.jjfaDia=false
            },
            getTypeTjData(){
                getTypeTjData({}).then(res=>{
                    // this.getAfteTypeData=res.mo
                    this.zxl=res.mo.zxl
                    this.cfl=res.mo.cfl
                    this.lfl=res.mo.lfl
                    this.tnl=res.mo.tnl
                    this.bzl=res.mo.bzl
                    this.wjl=res.mo.wjl
                    this.number=res.mo.zl
                })
            },
            getDemandTjList(){
                getDemandTjData({}).then(res=>{
                    this.tjData=res.list
                    this.tjData.filter(item=>{
                        if(item.area=='北部战区'){
                            this.bbNum=item.sl
                        }else if(item.area=='南部战区'){
                            this.nbNum=item.sl
                        }else if(item.area=='西部战区'){
                            this.xbNum=item.sl
                        }else if(item.area=='东部战区'){
                            this.dbNum=item.sl
                        }else if(item.area=='中部战区'){
                            this.zbNum=item.sl
                        }
                    })
                })
            },
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
      if (num.length < 8) {
        num = '0' + num // 如未满八位数，添加"0"补位
        this.toOrderNum(num) // 递归添加"0"补位
      } else if (num.length === 8) {
        // 订单数中加入逗号
        num = num.slice(0, 2) + ',' + num.slice(2, 5) + num.slice(5, 8)
        this.orderNum = num.split('') // 将其便变成数据，渲染至滚动数组
        // this.orderNum=num
      } else {
        // 订单总量数字超过八位显示异常
        this.$message.warning('总量数字过大，显示异常，请联系客服')
      }
    },
            toLogsitio(){
                if(this.getUserData.includes('128')){//物流态势
        this.$router.push("/logisticsSituation");
      }else if(this.getUserData.includes('129')){//全域监控
        this.$router.push('/globalMonitoring')
      }else if(this.getUserData.includes('130')){//全程监控
        this.$router.push({
        name: "monitoring",
      });
      }else if(this.getUserData.includes('12')){//地图导视
        this.$router.push('/mapGuide')
      }else if(this.getUserData.includes('80')){//异常监控
        this.$router.push('/anomalyMonitoring')
      }else if(this.getUserData.includes('90')){//总体概况
        this.$router.push('/generalOverview')
      }else {
        this.$message({
                               type: 'error',
                               message: '没有权限!'
                            });
      }
            },
    toLogin(){
  this.$router.push("/login");
},
    toHome(){
                this.$router.push('/homepage')
            },
            toWarehouse(){
                if(this.getUserData.includes('69')){//仓储规划
                    this.$router.push('/warehousingPlanning')
                }else {
                    this.$message({
                               type: 'error',
                               message: '没有权限!'
                            });
                }
            },
            toFxfx(){
                if(this.getUserData.includes('86')){//费效分析
                    this.$router.push('/fxfx')
                }else {
                    this.$message({
                               type: 'error',
                               message: '没有权限!'
                            });
                }
            },
            toYlcs(){
                if(this.getUserData.includes('87')){//运力测算
                    this.$router.push('/ylcs')
                }else {
                    this.$message({
                               type: 'error',
                               message: '没有权限!'
                            });
                }
            },
            toLjcs(){
                if(this.getUserData.includes('88')){//路距测算
                    this.$router.push('/ljcs')
                }else {
                    this.$message({
                               type: 'error',
                               message: '没有权限!'
                            });
                }
            },
            toZhpj(){
                if(this.getUserData.includes('89')){//综合评价
                    this.$router.push('/zhpj')
                }else {
                    this.$message({
                               type: 'error',
                               message: '没有权限!'
                            });
                }
            },
            clearInter() {
                if (this.interval) {
                    clearInterval(this.interval)
                }
            },
            showWarZone() {
                document.getElementById("warZone").className = "showHide";
            },
            setWarZone(value) {
                this.warZoneName = value
                this.getWarZonNameData=value
                this.clearInter()
                this.getData(value)
                this.interval = setInterval(() => this.getData(value), 10000)
                // this.getXqfbList()
            },
            getData(zq) {
                // const params = zq ? {m: {zq}} : ''
                this.propName=zq
                // getAreaData(params).then(res => {
                //     const data = JSON.parse(JSON.stringify(res.m))
                //     let str = data.total
                //     let get = str.split('')
                //     let arr = []
                //     for (let n = 0; n < get.length; n++) {
                //         arr.push(get[n])
                //     }
                //     this.getNeedTotalNumData = arr
                //     delete data.total
                //     let list = []
                //     for (const key in data) {
                //         list.push({name: key, value: data[key]})
                //     }
                //     this.needData = list
                // })

                
            },
        },
    };
</script>
<style lang="scss" scoped>
@font-face {
    font-family: 'AGENCYB';
    src: url('./AGENCYB.TTF');
    font-weight: normal;
    font-style: normal;
}
.demandAnalysis {
    margin: 0;
    background-image: url("../../../assets/image/homePage/mainBg.png");
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
    background-image: url('../../../assets/image/homePage/btnBoxShadow.png');
    color: #fff;
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
.textNum {
    background-image: -webkit-linear-gradient(top, #03eefa, #237ce0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 20px;
    padding-right: 5px;
}
.textNumStyle {
    position: relative;
    font-family: 'AGENCYB';
    background: #071751;
    font-size: 34px;
    margin-top: 10px;
    display: flex;
    margin-left: 5px;
    color: #03eefa;
    text-decoration: none;
    -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(#03eefa), to(#237ce0));
    padding-left: 2px;
}
.specialNumStyle {
    color: #03eefa;
    font-size: 34px;
    margin-top: 10px;
    font-family: Gugi !important;
    display: flex;
    margin-left: 5px;
}
.mainCont {
    display: flex;
    flex-direction: column;
    height: calc(100% - 70px);
    margin: 0 25px;
    justify-content: space-between;
    padding: 20px 0;
}
.titleType {
    background-image: url("../../../assets/image/content/top_slice.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: rgba(255, 255, 255, 0.7);
    padding: 10px 25px;
    margin-left: 150px;
    text-align: center;
    width: 130px;
    font-size: 18px;
}
.showHide {
    background-image: url("../../../assets/image/content/click.png") !important;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #fff;
    padding: 10px 25px;
    margin-left: 150px;
    width: 131px;
    font-size: 18px;
    text-align: center;
}
.left_content {
    position: absolute;
    z-index: 3002;
    margin: 70px 50px;
}
.warZone {
    width: 150px;
    height: 50px;
    background-image: url("../../../assets/image/content/forces_slice.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: rgba(255, 255, 255, 0.8);
    padding: 10px 20px;
    line-height: 20px;
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    &:hover {
        background-image: url("../../../assets/image/content/shadow.png") !important;
        color: #fff;
    }
}
.clickStylec {
    background-image: url("../../../assets/image/content/shadow.png") !important;
    color: #fff;
    width: 160px;
    font-size: 20px;
}
.needData {
    width: 21%;
    height: 40%;
    position: absolute;
    left: 5px;
    bottom: 10px;
    z-index: 3202;
}
.totalName {
    color: #fff;
    font-size: 18px;
    text-align: center;
}
.needType {
    margin-top: 70px;
    margin-left: 30px;
    width: 80%;
    text-align: center;
    background: url("../../../assets/image/content/detail_slice.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 30px 30px 30px 30px;
    color: #fff;
    div {
        height: 40px;
        margin-top: 1px;
        line-height: 40px;
        font-size: 16px;
        display: flex;
        div:nth-child(1) {
            text-align: center;
            width: 50%;
            font-size: 16px;
        }
        div:nth-child(2) {
            text-align: center;
            width: 50%;
            font-size: 14px;
        }
    }
}
.rightContent {
    width: 25%;
    height: 90%;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 15px;
    z-index: 3204;
    .rightHeader {
        margin-top: 10px;
        height: 32%;
        background-image: url("../../../assets/image/homePage/splice.png");
        background-size: 100% 100%;
        padding-bottom: 25px;
        background-repeat: no-repeat;
    }
}
.completionrate {
    padding: 20px;
    display: flex;
}
.taskChin {
    line-height:30px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 4px solid #01ffff;
}
.taskEng {
    width:70%;
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    padding: 5px;
    border-bottom: 1px transparent solid;
    border-image: linear-gradient(to right, #27cbff, #001e65) 1 10;
}
.centfoot {
    width: 50%;
    height: 250px;
    position: absolute;
    bottom: 50px;
    left: 390px;
    display: flex;
    z-index: 3204;
}
.footItem {
    width: 25%;
}
.itemTop {
    height: 75%;
    background-image: url('../../../assets/image/homePage/cba.png');
    background-size: 100% 100%;
    margin-bottom: 10px;
}
.itemTopa {
    height: 75%;
    background-image: url('../../../assets/image/homePage/asd.png');
    background-size: 100% 100%;
    margin-bottom: 10px;
}
.itemBot {
    height: 10%;
    color: #7cdfff;
    text-align: center;
    font-size: 18px;
}
.itemTop {

}
.dataa {
    color: #03eefa;
    font-size: 24px !important;
    line-height: 35px;
    text-align: center;
    padding-top: 45px;
}
.datab {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    text-align: center;
    position: absolute;
    bottom: 90px;
    margin-left: 85px;
}
.statisContent {
    width: 406px;
    height: 45px;
    background-size: 100% 100%;
    justify-content: center;
    padding: 10px;
    .orderTitle {
        color: rgba(255, 255, 255, 0.7);
        font-size: 18px;
    }
    .comma {
        display: inline-block;
        color: #fff;
    }
}
.chartNum {
    text-align: -webkit-center;
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
        margin-top: 10px;
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
}
.dialogClick {
    position: absolute;
    bottom: 300px;
    left: 355px;
    width: 1065px;
    height: 600px;
    background-image: url('../../../assets/image/content/sliceList.png');
    background-size: 100% 100%;
    z-index: 2555;
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
.mainListItemc {
    justify-content: space-around;
    display: flex;
    color: #fff;
    background: #054480;
    height: 100px;
    padding: 10px 5px;
    margin-top: 5px;
    .itemlanerc {
        flex: 1;
        text-align: center;
        margin-left: 1px;
    }
}
.pageAtion {
    width: 100%;
    text-align: center;
}
.pageAtiona {
    width: 100%;
    text-align: center;
    position: relative;
}
.jjfa {
    display: flex;
    position: absolute;
    top: 100px;
    left: 120px;
    z-index: 2555;
    &:hover {
        .jjfaImaa {
            width: 50px;
            height: 40px;
            background-image: url('../../../assets/image/content/vectorShadow.png');
            background-size: 100% 100%;
        }
    }
    .jjfaImaa {
        width: 50px;
        height: 40px;
        background-image: url('../../../assets/image/content/vector.png');
        background-size: 100% 100%;
    }
}
.contentOver {
    width: 18%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.uploadOut {
    position: absolute;
    bottom: 15px;
    right: 20px;
    width: 64px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background: rgba(3, 26, 83, 0.1);
    box-shadow: inset 0 0 10px 0 #54b7ff;
    border-radius: 5px 5px 5px 5px;
    opacity: 1;
    color: #fff;
}
</style>
