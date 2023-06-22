<template>
    <div style="margin: 2px 30px;">
        <div class="toptitle">
            <div
                  class=""
                  style="margin-left: 1px; flex: 1; display: flex;"
                >
                  <!-- {{ item.name }} -->
                  <div class="titleItem">年份</div>
                  <div class="titleItem">月份</div>
                  <div class="titleItem">物流企业</div>
                  <div class="titleItem">任务总量(件)</div>
                  <div class="titleItem">时效(小时)</div>
                  <div class="titleItem">准点率</div>
                  <div class="titleItem">物流经费(元)</div>
                  <div class="titleItem">任务量得分</div>
                  <div class="titleItem">时效率得分</div>
                  <div class="titleItem">物流经费得分</div>
                  <div class="titleItem">满意度得分</div>
                  <div class="titleItem">综合得分</div>
                </div>
        </div>
        <div class="bottomData">
            <div :style="{top: tableTop + 'px'}" class="contInner">
                <div v-for="(item,index) in tableList" :key="index">
                    <div class="contData" @mouseover="onHover" @mouseout="onLeave">
                  <div class="dataitem">{{ item.year }}</div>
                  <div class="dataitem">{{ item.month }}</div>
                  <div class="dataitem">{{ item.name }}</div>
                  <div class="dataitem">{{ item.total }}</div>
                  <div class="dataitem">{{ item.hour }}</div>
                  <div class="dataitem">{{ item.zdl }}</div>
                  <div class="dataitem">{{ item.fee }}</div>
                  <div class="dataitem">{{ item.rwf }}</div>
                  <div class="dataitem">{{ item.zdl }}</div>
                  <div class="dataitem">{{ item.feef }}</div>
                  <div class="dataitem">{{ item.myd }}</div>
                  <div class="dataitem">{{ item.zhf }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import getZhpjDataApi from '@/api/modules/zhpj'
    export default {
        props: {
            serachData: {
                type: Array,
                default: false
            }
        },
        data() {
            return {
                headData: [{name: "设备名称"}, {name: "库房编号"}, {name: "正常(个)"}, {name: '异常数(个)'}],
                //第一页数据
                tableList: [],
                tableTop: 0,
                tableTimer: null,
                count: 0
            };
        },
        watch:{
            'serachData'(value){
                this.tableList=value
    }
  },
        mounted() {
            this.getData()
        },
        created() {
        },
        destroyed() {
            clearInterval(this.tableTimer)
        },
        methods: {
            getData() {
                // let params={
                //     m:{
                //         year:this.serachData.nedYear,
                //         month:this.serachData.currentMonth
                //     }
                // }
                // getZhpjDataApi.getZhpjTableData(params).then(res=>{
                //     this.tableList=res.list
                // console.log(this.tableList,'设备监控数据');
                // })
                // let list = []
                // for (let i = 0; i < 12; i++) {
                //     list.push({
                //         name: `监控设备${i + 1}`,
                //         id: `kf000${i + 1}`,
                //         num1: 100,
                //         num2: 5
                //     })
                // }
                // this.tableList = list
                this.tableActionFun()
            },
            tableActionFun() {
                this.tableListSize = this.tableList.length;
                if (this.tableListSize > 6) {
                    this.tableList = this.tableList.concat(this.tableList);
                    this.tableTimerFun();
                }
            },
            tableTimerFun() {
                this.count = 0;
                this.tableTimer = setInterval(() => {
                    if (this.count < (this.tableList.length / 2) * 15) {
                        this.tableTop -= 1;
                        this.count++;
                    } else {
                        this.count = 0;
                        this.tableTop = 0;
                    }
                }, 100);
            },
            onHover() {
                clearInterval(this.tableTimer)
            },
            onLeave() {
                this.tableTimerFun()
            }
        },
    };
</script>
<style scoped>
.headTitle {
    display: flex;
    height: 35px;
    line-height: 35px;
    background: #054480;
    justify-content: space-around;
    color: aqua;
}
.contMain {
    width: 100%;
    color: #fff;
    height: 190px;
    line-height: 30px;
    margin-top: 5px;
    font-size: 14px;
    position: relative;
    overflow: hidden;
}
.contInner {
    width: 100%;
    position: absolute;
    left: 0;
}
.contData {
    justify-content: space-between;
    display: flex;
    padding: 0 5px;
    height: 47px;
    line-height: 47px;
    background: rgba(39, 151, 255, 0.1);
    margin-top: 3px;
}
.zwnr {
    background: #094185;
    height: 130px;
    text-align: center;
    line-height: 120px;
    font-size: 16px;
}
.intel {
    width: 50%;
    text-align: center;
}
.one {
    height: 4px;
    background: #054480;
    width: 50px;
}
.showResult {
    height: 4px;
    width: 50px;
    background: #01ffff;
}
.toOne {
    width: 20%;
    margin-left: 40%;
    position: absolute;
    bottom: -20px;
    height: 1px;
    display: flex;
    text-align: center;
}
.toptitle {
    height: 47px;
    background: rgba(39, 151, 255, 0.2);
    border-radius: 0 0 0 0;
    opacity: 1;
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.titleItem {
    flex: 1;
    font-size: 16px;
    color: #01ffff;
    line-height: 47px;
    text-align: center;
}
.bottomData {
    width: 100%;
    color: #fff;
    height: 420px;
    line-height: 30px;
    margin-top: 5px;
    font-size: 14px;
    position: relative;
    overflow: hidden;
}
.contInner {
    width: 100%;
    position: absolute;
    left: 0;
}
.dataitem {
    width: 30%;
    flex: 1;
    height: 47px;
    line-height: 47px;
    font-size: 14px;
    color: #fff;
    text-align: center;
}
</style>
