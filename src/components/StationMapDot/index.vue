<template>
    <bm-overlay
        ref="customOverlay"
        :class="{sample: true}"
        :style="pointColor"
        pane="labelPane"
        @draw="draw"
    >
        <div class="title-wrap"><span>{{ content.stationName }}</span><div class="join-btn" @click="$router.push({ name: 'station', params: { stationId: content.stationId } })">进入</div></div>
        <div class="field"><span class="field-name">负责人: </span><span>{{ content.director || '-' }}</span></div>
        <div class="field"><span class="field-name">电话: </span><span>{{ content.phone || '-' }}</span></div>
        <div class="field"><span class="field-name">地址: </span><span>{{ content.addr || '-' }}</span></div>
    </bm-overlay>
</template>

<script>
import { BmOverlay } from 'vue-baidu-map'
export default { // 用来接受传入的值，用来定制样式
    name: 'StationBMapDot',
    components: {
        BmOverlay
    },
    props: [ 'content', 'position', 'color' ],
    data() {
        return {
            pointColor: ''
        }
    },
    watch: {
        position: {
            handler() {
                this.$refs.customOverlay.reload()  // 当位置发生变化时，重新渲染，内部会调用draw
            },
            deep: true
        }
    },
    mounted() {
        this.pointColor = this.color // 这里我是用来获取传入的值来定义样式的，可能有点多余了，pointColor是组件中绑定的样式，color是传进来的样式。【这样就可以根据传入的样式来显示不同样子的点了】
    },
    methods: {
        // 这是百度地图的重绘函数,用于维持覆盖物的位置（这里的值貌似会影响拖拉时的偏移度）
        draw({ el, BMap, map }) {
            const { lng, lat } = this.position
            const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
            el.style.left = pixel.x - 250 + 'px'
            el.style.top = pixel.y - 140 + 'px'
        }
    }
}
</script>

<style lang="scss" scoped>
.sample {
    width: 220px;
    // height: 40px;
    line-height: 22px;
    overflow: hidden;
    box-shadow: 0 0 5px #16768c;
    text-align: left;
    position: absolute;
    background: rgb(13 50 77 / 82%) !important;
    padding: 10px !important;
    border: 1px solid #16768c !important;
    border-radius: 4px !important;
    color: #f6f9fa !important;
    font-size: 14px !important;
    // span {
    //     font-size: 14px;
    //     font-weight: bold;
    //     word-break: break-all;
    //     word-wrap: break-word;
    // }
    // .field {
    // font-size: 12px !important;
    // span {
    //     font-size: 12px !important;
    //     font-weight: bold;
    //     word-break: break-all;
    //     word-wrap: break-word;
    // }
    // }
    .field-name {
        text-align: justify;
        text-justify: inter-ideograph;
        width: 54px;
        display: inline-block;
    }
    .title-wrap {
        margin-bottom: 10px;
        font-size: 16px;
        &::before {
            content: ' ';
            display: inline-block;
            width: 3px;
            height: 15px;
            background: #01b2be;
            margin-right: 10px;
            vertical-align: middle;
            position: relative;
            top: -2px;
        }
        .join-btn {
            position: absolute;
            top: 8px;
            right: 10px;
            display: inline-block;
            padding: 2px 12px;
            border-radius: 14px;
            background: linear-gradient(90deg, #2b99ff 0%, #6880fa 100%);
            font-size: 12px;
        }
    }
}
.sample.active {
    background: rgb(15 84 156 / 90%) !important;
    color: #fff;
}
</style>
