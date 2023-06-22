<template>
    <div style="width: 100%; height: 100%;">
        <div id="map"></div>
    </div>
</template>

<script>
import "ol/css"
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from"ol/layer/Tile";
import {Vector} from"ol/layer";
import mapConfig from "./testData.js"
import {  TileSuperMapRest,Logo } from "@supermap/iclient-ol";
import { defaults as defaultControls } from "ol/control"
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style,Stroke} from 'ol/style';
import flag1 from "../../../assets/map/flag1.png";
import flag2 from "../../../assets/map/flag2.png"
import flag3 from "../../../assets/map/flag3.png";
import carImg from "../../../assets/map/c6.gif";
import {GeoJSON} from 'ol/format';

export default {
    name:'powperMap',
    components:{

    },
    data(){
        return{
            map:null,
            pointSource:null,
            lineLayer:null, // 播放的轨迹
            lineSource:null,
            index:0,
        }
    },
    mounted(){
        this.initMap();
    },
    methods:{
        initMap(){
            var _this = this;
            this.map = new Map({
                target:"map",
                controls: defaultControls({
                    attributionOptions: {collapsed: false},
                    zoom:false})
                    .extend([new Logo()]),
                view: new View({
                    center: [12244600.4354666,3994904.84651041],
                    zoom: 5,
                    multiWorld: true,
                    // projection: 'EPSG:3857'
                }),
            });
            // 加载地图
            var layer = new TileLayer({
                source: new TileSuperMapRest({
                    url:mapConfig.mapConfig.baseMap
                    // url:"http://localhost:8090/iserver/services/map-china400/rest/maps/ChinaDark"
                }),
            });
            this.map.addLayer(layer);
            // 加载点位图层
            this.pointSource= new VectorSource({
                wrapX: false
            });
            var pointLayer = new Vector({
                source: this.pointSource,
            })
            this.map.addLayer(pointLayer);
            this.lineSource= new VectorSource({
                wrapX: false
            });
            this.lineLayer = new Vector({
                source: this.lineSource,
            });
            this.setPathStyle(this.lineLayer)
            this.map.addLayer(this.lineLayer);

            this.pointToMap();
            this.guijiToMap();
        },
        // 加载物流轨迹
        guijiToMap(){
            let _this=this;
            const guijiData= mapConfig.guiji;
            // 播放状态的数据
            this.playData= guijiData[guijiData.length-1].arr;
            this.palyGuiji(this.playData)

        },


        // 播放轨迹
        palyGuiji(data){
            // geojson,将轨迹坐标生成线
            let lineString= {
                "type": "LineString",
                "coordinates": data
            }
            this.addPath(lineString);
            this.startPlay_1();

        },
        addPath(polyline, dataProj, featureProj) {
          var format = new GeoJSON();
          var route = format.readGeometry(polyline);
          // 源数据节点
          var lineCoords = route.getCoordinates();
          var lineLength = lineCoords.length;

          var lineFeature =this.lineFeature = new Feature({
            type: 'path',
          });
          var marker = this.marker = new Feature({
            type: 'marker',
            geometry: new Point(lineCoords[0])
          });
		  this.lineSource.addFeatures([lineFeature,marker]);
          this.lineCoords = lineCoords;
          this.linePoints = lineCoords;
        },
        startPlay_1() {
          this.map.on('postcompose', this.moveFeature_1, this);
        //   this.map.render();
        },
        moveFeature_1(event) {
            let index = this.index;
            let coords = this.linePoints;
            let speed =1;
            var format = new GeoJSON();
            if (index < coords.length - 1) {
                var start = this.linePoints[index];
                var end = this.linePoints[index + 1];
                var rotat = this.getRotation(start, end);
                var currentPoint = new Point(end);
                this.marker.set('rotat', rotat);
                this.marker.setGeometry(currentPoint);

                let linData={
                    "type": "LineString",
                    "coordinates": this.linePoints.slice(0,index)
                }
                var line = format.readGeometry(linData);
                this.lineFeature.setGeometry(line)
                this.index = index + speed;
            } else {
                let linData={
                    "type": "LineString",
                    "coordinates": this.linePoints
                }
                var line = format.readGeometry(linData);
                this.lineFeature.setGeometry(line)
                return;
            }
          // tell OpenLayers to continue the postcompose animation
        //   this.map.render();
        },

        setPathStyle(layer) {
          let _this = this;
          layer.setStyle(function (feature) {
            let type = feature.get('type');
            let rotat = feature.get('rotat');
            var geometry = feature.getGeometry();
            var styles = []
            if (type === 'marker') { //运动点样式
              let rotation = feature.get('rotat') || 0;
              styles.push(new Style({
                image: new Icon({
                  src: carImg,
                  rotateWithView: true,
                  // π 逆时针为正，顺时针为负
                  rotation: -rotation
                })
              }))
            } else if (type === 'path') {
              styles.push(new Style({
                stroke: new Stroke({
                  color: 'red',
                  width: 3
                })
              }))
            }
            return styles;
          });
        },

        // 计算图片斜率
        getRotation(start, end) {
          var dx = end[0] - start[0];
          var dy = end[1] - start[1];
          //   通过斜率计算出弧度值
          var rotation = Math.atan2(dy, dx);
          return rotation
        },

        // 加载仓库点位
        pointToMap(){
            let _this =this;
            this.pointSource.clear();//   清除上次数据
            let mapPointData=mapConfig.storageData;
            mapPointData.forEach(item=>{
                let pointFea = new Feature(new Point([item.lon,item.lat]));
                let iconStyle= new Style({
                        image: new Icon({
                            src: flag3,
                        }),
                    });;
                if(item.type=="被保障单位"){
                    iconStyle = new Style({
                        image: new Icon({
                            src: flag1,
                        }),
                    });

                }else if(item.type=="军民融合仓"){
                    iconStyle = new Style({
                        image: new Icon({
                            src: flag2,
                        }),
                    });
                }

                pointFea.setStyle(iconStyle);
                pointFea.setProperties(item);
                this.pointSource.addFeature(pointFea);
            })

        }
    }
}
</script>
<style lang='css'>
#map {
    width: 100%;
    height: 100%;
    border: 1px solid red;
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
</style>
