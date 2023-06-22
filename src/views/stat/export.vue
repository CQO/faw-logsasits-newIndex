<template>
    <div class="fcst-prebuild-page">

        <page-main style="margin: 0;" title="统计导出">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('交付及时率', 'TIMELY_DELIVERY_RATE')">导出 - 交付及时率</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('出库及时率', 'OUT_STORE_RATE')">导出 - 出库及时率</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('城市订单区域排名', 'CITY_RANK_AREA')">导出 - 城市订单区域排名</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('上月移库订单', 'LAST_MONTH_TANSFER_LIBRARY')">导出 - 上月移库订单</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('订单出库时长分布', 'ORDER_EX_WAREHOUSE_DURATION')">导出 - 订单出库时长分布</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('上月库存周转', 'STOCK_TURNOVER_DAY_NUM')">导出 - 上月库存周转</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('滞销率', 'UNSALABLE')">导出 - 滞销率</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('当日累计出库', 'CURR_DAY_SUM_OUT_STORE')">导出 - 当日累计出库</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('当日紧急订单出库', 'CURR_DAY_SUM_OUT_STORE_BY_JJ')">导出 - 当日紧急订单出库</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('当前库存', 'CURR_STOCK')">导出 - 当前库存</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('库存平效', 'STAT_STOCK_FLAT_EFFECT')">导出 - 库存平效</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('采购入库时限', 'PURCHASE_INSTORE_QTY_TREND')">导出 - 采购入库时限</el-button>
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('入库时长分布_当日累计入库', 'IN_STORE_TIME_DISTRIBUTION')">导出 - 入库时长分布/当日累计入库</el-button>
            </div>
        </page-main>







        <!-- <page-main style="margin: 0;" title="交付及时率">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('交付及时率', 'TIMELY_DELIVERY_RATE')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="出库及时率">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('出库及时率', 'OUT_STORE_RATE')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="城市订单区域排名">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('城市订单区域排名', 'CITY_RANK_AREA')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="上月移库订单">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('上月移库订单', 'LAST_MONTH_TANSFER_LIBRARY')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="订单出库时长分布">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('订单出库时长分布', 'ORDER_EX_WAREHOUSE_DURATION')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="上月库存周转">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('上月库存周转', 'STOCK_TURNOVER_DAY_NUM')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="滞销率">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('滞销率', 'UNSALABLE')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="当日累计出库">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('当日累计出库', 'CURR_DAY_SUM_OUT_STORE')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="当日紧急订单出库">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('当日紧急订单出库', 'CURR_DAY_SUM_OUT_STORE_BY_JJ')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="当前库存">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('当前库存', 'CURR_STOCK')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="库存平效">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('库存平效', 'STAT_STOCK_FLAT_EFFECT')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="采购入库时限">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('采购入库时限', 'PURCHASE_INSTORE_QTY_TREND')">导出</el-button>
            </div>
        </page-main>

        <page-main style="margin: 0; margin-top: 20px;" title="入库时长分布 / 当日累计入库">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="handleExportTable('入库时长分布_当日累计入库', 'IN_STORE_TIME_DISTRIBUTION')">导出</el-button>
            </div>
        </page-main> -->
    </div>
</template>

<script>
import { exportFile } from '@/util/export.file'

export default {
    data() {
        return {
            fullLoading: undefined
        }
    },
    mounted() {
    },
    methods: {
        handleExportTable(title, tableName) {
            this.fullLoading = this.$loading({
                lock: true,
                text: '导出中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let _fields = [];
            if (tableName === 'aps_rpt_po_tracking') {
            } else if (tableName === 'aps_rpt_so_tracking') {
            }
            let time = this.$dayjs().format('YYYYMMDDHHmmss');
            exportFile('/export/exec', `${title}-${time}.xlsx`, 'POST', {
                busiName: tableName,
            }, () => {
                if (this.fullLoading) {
                    setTimeout(() => {
                        this.fullLoading.close();
                    }, 1000)
                }
            }, () => {
                if (this.fullLoading) {
                    setTimeout(() => {
                        this.fullLoading.close();
                    }, 1000)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.el-button {
    margin-left: 0;
    margin-right: 0.625rem;
    margin-bottom: 10px;
}
</style>

