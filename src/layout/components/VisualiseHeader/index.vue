<template>
<div></div>
    <!-- <div class="visualise-header-container"> -->
        <!-- <div class="logo">
            <img src="/images/visualise/faw-icon.png" class="icon-faw">
            <img src="/images/visualise/faw-jd-wl-icon.png" class="icon-jd-wl">
        </div> -->
        <!-- <div class="title">
            备品中心库数字化指挥中心
        </div> -->
        <!-- <div class="operate-wrap">
            <div class="item item-btn">
                <img src="/images/common/icon-home.png">
                <span>返回首页</span>
            </div>
            <div class="item item-btn logout">
                <img src="/images/common/icon-logout.png">
                <span>退出系统</span>
            </div>
        </div> -->
    <!-- </div> -->
</template>

<script>

export default {
    name: 'VisualiseHeader',
    data() {
        return {
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        // this.$refs['tabs'].addEventListener('DOMMouseScroll', this.handlerMouserScroll, false)
        // this.$refs['tabs'].addEventListener('mousewheel', this.handlerMouserScroll, false)
    },
    beforeDestroy() {
        // this.$refs['tabs'].removeEventListener('DOMMouseScroll', this.handlerMouserScroll)
        // this.$refs['tabs'].removeEventListener('mousewheel', this.handlerMouserScroll)
    },
    methods: {
        handlerMouserScroll(event) {
            let detail = event.wheelDelta || event.detail
            let moveForwardStep = -1
            let moveBackStep = 1
            let step = 0
            step = detail > 0 ? moveForwardStep * 50 : moveBackStep * 50
            this.$refs['tabs'].scrollBy({
                left: step
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.visualise-header-container {
    height: 86px;
    background: url('/images/visualise/web-header-bg.png') top center no-repeat;
    background-size: 1300px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // background-size: auto 100%;
    .logo {
        position: absolute;
        left: 40px;
        top: 30px;
        .icon-faw {
            width: 120px;
            vertical-align: middle;
        }
        .icon-jd-wl {
            width: 90px;
            vertical-align: middle;
            margin-left: 20px;
        }
    }
    .title {
        text-align: center;
        padding-top: 25px;
        font-size: 30px;
        color: white;
        font-weight: bold;
        text-shadow:
            0 0 10px #02a1d8,
            0 0 20px  #02a1d8,
            0 0 30px  #02a1d8,
            0 0 40px  #02a1d8,
            0 0 70px  #02a1d8,
            0 0 80px  #02a1d8,
            0 0 100px #02a1d8,
            0 0 150px #02a1d8;
    }
    .operate-wrap {
        padding: 10px 40px;
        display: flex;
        flex-direction: row;
        position: relative;
        top: -20px;
        .item {
            flex: 1;
            cursor: pointer;
        }
        .item-btn {
            color: #58bcec;
            img {
                vertical-align: bottom;
            }
            span {
                margin-left: 8px;
            }
            &.logout {
                text-align: right;
                span {
                    position: relative;
                    top: -2px;
                }
            }
        }
    }
}
</style>
