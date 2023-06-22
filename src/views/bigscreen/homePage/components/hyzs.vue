<template>
    <div class="">
        <div style="display:flex" class="topForm">
            <div style="color: #fff;line-height:60px">
          <span>货运指数</span>
        </div>
        <el-form label-width="120px" style="margin-right: 20px">
            <el-row :gutter="40">
              <el-col :md="10">
                <el-form-item label="运单状态">
                  <el-select style="z-index: 3000;" clearable placeholder="请选择" v-model="formHyzsValue.ydStatus">
                    <el-option
                      v-for="item in jsStatus"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="10">
                <el-form-item label="运输方式">
                  <el-select style="z-index: 3000;" clearable placeholder="请选择" v-model="formHyzsValue.ysfs">
                    <el-option
                      v-for="item in tranWork"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="3">
                <div class="btnSty" @click="handleBzpcjkSearch">查询</div>
              </el-col>
            </el-row>
          </el-form>
          </div>
            <div class="titlehead">
                    <div class="" style=" margin-left: 1px; flex: 1; display: flex;">
                        <div class="cbycitemlaner">计划编号</div>
                    <div class="cbycitemlaner">寄件城市</div>
                    <div class="cbycitemlaner">派件城市</div>
                    <div class="cbycitemlaner">包裹数量</div>
                    <div class="cbycitemlaner">运输方式</div>
                    <div class="cbycitemlaner">运单状态</div>
                    </div>
            </div>
            <div class="mainLisy">
                <div class="mainListItem" v-for="item in getHyzsData">
                    <div class="cbycitemlaner">{{item.planNo }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.sendCity">{{item.sendCity}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.deliverCity">{{item.deliverCity}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.packageCount">{{item.packageCount}}</div>
                    <div class="cbycitemlaner">{{item.transportType}}</div>
                    <div class="cbycitemlaner">{{item.waybillStatus}}</div>
                </div>
                <el-pagination
                class="pageAtion"
  background
  layout="prev, pager, next"
  :total="hyzsTotal"
  @size-change="handleSizeHyzsChange" @current-change="handleCurrentHyzsChange">
  </el-pagination>
            </div>
    </div>
</template>
<script>
import getPlanMonitorDataApi from '@/api/modules/homePage'

export default{
    
    data(){
        return{
            getHyzsData:[],
            jsStatus:[
                {
                    value:'10',
                    name:'已下单'
                },
                {
                    value:'30',
                    name:'仓库处理中'
                },
                {
                    value:'50',
                    name:'运输中'
                },
                {
                    value:'70',
                    name:'派送中'
                },
                {
                    value:'75',
                    name:'领取中'
                },
                {
                    value:'80',
                    name:'已签收'
                },
                {
                    value:'-1',
                    name:'异常'
                },
            ],
            tranWork:[
                {
                    value:'2',
                    name:'散航'
                },
                {
                    value:'3',
                    name:'铁路'
                },
                {
                    value:'4',
                    name:'干支'
                },
                {
                    value:'5',
                    name:'零担'
                },
                {
                    value:'6',
                    name:'大巴'
                },
                {
                    value:'7',
                    name:'水运'
                },
                {
                    value:'8',
                    name:'海运'
                },
                {
                    value:'9',
                    name:'快递'
                },
                {
                    value:'10',
                    name:'整车'
                },
            ],
            hyzsTotal:0,
            formHyzsValue:{
                page:1,
                pageSize:10,
                ydStatus:'',
                ysfs:''
            }
        }
    },
    mounted(){
        this.getHyzsList()
    },
    methods:{
        handleBzpcjkSearch(){
    this.formHyzsValue.page=1
    this.getHyzsList()
        },
        handleSizeHyzsChange(val){
            this.formHyzsValue.pageSize=val
            this.getHyzsList()
        },
handleCurrentHyzsChange(val){
    this.formHyzsValue.page=val
            this.getHyzsList()
},
getHyzsList(){
    let params={
        page:this.formHyzsValue.page,
        pageSize:this.formHyzsValue.pageSize,
        m:{
            waybillStatus:this.formHyzsValue.ydStatus,
            transportType:this.formHyzsValue.ysfs
        }
      }
    getPlanMonitorDataApi.getHyzsListData(params).then(res=>{
        this.getHyzsData=res.pd.rows
        this.hyzsTotal=res.pd.total
      })
}
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
    &:hover{
        border: 1px solid #01ffff;
          box-shadow: 0 0 15px #386fcf !important;
        }
    .itemlaner {
        flex: 1;
        text-align: center;
        margin-left: 1px;
    }
}
.cbycitemlaner {
    text-align: center;
    width: 16.6%;
    flex: 1;
}
.contentOver {
    width: 16.6%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.pageAtion {
    width: 100%;
    text-align: center;
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
.topForm{
    display:flex;
    justify-content: space-between;
}
</style>