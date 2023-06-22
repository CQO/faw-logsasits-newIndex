<template>
  <div class="materialList">
    <div class="">
      <div class="headTitle">
        <div class="headData" v-for="item in headData">
          <div
            class=""
            style="width: 20%px; text-align: center; font-weight: bold;"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="contMain">
        <div class="" v-for="ind in contData">
          <div class="contData">
            <div class="contDataItem">{{ ind.recipientUnit }}</div>
            <div class="contDataItem" style="">{{ ind.sendFromUnit }}</div>
            <div
              class="contDataItem"
              style="margin-right: -15px; color: #7bffff;"
            >
              {{ Number(ind.num).toLocaleString() }}
            </div>
            <div class="contDataItem" style="margin-left: 25px;">{{ind.sendFromUnitProvince}}</div>
            <div class="contDataItem">{{ind.recipientUnitProvince}}</div>
          </div>
        </div>
      </div>
      <div class="" style="margin: 22px 40px; text-align: center; width: 100%;">
        <el-pagination
          small
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="7"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import globalMonitoringAPI from "@/api/modules/globalMonitoring";
export default {
  data() {
    return {
      currentPage3:0,
      total:0,
      queryparams:{
        page:1,
        pageSize:7
      },
      headData: [
        { name: "受供单位" },
        { name: "保障单位" },
        { name: "数量(次)" },
        { name: "所在区域" },
        { name: "流向区域" },
      ],
      contData:[]
      // contData: [
      //   {
      //     type: "仓储单位1",
      //     taskName: "仓储单位",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //     whereThe:'北京',
      //     flow:'杭州'
      //   },
      //   {
      //     type: "仓储单位1",
      //     taskName: "仓储单位",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //     whereThe:'北京',
      //     flow:'杭州'
      //   },
      //   {
      //     type: "仓储单位1",
      //     taskName: "仓储单位",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //     whereThe:'北京',
      //     flow:'杭州'
      //   },
      //   {
      //     type: "仓储单位1",
      //     taskName: "仓储单位",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //     whereThe:'北京',
      //     flow:'杭州'
      //   },
      //   {
      //     type: "仓储单位1",
      //     taskName: "仓储单位",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //     whereThe:'北京',
      //     flow:'杭州'
      //   },
      //   {
      //     type: "仓储单位1",
      //     taskName: "仓储单位",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //     whereThe:'北京',
      //     flow:'杭州'
      //   },
      //   {
      //     type: "仓储单位1",
      //     taskName: "仓储单位",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //     whereThe:'北京',
      //     flow:'杭州'
      //   },
      // ],
    };
  },
  mounted(){
    this.getWzlxData()
  },
  methods:{
handleSizeChange(val){
  this.queryparams.pageSize=val
  this.getWzlxData()
},
    handleCurrentChange(val){
      this.queryparams.page=val;
      this.getWzlxData()
    },
    getWzlxData(){
      globalMonitoringAPI.getWzlxjkData(this.queryparams).then((res) => {
        console.log(res, "全域监控-物资流向监控======================");
        this.contData=res.pd.rows
        this.total=res.pd.total
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.materialList {
    margin: 0 35px;
}
.headTitle {
    display: flex;
    height: 50px;
    line-height: 50px;
    //background: #054480;
    background: #09408b;
    justify-content: space-around;
    color: aqua;
}
.headData {
    width: 100%;
    margin: 0 auto;
}
.contMain {
    color: #fff;
    height: 340px;
    line-height: 40px;
    margin-top: 10px;
}
.contData {
    display: flex;
    padding: 0 5px;
    background: #054480;
    border: 1px solid #094185;
    margin-top: 5px;
    height: 45px;
    line-height: 45px;
}
.contData:hover {
    border: 1px solid #01ffff;
    box-shadow: 0 0 15px #386fcf inset;
}
.intel {
    margin-left: -35px;
    color: rgba(255, 255, 255, 0.7);
}
.contDataItem {
    width: 20%;
    text-align: center;
    padding: 0 5px;
}
</style>