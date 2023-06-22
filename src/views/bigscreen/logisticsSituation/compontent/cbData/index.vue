<template>
  <div class="" style="margin: 35px;">
    <!-- <div class="">
      <div class="headTitle">
        <div class="headData" v-for="item in headData">
          <div class="" style=" width: 130px; text-align: center; font-weight: bold;">{{ item.name }}</div>
        </div>
      </div>
      <div class="contMain">
        <div class="" v-for="ind in contData">
          <div class="contData">
            <div class="contDataItem contentOver" style="" :title="ind.credentialAbstract">
              {{ ind.credentialAbstract }}
            </div>
            <div class="contDataItem">{{ ind.credentialCode }}</div>
            <div class="contDataItem">{{ ind.credential }}</div>
            <div class="contDataItem">{{ ind.deadLine }}</div>
            <div class="contDataItem" style="">{{ ind.num }}</div>
            <div class="contDataItem" style="color: #01ffff;">{{ ind.finStatusName }}</div>
            <div class="contDataItem">{{ ind.note }}</div>
          </div>
        </div>
      </div>
      <div class="" style="position: absolute; width: 50%; text-align: center; bottom: 50px;">
          <el-pagination
          small
          background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="totalNum"
          >
          </el-pagination>
        </div>
    </div> -->
    <template>
      <el-table
        :data="contData"
        style="width: 100%;">
        <el-table-column
          prop="credentialAbstract"
          label="任务名称"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column
          prop="credentialCode"
          label="任务凭证号"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="credential"
          label="任务凭字"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deadLine"
          label="发运期限"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          align="center">
        </el-table-column>
        <el-table-column
          prop="finStatusName"
          label="完成状态"
          align="center">
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          align="center">
        </el-table-column>
      </el-table>
      <div class="" style="position: absolute; width: 50%; text-align: center; bottom: 50px;">
        <el-pagination
        small
        background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="20"
          layout="prev, pager, next, jumper"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import logisticsSituationAPI from '@/api/modules/logisticsSituation'
export default {
  data() {
    return {
      headData: [
        { name: "任务名称" },
        { name: "任务凭证号" },
        { name: "任务凭字" },
        { name: "发运期限" },
        { name: "数量" },
        { name: "完成状态" },
        { name: "备注" },
      ],
      contData: [
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
        {
          taskName: "冬季招兵",
          taskCertificateNumber: "CH0000124566",
          taskByWord: "京东物流",
          limit: "2个月",
          num: "5000",
          status: "已完成",
          note: "接收已签字",
        },
      ],
      pageNum:1,
      pageSize:10,
      totalNum:0,
      currentPage3:1
    };
  },
  mounted(){
    this.getTaskPublishingRwfb()
  },
  methods:{
    getTaskPublishingRwfb(){
      let params = {
        page:this.pageNum,
        pageSize:this.pageSize,
      }
      logisticsSituationAPI.getTaskPublishing({params}).then((res)=>{
        console.log(res,'res任务分布======================');
        this.contData=res.pd.rows
        this.totalNum=res.pd.total
      })
    },
    handleSizeChange(){
      console.log(111111);
    },
handleCurrentChange(val){
  this.pageNum=val
  this.getTaskPublishingRwfb()
},
  }
};
</script>
<style scoped lang="scss">
.headTitle {
    display: flex;
    height: 50px;
    line-height: 50px;
    background: #054480;
    justify-content: space-around;
    color: aqua;
}
.headData {
    width: 100%;
}
.contMain {
    color: #fff;
    height: 100%;
    line-height: 40px;
    margin-top: 10px;
}
.contData {
    width: 100%;
    display: flex;
    background: #094185;
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
    width: 130px;
    text-align: center;
}
.contentOver {
    width: 130px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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