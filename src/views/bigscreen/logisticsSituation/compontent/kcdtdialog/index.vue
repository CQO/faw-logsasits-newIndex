<template>
    <div class="">
        <el-form>
            <el-row :gutter="40">
              <el-col :md="7">
                <el-form-item label="机构编码">
                  <el-input style="width: 60%;" v-model="form.jgbm" placeholder="请输入机构编码"/>
                </el-form-item>
              </el-col>
              <el-col :md="7">
                <el-form-item label="仓储中心名称">
                    <el-input style="width: 60%;" v-model="form.cczxmc" placeholder="请输入仓储中心名称"/>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
        <!-- <div class="titlehead">
            <div class="mainListItem" style=" margin-left: 1px; flex: 1; display: flex;">
                <div class="itemlaner">机构编码</div>
                <div class="itemlaner">仓储中心名称</div>
                <div class="itemlaner">品名代码</div>
                <div class="itemlaner">物资品名</div>
                <div class="itemlaner">号型系列</div>
                <div class="itemlaner">号型</div>
                <div class="itemlaner">实际库存余量</div>
                <div class="itemlaner">异常库存余数量</div>

            </div>
        </div> -->
        <!-- <div class="mainLisy">
            <div class="mainListItem" v-for="item in getResolveData">
                <div class="itemlaner contentOver" :title="item.baseCode">{{item.baseCode}}</div>
                <div class="itemlaner" :title="item.name">{{item.name}}</div>
                <div class="itemlaner">{{item.pmCode}}</div>
                <div class="itemlaner contentOver" :title="item.pm">{{item.pm}}</div>
                <div class="itemlaner">{{item.hxxl}}</div>
                <div class="itemlaner">{{item.hx}}</div>
                <div class="itemlaner">{{item.surplus}}</div>
                <div class="itemlaner contentOver" :title="item.ycsl">{{item.ycsl}}</div>
            </div> -->
            <template>
                <el-table
                :data="getResolveData"
                style="width: 100%;">
                <el-table-column
                  prop="baseCode"
                  label="机构编码"
                  width="260"
                  :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="仓储中心名称"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="pmCode"
                  label="品名代码"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="pm"
                  label="物资品名"
                  width="260"
                  :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="hxxl"
                  label="号型系列"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="hx"
                  label="号型"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="surplus"
                  label="实际库存余量"
                  width="260"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="ycsl"
                  label="异常库存余数量"
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
                jgbm:'',
                cczxmc:'',
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
                    baseCode:this.form.jgbm,
                    name:this.form.cczxmc,
          year: sessionStorage.getItem('year'),
                }
            }
            logisticsSituationApi.getKcdtData(params).then(res=>{
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
.contentOver {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.pageAtion {
    margin-top: 2px !important;
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
