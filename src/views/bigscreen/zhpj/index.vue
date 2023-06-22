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
                <span class="text">综&nbsp;合&nbsp;评&nbsp;价</span>
            </div>
            <div class="">
                <div class="coumn rightNumOne" @click="toYlcs">运力测算</div>
                <div class="coumn rightNumTwo" @click="toLjcs">路距测算</div>
                <div class="coumn rightNumThree">综合评价</div>
                <div class=" rightNumFour" @click="toLogsitio">动态监管</div>
      <div class="rightfou" @click="toLogin"></div>
            </div>
        </div>
        <div class="content_main">
            <!-- <div class="item" style=""> -->
            <!-- <iframe :src="srcUrl" frameborder="0" width="100%" height="100%"></iframe> -->
            <!-- </div> -->
            <div class="topSearchForm">
              <el-form>
                <el-row :gutter="40" style="display: flex;">
                  <el-col :md="8">
                    <el-form-item label="年份">
                      <el-date-picker
                      style="width: 400px;"
            v-model="form.nedYear"
            value-format="yyyy"
            type="year"
            placeholder="请选择年">
          </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="月份">
                      <el-select placeholder="请选择月份" v-model="form.currentMonth" style="width: 300px;" clearable="">
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
              <div class="conta">
                <div class="contentMainTop_itema">
                    <div class="top_title">
                      <div class="taskChin">服&nbsp;务&nbsp;水&nbsp;平</div>
                      <div class="taskEng"></div>
                    </div>
                    <div class="">
                        <serviceLevel :getSevelData="this.getData"></serviceLevel>
                    </div>
                  </div>
              </div>
              <div class="conta">
                <div class="contentMainTop_itema">
                    <div class="top_title">
                      <div class="taskChin">企&nbsp;业&nbsp;承&nbsp;运&nbsp;体&nbsp;量</div>
                      <div class="taskEng"></div>
                    </div>
                    <div class="">
                        <!-- <serviceLevel></serviceLevel> -->
                        <qycytlEchart :serachData="this.getKcData"></qycytlEchart>
                    </div>
                  </div>
              </div>
              <div class="conta">
                <div class="contentMainTop_itema">
                    <div class="top_title">
                      <div class="taskChin">经&nbsp;费&nbsp;占&nbsp;比</div>
                      <div class="taskEng"></div>
                    </div>
                    <div class="">
                        <!-- <serviceLevel></serviceLevel> -->
                        <jfzbEchart :serachData="this.getJfzbData"></jfzbEchart>
                    </div>
                  </div>
              </div>
            </div>
            <div class="contentList">
               <tableList :serachData="this.tableList"></tableList>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import getZhpjDataApi from '@/api/modules/zhpj'
import serviceLevel from './components/serviceLevel.vue'
import jfzbEchart from './components/jfzbEchart.vue'
import qycytlEchart from './components/qycytlEchart.vue'
import tableList from './components/tableList'
export default {
  computed: {
    ...mapGetters(["roles"]),
  },
    components:{
        serviceLevel,
        jfzbEchart,
        qycytlEchart,
        tableList
    },
    data(){
        return{
          tableList:[],
          form:{
            nedYear:'',
          currentMonth:'',
          },
          
          startMont: [
        {
          value: '1',
          label: '1月'
        },
        {
          value: '2',
          label: '2月'
        },
        {
          value: '3',
          label: '3月'
        },
        {
          value: '4',
          label: '4月'
        },
        {
          value: '5',
          label: '5月'
        },
        {
          value: '6',
          label: '6月'
        },
        {
          value: '7',
          label: '7月'
        },
        {
          value: '8',
          label: '8月'
        },
        {
          value: '9',
          label: '9月'
        },
        {
          value: '10',
          label: '10月'
        },
        {
          value: '11',
          label: '11月'
        },
        {
          value: '12',
          label: '12月'
        }
      ],
          tableTop: 0,
          tableTimer: null,
                count: 0,
            srcUrl:window.roterZhpjUrl.srcUrl,
            getResolveData: [],
            getData:[],
            getKcData:[],
            getJfzbData:[]
        }
    },
    created(){
    this.getUserData = this.$store.state.user.sidebar.roles;
      this.tableActionFun()
      this.getTableListData()
      this.getServeLevelData()
      this.getQycytlData()
      this.getJfzbListData()
    },
    methods:{
      handleSearch(){
        // tab列表
        this.getTableListData()
        // 服务水平
        this.getServeLevelData()
        // 企业承运体量
        this.getQycytlData()
        // 经费占比
        this.getJfzbListData()
      },
      getJfzbListData(){
        let params={
                    m:{
                      year:this.form.nedYear,
                      month:this.form.currentMonth
                    }
                }
        getZhpjDataApi.getZhpjJfzbData(params).then((res) => {
        this.getJfzbData=res.list
        console.log(this.getJfzbData,'lllllllllllllllllllllllllll')
        })
      },
      getQycytlData(){
        let params={
                    m:{
                      year:this.form.nedYear,
                      month:this.form.currentMonth
                    }
                }
                getZhpjDataApi.getZhpjQycytlData(params).then((res)=>{
                    this.getKcData=res.list
                    console.log(this.getKcData,'this.getKcDataAbba八八八八八八八八八')
                    })
      },
      getServeLevelData(){
        let params={
          m:{
            year:this.form.nedYear,
            month:this.form.currentMonth
          }
        }
        getZhpjDataApi.getZhpjJFwspData(params).then((res)=>{
          this.getData=res.list
        })
      },
      getTableListData(){
        let params={
                    m:{
                        year:this.form.nedYear,
                        month:this.form.currentMonth
                    }
                }
                getZhpjDataApi.getZhpjTableData(params).then(res=>{
                    this.tableList=res.list
                console.log(this.tableList,'设备监控数据');
                })
      },
      tableActionFun() {
                this.tableListSize = this.getResolveData.length;
                if (this.tableListSize > 6) {
                    this.getResolveData = this.getResolveData.concat(this.getResolveData);
                    this.tableTimerFun();
                }
            },
      tableTimerFun() {
                this.count = 0;
                this.tableTimer = setInterval(() => {
                    if (this.count < (this.getResolveData.length / 2) * 15) {
                        this.tableTop -= 1;
                        this.count++;
                    } else {
                        this.count = 0;
                        this.tableTop = 0;
                    }
                }, 100);
            },
            onHover() {
                clearInterval(this.tableTimer)
            },
            onLeave() {
                this.tableTimerFun()
            },
        toLogsitio(){
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
    toLogin(){
  this.$router.push("/login");
},
        toHome(){
                this.$router.push('/homepage')
            },
            toWarehouse(){
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
            toDemandly(){
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
    }
}
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
    background-image: url('../../../assets/image/homePage/btnBoxShadow.png');
    color: #fff;
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
.topSearchForm {
    padding-top: 8px;
    padding-left: 400px;
    height: 5%;
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
    height: 40%;
    width: 100%;
    padding: 0 20px;
    display: flex;
}
.conta {
    flex: 1;
    width: 32%;
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
    height: 55%;
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
    width: 30%;
    flex: 1;
    line-height: 47px;
    font-size: 14px;
    color: #fff;
    text-align: center;
}
.bottomData {
    width: 100%;
    color: #fff;
    height: 420px;
    line-height: 30px;
    margin-top: 5px;
    font-size: 14px;
    position: relative;
    overflow: hidden;
}
.contInner {
    width: 100%;
    position: absolute;
    left: 0;
}
</style>