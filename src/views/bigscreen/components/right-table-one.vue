<template>
    <div class="right-table-one-component">
        <div class="table">
            <div class="row">
                <div class="col"></div>
                <div class="col">时长（h）</div>
                <div class="col">出库件数</div>
                <div class="col">出库累计占比(%)</div>
            </div>
            <div class="row" v-for="(row, index) in table.list" :key="index">
                <div class="col"><img src="/images/visualise/table-row-car-icon.png" ></div>
                <div class="col">{{ row.duration }}</div>
                <div class="col">{{ row.num }}</div>
                <div class="col">{{ row.rate || 0 }}%</div>
            </div>
        </div>
    </div>
</template>

<script>
import HomeAPI from '@/api/modules/home'
export default {
    name: "RightTableOneComponent",
    data() {
        return {
            table: {
                list: []
            }
        };
    },
    mounted() {
        this.fetchDatas();
        this.$eventBus.$on('right-chart-one-refresh', () => {
            this.fetchDatas()
        })
    },
    beforeDestroy() {
        this.$eventBus.$off('right-chart-one-refresh')
    },
    methods: {
        fetchDatas() {
            HomeAPI.fetchRightOrderExWarehouseDuration({}).then(res => {
                this.table.list = res.data.slice(0, 4);
            }).catch((e) => {
                this.table.list = [];
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.right-table-one-component {
    z-index: 1;
    height: 100%;
    width: 100%;
    color: #fffbfb;
    font-size: 10px;
    position: relative;
    right: 35px;
    padding-top: 6px;
    .table {
        text-align: center;
        .row {
            background: url('/images/visualise/table-row.png') top center no-repeat;
            background-size: 100%;
            height: 29px;
            line-height: 29px;
            display: flex;
            margin-top: 6px;
            position: relative;
            width: 90%;
            .col {
                flex: 1;
                img {
                    width: 15px;
                    vertical-align: middle;
                }
                &:nth-child(1) {
                    width: 40px;
                    flex: initial;
                }
                &:nth-child(2) {
                    width: 70px;
                    flex: initial;
                }
                &:nth-child(3) {
                    width: 80px;
                    flex: initial;
                }
            }
            &:nth-child(1) {
                background: initial;
                margin-top: 0;
                left: 24px;
            }
            &:nth-child(2) {
                left: 20px;
            }
            &:nth-child(3) {
                left: 35px;
            }
            &:nth-child(4) {
                left: 50px;
            }
            &:nth-child(5) {
                left: 65px;
            }
        }
    }
}
</style>
