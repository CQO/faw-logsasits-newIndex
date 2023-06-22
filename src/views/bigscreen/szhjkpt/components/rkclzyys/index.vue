<template>
    <div style="margin: 2px 30px;">
        <div class="headTitle">
            <div class="headData">
                <!-- <div>{{ item.name }}</div> -->
                <div class="headItem">车号</div>
                <div class="headItem">作业用时</div>
            </div>
        </div>
        <div class="contMain">
            <div class="contInner" :style="{top: tableTop + 'px'}">
                <div v-for="(item,index) in tableList" :key="index">
                    <div class="contData" @mouseover="onHover" @mouseout="onLeave">
                        <div class="intel contentOver" :title="item.material">{{item.name}}</div>
                        <div class="intel">{{item.num}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getAreaList} from '@/api/modules/demandAnalysis'

    export default {
        props: {
            propNameer: {
                type: String
            }
        },
        data() {
            return {
                getXqfbList:[],
                headData: [{name: "需求品类"}, {name: "需求数量(万件)"}],
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
        created(){

        },
        watch:{
            'propNameer'(value){
                const params = value ? {m: {value}} : ''
                getAreaList(params).then(res=>{
                    this.getXqfbList=res.list
                })
            }
        },
        methods: {
            getData() {
                let list = []
                for (let i = 0; i < 12; i++) {
                    list.push({
                        name: `车号${i + 1}`,
                        num: 1000,
                    })
                }
                this.tableList = list
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
<style scoped lang="scss">
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
    .contentOver {
        width: 50%;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .headData {
        display: flex;
        width: 100%;
        &:div {
            width: 50%;
        }
    }
    .headItem {
        width: 50%;
        text-align: center;
    }
</style>
