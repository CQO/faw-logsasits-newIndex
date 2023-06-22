<template>
  <div class="" style="margin: 0 35px;">
    <!-- <div class="">
      <div class="headTitle">
        <div class="headData" v-for="item in headData">
          <div class="" style=" width: 275px; text-align: center; font-weight: bold;">{{ item.name }}</div>
        </div>
      </div>
      <div class="contMain">
        <div class="" v-for="ind in contData">
          <div class="contData">
            <div class="contDataItem">{{ ind.hx }}</div>
            <div class="contDataItem" style="">
              {{ ind.pm }}
            </div>
            <div class="contDataItem" style="margin-right: -15px; color: #7bffff;">{{Number(ind.surplus).toLocaleString()}}</div>
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
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
    </div> -->
    <template>
      <el-table
      :data="contData"
      @row-click="handleTableRow"
      style="width: 100%;">
      <el-table-column
        prop="hx"
        label="号型系列"
        width="260"
        :show-overflow-tooltip='true'
        align="center">
      </el-table-column>
      <el-table-column
        prop="pm"
        label="品名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="surplus"
        label="实时库存量(件)"
        width="180"
        align="center">
      </el-table-column>
    </el-table>
    <div class="" style="margin: 22px 40px; text-align: center; width: 100%;">
    <el-pagination
    small
    background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    </div>
     </template>
  </div>
</template>
<script>
import monitoringAPI from '@/api/modules/monitoring'
export default {
  data() {
    return {
      pageNum:1,
      pageSize:5,
      currentPage3:0
,      headData: [
        { name: "号型系列" },
        { name: "品名" },
        { name: "实时库存量(件)" },
      ],
      contData:[]
      // contData: [
      //   {
      //     taskName: "冬季招兵",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //   },
      //   {
      //     taskName: "冬季招兵",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //   },
      //   {
      //     taskName: "冬季招兵",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //   },
      //   {
      //     taskName: "冬季招兵",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //   },
      //   {
      //     taskName: "冬季招兵",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //   },
      //   {
      //     taskName: "冬季招兵",
      //     taskCertificateNumber: "CH0000124566",
      //     num: "5000",
      //   },
      // ],
    };
  },
  mounted(){
    this.getWzjkData()
  },
  methods:{
    handleTableRow(row){
      console.log(row,'row, event, columnrow, event, column')
      this.$emit('passParam', row)
    },
handleSizeChange(){},
    handleCurrentChange(val){
      this.pageNum=val
this.getWzjkData()
    },
    getWzjkData(){
      let params={
        page:this.pageNum,
        pageSize:this.pageSize,
      }
      monitoringAPI.getWzjkData({params}).then((res)=>{
            this.contData=res.pd.rows
            this.total=res.pd.total
        })
    },
    handleSizeChange(val){
    },
  }
};
</script>
<style scoped>
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
    margin: 0 auto;
}
.contMain {
    color: #fff;
    height: 295px;
    line-height: 40px;
    margin-top: 10px;
}
.contData {
    display: flex;
    padding: 0 5px;
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
    width: 275px;
    text-align: center;
}
</style>