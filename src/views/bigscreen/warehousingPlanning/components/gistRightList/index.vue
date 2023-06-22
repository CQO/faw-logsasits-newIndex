<template>
    <div class="materialList">
        <div class="">
            <div class="headTitle">
                <div class="headData" v-for="item in headData">
                    <div
                        class=""
                        style="text-align: center; margin-left: 2px; font-size: 16px;"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <div class="contMain">
                <div class="" v-for="(item,index) in contData" :key="index"
                     @click="getProvince(item.whpositionProvince)">
                    <div class="contData">
                        <div class="contDataItem">{{ item.whpositionProvince }}</div>
                        <div class="contDataItem" style="color: #01ffff;">
                            {{Number(item.nowNumber).toLocaleString()}}
                        </div>
                        <div class="contDataItem" style="color: rgba(255, 255, 255, 0.7);">{{item.zzs}}</div>
                        <div class="contDataItem">{{item.cks}}</div>
                        <div
                            class="contDataItem"
                            style="margin-right: -15px;"
                        >
                            {{ Number(item.num).toLocaleString() }}
                        </div>
                        <div class="contDataItem" style="padding-left: 23px; color: #ff3535;">
                            {{Number(item.qk).toLocaleString()}}
                        </div>
                        <div class="contDataItem" style="margin-left: 25px;">
                            <div
                                :class="item.kcnlqk =='正常' ? 'normalType' : item.kcnlqk =='富裕' ? 'richType' : 'poolType'">
                                {{item.kcnlqk}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="" style="position: absolute; left: 50px; bottom: 10px; text-align: center; width: 100%;">
                <el-pagination
                    small
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="20"
                    layout="prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {getProvinceList} from '@/api/modules/wareHousePlan'

    export default {
        data() {
            return {
                total: 0,
                headData: [
                    {name: "区域"},
                    {name: "实时库存(件)"},
                    {name: "库存周转次数"},
                    {name: "库房个数"},
                    {name: "最大可存放量"},
                    {name: "库存能力缺口"},
                    {name: "库存能力情况"}
                ],
                contData: [],
                interval: null,
                currentPage3: 0,
                queryParams: {
                    page: 1,
                    pageSize: 10
                }
            };
        },
        created() {
            this.getData()
            this.interval = setInterval(() => this.getData(), 10000)
        },
        destroyed() {
            this.clearInter()
        },
        methods: {
            getProvince(province) {
                this.$emit('get-province', province)
            },
            handleSizeChange() {
            },
            handleCurrentChange(val) {
                this.queryParams.page = val
                this.getData()
            },
            getData() {
                getProvinceList(this.queryParams).then(res => {
                    this.contData = res.pd.rows
                    this.total = res.pd.total
                })
            },
            clearInter() {
                if (this.interval) {
                    clearInterval(this.interval)
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .materialList {
        margin: 40px 35px;
        position: relative;
        height: 90%;
    }
    .headTitle {
        display: flex;
        height: 50px;
        line-height: 50px;
        background: #054480;
        //background: #27cbff;
        color: aqua;
    }
    .headData {
        width: 100%;
        margin: 0 auto;
    }
    .contMain {
        color: #fff;
        height: 100%;
        line-height: 40px;
        margin-top: 10px;
    }
    .contData {
        display: flex;
        //padding: 0 5px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #094185;
        margin-top: 5px;
        height: 45px;
        line-height: 45px;
        font-size: 14px !important;
    }
    .contData:hover {
        border: 1px solid #01ffff;
        box-shadow: 0 0 15px #386fcf inset;
    }
    .intel {
        margin-left: -35px;
        color: rgba(255, 255, 255, 0.7);
    }
    .contDataItem {
        width: 162px;
        text-align: center;
        padding: 0 5px;
    }
    .normalType {
        margin: 10px 20px;
        line-height: 20px;
        width: 50%;
        height: 50%;
        background-image: linear-gradient(to bottom, #00b8c1, #0056b9);
        border-radius: 4px;
    }
    .richType {
        margin: 10px 20px;
        line-height: 20px;
        width: 50%;
        height: 50%;
        background-image: linear-gradient(to bottom, #04b168, #049595);
        border-radius: 4px;
    }
    .poolType {
        margin: 10px 20px;
        line-height: 20px;
        width: 50%;
        height: 50%;
        background-image: linear-gradient(to bottom, #d33f3f, #ac2727);
        border-radius: 4px;
    }
</style>
