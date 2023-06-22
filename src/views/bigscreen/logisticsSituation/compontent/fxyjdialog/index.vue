<template>
    <div class="">
        <el-form>
            <el-row :gutter="40">
              <el-col :md="7">
                <el-form-item label="订单号">
                  <el-input style="width: 60%;" v-model="form.ddh" placeholder="请输入出库订单号"/>
                </el-form-item>
              </el-col>
              <el-col :md="6">
                <el-form-item label="运单号">
                    <el-input style="width: 60%;" v-model="form.ydh" placeholder="请输入运单号"/>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
        <!-- <div class="titlehead">
            <div class="mainListItem" style=" margin-left: 1px; flex: 1; display: flex;">
                <div class="itemlaner">计划编号</div>
                <div class="itemlaner">订单号</div>
                <div class="itemlaner">运单号</div>
                <div class="itemlaner">异常类型</div>
                <div class="itemlaner">异常原因</div>
                <div class="itemlaner">异常状态</div>
                <div class="itemlaner">处置意见</div>
                <div class="itemlaner">处置人员</div>
                <div class="itemlaner">处置时间</div>

            </div>
        </div> -->
        <!-- <div class="mainLisy">
            <div class="mainListItem" v-for="item in getResolveData">
                <div class="itemlaner contentOver" :title="item.planNo">{{item.planNo}}</div>
                <div class="itemlaner contentOver" :title="item.orderNo">{{item.orderNo}}</div>
                <div class="itemlaner">{{item.waybillNo}}</div>
                <div class="itemlaner contentOver" :title="item.exceptionType">{{item.exceptionType}}</div>
                <div class="itemlaner contentOver" :title="item.exceptionReason">{{item.exceptionReason}}</div>
                <div class="itemlaner contentOver">{{item.exceptionState}}</div>
                <div class="itemlaner contentOver" :title="item.handleResult">{{item.handleResult}}</div>
                <div class="itemlaner contentOver" :title="item.handlePerson">{{item.handlePerson}}</div>
                <div class="itemlaner contentOver" :title="item.handleTime">{{item.handleTime}}</div>
            </div> -->
            <template>
                <el-table
                :data="getResolveData"
                style="width: 100%;">
                <el-table-column
                  prop="planNo"
                  label="计划编号"
                  width="260"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="orderNo"
                  label="订单号"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="waybillNo"
                  label="运单号"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="exceptionType"
                  label="异常类型"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="exceptionReason"
                  label="异常原因"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="exceptionState"
                  label="异常状态"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="handleResult"
                  label="处置意见"
                  width="230"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="handlePerson"
                  label="处置人员"
                  width="230"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="handleTime"
                  label="处置时间"
                  width="230"
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
            
        <!-- </div> -->
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
                ddh:'',
                ydh:'',
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
                    orderNo:this.form.ddh,
                    waybillNo:this.form.ydh
                }
            }
            logisticsSituationApi.getFxyjData(params).then(res=>{
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
    flex: 1;
    .itemlaner {
        flex: 1;
        text-align: center;
        margin-left: 1px;
    }
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
.pageAtion {
    margin-top: 2px !important;
}
</style>
