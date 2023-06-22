<template>
    <div class="problem">
        <div class="title_head">
            <div class="">管理单位</div>
            <div class="">数量异常(个)</div>
            <div class="">品种异常(个)</div>
            <div class="">重量异常(个)</div>
            <div class="">包装损坏(个)</div>
            <div class="">途中异常(个)</div>
            <div class="">交换异常(个)</div>
            <div class="">客户异常(个)</div>
            <div class="">收货异常(个)</div>
            <div class="">其他</div>
        </div>
        <div class="cont_Main">
            <div class="" v-for="ind in contData">
               <div class="contData">
            <div class="contDataItem" style="">
              {{ ind.unit }}
            </div>
            <div class="contDataItem" style="">{{ ind.status1 }}</div>
            <div class="contDataItem">{{ ind.status2 }}</div>
            <div class="contDataItem">{{ ind.status3 }}</div>
            <div class="contDataItem" style="">
              {{ ind.status4 }}
            </div>
            <div class="contDataItem" >
              {{ ind.status5 }}
            </div>
            <div class="contDataItem">
              {{ ind.status6 }}
            </div>
            <div class="contDataItem">{{ ind.status7 }}</div>
            <div class="contDataItem" style="">{{ ind.status8 }}</div>
            <div class="contDataItem" style="">{{ ind.status9 }}</div>
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
          :page-size="7"
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
    data(){
        return{
          queryParams:{
            page:1,
            pageSize:7
          },
          total:0,
          currentPage3:0,
            contData: [],
        }
    },
    mounted(){
      this.getWtjkData()
    },
    methods:{
      handleSizeChange(val){
        this.queryParams.pageSize=val
  this.getWtjkData()
      },
handleCurrentChange(val){
  this.queryParams.page=val
  this.getWtjkData()
},
      getWtjkData(){
        let params={
          page:this.queryParams.page,
          pageSize:this.queryParams.pageSize
        }
        generalOverviewAPI.getWtjkData(this.queryParams).then((res)=>{
        this.contData=res.pd.rows
        this.total=res.pd.total
      })
      }
    }
}
</script>
<style lang="scss">
.problem {
    margin: 0 15px;
}
.title_head {
    background: #09408b;
    //background: rgb(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-around;
    color: aqua;
    font-size: 16px;
    height: 47px;
    line-height: 47px;
    div{
      width:100px;
      text-align:center
    }
}
.cont_Main {
    color: #fff;
    height: 100%;
    line-height: 40px;
    margin-top: 10px;
    height: 255px;
}
.contDataItem{
  width: 100px;
}
</style>