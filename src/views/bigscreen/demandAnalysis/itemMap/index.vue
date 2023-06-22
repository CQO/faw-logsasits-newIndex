<template>
    <div class="map-bg">
        <div id="map"></div>
        <img src="../../../../assets/image/content/teSlice.png" style="position: absolute; bottom: 380px; right: 530px;"
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
    import VectorSource from 'ol/source/Vector';
    import VectorLayer from "ol/layer/Vector";
    import Feature from 'ol/Feature';
    import Point from 'ol/geom/Point';
    import {Polygon, MultiPolygon} from "ol/geom";
    import {Icon, Style, Stroke, Fill, Text} from 'ol/style';
    import EChartsLayer from 'ol-echarts'
    import chinaJson from '../../../../../public/map/china.json'

    export default {
        name: 'powperMap',
        components: {},
        props: {
            warZone: {
                type: String
            }
        },
        data() {
            return {
                map: null,
                pointSource: null,
                positionSource: null,
                zoneData: {
                    '东部战区': [118.052731, 29.395224],
                    '西部战区': [91.323097, 36.140361],
                    '南部战区': [108.065520, 26.192880],
                    '北部战区': [119.084418, 43.564825],
                    '中部战区': [111.112942, 35.593349]
                },
                zone: {
                    '北部战区': 'north',
                    '南部战区': 'south',
                    '西部战区': 'western',
                    '东部战区': 'eastern',
                    '中部战区': 'mid'
                },
                mapData: []
            }
        },
        watch: {
            'warZone'(value) {
                if (value) {
                    this.position(this.zoneData[value])
                    this.addArea([chinaJson], this.zone[value])
                }
            }
        },
        mounted() {
            this.initMap();
        },
        methods: {
            position(arr) {
                let self = this;
                self.positionSource.clear();
                const feature = new Feature({
                    geometry: new Point(arr)
                })
                console.log(self, 'self+++++++++++++++++++++++');
                // 添加线的fature
                self.positionSource.addFeature(feature);
                //定位中间点
                const to = arr;
                const view = self.map.getView();
                console.log(view, 'view=====================');
                view.setZoom(5);
                // view.addClass('clickSty')
                view.animate({
                    // center: to,
                    duration: 1,
                });
            },
            addPointFeature() {
                let features = []
                this.mapData.forEach((item, index) => {
                    const feature = new Feature({
                        geometry: new Point(item.value)
                    })
                    feature.setId(index)
                    feature.setProperties(item.name)
                    features.push(feature)
                })
                // 设置图层
                let routeLayer = new VectorLayer({
                    source: new VectorSource({
                        features: features,
                    }),
                });
                // 添加图层
                this.map.addLayer(routeLayer);
            },
            initMap() {
                // var url = "http://localhost:8090/iserver/services/map-ugcv5-ZhanQumap/rest/maps/%E6%88%98%E5%8C%BA_map";
                // var url = "http://localhost:8090/iserver/services/map-ugcv5-zhanqumapdetail/rest/maps/zhanqu_mapdetail";
                var url = window.globalConfig.gisMap
                // var url="http://localhost:8090/iserver/services/map-ugcv5-warzoneMapdetail/rest/maps/warzone_Mapdetail"
                this.positionSource = new VectorSource();
                this.map = new Map({
                    target: 'map',
                    controls: defaultControls({
                        attributionOptions: {collapsed: false},
                        zoom: false
                    })
                        .extend([new Logo()]),
                    view: new View({
                        center: [104.26, 22.64],
                        // maxZoom: 18,
                        // minZoom: 2,
                        zoom: 4,
                        projection: 'EPSG:4326',
                    })
                });
                const layer = new TileLayer({
                    source: new TileSuperMapRest({
                        url: url,

                    }),
                    projection: 'EPSG:4326'
                });

                const echartslayer = new EChartsLayer();
                echartslayer.appendTo(this.map);

                const that = this
                this.map.on('click', function (e) {
                    console.log(e, 'e---------------');
                    const pixel = that.map.getEventPixel(e.originalEvent)
                    const feature = that.map.forEachFeatureAtPixel(pixel, function (feature) {
                        return feature
                    });
                    that.$emit('map-click', !!feature)
                })

                // this.addPointFeature()
                this.addArea([chinaJson])
            },
            addArea(geo, name) {
                let features = [];
                geo.forEach((g) => {
                    let lightArr = [];
                    g.features.forEach(item => lightArr.push(item))
                    lightArr.forEach(item => {
                        let lineData3 = item;
                        let routeFeature3 = "";
                        const _name = lineData3.properties.name
                        if (lineData3.geometry.type === "MultiPolygon") {
                            routeFeature3 = new Feature({
                                geometry: new MultiPolygon(lineData3.geometry.coordinates),
                                name: _name
                            });
                        } else if (lineData3.geometry.type === "Polygon") {
                            routeFeature3 = new Feature({
                                geometry: new Polygon(lineData3.geometry.coordinates),
                                name: _name
                            });
                        }
                        routeFeature3.setId(lineData3.properties.adcode)
                        routeFeature3.setProperties(lineData3.properties)

                        const data = {
                            north: ['内蒙古自治区', '黑龙江省', '吉林省', '山东省', '辽宁省'],
                            south: ['云南省', '贵州省', '湖南省', '广西壮族自治区', '广东省', '海南省'],
                            western: ['新疆维吾尔自治区', '青海省', '西藏自治区', '甘肃省', '宁夏回族自治区', '四川省','重庆市'],
                            eastern: ['江苏省', '安徽省', '上海市', '浙江省', '江西省', '福建省'],
                            mid: ['陕西省', '山西省', '河北省', '河南省', '湖北省', '北京市', '天津市']
                        }
                        let color = ''
                        let text = ''
                        if (data.north.includes(_name)) {
                            color = '#55BBEE'
                        } else if (data.south.includes(_name)) {
                            color = '#5C28EF'

                        } else if (data.western.includes(_name)) {
                            color = '#2F86FF'

                        } else if (data.eastern.includes(_name)) {
                            color = '#40dea5'
                        } else if (data.mid.includes(_name)) {
                            color = '#239290'
                        } else {
                            color = '#012670'
                        }
                        if (_name === '青海省') {
                            text = '西 部 战 区'
                        }
                        if (_name === '广西壮族自治区') {
                            text = '南 部 战 区'
                        }
                        if (_name === '黑龙江省') {
                            text = '北 部 战 区'
                        }
                        if (_name === '山西省') {
                            text = '中 部 战 区'
                        }
                        if (_name === '浙江省') {
                            text = '东 部 战 区'
                        }
                        routeFeature3.setStyle(
                            new Style({
                                fill: new Fill({
                                    //填充颜色
                                    color: name && data[name].includes(_name) ? '#0039C7' : color,
                                    borderColor: "red"
                                }),
                                text: new Text({
                                    scale: 1.4,
                                    textAlign: 'center',     //对齐方式
                                    font: 'Normal 12px',     //字体样式
                                    text: text,    //文本内容
                                    fill: new Fill({        //填充样式
                                        color: '#ffffff',
                                    }),
                                    stroke: new Stroke({
                                        color: '#0039C7',
                                        width: 1
                                    })
                                })
                            })
                        );
                        features.push(routeFeature3);
                    });
                });
                // 设置图层
                let routeLayer = new VectorLayer({
                    source: new VectorSource({
                        features: features,
                    }),
                });
                // 添加图层
                this.map.addLayer(routeLayer);
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
        //background: url("../../../../assets/images/map-bg.png");
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
            width: 550px;
            height: 290px;
            background-image: url("../../../../assets/images/tooltip-bg.png");
            background-repeat: no-repeat;
            box-shadow: none;
            padding: 42px 86px 42px 136px;
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
    .clickSty {
        background: red;
    }
</style>
