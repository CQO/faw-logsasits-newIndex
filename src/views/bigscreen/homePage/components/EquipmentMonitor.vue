<template>
    <div style="margin: 2px 30px;">
        <div class="headTitle">
            <div class="headData" v-for="item in headData">
                <div>{{ item.name }}</div>
            </div>
        </div>
        <div class="contMain">
            <div :style="{top: tableTop + 'px'}" class="contInner">
                <div v-for="(item,index) in tableList" :key="index">
                    <div class="contData" @mouseover="onHover" @mouseout="onLeave">
                        <div class="intel">{{item.equipmentType}}</div>
                        <div class="intel">{{item.baseCode}}</div>
                        <div class="intel" style="color: #3dd0ff;">{{item.num}}</div>
                        <div class="intel" style="color: #ff3535;">{{item.exNum}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import getPlanMonitorDataApi from '@/api/modules/homePage'
    export default {
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
        mounted() {
            this.getData()
        },
        destroyed() {
            clearInterval(this.tableTimer)
        },
        methods: {
            getData() {
                getPlanMonitorDataApi.getSbjkData({}).then(res=>{
                    this.tableList=res.list
                console.log(this.tableList,'设备监控数据');
                })
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
        height: 25px;
        line-height: 25px;
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
        width: 25%;
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
    .headData {
        width: 25%;
        text-align: center;
    }
</style>
