<template>
    <div class="mapSearch">    
      <div class="select">
        <el-select v-model="typeVal" placeholder="请选择类型"  @change="typeChange" :popper-append-to-body="false" style="width: 120px; margin-right: 5px;">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div> 
      <div class="select" v-if="typeVal == '1'">
        <el-select v-model="listReqData.center" clearable @clear="clearSearchLayer" placeholder="请选择中心" :popper-append-to-body="false" style="width: 160px; margin-right: 5px;">
          <el-option
            v-for="item in centerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>   

      <div class="ipt" v-if="typeVal == '2'">
        <el-input v-model="listReqData.name" clearable  @clear="clearSearchLayer" placeholder="请输入点位名称"></el-input>        
      </div>
      <div class="button" style="margin-left: 5px">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
      </div>
    </div>
</template>

<script>
import getPlanMonitorDataApi from '@/api/modules/homePage'
import { searchremoveLayer } from '@/views/bigscreen/homePage/map3d/searchLayer'
import { hideLayer } from '@/views/bigscreen/homePage/map3d/pointlayer'
export default {
  name: "mapSearch",
  components: {},
  data() {
    return {     
      // restaurants: [],
      // state: '',
      // timeout:  null,    
      typeVal: '1',  
      typeOptions: [{
          value: '1',
          label: '联保中心'
        }, {
          value: '2',
          label: '点位名称'
      }],
      centerValue: '',
      centerOptions: [{
          value: '无锡联勤保障中心',
          label: '无锡联勤保障中心'
        }, {
          value: '桂林联勤保障中心',
          label: '桂林联勤保障中心'
        }, {
          value: '西宁联勤保障中心',
          label: '西宁联勤保障中心'
        }, {
          value: '沈阳联勤保障中心',
          label: '沈阳联勤保障中心'
        }, {
          value: '郑州联勤保障中心',
          label: '郑州联勤保障中心'
        },
        {
          value: '北京直属保障大队',
          label: '北京直属保障大队'
        }
      ],
                
      listReqData: {
        center: '',
        name: '',
        year: sessionStorage.getItem('year') || '2023'
      }
    }
  },
  methods: {
    // 清空搜索框
    clearSearchLayer() {
      debugger
      hideLayer(true)//展示图例图层
      searchremoveLayer()//清除查询图层
    },
    typeChange(e) {;
      if(e == '1') {
        this.listReqData.name = '';
      } else {
        this.listReqData.center = ''
      }
    },
    changeCenter() {
      this.loadAll();
    },    
    // 搜索
    search() {      
      if(!this.typeVal) {
        this.$message.warning('请选择搜索类型');
        return false;
      }
      if(this.typeVal === '1' && !this.listReqData.center) {
        this.$message.warning('请选择联保中心');
        return false;
      }
      if(this.typeVal === '2' && !this.listReqData.name) {
        this.$message.warning('请输入点位名称');
        return false;
      }
      hideLayer(false)//隐藏图例中的图层
      searchremoveLayer()//删除搜索的图层

      const params = {m : this.listReqData };
      this.queryCkthd(params);
      this.queryWlck(params);
      this.querySgdw(params);
      this.queryGcth(params);            
    },
    //查询仓库提货点
    queryCkthd(obj){
      const self=this
      getPlanMonitorDataApi.getMapPointCkthd(obj).then(res=>{
        const arr=[{
          "typeName":"仓库提货点",
          "type":"cangku",
          "result":res.list
        }]
        self.$store.commit('map3D/searchCkthdData',arr);
        // self.$emit('SentSearchData', res.list);
        self.$emit('closeTuli');
      })
    },
    // 查询物流仓库点位
    queryWlck(obj){
      const self=this
      getPlanMonitorDataApi.getMapPointWlck(obj).then(res=>{
        const arr=[{
          "typeName":"物流仓库",
          "type":"wuliu",
          "result":res.list
        }]
        self.$store.commit('map3D/searchWlckData',arr)
        // self.$emit('SentSearchData', res.list);
        self.$emit('closeTuli');
      })
    },
    // 查询受供单位
    querySgdw(obj){
      const self=this
      getPlanMonitorDataApi.getMapPointSgdw(obj).then(res=>{
         const arr=[{
          "typeName":"受供单位",
          "type":"danwei",
          "result":res.list
        }]
        self.$store.commit('map3D/searchSgdwData',arr)
        // self.$emit('SentSearchData', res.list);
        self.$emit('closeTuli');
      })
    },
    // 工厂提货点
    queryGcth(obj){
      const self=this
      getPlanMonitorDataApi.getMapPointGcth(obj).then(res=>{
        const arr=[{
          "typeName":"工厂提货点",
          "type":"gongchang",
          "result":res.list
        }]
        self.$store.commit('map3D/searchGcthData',arr)
      })
    },
    // 清空搜索
    clear() {
      this.listReqData.center = '';
      this.listReqData.name = '';
    }
  },
  mounted(){
    this.loadAll();
  }
}
</script>

<style scoped lang="scss">
.mapSearch{
  // background: rgba(16,54,87,0.5);
  border-radius: 3px;
  display: flex;
    .select,.hover{
      ::v-deep .el-input__icon{
        line-height: 20px;
      }
    }
    .ipt{
      ::v-deep .el-input__suffix{
      margin-top: -5px;
      height: 15px;
      line-height: 15px;  
      margin-right: 5px;
    }
  }
  
}
::v-deep .el-popper {
  background:rgba(1, 29, 87, 0.8) !important;
  border: 1px solid #20bff7 !important;
   .popper__arrow::after{
    border-bottom-color: #20bff7;
    margin-top: -1px;
   }
}
::v-deep .el-autocomplete-suggestion li{
    color: #fff;
    &:hover{
      background: rgba(36, 202, 255, 0.8);
    }
}
::v-deep .el-select-dropdown{
  background:rgba(1, 29, 87, 0.8) !important;
  border: 1px solid #20bff7 !important;
  .el-select-dropdown__item{
    color: #fff;
    &.selected, &.hover{
      background: rgba(36, 202, 255, 0.8);
    }
    &:hover{
      background: rgba(36, 202, 255, 0.5);
      color: #fff;
    }
  }
}

</style>
