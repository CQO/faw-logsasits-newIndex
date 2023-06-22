<template>
    <el-dialog width="995px" :visible.sync="visible" :modal-append-to-body="false" :show-close="false" :close-on-click-modal="false" @close="close">
        <video id="tianlang-video" src="https://benteng.jdl.com/files/propaganda.mp4" controls="controls" style="width: 850px;" autoplay>
            您的浏览器不支持 video 标签。
        </video>
        <!-- <video src="https://benteng.jdl.cn/files/propaganda.mp4" -->
        <div slot="footer">
            <img :src="`/images/visualise/common-dialog-close-btn${hover === 'in' ? '-actived' : ''}.png`" class="close-btn" @click="close" @mouseover="changeHover('in')" @mouseout="changeHover('out')" >
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'TianlangDialog',
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
            var tianlangVideo = document.getElementById("tianlang-video");
            if (tianlangVideo && tianlangVideo.paused) {
                tianlangVideo.play();
            }
            this.visible = true
        },
        close() {
            var tianlangVideo = document.getElementById("tianlang-video");
            if (tianlangVideo) {
                tianlangVideo.pause();
            }
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
    padding-top: 10px;
    padding-bottom: 15px;
    padding-left: 35px;
    text-align: center;
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
