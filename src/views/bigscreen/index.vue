<template>
    <div class="powerDeployment">
        <div class="top_header">
      <div class="leftHeaderBg" @click="toHome"></div>
            <span class="text" @click="toSituation">力&nbsp;量&nbsp;部&nbsp;署</span>
        </div>
        <div class="content_main">
            <div class="center_content">
                <div class=""
                     style="position: absolute; font-size: 17px; z-index: 3205; display: flex; margin: 20px 37%;">
                    <div :class="titleType" @click="warZone" id="warZone">战区</div>
                    <div :class="titleType" @click="showForceType" id="showForceType">军兵种</div>
                    <div :class="titleType" @click="showBaseType" id="showBaseType">储供基地</div>
                </div>
                <powerMap v-if="showPowerMap" style="width: 100%; height: 100%; position: relative; z-index: 3203;"
                          :war-zone="warZoneName"></powerMap>
                <zoneMap v-else
                         style="width: 100%; height: 100%; position: relative; z-index: 3203;"
                         ref="zoneMap"
                         :p-name="pName"
                         :type="type"></zoneMap>
            </div>
            <div class="left_content" v-if="forceType">
                <div class="forces" v-for="(item,index) in forceTypeList" :key="index"
                     @click="showInformation(item,'Arms')">
                    {{item}}
                </div>
                <!-- <div class="forces" @click="showInformation">陆军</div>
                <div class="forces">海军</div>
                <div class="forces">空军</div>
                <div class="forces">火箭军</div>
                <div class="forces">武警部队</div>
                <div class="forces">战略支援部队</div>
                <div class="forces">联勤保障部队</div> -->
            </div>
            <div class="left_content" v-if="baseType">
                <div class="base" v-for="(item,index) in baseTypeList" :key="index"
                     @click="showInformation(item,'Base')">
                    {{item}}
                </div>
                <!-- <div class="base" @click="showInformation">无锡中心</div>
                <div class="base">桂林中心</div>
                <div class="base">西宁中心</div>
                <div class="base">沈阳中心</div>
                <div class="base">郑州中心</div> -->
            </div>
            <div class="left_content" v-if="zoneType">
                <div class="warZone"
                     v-for="(item,index) in zoneTypes"
                     :key="index"
                     @click="setWarZone(item)">{{item}}
                </div>
            </div>
            <!-- <el-drawer :modal='false' style="background: red; float: right; width: 600px; position: absolute; right: 0; z-index: 1505;" :visible.sync="drawer"
                       :with-header="false"> -->
            <div class="right_content">
                <div class="detailInformation" v-for="item in this.wareHouseData">
                    <div class="completionrate">
                        <div class="taskChin">
                            仓&nbsp;储&nbsp;力&nbsp;量
                          </div>
                          <div class="taskEng"></div>
                    </div>
                    <div class="warehouse">
                        <div class="nr" style=" margin-left: 50px;">
                            <img
                                src="../../assets/image/content/warehouse.png"
                                style="width: 25px;"
                                alt=""
                            />
                            <span class="numData" style="font-size: 12px;">仓库</span>
                        </div>
                        <div class="right">
                            <div class="nra">
                                <span class="titName">总数(个)</span>
                                <span class="numData">{{item.num}}</span>
                            </div>
                            <div class="nra">
                                <span class="titName">总面积(平方米)</span>
                                <span class="numData">{{item.floorArea}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="inventory warehouse">
                        <div class="nr" style=" margin-left: 50px;">
                            <img
                                src="../../assets/image/content/inventory.png"
                                style="width: 25px;"
                                alt=""
                            />
                            <span class="numData" style="font-size: 12px;">库存</span>
                        </div>
                        <div class="right">
                            <div class="nra">
                                <span class="titName">库容能力(万件)</span>
                                <span class="numData">{{item.total}}</span>
                            </div>
                            <div class="nra">
                                <span class="titName">实时库容(万件)</span>
                                <span class="numData">{{item.surplus}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="distribution warehouse">
                        <div class="nr" style=" margin-left: 50px;">
                            <img
                                src="../../assets/image/content/distribution.png"
                                style="width: 25px;"
                                alt=""
                            />
                            <span class="numData" style="font-size: 12px;">配送</span>
                        </div>
                        <div class="">
                            <div class="" style="display: flex; flex-direction: column; width: 100%; margin-left: 35px;">
                                <span class="titName">配送企业</span>
                                <span class="numData">{{item.gys}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detalList">
                    <div class="completionrate" style="padding: 20px;">
                        <div class="taskChin">
                            物&nbsp;资&nbsp;类&nbsp;型
                          </div>
                          <div class="taskEng"></div>
                    </div>
                    <img src="../../assets/image/content/close.png" class="closeBtn" @click="closeBtn" alt="">
                    <!--<leftTab :war-zone="warZoneName2"/>-->
                    <div class="hedContainer">
                        <div class="maincont">
                            <div class="hedTit">
                                <div class="mcon">类型</div>
                                <div class="mcon">数量(个)</div>
                            </div>
                            <div class="contMain" style="margin-left: 25px; width: 98%; height: 160px;">
                                    <div class="contInner" :style="{top: tableTop + 'px'}">
                                        <div v-for="(item,index) in tableList" :key="index">
                                            <div class="contData" @mouseover="onHover" @mouseout="onLeave">
                                                <div class="intel">{{item.pm}}</div>
                                                <div class="intel">{{item.num}}</div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottomC">
                <div class="completionratea" style="padding: 10px 20px; margin-left: 650px; width: 600px; padding-left: 100px;">
                    <div class="taskChina">
                      供&nbsp;应&nbsp;关&nbsp;系
                    </div>
                    <div class="taskEnga"></div>
                </div>
                <div class="mainTablList">
                    <div class="listLeft">
                        <div class="headTitle">
                            <!-- <div class="headData" v-for="item in headData">
                                <div>{{ item.name }}</div>
                            </div> -->
                                <div class="intel">保障单位类型</div>
                                <div class="intel">保障单位名称</div>
                                <div class="intel">保障单位编号</div>
                                <div class="intel">保障单位负责人</div>
                                <div class="intel">值班电话</div>
                                <div class="intel">备注</div>
                        </div>
                        <div class="contMain">
                            <div class="contInner" :style="{top: tableGygxTop + 'px'}">
                                <div v-for="(item,index) in gygxtableList" :key="index">
                                    <div class="contData" @mouseover="onHover" @mouseout="onLeave" @click="toShowBbz(item)">
                                        <div class="intel">{{item.type}}</div>
                                        <div class="intel">{{item.name}}</div>
                                        <div class="intel">{{item.code}}</div>
                                        <div class="intel">{{item.emp}}</div>
                                        <div class="intel">{{item.tel}}</div>
                                        <div class="intel">{{item.remark}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="listRight">
                            <div class="headTitle">
                                <div class="headData" v-for="item in headRigtData">
                                    <div>{{ item.name }}</div>
                                </div>
                            </div>
                            <div class="contMain">
                                <div class="contInner" :style="{top: tableTop + 'px'}">
                                    <div v-for="(item,index) in rigtTabData" :key="index">
                                        <div class="contData" @mouseover="onHover" @mouseout="onLeave">
                                            <div class="intel">{{item.brank}}</div>
                                            <div class="intel">{{item.btype}}</div>
                                            <div class="intel">{{item.bname}}</div>
                                            <div class="intel">{{item.bcode}}</div>
                                            <div class="intel">{{item.bemp}}</div>
                                            <div class="intel">{{item.remark}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <!-- </el-drawer> -->
            <img src="../../assets/image/content/teSlice.png"
                 style="z-index: 2020; position: absolute; bottom: 380px; right: 530px;"
                 alt="">
        </div>
    </div>
</template>

<script>
    import bigScreenAPI from '@/api/modules/deploymentofForce'
    import leftTab from "@/views/bigscreen/components/leftTab.vue";
    import rightTab from "@/views/bigscreen/components/rightTab.vue";
    import powerMap from "./map/powerMap.vue";
    import zoneMap from './map/zoneMap.vue'

    $(document).ready(function () {
        $('.left_content').on('click', 'div', function () {
            $(this).addClass('clickStylec')
            $(this).siblings().removeClass('clickStylec')
        })
    })

    export default {
        name: "powerDeployment",
        components: {
            leftTab,
            rightTab,
            powerMap,
            zoneMap
        },
        data() {
            return {
                information: false,
                forceType: false,
                baseType: false,
                zoneType: true,
                detailList: false,
                titleType: true,
                data: '',
                titleType: ['titleType' ? 'titleType' : 'showHide'],
                drawer: false,
                zoneTypes: ['东部战区', '南部战区', '西部战区', '北部战区', '中部战区'],
                warZoneName: '',
                warZoneName2: '',
                showPowerMap: true,
                forceTypeList: ['陆军', '海军', '空军', '火箭军', '武警部队', '战略支援部队', '联勤保障部队'],
                baseTypeList: ['无锡中心', '桂林中心', '西宁中心', '沈阳中心', '郑州中心'],
                wareHouseData: [],
                theaterTypeData: [],
                pName: '',
                type: '',
                interval: null,
                tableList: [],
                tableTimera: null,
                count: 0,
                headData: [{name: "保障单位类型"}, {name: "保障单位名称"}, {name: "保障单位编号"}, {name: "保障单位负责人"}, {name: "值班电话"}, {name: "备注"}],
                headRigtData:[{name: "保障级别"}, {name: "被保障单位类型"}, {name: "被保障单位名称"}, {name: "被保障单位编号"}, {name: "被保障单位负责人"}, {name: "备注"}],
                //第一页数据
                gygxtableList: [],
                rigtTabData:[],
                tableTop: 0,
                tableGygxTop:0,
                tableTimer: null,
                count: 0,
                gygxCont:0,
            }
        },
        mounted() {
            document.getElementById('warZone').className = 'showHide';
        },
        created() {
            this.getData()
            // this.getHouserData()
        },
        destroyed() {
            this.clearInter()
        },
        methods: {
            toShowBbz(item){
                console.log(item,'==========================')
                // 保障列表
                let params={
                    m:{
                        mid:item.id
                    }
                }
                bigScreenAPI.getgygxbData(params).then(res=>{
                this.rigtTabData = res.list
                })
            },
            getData() {
                // 物资类型
                bigScreenAPI.getWzTypeData({}).then(res=>{
                this.tableList = res.list
                })
                // 保障列表
                bigScreenAPI.getgygxzData({}).then(res=>{
                this.gygxtableList = res.list
                })
                
                this.tableActionFun()
            },
            tableActionFun() {
                this.tableListSize = this.tableList.length;
                if (this.tableListSize > 6) {
                    this.tableList = this.tableList.concat(this.tableList);
                    this.tableTimerFun();
                }
                this.gygxtabliSize=this.gygxtableList.length
                if (this.gygxtabliSize > 6) {
                    this.gygxtableList = this.gygxtableList.concat(this.gygxtableList);
                    this.tableTimerFun();
                }
            },
            tableTimerFun() {
                this.count = 0;
                this.gygxCont=0
                this.tableTimera = setInterval(() => {
                    if (this.count < (this.tableList.length / 2) * 15) {
                        this.tableTop -= 1;
                        this.count++;
                    } else {
                        this.count = 0;
                        this.tableTop = 0;
                    }
                }, 100);
                this.tableTimer = setInterval(() => {
                    if (this.gygxCont < (this.gygxtableList.length / 2) * 15) {
                        this.tableGygxTop -= 1;
                        this.gygxCont++;
                    } else {
                        this.gygxCont = 0;
                        this.tableGygxTop = 0;
                    }
                }, 100);
            },
            onHover() {
                clearInterval(this.tableTimer)
                clearInterval(this.tableTimera)
            },
            onLeave() {
                this.tableTimerFun()
            },
            toHome(){
                this.$router.push('/homepage')
            },
            showDialog() {
                alert(6666);
            },
            getLlbsAll() {
                bigScreenAPI.getAllDataPoint().then((res) => {
                    console.log(res)
                })
            },
            toSituation() {
                this.$router.push({
                    name: "mapGuide",
                });
            },
            getHouseData(key, params) {
                bigScreenAPI[key](params).then(res => {
                    this.wareHouseData = res.list
                })
            },
            getTypeData(key, params) {
                bigScreenAPI[key](params).then(res => {
                    this.theaterTypeData = res.list
                })
            },
            setWarZone(value) {
                const params = {
                    m: {area: value}
                }
                this.getHouseData('getWarehouseData', params)
                const params2 = {
                    m: {area: value},
                    page: 1,
                    pageSize: 5
                }
                this.getTypeData('getTheaterType', params2)
                this.clearInter()
                this.interval = setInterval(() => {
                    this.getHouseData('getWarehouseData', params)
                    this.getTypeData('getTheaterType', params2)
                }, 10000)
                this.warZoneName = value
                this.drawer = true
                this.detailList = true
            },
            showInformation(value, type) {
                let params = {
                    m: {pName: value}
                }
                this.pName = value
                this.type = type
                this.getHouseData(`get${type}HouseData`, params)
                const params2 = {
                    m: {pName: value},
                    page: 1,
                    pageSize: 5
                }
                this.getTypeData(`get${type}Type`, params2)
                this.clearInter()
                this.interval = setInterval(() => {
                    this.getHouseData(`get${type}HouseData`, params)
                    this.getTypeData(`get${type}Type`, params2)
                }, 10000)
                this.drawer = true
                this.detailList = true
            },
            showForceType() {
                this.clearInter()
                this.drawer = false
                this.showPowerMap = false
                this.forceType = true
                this.baseType = false
                this.zoneType = false
                this.information = false
                document.getElementById('showForceType').className = 'showHide';
                document.getElementById('showBaseType').className = 'titleType';
                document.getElementById('warZone').className = 'titleType';
                this.pName = ''
                if (this.$refs['zoneMap']) {
                    this.$refs['zoneMap'].removeEcharts()
                }
            },
            showBaseType() {
                this.clearInter()
                this.drawer = false
                this.showPowerMap = false
                this.baseType = true
                this.zoneType = false
                this.forceType = false
                this.information = false
                document.getElementById('showBaseType').className = 'showHide';
                document.getElementById('warZone').className = 'titleType';
                document.getElementById('showForceType').className = 'titleType';
                this.pName = ''
                if (this.$refs['zoneMap']) {
                    this.$refs['zoneMap'].removeEcharts()
                }
            },
            warZone() {
                this.clearInter()
                this.drawer = false
                this.showPowerMap = true
                this.zoneType = true
                this.forceType = false
                this.baseType = false
                this.information = false
                this.warZoneName = ''
                document.getElementById('warZone').className = 'showHide';
                document.getElementById('showBaseType').className = 'titleType';
                document.getElementById('showForceType').className = 'titleType';
            },
            closeBtn() {
                this.detailList = false
            },
            clearInter() {
                if (this.interval) {
                    clearInterval(this.interval)
                }
            }
        },
    };
</script>
<style lang='scss' scoped>
    .changeStyle {
        color: #09c;
        background-color: #fff;
    }
    .powerDeployment {
        width: 100%;
        background-image: url("../../assets/image/homePage/mainBg.png");
        margin: 0;
        height: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .completionratea {
        padding: 0 10px;
        display: flex;
        border-bottom: 1px transparent solid;
        border-image: linear-gradient(to right, #27cbff, #001e65) 1 10;
    }
    .taskChina {
        color: #fff;
        font-size: 20px;
        font-weight: bold;
    }
    .taskEnga {
        color: rgba(255, 255, 255, 0.5);
        font-size: 18px;
        padding: 5px;
    }
    .completionrate {
        //padding: 20px;
        display: flex;
    }
    .taskChin {
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        border-bottom: 4px solid #01ffff;
    }
    .taskEng {
        width: 70%;
  padding: 5px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 18px;
        padding: 5px;
        border-bottom: 1px transparent solid;
        border-image: linear-gradient(to right, #27cbff, #001e65) 1 10;
    }
    .leftHeaderBg {
        width: 120px;
        height: 40px;
        background-image: url('../../assets/image/homePage/homeBtn.png');
        background-size: 100% 100%;
        position: absolute;
        top: 5px;
        left: 10px;
        &:hover {
            position: absolute;
            top: 1px;
            left: 2px;
            width: 145px;
            height: 60px;
            background-image: url('../../assets/image/homePage/hoverShad.png');
        }
    }
    .top_header {
        font-size: 30px;
        text-align: center;
        padding-top: 20px;
        height: 70px;
        line-height: 25px;
        width: 100%;
        background-image: url("../../assets/image/top_header/titleBg.svg");
        background-position: center;
        background-size: cover;
        z-index: 2050;
    }
    .hideBox {
        background-image: url("../../assets/image/content/click.png");
    }
    .text {
        background-image: linear-gradient(to bottom, white, #00e9ff);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 30px;
        font-weight: bold;
        filter: drop-shadow(2px 2px 3px #002153);
    }
    .content_main {
        height: calc(100% - 70px);
        display: flex;
        justify-content: space-between;
    }
    .left_content {
        position: absolute;
        z-index: 3205;
        margin: 100px 50px;
    }
    .right_content {
        width: 25%;
        height: 500px;
        animation-name: mymove;
        animation-duration: 5s;
        padding-bottom: 70px;
        position: absolute;
        right: 40px;
        top: 80px;
        bottom: 10px;
        z-index: 3204;
    }
    .bottomC {
        margin-top: 5px;
        padding: 0 40px 40px 40px;
        background: url("../../assets/image/homePage/botSupply.png");
        background-size: 100% 100%;
        width: 98%;
        height: 360px;
        position: absolute;
        bottom: 10px;
        left: 20px;
        z-index: 3204;
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
        background-image: url("../../assets/image/content/top_slice.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: rgba(255, 255, 255, 0.7);
        padding: 10px 25px;
        margin-left: 30px;
        text-align: center;
        width: 130px;
        font-size: 18px;
        &:hover {
            background-image: url("../../assets/image/content/click.png") !important;
            color: #fff;
        }
    }
    .showHide {
        background-image: url("../../assets/image/content/click.png") !important;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #fff;
        text-align: center;
        font-size: 20px;
        padding: 10px 20px;
        width: 130px;
        margin-left: 30px;
        font-size: 18px;
    }
    .forces,
    .base,
    .warZone {
        width: 150px;
        height: 50px;
        background-image: url("../../assets/image/content/forces_slice.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: rgba(255, 255, 255, 0.8);
        padding: 10px 20px;
        line-height: 20px;
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        &:hover {
            background-image: url("../../assets/image/content/shadow.png") !important;
            color: #fff;
        }
    }
    .clickStylec {
        background-image: url("../../assets/image/content/shadow.png") !important;
        color: #fff;
        width: 160px;
        font-size: 20px;
    }
    .teSlice {
        position: absolute;
        right: 50px;
        bottom: 15px;
    }
    .detailInformation {
        justify-content: space-around;
        background: url("../../assets/image/content/listSlice.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 30px 50px 10px 30px;
    }
    .warehouse {
        width: 90%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
    }
    .nr {
        display: flex;
        flex-direction: column;
        margin-left: 0;
    }
    .nra {
        display: flex;
        flex-direction: column;
        margin-left: 0;
        width: 50%;
        overflow: hidden;
        padding: 0 10px;
    }
    .titName {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
    }
    .numData {
        color: #fff;
        margin-top: 5px;
        font-size: 18px;
    }
    .right {
        display: flex;
        justify-content: space-around;
        width: 70%;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .distribution {
        width: 48%;
    }
    .detalList {
        position: relative;
        margin-top: 10px;
        background: url("../../assets/image/content/listSlice.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: 300px;
        margin-bottom: 10px;
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
    .hedContainer {
        display: flex;
        flex-direction: column;
    }
    .hedTit {
        width: 89%;
        padding: 0 30px;
        display: flex;
        height: 37px;
        background: rgba(255, 255, 255, 0.1);
        justify-content: space-around;
        line-height: 37px;
        margin-left: 25px;
        color: #01ffff;
        position: sticky;
    }
    .contTit {
        width: 89%;
        height: 25px;
        padding: 0 30px;
        margin-top: 5px;
        overflow: hidden;
        margin-left: 25px;
        background: rgba(255, 255, 255, 0.1);
        justify-content: space-around;
        line-height: 25px;
        color: #01ffff;
    }
    .botct {
        overflow: hidden;
        height: 350px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        color: #01ffff !important;
    }
    .maincont {
        margin-bottom: 5px;
    }
    .mcon {
        width: 50%;
        text-align: center;
    }
    .bgMc {
    }
    .headTitle {
        width: 90%;
        display: flex;
        height: 47px;
        line-height: 47px;
        background: #054480;
        justify-content: space-around;
        color: aqua;
    }
    .mainTablList {
        margin-top: 15px;
        display: flex;
    }
    .listLeft {
        width: 50%;
        margin-left: 10px;
    }
    .listRight {
        width: 52%;
    }
    .contMain {
        width: 100%;
        color: #fff;
        height: 200px;
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
    .one {
        height: 4px;
        background: #054480;
        width: 50px;
    }
    .showResult {
        height: 4px;
        width: 50px;
        background: #01ffff;
    }
    .toOne {
        width: 20%;
        margin-left: 40%;
        position: absolute;
        bottom: -20px;
        height: 1px;
        display: flex;
        text-align: center;
    }

</style>
