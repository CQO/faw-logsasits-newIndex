<template>
    <div :class="['tuliBox', {'closeWin': closeWin}]">
      <i class="iconfont icon-tuli" @click="open"></i>
      <i class="iconfont icon-zuixiaohua" @click="close"></i>
      <ul>
        <li v-for="(item,index) in listData" :key="index" :class="{'close': !item.isOpen, line: item.type == 'line' }" @click="handleClick(item)" @mouseenter="showInfo(item)">
          <span :class="['iconfont', item.icon,  item.type]" :style="{color: item.color, 'font-size': (item.size || '14px'), border: '1px solid ' + item.color }"></span>{{ item.typeName}}
        </li>
      </ul>
    </div>
</template>

<script>
import { hideLayer } from '@/views/bigscreen/homePage/map3d/pointlayer'
import { searchremoveLayer } from '@/views/bigscreen/homePage/map3d/searchLayer'
export default {
  name: "index",
  components: {},
  data() {
    return {
      closeWin: true,
      listData: [
        { typeName: '未完成', icon: "icon-line", color: "#f31237", type: 'line1', isOpen: true, size: '18px'},
        { typeName: '已完成', icon: "icon-line", color: "#f3fc04", type: 'line2', isOpen: true, size: '18px'},
        { typeName: '工厂提货点', icon: "icon-gongcheng", color: "#f42446", type: 'gongchang', isOpen: true, size: '16px'},
        { typeName: '站台提货点', icon: "icon-huoche", color: "#1d62d4", type: 'zhantai', isOpen: true, size: '16px'},
        { typeName: '仓库提货点', icon: "icon-cangku", color: "#d033fe", type: 'cangku', isOpen: true, size: '17px'},
        { typeName: '物流仓库', icon: "icon-wuliu", color: "#ffc029", type: 'wuliu', isOpen: true, size: '14px'},
        { typeName: '受供单位', icon: "icon-danwei", color: "#2be3c7", type: 'danwei', isOpen: true, size: '11px'},
      ]
    }
  },
  methods: {
    open() {
      hideLayer(true)//展示图例图层
      searchremoveLayer()//清除查询图层
      this.closeWin = false;
      this.hideInfo();
      this.clearSearch();
    },
    close() {
      debugger
      this.closeWin = true;
      this.hideInfo();
    },
    // 把关闭项都点亮
    itemLight() {
      this.listData.map((item)=>{
        if(item.type !== 'line1' && item.type !== 'line2') {
          item.isOpen = true;
        }
        return item;
      })
    },
    handleClick(item) {
      item.isOpen = !item.isOpen;
      this.$emit('changeTypeShow', item)
    },
    showInfo(data) {
      this.$emit('ShowInfo', data)
    },
    hideInfo() {
      this.$emit('HideInfo');
    },
    // 清空搜索框
    clearSearch() {
      this.$emit('clearSearch')
    }
  },
  created(){

  }
}
</script>

<style scoped lang="scss">
.tuliBox{  
  width: 150px;
  padding: 10px 10px 10px 15px;
  background: rgba(16,54,87,0.5);
  border: 1px solid #345f92;
  position: absolute;
  bottom: 4px;
  left: 4px;
  border-radius: 3px;
  .icon-zuixiaohua{
    display: block;
    position: absolute;
    top: 0px;
    right: 3px;
    font-size: 20px;
    cursor: pointer;
    color: #fff;
    transition: 0.3s all;
    border-radius: 3px;
    &:hover{
      color: red;
    }
  }
  .icon-tuli{
    display: none;
  }
  &.closeWin{    
    width: 40px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    text-align: center;
    .icon-zuixiaohua{
      display: none;
    }
    .icon-tuli{      
      display: block;
      font-size: 24px;
      color: #eee;
      transition: 0.3s all;
      cursor: pointer;
      &:hover{
        color: yellow;
      }
    }
    ul{
      display: none;
    }
  }

  ul{
    list-style: none;
    margin: 0;
    padding: 0;        
    li{
      color: #e3d9d0; 
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      cursor: pointer;
      
      span{
        &.iconfont{
          width: 21px;
          height: 21px;
          line-height: 18px;
          display: inline-block;
          border-radius: 50%;
          margin-right: 5px;   
          text-align: center;
          background: rgba(21,22,12, 0.8);
          &.line,&.line1,&.line2{border-width: 0!important; background: none!important;}
        } 
        &.line{ font-size: 25px; border-width: 0!important; background: none!important;}
        &.red{ color: #bb2416;}
        &.green{ color: #ccf559;}
      }
      &.close{
        color: #666;
        span.iconfont { color: #999!important; background: #666; border: 1px solid #666!important;
          &.line,&.line1,&.line2{border-width: 0!important; background: none!important;}
        }
      }
    }
  }
}

</style>
