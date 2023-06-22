<template>
  <div class="currentTask">
      <div class="headTitle">
        <div class="headData">
          <!-- <div
            class=""
            style="text-align: center; font-weight: normal;"
          >
            {{ item.name }}
          </div> -->
          <div class="">发物管理单位</div>
          <div class="">未下发(个)</div>
          <div class="">已下发(个)</div>
          <div class="">已提货(个)</div>
          <div class="">已入库(个)</div>
          <div class="">已出库(个)</div>
          <div class="">运输中(个)</div>
          <div class="">派送中(个)</div>
          <div class="">已签收(个)</div>
          <div class="">异常(个)</div>

        </div>
      </div>
       <div class="contMain">
        <div class="" v-for="ind in contData">
          <div class="contData">
            <div class="contDataItem contentOver" :title="ind.sendFromUnit" style="">
              {{ ind.sendFromUnit }}
            </div>
            <div class="contDataItem" style="color: #ff3535;">{{ ind.num0 }}</div>
            <div class="contDataItem">{{ ind.num1 }}</div>
            <div class="contDataItem">{{ ind.num2 }}</div>
            <div class="contDataItem" style="">
              {{ ind.num3 }}
            </div>
            <div class="contDataItem" >
              {{ ind.num5 }}
            </div>
            <div class="contDataItem">
              {{ ind.num6 }}
            </div>
            <div class="contDataItem">{{ ind.num7 }}</div>
            <div class="contDataItem" style="color: #01ffff;">{{ ind.num8 }}</div>
            <div class="contDataItem" style="color: #ff3535;">{{ ind.num9 }}</div>
          </div>
        </div>
      </div>
        <div class="" style="margin-top: 20px; margin-left: 250px;">
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

  </div>
</template>
<script>
import generalOverviewAPI from '@/api/modules/generalOverview'
export default {
  data() {
    return {
      currentPage3:0,
      queryParasm:{
        page:1,
        pageSize:5
      },
      headData: [
        { name: "发物管理单位" },
        { name: "未下发" },
        { name: "已下发" },
        { name: "已提货" },
        { name: "已入库" },
        { name: "已出库" },
        { name: "运输中" },
        { name: "派送中" },
        { name: "已签收" },
        { name: "异常" },
      ],
      contData:[],
      total:''
    };
  },
  mounted(){
    this.getDqrwData()
  },
  methods:{
    handleSizeChange(val){
      this.queryParasm.pageSize=val
      this.getDqrwData()
    },
handleCurrentChange(val){
  this.queryParasm.page=val
      this.getDqrwData()
},
    getDqrwData(){
      generalOverviewAPI.getDqrwData(this.queryParasm).then((res)=>{
        this.contData=res.pd.rows
        this.total=res.pd.total
      })
    }
  }
};
</script>
<style lang="scss">
//.el-table th.el-table__cell {
//    background: #09418d;
//    color: aqua;
//    font-size: 16px;
//}
//.el-table th.el-table__cell.is-leaf {
//    border-bottom: 10px solid #021d6e;
//}
//.el-table--enable-row-transition .el-table__body td.el-table__cell {
//    background: #062e7d;
//    color: #fff !important;
//}
.headTitle {
    display: flex;
    height: 47px;
    line-height: 47px;
    background: #09408b;//FF09408B    FF054480
    justify-content: space-around;
    color: aqua;
    font-size: 16px;
}
.headData {
    width: 100%;
    padding-left: 0;
    display: flex;
    justify-content: space-around;
}
.contMain {
    color: #fff;
    height: 100%;
    line-height: 40px;
    margin-top: 10px;
    height: 255px;
}
.contData {
    display: flex;
    padding: 0 5px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid #094185;
    margin-top: 5px;
    height: 47px;
    line-height: 47px;
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
    width: 94px;
    text-align: center;
    margin-left: 1px;
}
.contentOver {
    width: 94px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.currentTask {
    margin: 0 15px;
}
</style>