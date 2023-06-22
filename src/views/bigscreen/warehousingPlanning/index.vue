<template>
  <div class="warehousingPlanning">
    <div class="top_header">
      <div class="routerBtnClick">
        <div class="leftHeaderBg" @click="toHome"></div>
        <div class="coumn leftHeadeeOne" @click="toDemandly">需求分析</div>
        <div class="coumn leftHeadeeTwo">仓储规划</div>
        <div class="coumn leftHeadeeThree" @click="toFxfx">费效分析</div>
      </div>
      <div class="">
        <span class="text">仓&nbsp;储&nbsp;规&nbsp;划</span>
      </div>
      <div class="">
        <div class="coumn rightNumOne" @click="toYlcs">运力测算</div>
        <div class="coumn rightNumTwo" @click="toLjcs">路距测算</div>
        <div class="coumn rightNumThree" @click="toZhpj">综合评价</div>
        <div class="rightNumFour" @click="toLogsitio">动态监管</div>
        <div class="rightfou" @click="toLogin"></div>
      </div>
    </div>
    <div class="contentGist">
      <div class="gistLeft">
        <planMap
          style="
            width: 100%;
            height: 100%;
            position: absolute;
            left: -455px;
            bottom: 10px;
            z-index: 1800;
          "
        ></planMap>
      </div>
      <div class="gistRight">
        <gistRightList @get-province="getProvince"></gistRightList>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import planMap from "./planMap/zoneMap.vue";
import gistRightList from "./components/gistRightList";
// import {getHotMapData} from '@/api/modules/wareHousePlan'
export default {
  computed: {
    ...mapGetters(["roles"]),
  },
  components: {
    gistRightList,
    planMap,
  },
  data() {
    return {};
  },
  created() {
    this.getUserData = this.$store.state.user.sidebar.roles;

    // this.getDress()
  },
  methods: {
    // getDress(){
    //   let params={
    //     m:{
    //       province:''
    //     }
    //   }
    //   getHotMapData(params).then(res=>{
    //     console.log(res,'rersrsrsrsss//////////.//...../////')
    //   })
    // },
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
    getProvince(province) {
      this.$children[0].getData(province);
    },
  },
};
</script>
<style lang="scss" scoped>
.warehousingPlanning {
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
.text {
  font-weight: bold;
  background-image: -webkit-linear-gradient(bottom, #fff, #00e9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(2px 2px 3px #002153);
}
.contentGist {
  display: flex;
  height: calc(100% - 70px);
  margin: 0 25px;
  justify-content: space-between;
  padding: 20px 0;
  position: relative;
}
.gistLeft {
  width: 51%;
}
.gistRight {
  position: absolute;
  right: 0;
  height: 95%;
  width: 48%;
  background-image: url("../../../assets/image/logisticsSituation/slice.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  flex: 1;
}
</style>
