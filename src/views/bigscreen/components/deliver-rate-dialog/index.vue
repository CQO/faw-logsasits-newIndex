<template>
    <el-dialog width="995px" :visible.sync="visible" :modal-append-to-body="false" :append-to-body="true" :show-close="false" :close-on-click-modal="false" @close="close">
        <div>
            <div>
                <div class="title">月度交付及时率</div>
                <ChartOneComponent style="height: 200px; width: 100%;" />
            </div>
        </div>
        <div class="row-two">
            <div class="row-item">
                <div class="title">周交付及时率</div>
                <ChartTwoComponent style="height: 200px; width: 100%;" />
            </div>
            <div class="row-item">
                <div class="title">近7天交付及时率</div>
                <ChartThreeComponent style="height: 200px; width: 100%;" />
            </div>
        </div>
        <div slot="footer">
            <img :src="`/images/visualise/common-dialog-close-btn${hover === 'in' ? '-actived' : ''}.png`" class="close-btn" @click="close" @mouseover="changeHover('in')" @mouseout="changeHover('out')" >
        </div>
    </el-dialog>
</template>

<script>
import ChartOneComponent from './chart-one'
import ChartTwoComponent from './chart-two'
import ChartThreeComponent from './chart-three'
export default {
    components: {
        ChartOneComponent, ChartTwoComponent, ChartThreeComponent
    },
    data() {
        return {
            visible: false,
            loading: false,
            hover: 'out'
        }
    },
    mounted() {
    },
    methods: {
        async show() {
            this.visible = true
        },
        close() {
            this.visible = false
        },
        changeHover(type) {
            this.hover = type;
        }
    }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
    background: transparent;
    background: url('/images/visualise/common-dialog-bg.png') top center no-repeat;
    background-size: 100% 100%;
    height: 698px;
}
::v-deep .el-dialog__body {
    // padding-top: 15px;
    // padding-bottom: 15px;
    padding: 40px 90px;
    // text-align: center;
    .title {
        color: #fefefe;
        padding-left: 14px;
        position: relative;
        font-size: 17px;
        &::before {
            content: ' ';
            position: absolute;
            top: 4px;
            left: 0;
            display: inline-block;
            height: 15px;
            width: 3px;
            background: #138fd3;
            border-radius: 2px;
            vertical-align: middle;
        }
    }
    .row-two {
        display: flex;
        .row-item {
            flex: 1;
        }
    }
    img {
        width: 868px;
        margin: 0 auto;
        position: relative;
        left: 7px;
        top: 3px;
        border-radius: 4px;
    }
}
::v-deep .el-dialog__footer {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    overflow: hidden;
    img {
        cursor: pointer;
    }
}
::v-deep .el-transfer-panel {
    width: 217px;
}
</style>
