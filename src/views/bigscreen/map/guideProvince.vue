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
    import VectorSource from 'ol/source/Vector';
    import VectorLayer from "ol/layer/Vector";
    import Feature from 'ol/Feature';
    import {Polygon, MultiPolygon} from "ol/geom";
    import {Icon, Style, Stroke, Fill, Text} from 'ol/style';
    import EChartsLayer from 'ol-echarts'
    import navyIcon from "@/assets/images/icon_navy.png";
    import airIcon from "@/assets/images/icon_air.png";
    import rocketIcon from "@/assets/images/icon_rocket.png";
    import armyIcon from '@/assets/images/icon_army.png';
    import zjah from "@/assets/images/icon_zjah.png";
    import bjIcon from "@/assets/images/icon_bj.png";
    import nxIcon from "@/assets/images/icon_nx.png";
    import chinaJson from '../../../../public/map/china.json'
    import mapGuide from '@/api/modules/mapGuide'


    export default {
        name: 'guideProvince',
        components: {},
        data() {
            return {
                map: null,
                echartslayer: null,
                direction: 'right'
            }
        },
        mounted() {
            this.initMap();
        },
        methods: {
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
                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        const item = data[i]
                        res.push({
                            ...item,
                            value: item.vectorPosition
                        });
                    }
                    return res;
                };

                const icons = {
                    陆军: armyIcon,
                    海军: navyIcon,
                    空军: airIcon,
                    火箭军: rocketIcon,
                    武警部队: nxIcon,
                    战略支援部队: bjIcon,
                }

                // 图片配置
                let seriesList = []
                data.forEach(item => {
                    const index = seriesList.findIndex(l => l.name === item.pName)
                    const position = item.vectorPosition.slice()
                    if (index === -1) {
                        seriesList.push({
                            name: item.pName.includes('中心') ? '联勤保障部队' : item.pName,
                            image: icons[item.pName] || zjah,
                            data: [{...item, value: position}]
                        })
                    } else {
                        seriesList[index].data.push({...item, value: position})
                    }
                })

                let series = []

                seriesList.forEach(item => {
                    series.push({
                        name: item.name,
                        type: "scatter",
                        coordinateSystem: "geo",
                        data: convertData(item.data),
                        symbolSize: [78 * 0.8, 38 * 0.8],
                        symbol: 'image://' + item.image,
                        zlevel: 3
                    })
                })
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
                    }
                ];
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
                             if (pointX>boxWidth+400) {
                                x = pointX-boxWidth;
                                that.direction = 'left'
                            }
                            else{
                                x = pointX;
                                that.direction = 'right'
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
                            const direction = that.direction
                            const htmlText = `<div class='tooltip-box-${direction}'>
                                <div class="item"><span><em>单位名称：</em>${data.name}</span><span><em>单位类型：</em>${data.type}</span></div>
                                <div class="item"><span><em>单位编号：</em>${data.baseCode}</span><span><em>地 址：</em>${data.addr}</span></div>
                                <div class="item"><span><em>实时库容(件)：</em>${data.surplus}</span><span><em>剩余能力(件)：</em>${data.syjs}</span></div>
                                <div class="item"><span><em>储存收发能力(万件)：</em>${data.storage}</span></div>
                            </div>`;
                            return htmlText;
                        },
                    },
                    series
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
                        center: [105.26, 22.86],
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
                    const pixel = that.map.getEventPixel(e.originalEvent)
                    const feature = that.map.forEachFeatureAtPixel(pixel, function (feature) {
                        return feature
                    });
                    const name = feature.values_.name
                    const shortName = name.includes('黑龙江') || name.includes('内蒙古') ? name.slice(0, 3) : name.slice(0, 2)
                    mapGuide.getProvinceScreen({m: {sf: shortName}}).then(res => {
                        const list = res.list.filter(item => item.vectorPosition)
                        list.forEach(item => {
                            item.vectorPosition = item.vectorPosition.split(',').map(v => Number(v))
                        })
                        that.addEcharts(res.list)
                    })
                    that.addArea([chinaJson], name)
                    that.$emit('map-click', {name: shortName, type: 'Province'})
                });

                that.addArea([chinaJson])
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

                        routeFeature3.setStyle(
                            new Style({
                                fill: new Fill({
                                    //填充颜色
                                    color: name === _name ? '#0039C7' : '#00276B',
                                }),
                                stroke: new Stroke({
                                    //边界宽度
                                    width: 2,
                                    //边界颜色
                                    color: name === _name ? '#028CE8' : '#004F83',
                                }),
                                text: new Text({
                                    textAlign: 'center',     //对齐方式
                                    textBaseline: 'middle',    //文本基线
                                    font: 'normal 12px',     //字体样式
                                    text: _name,    //文本内容
                                    fill: new Fill({        //填充样式
                                        color: '#ffffff'
                                    }),
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
            width: 590px;
            height: 360px;
            background-image: url("../../../assets/images/tooltip-bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            box-shadow: none;
            padding: 42px 36px 42px 110px;
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
            padding: 42px 130px 42px 16px;
        }
    }
</style>
