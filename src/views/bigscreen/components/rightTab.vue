<template>
    <div class="">
        <div class="hedContainer">
            <div class="hedTit">
                <div class="cmon" style="width: 60%;">凭证号</div>
                <div class="cmon" style="">数量(个)</div>
            </div>
            <div class="" style="height: 560px;">
                <div class="" v-if="list.length != 0" :style="{top: tableTop + 'px'}">
                    <div class="contTit" v-for="(item, index) in list" :key="index">
                        <div class="" style="width: 100%; display: flex;" @mouseover="onHover" @mouseout="onLeave">
                            <div class="cmon" style="color: #27cbff; width: 60%;">{{item.credential}}</div>
                            <div class="cmon" style="">{{item.num}}</div>
                        </div>
                    </div>
                </div>
                <div class="" v-else
                     style="color: rgba(255, 255, 255, 0.5); font-size: 21px; text-align: center; line-height: 560px;">
                    暂无内容
                </div>
            </div>
            <div
                class=""
                style="margin-top: 10px; margin-bottom: 40px; margin-right: 20px;"
            >
                <el-pagination
                    small
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="20"
                    layout="prev, pager, next, jumper"
                    :total="100"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import mapGuide from "@/api/modules/mapGuide";

    export default {
        data() {
            return {
                currentPage3: 1,
                list: [
                    {
                        credential:'PZ0101222',
                        num:'50'
                    },{
                        credential:'PZ0101452',
                        num:'20'
                    },
                    {
                        credential:'PZ0101236',
                        num:'22'
                    },
                    {
                        credential:'PZ0101896',
                        num:'64'
                    },
                    {
                        credential:'PZ0023236',
                        num:'87'
                    }
                    ,{
                        credential:'PZ0268530',
                        num:'42'
                    },
                    {
                        credential:'PZ0105236',
                        num:'62'
                    }
                ],
                interval: null,
                tableTop: 0,
                tableTimer: null,
                count: 0
            };
        },
        props: {
            name: {
                type: String,
            },
            type: {
                type: String,
            },
        },
        watch: {
            name(value) {
                if (value) {
                    const params = {m: {}};
                    params.m[this.type === "Theater" ? "area" : "sf"] = value;
                    this.clearInter()
                    this.getData(params)
                    this.interval = setInterval(() => this.getData(params), 10000)
                }
            },
        },
        destroyed() {
            this.clearInter()
        },
        methods: {
            clearInter() {
                if (this.interval) {
                    clearInterval(this.interval)
                }
            },
            // getData(params) {
            //     mapGuide[`get${this.type}List`](params).then((res) => {
            //         this.list = res.list;
            //     this.tableActionFun()
            //     });
            // },
            tableActionFun() {
                this.tableListSize = this.list.length;
                if (this.tableListSize > 6) {
                    this.list = this.list.concat(this.list);
                    this.tableTimerFun();
                }
            },
            tableTimerFun() {
                this.count = 0;
                this.tableTimer = setInterval(() => {
                    if (this.count < (this.list.length / 2) * 15) {
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
            },
            handleSizeChange() {
            },
            handleCurrentChange() {
            },
        },
    };
</script>
<style scoped>
    .hedContainer {
        display: flex;
        flex-direction: column;
    }
    .hedTit {
        margin-top: 10px;
        margin-left: 30px;
        margin-right: 30px;
        display: flex;
        height: 50px;
        background: rgba(255, 255, 255, 0.1);
        justify-content: space-around;
        line-height: 50px;
        margin-left: 25px;
        color: #01ffff;
    }
    .contTit {
        margin-top: 5px;
        margin-left: 25px;
        margin-right: 30px;
        display: flex;
        background: rgba(255, 255, 255, 0.1);
        justify-content: space-around;
        line-height: 50px;
        color: #fff;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        color: #01ffff !important;
    }
    .cmon {
        width: 50%;
        flex: 1;
        margin-left: 1px;
        text-align: center;
    }
</style>
