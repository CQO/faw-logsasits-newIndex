<template>
    <div class="map-bg">
        <div id="map" ref="map"></div>
        <img src="../../../assets/image/content/teSlice.png" style="position: absolute; bottom: 380px; right: 530px;"
             alt="">
    </div>
</template>

<script>
    import "ol/css"
    import Map from "ol/Map";
    import View from "ol/View";
    import TileLayer from "ol/layer/Tile";
    import {TileSuperMapRest, Logo} from "@supermap/iclient-ol";
    import {defaults as defaultControls} from "ol/control"
    import EChartsLayer from 'ol-echarts'
    import carIcon from '@/assets/images/icon_car.png'
    import carRightIcon from '@/assets/images/icon_car_right.svg'
    import plane from '@/assets/images/icon_plane.png'
    import mapGuide from "@/api/modules/mapGuide";
    import flag from '@/assets/map/flag3.png'


    export default {
        name: 'guideZoneMap',
        components: {},
        data() {
            return {
                map: null,
                echartslayer: null,
                interval: null,
                direction: 'right',
            }
        },
        mounted() {
            this.initMap();
            this.getData()
        },
        destroyed() {
            this.clearInter()
        },
        methods: {
            clearInter() {
                if (this.interval) {
                    clearInterval(this.interval)
                }
            },
            getWaybill(params){
                mapGuide.getWaybillInTransit(params).then(res => {
                    const data = res.list
                    data.forEach(item => {
                        item.deliverPosition = item.deliverPosition.split(',').map(v => Number(v))
                        item.sendPosition = item.sendPosition.split(',').map(v => Number(v))
                    })
                    this.addEcharts(data)
                })
            },
            getData(waybillNo) {
                this.clearInter()
                const params = waybillNo ? {m: {waybillNo}} : ''
                this.getWaybill(params)
                this.interval = setInterval(() => this.getWaybill(params), 10000)
            },
            addEcharts(data) {
                if (this.echartslayer) {
                    this.echartslayer.remove()
                    this.echartslayer = null
                }

                this.echartslayer = new EChartsLayer();
                this.echartslayer.appendTo(this.map);

                const echartsOption = this.initChart(data)
                this.echartslayer.setChartOptions(echartsOption);
            },
            initChart(data) {
                const that = this
                const convertData = data => {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        const item = data[i]
                        res.push({
                            ...item,
                            value: item.sendPosition
                        },/* {
                            ...item,
                            value: item.deliverPosition
                        }*/);
                    }
                    return res;
                };

                const convertData2 = data => {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        const item = data[i]
                        res.push({
                            ...item,
                            value: item.deliverPosition
                        },/* {
                            ...item,
                            value: item.deliverPosition
                        }*/);
                    }
                    return res;
                };

                const convertToLineData = data => {
                    let res = [];
                    res.push({
                        ...data,
                        fromName: data.sendCity,
                        toName: data.deliverCity,
                        coords: [data.sendPosition, data.deliverPosition],
                        value: data.value
                    });
                    return res;

                };



                let series = []


                // 其他配置
                const otherSeries = [
                    {
                        name: "",
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        data: convertData(data),
                        symbolSize: 10,
                        //这几个样式一定要加，加上才有那种光圈的效果
                        showEffectOn: "render",
                        rippleEffect: {
                            period: 4, //动画时间，值越小速度越快
                            brushType: "stroke", //波纹绘制方式 stroke, fill
                            scale: 7, //波纹圆环最大限制，值越大波纹越大
                        },
                        hoverAnimation: true,

                        label: {
                            formatter: "{b}",
                            position: "right",
                            show: false,
                            textStyle: {
                                color: "#0099FF",
                            },
                        },
                        //圆点的样式
                        itemStyle: {
                            color: "#56FFFF",
                        },
                        emphasis: {
                            label: {
                                show: true,
                            },
                        },
                        zlevel: 2
                    },
                    {
                        name: "",
                        type: "scatter",
                        coordinateSystem: "geo",
                        data: convertData2(data),
                        symbolSize: 20,
                        symbol: 'image://' + flag,
                        zlevel: 3
                    }
                ];

                data.forEach(item => {
                    otherSeries.push({
                            type: 'lines',
                            zlevel: 3,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0.7,
                                color: 'red',   //arrow箭头的颜色
                                symbolSize: 3
                            },
                            lineStyle: {
                                normal: {
                                    color: '#01FFFF',
                                    width: 0,
                                    curveness: 0.2
                                }
                            },
                            data: convertToLineData(item)
                        },
                        {
                            type: 'lines',
                            zlevel: 4,
                            symbol: ['none', 'arrow'],
                            symbolSize: 5,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0,
                                symbol: 'image://' + `${item.transportType === '汽运' ? item.deliverPosition[0] < item.sendPosition[0] ? carRightIcon : carIcon : plane}`,
                                symbolSize: 15
                            },
                            lineStyle: {
                                normal: {
                                    color: '#01FFFF',
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2
                                }
                            },
                            data: convertToLineData(item)
                        })
                })

                series = series.concat(otherSeries);

                let option = {
                    backgroundColor: "transparent",
                    tooltip: {
                        trigger: "item",
                        className: "tooltip-box",
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.0);',
                        position: function (point, params, dom, rect, size) {
                            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                            // 提示框位置
                            var x = 0; // x坐标位置
                            var y = 0; // y坐标位置

                            // 当前鼠标位置
                            var pointX = point[0];
                            var pointY = point[1];

                            // 外层div大小
                            // var viewWidth = size.viewSize[0];
                            // var viewHeight = size.viewSize[1];

                            // 提示框大小
                            var boxWidth = size.contentSize[0];
                            var boxHeight = size.contentSize[1];

                            // boxWidth > pointX 说明鼠标左边放不下提示框
                            if (pointX > boxWidth + 200) {
                                x = pointX - boxWidth;
                                that.direction = 'left'
                            } else {
                                x = pointX;
                                that.direction = 'right'
                            }

                            // boxHeight > pointY 说明鼠标上边放不下提示框
                            if (boxHeight > pointY) {
                                y = 5;
                            } else {
                                // 上边放得下
                                y = pointY - boxHeight;
                            }

                            return [x, y];
                        },
                        // position:['top'],
                        formatter: function (params) {
                            const data = params.data
                            const direction = that.direction
                            const htmlText = `<div class='tooltip-box-${direction}'>
                                <div class="item"><span><em>运单号：</em>${data.waybillNo}</span><span><em>运输方式：</em>${data.transportType}</span></div>
                                <div class="item"><span><em>寄件城市：</em>${data.sendCity}</span><span><em>派件城市：</em>${data.deliverCity}</span></div>
                                <div class="item"><span><em>包裹数量：</em>${data.packageCount}</span><span><em>包装体积(m³):</em>${data.packageVolume}</span></div>
                                <div class="item"><span><em>当前状态：</em>${data.waybillStatus}</span><span><em>预计完成时间：</em>${data.expectFinTime}</span></div>
                                <div class="item"><span><em>异常说明：</em>${data.exceptionReason}</span>
                            </div>`;
                            return htmlText;
                        },
                    },
                    series,
                };

                return option
            },
            initMap() {
                var url = window.globalConfig.againMap;
                var layer = new TileLayer({
                    source: new TileSuperMapRest({
                        url: url,
                        wrapX: true
                    }),
                    projection: 'EPSG:4326'
                });


                this.map = new Map({
                    target: 'map',
                    controls: defaultControls({
                        attributionOptions: {collapsed: false},
                        zoom: false
                    })
                        .extend([new Logo()]),
                    view: new View({
                        center: [104.26, 22.86],
                        // maxZoom: 18,
                        // minZoom: 2,
                        zoom: 4,
                        projection: 'EPSG:4326',
                    }),
                    layers: [layer]
                });

                // 设置鼠标经过点位变成小手形状
                const that = this
                this.map.on('click', function (e) {

                });

            }
        }
    }
</script>
<style lang='scss' scoped>
    #map {
        width: 100%;
        height: 100%;

        /* border: 1px solid red; */
        box-sizing: border-box;
        z-index: 2009;
    }
    .ol-popup {
        position: absolute;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
        filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
        padding: 15px;
        border-radius: 10px;
        border: none;
        bottom: 12px;
        left: -50px;
        min-width: 280px;
        background-image: url(../../../assets/map/popupBg.png);
        background-size: 100% 100%;
    }
    .ol-popup::after,
    .ol-popup::before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    .ol-popup::after {
        border-top-color: #00c2ff;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
    }
    .ol-popup::before {
        border-top-color: #00c2ff;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
    }
    .popupUl {
        display: flex;
        list-style: none;
        width: 466px;
        height: 219px;
        padding: 42px 10px 0 20px;
        flex-flow: wrap;
        margin: 0;
        justify-content: space-between;
    }
    .popupUl li {
        width: 49%;
        color: #fff;
    }
    .popupUl li:nth-last-child(1) {
        width: 100%;
    }
    .popupUl li span {
        color: rgba(255, 255, 255, 0.7);
    }
    .ol-attribution {
        display: none;
    }
    .map-bg {
        width: 100%;
        height: 100%;
        //background: url("../../../assets/images/map-bg.png");
        background-size: 100% 100%;
        position: absolute;
        z-index: 3090;
    }
    #map {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
    }
    ::v-deep .tooltip-box {
        padding: 0 !important;
        border: none !important;
        background-color: transparent !important;
        .tooltip-box-left,
        .tooltip-box-right {
            width: 600px;
            height: 335px;
            background-image: url("../../../assets/images/tooltip-bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            box-shadow: none;
            padding: 32px 23px 62px 110px;
            .item {
                width: 100%;
                display: flex;
                justify-content: space-between;
                &:not(:last-child) {
                    margin-bottom: 20px;
                }
                span {
                    font-size: 16px;
                    font-weight: 400;
                    color: #fff;
                    em {
                        font-style: normal;
                        color: rgba(255, 255, 255, 0.7);
                    }
                }
            }
        }
        .tooltip-box-left {
            background-image: url("../../../assets/images/tooltip-bgagin.png");
            padding: 42px 130px 62px 16px;
        }
    }
</style>
