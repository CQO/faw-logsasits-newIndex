<template>
    <div class="map-bg">
        <div id="map" ref="map"></div>
    </div>
</template>

<script>
    import "ol/css";
    import Map from "ol/Map";
    import View from "ol/View";
    import TileLayer from "ol/layer/Tile";
    import {Heatmap as HeatmapLayer} from "ol/layer";
    import {TileSuperMapRest, Logo} from "@supermap/iclient-ol";
    import {defaults as defaultControls} from "ol/control";
    import {defaults as defaultInteraction} from 'ol/interaction';
    import VectorSource from "ol/source/Vector";
    import Feature from "ol/Feature";
    import Point from "ol/geom/Point";
    import EChartsLayer from "ol-echarts";
    import {getHotMapData} from '@/api/modules/wareHousePlan'
    import GeoJSON from 'ol/format/GeoJSON'

    export default {
        name: "planMap",
        components: {},
        props: {
            pName: {
                type: String
            },
            type: {
                type: String
            }
        },
        data() {
            return {
                map: null,
                layer: null,
                echartslayer: null,
                interval: null
            };
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
            getData(province) {
                const params = province ? {m: {province}} : ''
                getHotMapData(params).then(res => {
                    const data = res.list
                    data.forEach(item => {
                        item.vectorPosition = item.vectorPosition.split(',').map(v => Number(v))
                    })
                    this.addHeatMap(data)
                    this.addEcharts(data)
                })
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
                const convertData = data => {
                    const res = [];
                    for (let i = 0; i < data.length; i++) {
                        const item = data[i]
                        res.push({
                            ...item,
                            value: item.vectorPosition
                        });
                    }
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
                        symbolSize: 5,
                        //这几个样式一定要加，加上才有那种光圈的效果
                        showEffectOn: "render",
                        rippleEffect: {
                            period: 4, //动画时间，值越小速度越快
                            brushType: "stroke", //波纹绘制方式 stroke, fill
                            scale: 5, //波纹圆环最大限制，值越大波纹越大
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
                    }
                ];
                series = otherSeries;
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
                            if (boxWidth > pointX) {
                                x = 5;
                            } else {
                                // 左边放的下
                                x = pointX;
                            }

                            // boxHeight > pointY 说明鼠标上边放不下提示框
                            if (boxHeight > pointY) {
                                y = pointY - boxHeight;
                            } else {
                                // 上边放得下
                                y = pointY - boxHeight;
                            }

                            return [x, y];
                        },
                        // position:['top'],
                        formatter: function (params) {
                            const data = params.data
                            let nums = 300000
                            let splitNum = Number(nums).toLocaleString()
                            const htmlText = `<div class='tooltip-box-style'>
                                <div class="item"><span><em>保障单位名称：</em>${data.name}</span><span><em>占地面积(m²)：</em>${data.floorArea}</span></div>
                                <div class="item"><span><em>库房面积(m²)：</em>${data.warehouseArea}</span><span><em>实时库存(件)：</em>${data.nowNumber}</span></div>
                                <div class="item"><span><em>仓储能力(件)：</em>${data.storage}</span><span><em>仓储能力缺口(件)：</em>${data.qk}</span></div>
                                <div class="item"><span><em>仓储能力情况(件)：</em>${data.kcnlqk}</span></div>
                            </div>`;
                            return htmlText;
                        },
                    },
                    series
                };
                return option
            },
            initMap() {
                // var url = "http://localhost:8090/iserver/services/map-ugcv5-llbsmaptile/rest/maps/llbs_maptile";
                var url = window.globalConfig.againMap;
                this.map = new Map({
                    target: "map",
                    controls: defaultControls({
                        attributionOptions: {collapsed: false},
                        zoom: false,
                    }).extend([new Logo()]),
                    //禁止地图缩放
                    interactions: defaultInteraction({
                        mouseWheelZoom: false,
                        doubleClickZoom: false,
                        shiftDragZoom: false,
                        dragPan: false,
                    }),
                    view: new View({
                        center: [102.06, 35.86],
                        // maxZoom: 18,
                        // minZoom: 2,
                        zoom: 4.4,
                        projection: "EPSG:4326",
                    }),
                });
                const layer = new TileLayer({
                    source: new TileSuperMapRest({
                        url: url,
                        wrapX: true,
                    }),
                    projection: "EPSG:4326",
                });

                this.map.addLayer(layer);

                const that = this
                this.map.on('click', function (e) {
                    const pixel = that.map.getEventPixel(e.originalEvent)
                    const feature = that.map.forEachFeatureAtPixel(pixel, function (feature) {
                        return feature
                    });
                });
            },
            addHeatMap(data) {
                if (this.layer) {
                    this.map.removeLayer(this.layer)
                    this.layer = null
                }
                let colors = ["#2200FF", "#16D9CC", "#4DEE12", "#E8D225", "#EF1616"];
                let features = []
                data.forEach(item => features.push({
                    type: 'Point',
                    coordinates: item.vectorPosition,
                    count: Number(item.nowNumber)
                }))
                const heatData = {
                    type: 'FeatureCollection',
                    features
                }
                this.layer = new HeatmapLayer({
                    source: new VectorSource({
                        features: (new GeoJSON()).readFeatures(heatData),
                    }),
                    blur: 30,
                    radius: 15,
                    gradient: colors,
                })
                this.map.addLayer(this.layer);
            },
            appendFeatures(heatmapData, colors, points, max) {
                for (const i in heatmapData) {
                    const name = heatmapData[i].name
                    if (points[name]) {
                        const coords = points[name];
                        this.max = max;
                        const f = new Feature({
                            geometry: new Point([coords.center.lng, coords.center.lat]),
                        });
                        f.setProperties({name: name, point: coords.center})
                        this.layer.getSource().addFeature(f);
                    }
                }
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
        background-image: url(../../../../assets/map/popupBg.png);
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
        // background: url("../../../../assets/images/map-bg.png");
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
        .tooltip-box-style {
            width: 570px;
            height: 290px;
            background-image: url("../../../../assets/images/tooltip-bg.png");
            background-repeat: no-repeat;
            box-shadow: none;
            padding: 42px 36px 42px 100px;
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
    }
</style>
