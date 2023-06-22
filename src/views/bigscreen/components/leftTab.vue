<template>
    <div class="">
        <div class="hedContainer">
            <div class="maincont" style="">
                <div class="hedTit">
                    <div class="mcon">类型</div>
                    <div class="mcon">数量(个)</div>
                </div>
                <div class="botct">
                    <div class="contTit" v-for="(item,index) in theaterTypeData" :key="index">
                        <div class="mcon" style="color: #27cbff;" @click="showDialog">
                            {{ item.equipmentType }}
                        </div>
                        <div class="mcon" style="color: #fff;">{{ item.num }}</div>
                    </div>
                </div>
                <!-- <div class="" style="margin-top: 0; width: 50%; margin-bottom: 10px;">
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
                        </div> -->
            </div>
        </div>
    </div>
</template>
<script>
    import bigScreenAPI from '@/api/modules/deploymentofForce'

    export default {
        name: 'leftTab',
        props: {
            warZone: {
                type: String,
            },
        },
        data() {
            return {
                needZoneName: '',
                theaterTypeData: []
            };
        },
        watch: {
            'warZone'(value) {
                console.log(value, 'value--------------');
                if (value) {
                    this.needZoneName = value
                    this.getListData()
                }
            },
        },
        created() {

        },
        methods: {
            showDialog() {
                alert(6666);
            },
            getListData() {
                let params = {
                    m: {area: this.needZoneName},
                    page: 1,
                    pageSize: 5
                }
                bigScreenAPI.getTheaterType(params).then((res) => {
                    this.theaterTypeData = res.pd.rows
                });
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
        margin-top: 50px;
        margin-left: 30px;
        width: 350px;
        display: flex;
        height: 50px;
        background: rgba(255, 255, 255, 0.1);
        justify-content: space-around;
        line-height: 50px;
        margin-left: 25px;
        color: #01ffff;
        position: sticky;
    }
    .contTit {
        width: 350px;
        margin-top: 5px;
        margin-left: 25px;
        display: flex;
        background: rgba(255, 255, 255, 0.1);
        justify-content: space-around;
        line-height: 50px;
        color: #01ffff;
    }
    .botct {
        overflow: auto;
        height: 350px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        color: #01ffff !important;
    }
    .maincont {
        margin-bottom: 20px;
    }
    .mcon {
        width: 50%;
        text-align: center;
    }
</style>
