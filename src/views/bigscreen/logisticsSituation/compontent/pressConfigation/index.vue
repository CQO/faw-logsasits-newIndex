<template>
    <div class="tabTdList">
        <!-- <div class="" style="">
            <div class="titlehead">
                <div class="" v-for="item in titleList">
                    {{ item.name }}
                </div>
            </div>
            <div class="mainLisy">
                <div class="mainListItem" v-for="item in contData">
                    <div class="itemlaner">{{item.status}}</div>
                    <div class="itemlaner" style="color: #7bffff;">{{item.waybillNumber}}</div>
                    <div class="itemlaner">{{item.planNumber}}</div>
                    <div class="itemlaner">{{item.mailCityCo}}</div>
                    <div class="itemlaner">{{item.dispatchCityCo}}</div>
                    <div class="itemlaner">{{item.dispatchProvince}}</div>
                    <div class="itemlaner">{{item.parcelNum}}</div>
                    <div class="itemlaner">{{item.parcelVolume}}</div>
                    <div class="itemlaner">{{item.parcelWeight}}</div>
                    <div class="itemlaner">{{item.transportWay}}</div>
                    <div class="itemlaner">{{item.transportStatu}}</div>
                    <div class="itemlaner">{{item.finishTime}}</div>

                    <div class="itemlaner">{{item.reason}}</div>
                    <div class="itemlaner" style="color: #7bffff;">{{item.abstract}}</div>
                    <div class="itemlaner">{{item.dispatichWay}}</div>
                    <div class="itemlaner">{{item.arriaveStation}}</div>
                    <div class="itemlaner">{{item.mark}}</div>
                    <div class="itemlaner">{{item.timeLimit}}</div>
                    <div class="itemlaner">{{item.basis}}</div>
                    <div class="itemlaner">{{item.documenter}}</div>
                    <div class="itemlaner">{{item.remarks}}</div>
                    <div class="itemlaner">{{item.superior}}</div>
                    <div class="itemlaner">{{item.superiorNumb}}</div>
                    <div class="itemlaner">{{item.batch}}</div>
                </div>
                <el-pagination
                class="pageAtion"
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
            </div>
        </div> -->
        <template>
            <el-table
              :data="contData"
              :row-style="{ background: '#094185' }" 
              style="width: 100%;">
              <el-table-column
                prop="finStatus"
                label="状态"
                width="150"
                fixed="left"
                align="center">
              </el-table-column>
              <el-table-column
                prop="orderCode"
                label="订单号"
                width="300"
                align="center">
              </el-table-column>
              <el-table-column
                prop="accountingTime"
                label="核算期"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="credential"
                label="凭证字"
                width="300"
                align="center">
              </el-table-column>
              <el-table-column
                prop="credentialCode"
                label="凭证号"
                width="300"
                align="center">
              </el-table-column>
              <el-table-column
                prop="undertakeUnit"
                label="承办单位"
                width="550"
                align="center">
              </el-table-column>
              <el-table-column
                prop="sendManageUnit"
                label="发物管理单位"
                width="550"
                align="center">
              </el-table-column>
              <el-table-column
                prop="sendFromUnit"
                label="发物单位"
                width="550"
                align="center">
              </el-table-column>
              <el-table-column
                prop="recipientManageUnit"
                label="收方管理单位"
                width="550"
                align="center">
              </el-table-column>
              <el-table-column
                prop="recipientUnit"
                label="收物单位"
                width="550"
                align="center">
              </el-table-column>
              <el-table-column
                prop="equipmentType"
                label="被装类型"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="signDate"
                label="签发日期"
                width="260"
                align="center">
              </el-table-column>
              <el-table-column
                prop="balanceType"
                label="收支类型"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="credentialAbstract"
                label="凭证摘要"
                width="400"
                align="center">
              </el-table-column>
              <el-table-column
                prop="transportType"
                label="发运方式"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                prop="arriveStation"
                label="到站"
                width="150"
                align="center">
              </el-table-column>
              <el-table-column
                prop="accountStatus"
                width="200"
                label="记账标志"
                align="center">
              </el-table-column>
              <el-table-column
                prop="deadLine"
                width="200"
                label="发运期限"
                align="center">
              </el-table-column>
              <el-table-column
                prop="allotOrder"
                label="调拨依据"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="orderEmp"
                label="制单人"
                width="150"
                align="center">
              </el-table-column>
              <el-table-column
                prop="credentialRemark"
                width="200"
                label="凭证备注"
                align="center">
              </el-table-column>
              <el-table-column
                prop="credentialHigher"
                label="上级凭证"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="credentialHigherCode"
                label="上级凭证号"
                width="200"
                align="center">
              </el-table-column>
              <el-table-column
                prop="batchNo"
                width="400"
                label="批次"
                fixed="right"
                align="center">
              </el-table-column>
            </el-table>
            <div class="" style="position: absolute; width: 100%; text-align: center; bottom: 20px;">
                <el-pagination
                class="pageAtion"
  background
  :page-size="7"
  layout="prev, pager, next"
  @size-change="handleSizeChange" @current-change="handleCurrentChangeZqtj"
  :total="zqtjTotal">
</el-pagination>
            </div>
          </template>
    </div>
</template>
<script>
import logisticsSituationAPI from '@/api/modules/logisticsSituation'
export default {
    data(){
        return {
            zqtjTotal:0,
            titleList:[
                {
                    name:'状态'
                },
                {
                    name:'订单号'
                },
                {
                    name:'核算期'
                },
                {
                    name:'凭证字'
                }, {
                    name:'凭证号'
                }, {
                    name:'承办单位'
                }, {
                    name:'发物管理单位'
                }, {
                    name:'发物单位'
                }, {
                    name:'收方管理单位'
                }, {
                    name:'收物单位'
                }, {
                    name:'被装类型'
                },{
                    name:'签发日期'
                },{
                    name:'收支类型'
                },{
                    name:'凭证摘要'
                },{
                    name:'发运方式'
                },{
                    name:'到站'
                },{
                    name:'记账标志'
                },{
                    name:'发运期限'
                },{
                    name:'调拨依据'
                },{
                    name:'制单人'
                },{
                    name:'凭证备注'
                },{
                    name:'上级凭证'
                },{
                    name:'上级凭证号'
                },{
                    name:'批次'
                },
            ],
            contData:[],
            form:{
                page:1,
                pageSize:7
            }
        }
    },
    created:{},
    mounted(){
        this.getList()
    },
    methods:{
        getList(){
            let params={
                page:this.form.page,
                pageSize:this.form.pageSize,
                m:{
                    year: sessionStorage.getItem('year'),
                }
            }
            logisticsSituationAPI.getRwwcjdListData(params).then(res=>{
            console.log(res,'lllllllll')
            this.contData=res.pd.rows
            this.zqtjTotal=res.pd.total
        })
        },
        handleSizeChange(val){
            this.form.pageSize=val
            this.getList()
        },
handleCurrentChangeZqtj(val){
    this.form.page=val
    this.getList()
}
    },
}
</script>
<style lang="scss" scope>
.tabTdList {
    margin-top: 15px;
    width: 100%;
    padding: 25px;
    padding-bottom: 0 !important;
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

    }
}
.pageAtion {
    width: 100%;
    text-align: center;
    margin-top: 2px;
}
.el-table th.el-table__cell {
    background: #054480 !important;
    color: #fff;
    border-bottom: 5px solid #112d82 !important;
}
.el-table td.el-table__cell {
    background: #094185;
    color: #fff;
    border-bottom: 1px solid #112d82;
}
::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
    border-top: 1px solid #01ffff;
    border-bottom: 1px solid #01ffff;
    background: #094185 !important;
    //box-shadow: 0 0 15px #386fcf inset;

    /* color: #f19944; */

    /* 设置文字颜色，可以选择不设置 */
}
.el-table--enable-row-hover .el-table__body tr:hover > td:first-child {
    border-left: 1px solid #01ffff;

    /* color: #f19944; */

    /* 设置文字颜色，可以选择不设置 */
}
.el-table--enable-row-hover .el-table__body tr:hover {
    box-shadow: 0 0 15px #386fcf !important;
    //border-image: linear-gradient(to right bottom, #4636ff, #00e0ff) 1 10;
    & > td {
        background-color: #094185 !important;
    }
}
.el-table--enable-row-hover .el-table__body tr:hover > td:last-child {
    border-right: 1px solid #01ffff;

    /* color: #f19944; */

    /* 设置文字颜色，可以选择不设置 */
}
.el-table__body .el-table__row.hover-row td {
    background-color: transparent !important;
    border-top: 1px solid #01ffff !important;
    border-bottom: 1px solid #01ffff !important;
    cursor: pointer;
}
.el-table__body .el-table__row.hover-row td:first-child {
    background-color: transparent !important;
    border-left: 1px solid #01ffff !important;
    cursor: pointer;
}
.el-table__body .el-table__row.hover-row td:last-child {
    background-color: transparent !important;
    border-right: 1px solid #01ffff !important;
    cursor: pointer;
}
</style>