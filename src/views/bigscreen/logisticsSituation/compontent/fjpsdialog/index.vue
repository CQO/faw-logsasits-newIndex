<template>
    <div class="">
        <el-form>
            <el-row :gutter="40">
              <el-col :md="7">
                <el-form-item label="出库订单号">
                  <el-input style="width: 60%;" v-model="form.ckddh" placeholder="请输入出库订单号"/>
                </el-form-item>
              </el-col>
              <el-col :md="6">
                <el-form-item label="仓库编号">
                    <el-input style="width: 60%;" v-model="form.ckbh" placeholder="请输入仓库编号"/>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
        <!-- <div class="titlehead">
            <div class="mainListItem" style=" margin-left: 1px; flex: 1; display: flex;">
                <div class="itemlaner">出库订单号</div>
                <div class="itemlaner">仓库编号</div>
                <div class="itemlaner">收物单位</div>
                <div class="itemlaner">要求到达时间</div>
                <div class="itemlaner">军方订单号</div>
                <div class="itemlaner">物资编码</div>
                <div class="itemlaner">计划数量</div>
                <div class="itemlaner">实际数量</div>

            </div>
        </div>
        <div class="mainLisy">
            <div class="mainListItem" v-for="item in getResolveData">
                <div class="itemlaner contentOver" :title="item.outCode">{{item.outCode}}</div>
                <div class="itemlaner contentOver" :title="item.warehouseCode">{{item.warehouseCode}}</div>
                <div class="itemlaner">{{item.recipientUnit}}</div>
                <div class="itemlaner contentOver" :title="item.requiredReachTime">{{item.requiredReachTime}}</div>
                <div class="itemlaner">{{item.armyCode}}</div>
                <div class="itemlaner contentOver">{{item.materialCode}}</div>
                <div class="itemlaner">{{item.planNum}}</div>
                <div class="itemlaner">{{item.realNum}}</div>
            </div> -->
            <template>
                <el-table
                :data="getResolveData"
                style="width: 100%;">
                <el-table-column
                  prop="outCode"
                  label="出库订单号"
                  width="280"
                  :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="warehouseCode"
                  label="仓库编号"
                  :show-overflow-tooltip='true'
                  width="260"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="recipientUnit"
                  label="收物单位"
                  width="260"
                  :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="requiredReachTime"
                  label="要求到达时间"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="armyCode"
                  label="军方订单号"
                  width="260"
                  :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="materialCode"
                  label="物资编码"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="planNum"
                  label="计划数量"
                  width="230"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="realNum"
                  label="实际数量"
                  width="230"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="statusName"
                  label="状态"
                  width="230"
                  fixed="right"
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
        <!-- </div>/ -->
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
                ckddh:'',
                ckbh:'',
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
                    outCode:this.form.ckddh,
                    warehouseCode:this.form.ckbh,
          year: sessionStorage.getItem('year'),
                }
            }
            logisticsSituationApi.getFjpsData(params).then(res=>{
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
.pageAtion {
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
