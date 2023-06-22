<template>
    <div class="">
        <el-form>
            <el-row :gutter="40">
              <el-col :md="7">
                <el-form-item label="发运方式">
                  <el-input style="width: 60%;" v-model="form.fyfs" placeholder="请输入发运方式"/>
                </el-form-item>
              </el-col>
              <el-col :md="6">
                <el-form-item label="物资品名">
                    <el-input style="width: 60%;" v-model="form.wzpm" placeholder="请输入物资品名"/>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
        <!-- <div class="titlehead">
            <div class="mainListItem" style=" margin-left: 1px; flex: 1; display: flex;">
                <div class="itemlaner">发物单位代码</div>
                <div class="itemlaner">单位代码</div>
                <div class="itemlaner">订单号</div>
                <div class="itemlaner">品名代码</div>
                <div class="itemlaner">物资品名</div>
                <div class="itemlaner">数量</div>
                <div class="itemlaner">状态</div>

            </div>
        </div> -->
        <!-- <div class="mainLisy">
            <div class="mainListItem" v-for="item in getResolveData">
                <div class="itemlaner" :title="item.fwdwdm">{{item.fwdwdm}}</div>
                <div class="itemlaner" :title="item.dwdm">{{item.dwdm}}</div>
                <div class="itemlaner contentOver" :title="item.orderno">{{item.orderno}}</div>
                <div class="itemlaner contentOver" :title="item.pmdm">{{item.pmdm}}</div>
                <div class="itemlaner contentOver" :title="item.wzpm">{{item.wzpm}}</div>
                <div class="itemlaner">{{item.pmsl}}</div>
                <div class="itemlaner">{{item.type}}</div>
            </div> -->
            <template>
                <el-table
                :data="getResolveData"
                style="width: 100%;">
                <el-table-column
                  prop="fwdwdm"
                  label="发物单位代码"
                  width="260"
                  :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="dwdm"
                  label="单位代码"
                  width="260"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="orderno"
                  label="订单号"
                  width="260"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="pmdm"
                  label="品名代码"
                  width="310"
          :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="wzpm"
                  label="物资品名"
                  :show-overflow-tooltip='true'
                  width="310"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="pmsl"
                  label="数量"
                  width="180"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="状态"
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
    import mapGuide from '@/api/modules/mapGuide'
export default {
    data(){
        return{
            getResolveData:[],
            zqtjTotal:0,
            form:{
                page:1,
                pageSize:7,                
                fyfs:'',
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
                    orderno:this.form.fyfs,
                    type:this.form.wzpm,
                }
            }
            mapGuide.getJhJsListData(params).then(res=>{
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
::v-deep .el-input__inner {
    height: 30px !important;
}
</style>
