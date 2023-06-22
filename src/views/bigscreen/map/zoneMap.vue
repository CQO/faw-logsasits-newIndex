<template>
    <div class="map-bg">
        <div id="map" ref="map"></div>
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
    import navyIcon from "@/assets/images/icon_navy.png";
    import airIcon from "@/assets/images/icon_air.png";
    import rocketIcon from "@/assets/images/icon_rocket.png";
    import armyIcon from '@/assets/images/icon_army.png';
    import zjah from "@/assets/images/icon_zjah.png";
    import bjIcon from "@/assets/images/icon_bj.png";
    import nxIcon from "@/assets/images/icon_nx.png";
    import bigScreenAPI from '@/api/modules/deploymentofForce'

    export default {
        name: 'powperMap',
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
                echartslayer: null,
                direction: 'right',
                interval: null
            }
        },
        watch: {
            'pName'(value) {
                this.clearInter()
                if (value) {
                    this.getData(value)
                    this.interval = setInterval(() => this.getData(value), 10000)
                }
            }
        },
        mounted() {
            this.initMap();
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
            getData(value) {
                bigScreenAPI[`get${this.type}Classific`]({m: {pName: value}}).then(res => {
                    res.list.forEach(item => {
                        item.residual = Number((Number(item.storage) - Number(item.surplus)).toFixed(2))
                        item.vectorPosition = item.vectorPosition.split(',').map(v => Number(v))
                    })
                    this.addEcharts(res.list)
                })
            },
            addEcharts(data) {
                this.removeEcharts()
                this.echartslayer = new EChartsLayer();
                this.echartslayer.appendTo(this.map);
                const echartsOption = this.initChart(data)
                this.echartslayer.setChartOptions(echartsOption);
            },
            removeEcharts() {
                if (this.echartslayer) {
                    this.echartslayer.remove()
                    this.echartslayer = null
                }
            },
            initChart(data) {
                //echarts.registerMap('china', chinaJson);
                const that = this
                const convertData = function (data) {
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

                const icons = {
                    陆军: armyIcon,
                    海军: navyIcon,
                    空军: airIcon,
                    火箭军: rocketIcon,
                    武警部队: nxIcon,
                    战略支援部队: bjIcon,
                    联勤保障部队: zjah,
                }

                // 图片配置
                let seriesList = []
                data.forEach(item => {
                    const index = seriesList.findIndex(l => l.name === this.pName)
                    const position = item.vectorPosition.slice()
                    if (index === -1) {
                        seriesList.push({
                            name: this.pName,
                            image: icons[this.pName] || zjah,
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
                            if (pointX > boxWidth + 200) {
                                x = pointX - boxWidth;
                                that.direction = 'left'
                            } else {
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
                            const direction = that.direction
                            const htmlText = `<div class='tooltip-box-${direction}'>
                                <div class="item"><span><em>单位名称：</em>${data.name}</span><span><em>单位类型：</em>${data.type}</span></div>
                                <div class="item"><span><em>单位编号：</em>${data.baseCode}</span><span><em>地 址：</em>${data.addr}</span></div>
                                <div class="item"><span><em>实时库容(件)：</em>${data.surplus}</span><span><em>剩余能力(件)：</em>${data.residual}</span></div>
                                <div class="item"><span><em>储存收发能力(件)：</em>${data.storage}</span></div>
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
                var layer = new TileLayer({
                    source: new TileSuperMapRest({
                        url: url,
                        wrapX: true
                    }),
                    projection: 'EPSG:4326'
                });

                this.map.addLayer(layer);
            },
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
            width: 570px;
            height: 290px;
            background-image: url("../../../assets/images/tooltip-bg.png");
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
        .tooltip-box-left {
            background-image: url("../../../assets/images/tooltip-bgagin.png");
            padding: 42px 130px 42px 16px;
        }
    }
</style>
