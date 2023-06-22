<template>
    <div class="header-container">
        <!-- <div class="title"> -->
        <!-- <img src="/images/common/header-title.png"> -->
        <!-- 东投智慧研学平台 -->
        <!-- </div> -->
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
    </div>
</template>

<script>

export default {
    name: 'Header',
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
.header-container {
    height: 100px;
    background: url('/images/common/header-bg.png') top center no-repeat;
    background-size: 1500px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // background-size: auto 100%;
    .title {
        text-align: center;
        padding-top: 15px;
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
