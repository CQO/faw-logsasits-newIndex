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
        <span class="text">路&nbsp;距&nbsp;测&nbsp;算</span>
      </div>
      <div class="">
        <div class="coumn rightNumOne" @click="toYlcs">运力测算</div>
        <div class="coumn rightNumTwo">路距测算</div>
        <div class="coumn rightNumThree" @click="toZhpj">综合评价</div>
        <div class="rightNumFour" @click="toLogsitio">动态监管</div>
      <div class="rightfou" @click="toLogin"></div>
      </div>
    </div>
    <div class="content_main">
      <div class="item" style="">
        <div class="righttopform">
          <el-form>
            <el-row :gutter="47" style="display: flex;">
              <el-col :md="6">
                <el-form-item label="任务起点">
                  <el-select placeholder="请选择" v-model="formValue.province" @change="currProvinceChange">
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
              <el-col :md="4">
                <el-select v-model="formValue.sj" placeholder="请选择" @change="currentSjChange">
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
                <el-select v-model="formValue.xj" placeholder="请选择" @change="currentXjChange">
                  <el-option
                    v-for="item in getxjData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :md="4">
                <el-form-item label="体积">
                  <el-input
                    placeholder="请输入内容"
                    style="width: 60%;"
                     v-model="formValue.tj"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6">
                <el-form-item label="任务时效">
                  <el-input
                    placeholder="请输入内容"
                    style="width: 60%;"
                    v-model="formValue.rwsx"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40" style="display: flex;">
              <el-col :md="6">
                <el-form-item label="保障地点">
                  <el-select placeholder="请选择" v-model="formValue.getProvince" @change="currProvinceChange">
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
              <el-col :md="4">
                <el-select placeholder="请选择" v-model="formValue.getSj" @change="currentSjChange">
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
                <el-select placeholder="请选择" v-model="formValue.getXj" @change="currentGetXjChange">
                  <el-option
                    v-for="item in getxjData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :md="4">
                <el-form-item label="重量">
                  <el-input
                    placeholder="请输入内容"
                    style="width: 60%;"
                    v-model="formValue.zl"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" style="display: flex;">
                <!-- <div class="btnSty">确认上传</div> -->
                <div class="btnSty" style="margin-left: 5px;" @click="toLjcs">路距测算</div>
                <el-radio v-model="radiob" label="按体积计费" style="margin-left: 15px;">按体积计费</el-radio>
                <el-radio v-model="radiob" label="按重量计费">按重量计费</el-radio>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="rightbottab">
            <div class="toptitle">
                <div class="titleItem">方案编号</div>
                <div class="titleItem">运输里程(公里)</div>
                <div class="titleItem">运输时长(小时)</div>
                <div class="titleItem">参考单价(元)</div>
                <div class="titleItem">参考总价(元)</div>
                <div class="titleItem">方案特点</div>
            </div>
            <div class="bottomData">
                <div class="itemasd" v-for="item in getTable" @click="toDetailDat(item)">
                    <div class="dataitem"> {{item.famc}}</div>
                    <div class="dataitem">{{item.jl}}</div>
                    <div class="dataitem">{{item.sj}}</div>
                    <div class="dataitem">{{item.dj}}</div>
                    <div class="dataitem">{{item.zj}}</div>
                    <div class="dataitem">{{item.yd}}</div>
                </div>
            </div>
        </div>
        <div class="rightFoot">
            <iframe ref='fIframe' :src="srcUrl" frameborder="0" width="100%" height="100%"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ljcsApi from '@/api/modules/ljcs'
import { Message } from "element-ui";
export default {
  computed: {
    ...mapGetters(["roles"]),
  },
  data() {
    return {
      radiob:'',
        getProvinList:[],
        getSjData:[],
        getxjData:[],
        getTable:[],
        formValue:{
          province:'',
          sj:'',
          xj:'',
          tj:'',
          zl:'',
          getProvince:'',
          getSj:'',
          getXj:'',
          jwda:'',
          jwdc:'',
        },
      srcUrl: window.roterLjcsUrl.srcUrl,
      queryParams:{
        page:1,
        pageSize:10
      },
    };
  },
  mounted(){
  },
  created(){
    this.getUserData = this.$store.state.user.sidebar.roles;
    this.getProvinceList()
  },
  methods: {
    toDetailDat(item){
      this.getxjData.filter(item=>{
        if(item.id==this.formValue.getXj){
          this.formValue.jwdc=item.lon+','+item.lat
        }
      })
      const mapFrame = this.$refs['fIframe'];
      const iframeWin = mapFrame.contentWindow;
      let data = {
                    bzddjwd:this.formValue.jwdc,
                    rwqdjwd:this.formValue.jwda,
                    yd:item.yd,
                    data:'父页面面传输数据过来了'
                }
                console.log(data,'datatatatatatattaaaaaaaaaaaaaaaaaaaaa')
                // this.$refs.fIframe.contentWindow.postMessage(data,'*')
                iframeWin.postMessage(
        {
          data: data,
        },
        "*")
    },
    currentXjChange(){
      this.getxjData.filter(item=>{
        if(item.id==this.formValue.xj){
          this.formValue.jwda=item.lon+','+item.lat
        }
      })
    },
    currentGetXjChange(){
      this.getxjData.filter(item=>{
        if(item.id==this.formValue.getXj){
          this.formValue.jwdc=item.lon+','+item.lat
        }
      })
    },
    currentSjChange(val){
      let params={
        m:{
          pid:val,
          type:'area'
        }
      }
      ljcsApi.getProvinceData(params).then(res=>{
        this.getxjData=res.list
      })
    },
    currProvinceChange(val){
      let params={
        m:{
          pid:val,
          type:'city'
        }
      }
      ljcsApi.getProvinceData(params).then(res=>{
        this.getSjData=res.list
      })
    },
    toLjcs(){
      if(!this.formValue.jwda){
        Message({
          type: 'error',
          message: '请先选择任务起点'
        })
      }else if(!this.formValue.jwdc){
        Message({
          type: 'error',
          message: '请先选择保障地点'
        })
      } 
      else{
        let params={
        m:{
          fwzb:this.formValue.jwda,
          bzzb:this.formValue.jwdc,
          tj:this.formValue.tj,
          zl:this.formValue.zl,
          rwsx:this.formValue.rwsx,
          yfgz:this.radiob
        }
      }
      ljcsApi.getTableData(params).then(res=>{
        this.getTable=res.list
      })
      }
    },
    getProvinceList(){
      let params={
        m:{
          type:0
        }
      }
      ljcsApi.getProvinceData(params).then(res=>{
        this.getProvinList=res.list
      })
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
    toLogin(){
  this.$router.push("/login");
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
    toFxfx() {
      if(this.getUserData.includes('86')){//费效分析
                    this.$router.push('/fxfx')
                }else {
                    this.$message({
                               type: 'error',
                               message: '没有权限!'
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
    width: 100%;
    height: 100%;
    display: flex;
}
.item {
    width: 80%;
    height: 90%;
    margin: 50px 100px;
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
    text-align: center;
    right: 450px;
    top: 5px;
}
.rightNumTwo {
    background-image: url("../../../assets/image/homePage/btnBoxShadow.png");
    color: #fff;
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
:deep(.el-radio__inner) {
    border-radius: 2px;
    color: #fff;
    background: none !important;
    border: 1px solid #0072ff;
    width: 22px;
    height: 22px;
}
:deep(.el-radio__label) {
    color: #fff;
}
:deep(.el-radio__input.is-checked+.el-radio__label) {
    color: #01ffff,;
}
:deep(.el-radio__input.is-checked .el-radio__inner) {
    box-shadow: inset 0 0 10px 0 #27cbff;
}
:deep(.el-radio__input.is-checked .el-radio__inner::after) {
    color: #01ffff;
    width: 12px;
    height: 9px;
    border: 2px solid #01ffff;
    position: absolute;
    top: 2px;
    left: 3px;
    width: 12px;
    height: 9px;
    opacity: 1;
    border: 2px solid #01ffff;
}
:deep(.el-radio__input.is-checked) .el-radio__inner::after {
    content: "";
    width: 10px;
    height: 5px;
    border: 2px solid #01ffff;
    border-top: transparent;
    border-right: transparent;
    text-align: center;
    display: block;
    position: absolute;
    top: 4px;
    left: 4px;
    vertical-align: middle;
    transform: rotate(-45deg);
    border-radius: 0;
    background: none;
    color: #fff;
}
.rightbottab {
    width: 100%;
    height: 22%;
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
.dataitem {
    width: 30%;
    flex: 1;
    line-height: 47px;
    font-size: 14px;
    color: #fff;
    text-align: center;
}
.rightFoot {
    height: 60%;
}
.righttopform {
}
.el-radio {
    margin-top: 10px;
}
</style>