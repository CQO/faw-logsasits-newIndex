
<template>
    <!-- 地图 -->
    <div class="mapContent">        
        <map3d :pointLayerData="pointLayerData" :searchPointData="searchPointData"></map3d>
        <!-- 搜索框 -->
        <map-search @SentSearchData="getSearchData"  @closeTuli="closeTuli" ref="mapSearch"></map-search>
        <!-- 图例 -->
        <TuLi ref="tuliRef" @changeTypeShow="changeTypeShow" @ShowInfo="showInfo" @HideInfo="hideInfo" @clearSearch="clearSearch"></TuLi>        
        <!-- 汇总信息 -->
        <summary-info v-if="infoShow" :infoData="infoData" @closeInfo="infoShow = false"></summary-info>
        <!-- 选择年度 -->
        <div class="yearSelect">
          <DataSelect></DataSelect>
        </div>

    </div>
</template>

<script>
import getPlanMonitorDataApi from '@/api/modules/homePage'
import map3d from "./map3d/map3dContainer";
import TuLi from "./components/TuLi"; // 图例
import MapSearch from "./components/MapSearch"; // 地图搜索
import SummaryInfo from './components/SummaryInfo'; // 汇总信息
import DataSelect from '@/views/bigscreen/homePage/components/dataSelect';

export default {
  name: "map",
  components: {
    map3d,
    MapSearch,
    TuLi,
    SummaryInfo,
    DataSelect,  
  },
  data() {
    return {
        infoData: {}, 
        infoShow: false, // 信息汇总框是否显示
        pointLayerData:null, // 点位图层
        searchPointData:null, // 搜索点位数据  
    }
  },
  methods: {
    // 图例控制3D组件的上图
    changeTypeShow(e) {
      this.showInfo(e);
      this.pointLayerData = e      
    },
    // 清空搜索
    clearSearch() {
      this.$refs.mapSearch.clear();
    },
    // 关闭图例
    closeTuli() {
      this.$refs.tuliRef.close();
      this.$refs.tuliRef.itemLight(); // 把图例项全点亮
    },
    // 点击搜索，获取的数据 
    getSearchData(e) {      
      // this.searchPointData=e
      console.log('搜索后选中的内容==>>：' + JSON.stringify(e));
    },
    // 展示类型type
    showInfo(data) {
      const cangkuData = sessionStorage.getItem('cangku') ?　JSON.parse(sessionStorage.getItem('cangku')) : '';
      const danweiData = sessionStorage.getItem('danwei') ?　JSON.parse(sessionStorage.getItem('danwei')) : '';
      const wuliuData = sessionStorage.getItem('wuliu') ?　JSON.parse(sessionStorage.getItem('wuliu')) : '';
      const gongchangData = sessionStorage.getItem('gongchang') ?　JSON.parse(sessionStorage.getItem('gongchang')) : '';
      const zhantaiData = sessionStorage.getItem('zhantai') ?　JSON.parse(sessionStorage.getItem('zhantai')) : '';
      const lineData = sessionStorage.getItem('lineData') ?　JSON.parse(sessionStorage.getItem('lineData')) : '';
      const infoData = [
        { title: '未完成', type: 'line1', isLine: true, option: lineData },
        { title: '已完成',  type: 'line2', isLine: true,  option: lineData},                
        gongchangData, zhantaiData,cangkuData, danweiData, wuliuData
      ];
      infoData.forEach((item) => {
        if((data.type == item.type) && !item.isLine) {
          this.infoData = item;
          this.infoData.isLine = false;
        } 
        if ((data.type == item.type) && item.isLine){
          this.infoData = item;
          this.infoData.isLine = true;
        }
      })
      // 拿到数据显示      
      if(data.isOpen) {
        this.infoShow = true;
      } else {
        this.infoShow = false;
      }
      
    },
    //查询仓库提货点
    queryCkthd(){
      const self=this
      const obj = {m:{year:sessionStorage.getItem('year') || '2023'}};
      getPlanMonitorDataApi.getMapPointCkthd(obj).then(res=>{
        const arr=[{
          "typeName":"仓库提货点",
          "type":"cangku",
          "result":res.list
        }]
        self.$store.commit('map3D/mapCkthdData',arr);
        // 汇总信息存储
        this.saveData('cangku', res.total, '仓库提货点');
      })
    },
    // 查询物流仓库点位
    queryWlck(){
      const self=this
      const obj = {m:{year:sessionStorage.getItem('year') || '2023'}};
      getPlanMonitorDataApi.getMapPointWlck(obj).then(res=>{
        const arr=[{
          "typeName":"物流仓库",
          "type":"wuliu",
          "result":res.list
        }]
        self.$store.commit('map3D/mapWlckData',arr)
        // 汇总信息存储
        this.saveData('wuliu', res.total, '物流仓库');
      })
    },
    // 查询受供单位
    querySgdw(){
      const self=this;
      const obj = {m:{year:sessionStorage.getItem('year') || '2023'}};
      getPlanMonitorDataApi.getMapPointSgdw(obj).then(res=>{
        const arr=[{
          "typeName":"受供单位",
          "type":"danwei",
          "result":res.list
        }]
        self.$store.commit('map3D/mapSgdwData',arr)
        this.saveData('danwei', res.total, '受供单位');
      })
    },
    // 工厂提货点
    queryGcth(){
      const self=this;
      const obj = {m:{year:sessionStorage.getItem('year') || '2023'}};
      getPlanMonitorDataApi.getMapPointGcth(obj).then(res=>{
        const arr=[{
          "typeName":"工厂提货点",
          "type":"gongchang",
          "result":res.list
        }]
        self.$store.commit('map3D/mapGcthData',arr)
        this.saveData('gongchang', res.total, '工厂提货点');
      })
    },
    //迁徙图
    queryMapLine(){
      const self=this;
      const obj = {m:{year:sessionStorage.getItem('year') || '2023'}};
      getPlanMonitorDataApi.getMapLine(obj).then(res=>{
        self.$store.commit('map3D/mapLineData',res)
      })
    },
    //迁徙图：统计信息
    GetMapCenterCount(){
      const self=this;
      const obj = {m:{year:sessionStorage.getItem('year') || '2023'}};
      getPlanMonitorDataApi.getMapCenterCount(obj).then(res=>{
        self.saveData('lineData', res, '联保中心占比');
      })
    },

    // 存储方法
    saveData(key, data, title) {
      data.title = title;
      data.type = key;
      const dataStr = JSON.stringify(data);
      sessionStorage.setItem(key, dataStr);
    },    
    // 隐藏类型
    hideInfo() {
      this.infoShow = false;
    },
  },
  mounted() {
    this.queryCkthd()
    this.queryWlck()
    this.querySgdw()
    this.queryGcth();
    this.queryMapLine()
    this.GetMapCenterCount();
  }
}
</script>

<style scoped lang="scss">
.yearSelect{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

