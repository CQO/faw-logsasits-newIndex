<template>
  <div>
    <div class="summaryInfo noLine" v-if="!infoData.isLine">
      <i class="iconfont icon-close" @click="close"></i>
      <ul>
        <li class="title">{{ infoData.title ? infoData.title:'--' }}</li>
        <li>数量： {{ infoData.countNum ? infoData.countNum : '0' }}个</li>
        <li>物资总数： {{ infoData.total ? infoData.total : '0' }}万件（套）</li>
      </ul>            
    </div>
    <!-- 未完成 -->
    <div class="summaryInfo linebox linebox1" v-if="infoData.type == 'line1'">
      <i class="iconfont icon-close" @click="close"></i>
      <div class="tabName"><span>联保中心 未完成占比</span></div>
      <ul>
          <li v-for="(item,index) in infoData.option" :key="index" class="line1Li">
            <el-tooltip :content="'总量：'+ item.zl + '件, 未完成数量' + item.wwcsl + '件'" placement="top">
              <div class="innerbox">
                <span>{{item.center}}</span><el-progress :text-inside="true" :stroke-width="16" :percentage="item.wwcl ? (item.wwcl * 100).toFixed() : 0"></el-progress>
              </div>
            </el-tooltip>
          </li>                    
      </ul>
    </div>
    <!-- 已完成 -->
    <div class="summaryInfo linebox linebox2" v-if="infoData.type == 'line2'">
      <i class="iconfont icon-close" @click="close"></i>
      <div class="tabName"><span>联保中心 已完成占比</span></div>
      <ul>        
        <li v-for="(item,index) in infoData.option" :key="index" class="line2Li">
          <el-tooltip :content="'总量：'+ item.zl + '件, 已完成数量' + item.wcsl + '件'" placement="top">
             <div class="innerbox">
              <span>{{item.center}}</span><el-progress :text-inside="true" :stroke-width="16" :percentage="item.wcl ? (item.wcl * 100).toFixed() : 0"></el-progress>
            </div>
          </el-tooltip>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  props: {
    infoData: {
        type: Object,
        default: {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('closeInfo')
    }
   
  },
  created(){

  }
}
</script>

<style scoped lang="scss">
.summaryInfo{  
  min-width: 270px;
  height: 100px;
  
  background: rgba(16,54,87,0.5);
  border: 1px solid #345f92;
  position: absolute;
  bottom: 4px;
  right: 4px;
  border-radius: 3px;    
  .iconfont{
    position: absolute;
    top: 2px;
    right: 2px;    
    color: #eee;
    transform:rotate(0deg);
    transition: 0.3s all;
    cursor: pointer;
    font-size: 14px;
    &:hover{
      transform:rotate(360deg);
      color: yellow;
    }
  }
  &.noLine{
    padding: 10px 10px 10px 15px;
    ul{
      list-style: none;
      padding: 0;
      margin: 0;
      color: #fff;
      li{
        line-height: 26px;
        white-space: nowrap;
        &.title{
          font-weight: bold;
          color: yellow;
        }
      }
    }
  }
  &.linebox{
    padding: 0;
    width: 500px;    
    min-height: 175px;
    padding: 10px 10px 0px 0px;
    background: rgba(1, 29, 87, 0.7) !important;
    .tabName{
      width: 35px;
      position: absolute;
      top:0;
      bottom: 0;
      left: 0;
      border-right:1px solid #345f92;
      padding: 0 7px;
      font-size: 12px;
      box-sizing: border-box;
      background: rgba(1, 29, 87, 0.8) !important;
      display: flex;
      justify-content: center;   
      align-items: center;   
      span{
        display: block;
        color: #fff;
        text-align: center;        
      }
    }
    ul{
      padding: 0px 10px 10px 40px;
      margin: 0;
      list-style: none;
      flex: 1;
      li{
        .innerbox{
          cursor: pointer;
          height: 26px;
          display: flex;
        }        
        span{
          color: #fff;
          font-size: 12px;
          padding-right: 4px;
        }
        &.line1Li{
          ::v-deep .el-progress{
            flex: 1;
            .el-progress-bar__outer{
              border:1px solid #892020;
              background: rgba(243,139,139, 0.3)!important;
              border-radius: 26px;
              .el-progress-bar__inner{
                background: linear-gradient(to right, #260505, #fd0202)!important;
                opacity: 0.8;
              }
              .el-progress-bar__innerText{
                color: yellow!important;
                margin-top: -3px;
              }
            }
          }
        }
        &.line2Li{
          ::v-deep .el-progress{
              flex: 1;
              .el-progress-bar__outer{
                border:1px solid #fed702;
                background: rgba(250,212,2, 0.3)!important;
                border-radius: 26px;
                .el-progress-bar__inner{
                  background: linear-gradient(to right, #c9b548, #fdd703)!important;
                  opacity: 0.8;
                }
                .el-progress-bar__innerText{
                  color: #fff!important;
                  text-shadow: 1px 1px 1px #000;
                  margin-top: -3px;
                }
              }
            }
        }              
      }
    }
    
  }  
}

</style>
