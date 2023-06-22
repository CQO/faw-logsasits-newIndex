<template>
    <div class="">
        <div style="display:flex" class="topForm">
            <div style="color: #fff;line-height:60px">
          <span>设备监控</span>
        </div>
        <el-form label-width="120px" style="margin-right: 20px">
            <el-row :gutter="40">
              <el-col :md="10">
                <el-form-item label="库房编号">
                  <el-input v-model="formWltsfxValue.kfbh" style="width: 80%;" placeholder="请输入库房编号"/>
                </el-form-item>
              </el-col>
              <el-col :md="10">
                <el-form-item label="库房名称">
                    <el-input v-model="formWltsfxValue.kfmc" style="width: 80%;" placeholder="请输入库房名称"/>
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
                        <div class="cbycitemlaner">库房编号</div>
                    <div class="cbycitemlaner">库房名称</div>
                    <div class="cbycitemlaner">设备名称</div>
                    <div class="cbycitemlaner">设备数量</div>
                    <div class="cbycitemlaner">异常数量</div>
                    </div>
            </div>
            <div class="mainLisy">
                <div class="mainListItem" v-for="item in getWltsfxData">
                    <div class="cbycitemlaner">{{item.baseCode }}</div>
                    <div class="cbycitemlaner contentOver" :title="item.name">{{item.name}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.equipmentType">{{item.equipmentType}}</div>
                    <div class="cbycitemlaner contentOver" :title="item.number">{{item.number}}</div>
                    <div class="cbycitemlaner">{{item.exNum}}</div>
                </div>
                <el-pagination
                class="pageAtion"
  background
  layout="prev, pager, next"
  :total="wltsfxTotal"
  :page-size="9"
  @size-change="handleSizeWltsfxChange" @current-change="handleCurrentWltsfxChange">
  </el-pagination>
            </div>
    </div>
</template>
<script>
import getPlanMonitorDataApi from '@/api/modules/homePage'

export default{
    
    data(){
        return{
            getWltsfxData:[],
            jsStatus:[],
            wltsfxTotal:0,
            formWltsfxValue:{
                page:1,
                pageSize:9,
                kfbh:'',
                kfmc:''
            }
        }
    },
    mounted(){
        this.getWltsfxList()
    },
    methods:{
        handleBzpcjkSearch(){
    this.formWltsfxValue.page=1
    this.getWltsfxList()
        },
        handleSizeWltsfxChange(val){
            this.formWltsfxValue.pageSize=val
            this.getWltsfxList()
        },
handleCurrentWltsfxChange(val){
    this.formWltsfxValue.page=val
            this.getWltsfxList()
},
currWorkTypeChange(){},
getWltsfxList(){
    let params={
        page:this.formWltsfxValue.page,
        pageSize:this.formWltsfxValue.pageSize,
        m:{
            baseCode:this.formWltsfxValue.kfbh,
            name:this.formWltsfxValue.kfmc
        }
      }
    getPlanMonitorDataApi.getSbjkListData(params).then(res=>{
        this.getWltsfxData=res.pd.rows
        this.wltsfxTotal=res.pd.total
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