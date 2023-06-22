<template>
    <div class="tabTdList">
        <el-form style="height: 30px;">
            <el-row :gutter="40">
              <el-col :md="6" style="margin-top:5px">
                <el-select placeholder="请选择查询内容" v-model="form.searchCont" clearable  @change="changeHandler">
                    <el-option
                      v-for="item in searchNameData"
                      :key="item.codea"
                      :label="item.searchname"
                      :value="item.codea"
                    >
                    </el-option>
                  </el-select>
              </el-col>
              <el-col :md="7">
                <el-form-item label="企业"  v-if="this.form.searchCont==6">
                <el-select placeholder="请选择企业" v-model="form.qy" clearable>
                    <el-option
                      v-for="item in qyListData"
                      :key="item.supplierCode"
                      :label="item.name"
                      :value="item.supplierCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="运单号"  v-if="this.form.searchCont==1||this.form.searchCont=='运单号'">
                    <el-input style="width: 60%;" v-model="form.ydh" placeholder="请输入运单号"/>
                </el-form-item>
                <el-form-item label="计划编号"  v-if="this.form.searchCont==2">
                    <el-input style="width: 60%;" v-model="form.jhbh" placeholder="请输入计划编号"/>
                </el-form-item>
                <el-form-item label="寄件城市"  v-if="this.form.searchCont==3">
                    <el-input style="width: 60%;" v-model="form.jjcs" placeholder="请输入寄件城市"/>
                </el-form-item>
                <el-form-item label="派件城市"  v-if="this.form.searchCont==4">
                    <el-input style="width: 60%;" v-model="form.pjcs" placeholder="请输入派件城市"/>
                </el-form-item>
                <el-form-item label="派件省份"  v-if="this.form.searchCont==5">
                    <el-input style="width: 60%;" v-model="form.pjsf" placeholder="请输入派件省份"/>
                </el-form-item>
                <el-form-item label="运输状态"  v-if="this.form.searchCont==7">
                    <el-select placeholder="请选择运输状态" v-model="form.yszt" clearable>
                        <el-option
                          v-for="item in ysztListData"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="运输方式"  v-if="this.form.searchCont==8">
                        <el-select placeholder="请选择运输方式" v-model="form.ysfs" clearable>
                            <el-option
                              v-for="item in ysfsListData"
                              :key="item.code"
                              :label="item.name"
                              :value="item.code"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
              </el-col>
              <el-col :md="3" style="display:flex">
                <div class="btnSty" @click="handleSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
        <div class="" style="">
            <!-- <div class="titlehead">
                <div class="" v-for="item in titleList">
                    {{ item.name }}
                </div>
            </div> -->
            <!-- <div class="mainLisy">
                <div class="mainListItem" v-for="item in contData">
                    <div class="itemlaner" style="color: #7bffff;">{{item.waybillNo}}</div>
                    <div class="itemlaner">{{item.planNo}}</div>
                    <div class="itemlaner">{{item.sendCity}}</div>
                    <div class="itemlaner">{{item.deliverCity}}</div>
                    <div class="itemlaner">{{item.deliverProvince}}</div>
                    <div class="itemlaner">{{item.packageCount}}</div>
                    <div class="itemlaner">{{item.packageVolume}}</div>
                    <div class="itemlaner">{{item.packageWeight}}</div>
                    <div class="itemlaner">{{item.waybillStatus}}</div>
                    <div class="itemlaner">{{item.transportType}}</div>
                </div>
                <el-pagination
                class="pageAtion"
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
            </div> -->
            <template>
                <el-table
                style="--el-table-border-color: none;
                --el-table-bg-color: none;
                --el-table-tr-bg-color: none;width: 100%"
                :row-class-name="tableRowClassName"
                :data="contData">
                <el-table-column
                  prop="waybillNo"
                  label="运单号"
                  fixed="left"
                  width="200"
                  :show-overflow-tooltip='true'
                  align="center">
                  <template slot-scope="scope">
                    <span  @click="showDetail(scope)" style="color: #27cbff;" class="text-decoration">{{scope.row.waybillNo}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="planNo"
                  label="计划编号"
                  width="300"
          :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="sendCity"
                  label="寄件城市"
                  width="260"
          :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="deliverCity"
                  label="派件城市"
                  width="260"
          :show-overflow-tooltip='true'
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="deliverProvince"
                  label="派件省份"
          :show-overflow-tooltip='true'
                  width="260"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="packageCount"
                  label="包裹数量(件)"
                  width="160"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="packageVolume"
                  label="包裹体积(m3)"
                  width="160"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="packageWeight"
                  label="包裹重量(kg)"
                  width="160"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="transportType"
                  label="运输方式"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="waybillStatus"
                  label="运输状态"
                  fixed="right"
                  width="160"
                  align="center">
                </el-table-column>
              </el-table>
              <el-pagination
                class="pageAtion"
  background
  layout="prev, pager, next"
  :total="total"
  :page-size="4"
  @size-change="handleSizeChange" @current-change="handleCurrentChange">
</el-pagination>
               </template>
        </div>
    </div>
</template>
<script>
    import mapGuide from '@/api/modules/mapGuide'
import getPlanMonitorDataApi from '@/api/modules/homePage'
export default {
    props:{
        wayBillNo:{
            type:String,
            default:false
        }
    },
    watch:{
        wayBillNo:{
            handler:function(newVal,oldVal){
            this.getCenterName=newVal
        },
        immediate:true
        }
        
    },
    data(){
        return {
            qyListData:[],
            queryParams:{
                page:1,
                pageSize:4
            },
            ysztListData:[
                {
                    code:'10',
                    name:'已下单'
                },
                {
                    code:'30',
                    name:'仓库处理中'
                },
                {
                    code:'50',
                    name:'运输中'
                },
                {
                    code:'70',
                    name:'派送中'
                },
                {
                    code:'75',
                    name:'领取中'
                },
                {
                    code:'80',
                    name:'已签收'
                },
                {
                    code:'-1',
                    name:'异常'
                },
            ],
            ysfsListData:[
                {
                    code:'2',
                    name:'散航'
                },
                {
                    code:'3',
                    name:'铁路'
                },
                {
                    code:'4',
                    name:'干支'
                },
                {
                    code:'5',
                    name:'零担'
                },
                {
                    code:'6',
                    name:'大巴'
                },
                {
                    code:'7',
                    name:'水运'
                },
                {
                    code:'8',
                    name:'海运'
                },
                {
                    code:'9',
                    name:'快递'
                },
                {
                    code:'10',
                    name:'整车'
                },
            ],
            searchNameData:[
                {
                    codea:'1',
                    searchname:'运单号'
                },
                {
                    codea:'2',
                    searchname:'计划编号'
                },
                {
                    codea:'3',
                    searchname:'寄件城市'
                },
                {
                    codea:'4',
                    searchname:'派件城市'
                },
                {
                    codea:'5',
                    searchname:'派件省份'
                },
                {
                    codea:'6',
                    searchname:'企业'
                },
                {
                    codea:'7',
                    searchname:'运输状态'
                },
                {
                    codea:'8',
                    searchname:'运输方式'
                },
            ],
            form:{
                qy:'',
                ydh:'',
                searchCont:'',
                jhbh:'',
                jjcs:'',
                pjcs:'',
                pjsf:'',
                yszt:'',
                ysfs:''
            },
            getCenterName:'',
            titleList:[
                {
                    name:'运单号'
                },
                {
                    name:'计划编号'
                },
                {
                    name:'寄件城市'
                }, {
                    name:'派件城市'
                }, {
                    name:'派件省份'
                }, {
                    name:'包裹数量(件)'
                }, {
                    name:'包裹体积(m3)'
                }, {
                    name:'包裹重量(kg)'
                }, {
                    name:'运输方式'
                }, {
                    name:'运输状态'
                },
            ],
            contData:[]
        }
    },
    mounted(){
        this.getList()
        this.form.searchCont='运单号'
        this.getBuinessList()
    },
    methods:{
        showDetail(row){
            this.$emit('passParam', row)
        },
        getBuinessList(){
            getPlanMonitorDataApi.getWlqyListData({}).then(res=>{
                this.qyListData=res.list
            })
        },
        changeHandler(){
        },
        handleSearch(){
            if(this.form.searchCont==1){
                this.form.qy='',
                this.form.jhbh='',
                this.form.jjcs='',
                this.form.pjcs='',
                this.form.pjsf='',
                this.form.yszt='',
                this.form.ysfs=''
            } else if(this.form.searchCont==2){
                this.form.qy='',
                this.form.ydh='',
                this.form.jjcs='',
                this.form.pjcs='',
                this.form.pjsf='',
                this.form.yszt='',
                this.form.ysfs=''
            } else if(this.form.searchCont==3){
                this.form.qy='',
                this.form.ydh='',
                this.form.jhbh='',
                this.form.pjcs='',
                this.form.pjsf='',
                this.form.yszt='',
                this.form.ysfs=''
            } else if(this.form.searchCont==4){
                this.form.qy='',
                this.form.ydh='',
                this.form.jhbh='',
                this.form.jjcs='',
                this.form.pjsf='',
                this.form.yszt='',
                this.form.ysfs=''
            } else if(this.form.searchCont==5){
                this.form.qy='',
                this.form.ydh='',
                this.form.jhbh='',
                this.form.jjcs='',
                this.form.pjcs='',
                this.form.yszt='',
                this.form.ysfs=''
            }else if(this.form.searchCont==6){
                this.form.pjsf='',
                this.form.ydh='',
                this.form.jhbh='',
                this.form.jjcs='',
                this.form.pjsf='',
                this.form.yszt='',
                this.form.ysfs=''
            }else if(this.form.searchCont==7){
                this.form.qy='',
                this.form.ydh='',
                this.form.jhbh='',
                this.form.jjcs='',
                this.form.pjsf='',
                this.form.pjcs='',
                this.form.ysfs=''
            }else if(this.form.searchCont==8){
                this.form.qy='',
                this.form.ydh='',
                this.form.jhbh='',
                this.form.jjcs='',
                this.form.pjsf='',
                this.form.yszt='',
                this.form.pjcs=''
            }
            this.queryParams.page=1
            this.getList()
        },
        tableRowClassName({ rowIndex }) {
    //  if ((rowIndex + 1) % 2 === 0) {
    //       return 'oddRow';
    //  }
    //   return 'evenRow';
 },
        getList(){
            let params={
                page:this.queryParams.page,
                pageSize:this.queryParams.pageSize,
                m:{
                    businessCode:this.form.qy,
                    waybillNo:this.form.ydh,
                    planNo:this.form.jhbh,
                    sendCity:this.form.jjcs,
                    deliverCity:this.form.pjcs,
                    deliverProvince:this.form.pjsf,
                    waybillStatus:this.form.yszt,
                    transportType:this.form.ysfs,
                }
            }
                getPlanMonitorDataApi.getOrderListData(params).then(res=>{
                this.contData=res.pd.rows
                this.total=res.pd.total
            })
            // mapGuide.getYdMonitorListData({}).then(res=>{
            //     console.log(res,'ressssssssssssssssssss运单监控数据')
            //     this.contData=res.list
            // })
        },
    },
}
</script>
<style lang="scss" scope>
.tabTdList {
    width: 100%;
    padding:0 15px 15px 15px;
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
}
.evenRow {
    background: #0C385E !important;
    color:#fff;
    border-bottom:none !important;
  }
  .oddRow{
    background:#09315a !important;
    color:#fff;
    border-bottom:none !important;
  }
  .el-table--enable-row-transition .el-table__body td.el-table__cell{
     border-bottom:none !important;
     background:#054480 !important;
     color:#fff
   }
   .el-table__body tr.hover-row>td.el-table__cell{
    border-top: 1px solid #01ffff !important;
         border-bottom: 1px solid #01ffff !important;
         //background: #09315a !important;
         background:#054480 !important;
   }
   .el-table__body tr.hover-row>td.el-table__cell:first-child{
    border-left: 1px solid #01ffff !important;
    background:#054480 !important;
   }
   .el-table__body tr.hover-row>td.el-table__cell:last-child{
     border-right: 1px solid #01ffff;
     background:#054480 !important;
   }
   .el-table th.el-table__cell.is-leaf{
    //background:#09315a !important;
    background:#054480  !important;
    border-bottom:5px solid #002445  !important;
    color:#fff;
   }
   .text-decoration{
    text-decoration:underline
}
</style>