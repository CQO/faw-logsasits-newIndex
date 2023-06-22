<template>
    <div class="">
        <el-form>
            <el-row :gutter="40">
              <el-col :md="7">
                <el-form-item label="运单号">
                  <el-input style="width: 60%;" v-model="form.ydh" placeholder="请输入运单号"/>
                </el-form-item>
              </el-col>
              <el-col :md="6">
                <el-form-item label="计划编号">
                    <el-input style="width: 60%;" v-model="form.jhbh" placeholder="请输入计划编号"/>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
        <!-- <div class="" style="overflow: auto; width: 100%;">
                <div class="mainListItem" style=" margin-left: 1px; display: flex;">
                    <div class="itemlaner" style="width: 150px;">运单号</div>
                    <div class="itemlaner">计划编号</div>
                    <div class="itemlaner">寄件城市</div>
                    <div class="itemlaner">派件城市</div>
                    <div class="itemlaner">包裹数量</div>
                    <div class="itemlaner">运输方式</div>
                    <div class="itemlaner">运单状态</div>
                    <div class="itemlaner">接收时间</div>
                    <div class="itemlaner" style="width: 180px;">预计完成时间</div>
                    <div class="itemlaner">完成时间</div>
    
                </div>
            <div class="mainLisy">
                <div class="mainListItema" v-for="item in getResolveData">
                    <div class="itemlaner" style="width: 150px;" :title="item.waybillNo">{{item.waybillNo}}</div>
                    <div class="itemlaner" :title="item.planNo">{{item.planNo}}</div>
                    <div class="itemlaner">{{item.sendCity}}</div>
                    <div class="itemlaner" :title="item.deliverCity">{{item.deliverCity}}</div>
                    <div class="itemlaner">{{item.packageCount}}</div>
                    <div class="itemlaner">{{item.transportType}}</div>
                    <div class="itemlaner">{{item.waybillStatus}}</div>
                    <div class="itemlaner" :title="item.reciveTime">{{item.reciveTime}}</div>
                    <div class="itemlaner" :title="item.expectFinTime">{{item.expectFinTime}}</div>
                    <div class="itemlaner" style="width: 150px;" :title="item.finTime">{{item.finTime}}</div>
                </div>
            </div>
        </div> -->
       <template>
        <el-table
        :data="getResolveData"
        style="width: 100%;">
        <el-table-column
          prop="waybillNo"
          label="计划编号"
          width="260"
          :show-overflow-tooltip='true'
          align="center">
        </el-table-column>
        <el-table-column
          prop="sendCity"
          label="寄件城市"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="deliverCity"
          label="派件城市"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="packageCount"
          label="包裹数量"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="transportType"
          label="运输方式"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="waybillStatus"
          label="运单状态"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="reciveTime"
          label="接收时间"
          width="260"
          align="center">
        </el-table-column>
        <el-table-column
          prop="expectFinTime"
          label="预计完成时间"
          width="260"
          align="center">
        </el-table-column>
        <el-table-column
          prop="finTime"
          label="完成时间"
          width="260"
          align="center">
        </el-table-column>
      </el-table>
    <el-pagination
    class="pageAtion"
background
layout="prev, pager, next"
:total="zqtjTotal"
@size-change="handleSizeChange" @current-change="handleCurrentChangeZqtj">
</el-pagination>
       </template>
    </div>
</template>
<script>
    import logisticsSituationApi from '@/api/modules/logisticsSituation'
export default {
    data(){
        return{
            getResolveData:[],
            zqtjTotal:0,
            form:{
                page:1,
                pageSize:7,                
                ydh:'',
                jhbh:'',
wzpm:'',
            },
        }
       
    },
    mounted(){
        this.getListData()
    },
    methods:{
        getListData(){
            let params={
                page:this.form.page,
                pageSize:this.form.pageSize,
                m:{
                    waybillNo:this.form.ydh,
                    planNo:this.form.jhbh,
          year: sessionStorage.getItem('year'),
                }
            }
            logisticsSituationApi.getTyrkData(params).then(res=>{
                this.getResolveData=res.pd.rows
                this.zqtjTotal=res.pd.total
            })
        },
        handleSizeChange(val){
            this.form.pageSize=val
    this.getListData()
        },
handleCurrentChangeZqtj(val){
    this.form.page=val
    this.getListData()
},
handleSearch(){
    this.form.page=1
    this.getListData()
},
    }
}
</script>
<style lang="scss" scoped>

.mainListItem {
    justify-content: space-around;
    display: flex;
    color: #fff;
    background: #054480;
    height: 37px;
    line-height: 37px;
    margin-top: 5px;
    width: 1500px;
    .itemlaner {
        width: 150px;
        text-align: center;
        margin-left: 1px;
    }
}
.mainListItema {
    justify-content: space-around;
    display: flex;
    color: #fff;
    background: #054480;
    height: 37px;
    line-height: 37px;
    margin-top: 5px;
    width: 1500px;
    .itemlaner {
        width: 150px !important;
        text-align: center;
        margin-left: 1px;
    }
}
.contentOver {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
.contentOver {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.pageAtion,
.el-pagination {
    text-align: center;
    margin-top: 2px !important;
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
::v-deep .el-table__body tr.hover-row>td.el-table__cell{
    background-color: #094185 !important;
    border-top: 1px solid #01ffff !important;
    border-bottom: 1px solid #01ffff !important;
    cursor: pointer;
}
.el-table__body .el-table__row.hover-row td:first-child {
    background-color: #094185 !important;
    border-left: 1px solid #01ffff !important;
    cursor: pointer;
}
.el-table__body .el-table__row.hover-row td:last-child {
    background-color: #094185 !important;
    border-right: 1px solid #01ffff !important;
    cursor: pointer;
}
</style>
