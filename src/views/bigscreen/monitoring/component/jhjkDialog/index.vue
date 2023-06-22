<template>
    <div class="">
        <el-form>
            <el-row :gutter="40">
              <el-col :md="7">
                <el-form-item label="批次号">
                  <el-input style="width: 60%;" v-model="form.pch" placeholder="请输入批次号"/>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
        <!-- <div class="titlehead">
            <div class="mainListItem" style=" margin-left: 1px; flex: 1; display: flex;">
                <div class="itemlaner">受供单位</div>
                <div class="itemlaner">发物单位</div>
                <div class="itemlaner">品名代码</div>
                <div class="itemlaner">物资品名</div>
                <div class="itemlaner">需求量</div>
                <div class="itemlaner">凭证号</div>
                <div class="itemlaner">凭证字</div>
                <div class="itemlaner">签发日期</div>
                <div class="itemlaner">批次号</div>
                <div class="itemlaner">状态</div>

            </div>
        </div> -->
        <!-- <div class="mainLisy">
            <div class="mainListItem" v-for="item in getResolveData">
                <div class="itemlaner contentOver" :title="item.receiveUnit">{{item.receiveUnit}}</div>
                <div class="itemlaner contentOver" :title="item.sendFromUnit">{{item.sendFromUnit}}</div>
                <div class="itemlaner">{{item.materialCode}}</div>
                <div class="itemlaner contentOver" :title="item.material">{{item.material}}</div>
                <div class="itemlaner contentOver" :title="item.num">{{item.num}}</div>
                <div class="itemlaner contentOver">{{item.credentialCode}}</div>
                <div class="itemlaner contentOver" :title="item.credential">{{item.credential}}</div>
                <div class="itemlaner contentOver" :title="item.signDate">{{item.signDate}}</div>
                <div class="itemlaner contentOver" :title="item.batchNo">{{item.batchNo}}</div>
                <div class="itemlaner contentOver" :title="item.finStatus">{{item.finStatus}}</div>
            </div>
        </div>     -->
        <template>
            <el-table
            :data="getResolveData"
            style="width: 100%;">
            <el-table-column
              prop="receiveUnit"
              label="受供单位"
              width="260"
              :show-overflow-tooltip='true'
              align="center">
            </el-table-column>
            <el-table-column
              prop="sendFromUnit"
              label="发物单位"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="materialCode"
              label="品名代码"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="material"
              label="物资品名"
              width="260"
          :show-overflow-tooltip='true'
              align="center">
            </el-table-column>
            <el-table-column
              prop="num"
              label="需求量"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="credentialCode"
              label="凭证号"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="credential"
              label="凭证字"
              width="260"
              align="center">
            </el-table-column>
            <el-table-column
              prop="signDate"
              label="签发日期"
              width="260"
              align="center">
            </el-table-column>
            <el-table-column
              prop="batchNo"
              label="批次号"
              width="260"
              align="center">
            </el-table-column>
            <el-table-column
              prop="finStatus"
              label="状态"
              width="260"
              align="center">
            </el-table-column>
          </el-table>
          <div class="pageAtion">
            <el-pagination
            style="text-align: center; width: 100%; margin-left: -10px;"
background
layout="prev, pager, next"
:total="zqtjTotal"
@size-change="handleSizeChange" @current-change="handleCurrentChangeZqtj">
</el-pagination>
        </div>
           </template>
    </div>
</template>
<script>
    import monitoringAPI from '@/api/modules/monitoring'
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
                    batchNo:this.form.pch,
                }
            }
            monitoringAPI.getJhjkListData(params).then(res=>{
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
.pageation {
    width: 100%;
    background: red;
    text-align: center;
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
