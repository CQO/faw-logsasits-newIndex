<template>
    <div class="">
        <el-form>
            <el-row :gutter="40">
              <el-col :md="7">
                <el-form-item label="订单号">
                  <el-input style="width: 60%;" v-model="form.ddh" placeholder="请输入批次号"/>
                </el-form-item>
              </el-col>
              <el-col :md="9">
                <el-form-item label="订单状态">
                  <el-select placeholder="请选择" clearable style="z-index: 2550;" v-model="form.ddStatu" @change="currDdStatuChange">
                    <el-option
                      v-for="item in getDdStatuList"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
        <!-- <div class="titlehead">
            <div class="mainListItem" style=" margin-left: 1px; flex: 1; display: flex;">
                <div class="itemlaner">审核下发时间</div>
                <div class="itemlaner">订单号</div>
                <div class="itemlaner">出库订单号</div>
                <div class="itemlaner">收物单位</div>
                <div class="itemlaner">发物单位</div>
                <div class="itemlaner">订单状态</div>
                <div class="itemlaner">企业编码</div>

            </div>
        </div> -->
        <!-- <div class="mainLisy">
            <div class="mainListItem" v-for="item in getResolveData">
                <div class="itemlaner contentOver" :title="item.checkTime">{{item.checkTime}}</div>
                <div class="itemlaner contentOver" :title="item.orderNo">{{item.orderNo}}</div>
                <div class="itemlaner">{{item.outboundNo}}</div>
                <div class="itemlaner contentOver" :title="item.recipientUnit">{{item.recipientUnit}}</div>
                <div class="itemlaner contentOver" :title="item.sendFromUnit">{{item.sendFromUnit}}</div>
                <div class="itemlaner contentOver">{{item.orderStatus}}</div>
                <div class="itemlaner contentOver" :title="item.businessCode">{{item.businessCode}}</div>
            </div>
        </div>     -->
        <template>
            <el-table
            :data="getResolveData"
            style="width: 100%;">
            <el-table-column
              prop="checkTime"
              label="审核下发时间"
              :show-overflow-tooltip='true'
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
              prop="outboundNo"
              label="出库订单号"
              width="180"
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
              prop="sendFromUnit"
              label="发物单位"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="orderStatus"
              label="订单状态"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="businessCode"
              label="企业编码"
              width="230"
              align="center">
            </el-table-column>
          </el-table>
            <div class="pageAtion">
                <el-pagination
                style="text-align: center; width: 100%; margin-left: -10px;"
    background
    layout="prev, pager, next"
    :total="zqtjTotal"
    :page-size="7"
    @size-change="handleSizeChange" @current-change="handleCurrentChangeZqtj">
    </el-pagination>
            </div>
           </template>
    </div>
</template>
<script>
    import globalMonitoringAPI from "@/api/modules/globalMonitoring";
export default {
    data(){
        return{
            getResolveData:[],
            getDdStatuList:[
            {
                value:0,
                name:'未下发'
            },
            {
                value:1,
                name:'已下发'
            },
            {
                value:2,
                name:'已提货'
            },
            {
                value:3,
                name:'已入库'
            },
            {
                value:4,
                name:'出库中'
            },
            {
                value:5,
                name:'已出库'
            },
            {
                value:6,
                name:'运输中'
            },
            {
                value:7,
                name:'派送中'
            },
            {
                value:8,
                name:'已签收'
            },
            {
                value:-1,
                name:'异常'
            },
        ],
            zqtjTotal:0,
            form:{
                page:1,
                pageSize:7,                
                ddh:'',
                ydh:'',
                ddStatu:'',
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
                    orderStatus:this.form.ddStatu
                }
            }
            globalMonitoringAPI.getDdjkListData(params).then(res=>{
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
</style>
