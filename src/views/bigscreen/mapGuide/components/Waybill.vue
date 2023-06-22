<template>
    <div class="">
        <div class="hedContainer">
            <div class="hedTit">
                <div class="cmon" style="width: 60%;">运单号</div>
                <div class="cmon" style="">数量(个)</div>
            </div>
            <div class="">
                <div class="" v-if="list.length != 0">
                    <div class="contTit"
                         v-for="(item, index) in list"
                         :key="index"
                         @click="getWaybillItem(item.ydh)">
                        <div class="cmon" style="color: #27cbff; width: 60%;">{{item.ydh}}</div>
                        <div class="cmon" style="margin-right: 15px !important;">{{item.num}}</div>
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
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :total="total"
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
                form:{page:1,
                pageSize:8},
                currentPage: 1,
                list: [],
                total:0,
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
        mounted() {
            this.getWaybillList()
        },
        methods: {
            getWaybillList(waybillNo) {
                const params = {
                    m: {waybillNo},
                    page: this.form.page,
                    pageSize: this.form.pageSize
                }
                mapGuide.getWaybillList(params).then(res => {
                    this.list = res.pd.rows
                    this.total=res.pd.total
                })
            },
            getWaybillItem(waybillNo) {
                this.$emit('get-waybill', waybillNo)
            },
            handleSizeChange(val) {
                this.form.pageSize=val
    this.getWaybillList()
            },
            handleCurrentChange(val) {
                this.form.page=val
                this.getWaybillList()
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
        margin-top: 20px;
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
        text-align: center;
    }
</style>
