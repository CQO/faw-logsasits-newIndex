<template>
    <div class="map-bg">
      <div id="map" ref="map"></div>
    </div>
  </template>
  
  <script>
  import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet/dist/include-leaflet.js";
import "@supermap/iclient-leaflet"
      import "ol/css"
      import Map from "ol/Map";
      import View from "ol/View";
      import TileLayer from "ol/layer/Tile";
      import {TileSuperMapRest, Logo} from "@supermap/iclient-ol";
      // import {defaults as defaultControls} from "ol/control"
      import * as control from "ol/control"
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
            // var TiledMapLayer = require('@supermap/iclient-leaflet').TiledMapLayer;
              var baseUrl =
        "https://iserver.supermap.io/iserver/services/map-changchun/rest/maps/长春市区图";
        var serviceUrl='https://iserver.supermap.io/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun'
        
        var map = L.map('map', {
            crs: L.CRS.EPSG4326,
            center: [-3600, 5000],
            maxZoom: 18,
            zoom: 2
        });
        L.supermap.TiledMapLayer(baseUrl, { noWrap: true })
            .addTo(map)
            .once("load", function () {
                findPathProcess();
            });
            function findPathProcess() {
            //添加站点
            var marker1 = L.marker([-3000, 4000]).addTo(map);
            marker1.bindPopup(resources.text_site1);
            var marker2 = L.marker([-2500, 5500]).addTo(map);
            marker2.bindPopup(resources.text_site2);
            var marker3 = L.marker([-4000, 6900]).addTo(map);
            marker3.bindPopup(resources.text_site3);

            //创建最佳路径分析服务实例
            findPathService = new L.supermap.NetworkAnalystService(serviceUrl);
            //创建最佳路径分析参数实例
            var resultSetting = new L.supermap.TransportationAnalystResultSetting({
                returnEdgeFeatures: true,
                returnEdgeGeometry: true,
                returnEdgeIDs: true,
                returnNodeFeatures: true,
                returnNodeGeometry: true,
                returnNodeIDs: true,
                returnPathGuides: true,
                returnRoutes: true
            });
            var analystParameter = new L.supermap.TransportationAnalystParameter({
                resultSetting: resultSetting,
                weightFieldName: "length"
            });
            findPathParameter = new L.supermap.FindPathParameters({
                isAnalyzeById: false,
                nodes: [L.point(4000, -3000), L.point(5500, -2500), L.point(6900, -4000)],
                parameter: analystParameter
            });
            var myIcon = L.icon({
                iconUrl: "../img/walk.png",
                iconSize: [20, 20]
            });
            //进行查找
            findPathService.findPath(findPathParameter, function (serviceResult) {
                var result = serviceResult.result;
                result.pathList.map(function (result) {
                    L.geoJSON(result.route).addTo(map);
                    L.geoJSON(result.pathGuideItems, {
                        pointToLayer: function (geoPoints, latlng) {
                            L.marker(latlng, { icon: myIcon }).addTo(map);
                        },
                        filter: function (geoJsonFeature) {
                            if (geoJsonFeature.geometry && geoJsonFeature.geometry.type === 'Point') {
                                return true;
                            }
                            return false;
                        }
                    }).addTo(map);
                })
            });
        }
          },
          destroyed() {
              this.clearInter()
          },
          methods: {
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
  