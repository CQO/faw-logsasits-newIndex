
var extrudedHeight = 100000;
$(function () {
    var etsMap = new EtsMap();
    window.etsMap = etsMap;
    var initMap = etsMap.initMap("etsMapContainer", {

    });
   
        let scene = etsMap.getScene();

        window.camera = scene.getCamera();
        imageLayer = new EtsMap.ImageryLayer();

        loadChinaBounds(etsMap);
        loadChina(etsMap);
        // hideGlobe(etsMap.getViewer(), etsMap.getApi());
        const markerLayer = new EtsMap.MarkerLayer();
        poi(markerLayer);
       addWallEntity();
        // loadLine(etsMap);
        //   scene._viewer.scene.screenSpaceCameraController.maximumZoomDistance =100000;
        //   setpitch(etsMap.getApi(),scene);
        pickFeature(etsMap.getApi(), etsMap.getViewer())
        loadImg();
        //添加扫描圈
        loadCircleScan();
        //添加底部动态圈
        loadBigScan(etsMap, 110.3906, 34.585, 100000 + 10000);

       /*  const bloom = etsMap.getViewer().scene.postProcessStages.bloom;
        bloom.enabled = true;
        bloom.glowOnly = false;
        bloom.contrast = 119;
        bloom.brightness = 100.4;
        bloom.delta = 0.9;
        bloom.sigma = 3.78;
        bloom.stepSize = 5;
        bloom.isSelected = false; */


        const bloom = etsMap._viewer.scene.postProcessStages.bloom;
        bloom.enabled = true;
        bloom.uniforms.glowOnly = false;
        bloom.uniforms.contrast = 128;
        bloom.uniforms.brightness =0;
        bloom.uniforms.delta = 1.0;
        bloom.uniforms.sigma = 3.78;
        bloom.uniforms.stepSize = 5;
        bloom.uniforms.isSelected = false;
  
      /*   LoadHighLightLine(etsMap._etsMap, etsMap._viewer, [
            113.4668,
            33.8818,
            0
        ], [
            113.4668,
            33.8818,
            this.extrudedHeight*5
        ],10) */
    $("#cimMapContainerpopup_16-popup-close").click(function () {
        $("#moveTips").hide();
    })




    
   /*  const bloom = viewer.scene.postProcessStages.bloom;
    bloom.enabled = Boolean(viewModel.show);
    bloom.uniforms.glowOnly = Boolean(viewModel.glowOnly);
    bloom.uniforms.contrast = Number(viewModel.contrast);
    bloom.uniforms.brightness = Number(viewModel.brightness);
    bloom.uniforms.delta = Number(viewModel.delta);
    bloom.uniforms.sigma = Number(viewModel.sigma);
    bloom.uniforms.stepSize = Number(viewModel.stepSize); */
})
function loadCircleScan(){
    let circleScan = new EtsMap.CircleScan();
     
      let maxRadius = 4000;
      let scanColor = new circleScan._etsMap.Color(1.0, 0.0, 1.0, 1);
      let duration = 4000;
    circleScan.addScan( 110.3906, 34.585,extrudedHeight,maxRadius,scanColor,duration);

   
}
function loadImg(){
    let imageryLayer = new EtsMap.ImageryLayer();
    imageryLayer.loadImageryProvider({
            type:1,
           }
         );
    imageryLayer.loadSingleTileImageryProvider({
              id:"SingleTileImageryProvider",
              url:"img/bg.png"
           }
         );
}

function loadBigScan(etsMap,lon,lat,height){
    let viewer  = etsMap.getViewer();
    let CimMap = etsMap._etsMap;
   let  dynamicHalo = new  EtsMap.DynamicHaloBottom();
   let bottomRadius = 1400000;
   let length = 0.0;
   let isAddCone = false;
 
/*   color = CimMap.Color.fromRandom().withAlpha(0.7);
  var autoCircleColor = CimMap.Color.fromRandom().withAlpha(0.7);
  var staticCircleColor = CimMap.Color.fromRandom().withAlpha(0.7); */
  //36b9fd  6ecfff 0453db
  color = CimMap.Color.fromCssColorString('#00ff00');
//   var autoCircleColor = CimMap.Color.fromCssColorString('#fdca06');
  var autoCircleColor = CimMap.Color.fromCssColorString('#00e5ff');
  autoCircleColor.alpha=0.2;
  var staticCircleColor = CimMap.Color.fromCssColorString('#5da1f4');
//   staticCircleColor.alpha=0.7;

  dynamicHalo.addDynamicHalo({
    center: [lon, lat],
    radius: bottomRadius,
    coneLength: length,
    coneColor: color,
    autoCircleColor: autoCircleColor,
    staticCircleColor: staticCircleColor,
    height: 10000,
  });

  }
function loadScan(etsMap,lon,lat,height){
    let viewer  = etsMap.getViewer();
    let CimMap = etsMap._etsMap;
   let  dynamicHalo = new  EtsMap.DynamicHalo();
   let bottomRadius = 40000;
   let length = 1500.0;
   let isAddCone = false;
 
/*   color = CimMap.Color.fromRandom().withAlpha(0.7);
  var autoCircleColor = CimMap.Color.fromRandom().withAlpha(0.7);
  var staticCircleColor = CimMap.Color.fromRandom().withAlpha(0.7); */
  //36b9fd  6ecfff 0453db
  color = CimMap.Color.fromCssColorString('#00ff00');
  var autoCircleColor = CimMap.Color.fromCssColorString('#fdca06');
  autoCircleColor.alpha=0.7;
  var staticCircleColor = CimMap.Color.fromCssColorString('#00e5ff');
//   staticCircleColor.alpha=0.7;

  dynamicHalo.addDynamicHalo({
    center: [lon, lat],
    radius: bottomRadius,
    coneLength: length,
    coneColor: color,
    autoCircleColor: autoCircleColor,
    staticCircleColor: staticCircleColor,
    height: height,
  });

  }
function loadLine(etsMap){
    var viewer = etsMap.getViewer();
    var promise=etsMap._etsMap.GeoJsonDataSource.load('./mapData/china.json');
    promise.then(function(dataSource) {
        viewer.dataSources.add(dataSource);
        var entities = dataSource.entities.values;
        var colorHash = {};
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            var name = entity.name;
            var color = colorHash[name];
            if (!color) {
                color = etsMap._etsMap.Color.fromRandom({
                    alpha : 1.0
                });
                colorHash[name] = color;
            }
           /*  entity.polygon.material = color;
            entity.polygon.outline = false;            
            entity.polygon.extrudedHeight =5000.0; */
            }
        });
        viewer.flyTo(promise);
    // 可以在此网站取自己想要的http://geojson.io/
    // const promise = viewer.dataSources.add(etsMap._etsMap.GeoJsonDataSource.load('./mapData/china.json'));//默认是黄色
   /*  promise.then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        // console.log(entities)
        const colorHash = {};
        // for (let i = 0; i< entities.length; i++) {

    }) */
}
var selected = null;
function pickFeature(etsMap, viewer) {
    
    var handler = new etsMap.ScreenSpaceEventHandler(viewer.canvas);

    handler.setInputAction(function (event) {
        var pick = viewer.scene.pick(event.endPosition);
        if (selected) {
            // selected.polygon.material = etsMap.Color.fromCssColorString('#005db2');
            selected.polygon.material =  "./img/province.png";
            selected = null;
        }
        // 如果定义了 pick 那就证明获取到了entity
        if (etsMap.defined(pick)) {

            if (pick.id.type == "china") {

                pick.id.polygon.material = etsMap.Color.fromCssColorString('#0090f0');
                selected = pick.id;
            }
            // pick.id 就是获取到的entity数据
            // 这里修改了 entity 图标的样式
            // pick.id.billboard.image = "xxxxx.png"

        }
    }, etsMap.ScreenSpaceEventType.MOUSE_MOVE);

}
function setpitch(etsMap, scene) {
    var startMousePosition;
    var mousePosition;

    var handler = new etsMap.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (movement) {
        mousePosition = startMousePosition = etsMap.Cartesian3.clone(movement.position);
        handler.setInputAction(function (movement) {
            mousePosition = movement.endPosition;
            var y = mousePosition.y - startMousePosition.y;
            console.log(y < -45)
            // console.log(scene._screenSpaceCameraController)
            if (y > 0 || y < -45) {
                scene._viewer.scene.screenSpaceCameraController.enableTilt = true;
            }
        }, etsMap.ScreenSpaceEventType.MOUSE_MOVE);
    }, etsMap.ScreenSpaceEventType.MIDDLE_DOWN);

}
/**
 * 隐藏地球
 * @param {*} viewer 
 * @param {*} etsMap 
 */
function hideGlobe(viewer, etsMap) {
    viewer.scene.sun.show = false; //在Cesium1.6(不确定)之后的版本会显示太阳和月亮，不关闭会影响展示
    viewer.scene.moon.show = false;
    viewer.scene.skyBox.show = false;//关闭天空盒，否则会显示天空颜色

    // viewer.scene.undergroundMode = true; //重要，开启地下模式，设置基色透明，这样就看不见黑色地球了
    // viewer.scene.underGlobe.show = true;
    // viewer.scene.underGlobe.baseColor = new etsMap.Color(0, 0, 0, 0);
    viewer.scene.globe.show = false; //不显示地球，这条和地球透明度选一个就可以
    /*  viewer.scene.globe.baseColor = new etsMap.Color(255, 0, 0, 0);
      viewer.scene.backgroundcolor = etsMap.Color.fromCssColorString('#ff0000');
       console.log( etsMap.Color.fromCssColorString('#ff0000'))
      console.log(etsMap.Color.BLUE);
     */
    //背景透明
    viewer.scene.backgroundColor = new etsMap.Color(0.0, 0.0, 0.0, 1.0);
    //隐藏地球
    viewer.scene.undergroundMode = true; //重要，开启地下模式，设置基色透明，这样就看不见黑色地球了
    viewer.scene.globe.show = false; //不显示地球，这条和地球透明度选一个就可以
    viewer.scene.globe.baseColor = new etsMap.Color(0, 0, 0, 0);
    // viewer.scene.backgroundColor = etsMap.Color.BLUE;
    let color = {
        red: 0.0,
        blue: 0.0,
        green: 205.0,
        alpha: 0.0
    }
    // viewer.scene.backgroundColor = color; 
}
function poi(markerLayer) {
    var url = "img/test/201.png";
    var url1 = "img/test/202.png";
    $.getJSON("./mapData/point.json", function (result) {

        for (var index in result) {
            const obj = result[index];
            obj.scale = 1.0;
            if(index%2==0){
                url = url1;
            }else{
                url = "img/test/201.png";
            }
            var item = {
                id: "icon" + index,
                longitude: obj.position[0],
                latitude: obj.position[1],
                height: extrudedHeight,
                scale: 0.5,
                url: url,
                attr: obj
            };

            markerLayer.animationDOMPoint({
                id: "ainim_DOM_" + index,
                longitude: Number(obj.position[0]),
                latitude: Number(obj.position[1]),
                height: extrudedHeight,
                color: "#95e40c",
            });
            loadScan(etsMap,Number(obj.position[0]),Number(obj.position[1]),extrudedHeight+10000)
            markerLayer.addIcon(item);
            markerLayer.onClick(clickCallback);
            function clickCallback(obj, position, attributes) {


                const object = obj._attributes.attr;
                $("#moveTIpsTitle").html(object.options.name);
                //    let  html = "<div>" + "<label>name：</label>" + object.options.name + "</div>";
                let html = "<div>" + "<label>存储收发能力1：</label>" + object.options.storage + "件</div>";
                $("#moveTipsMain").html(html);
                html = $("#moveTips").html();
                let etsTips = new EtsMap.EtsTips();
                etsTips.create({
                    id: "moveTips",
                    longitude: object.position[0],
                    latitude: object.position[1],
                    height: extrudedHeight,
                    html: '<div>' + html + '</div>'
                });
            }

        }


        /*  camera.flyTo({
           longitude: result[index][0],
           latitude: result[index][1],
           height: 2000,
         }); */
    });


}
function addWallEntity() {
    dynamicWall = new EtsMap.DynamicWallEntity();
    let wall = dynamicWall.addDynamicWall({
        positions: loadData(),
        // positions: data,
        intervalTime: 1000,
        color: "#FF0000",
        imageUrl: "./img/101.png",
        // imageUrl: "./img/03.jpg",
        type: 4,
        duration: 2000
    });
    // camera.flyTo(wall);
   /*  camera.setPosition({
        longitude: 117.99721765352147,
        latitude: 35.2607306996189,
        height: 10000,

    }) */
}
function loadChinaBounds(etsMap) {
    var viewer = etsMap.getViewer();
    // 可以在此网站取自己想要的http://geojson.io/
    const promise = viewer.dataSources.add(etsMap._etsMap.GeoJsonDataSource.load('./mapData/china.json'));//默认是黄色
    promise.then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        for (let i = 0; i < entities.length; i++) {
            entities[i].polygon.outline = true;
            entities[i].polygon.outlineWidth = 5;
            // entities[i].polygon.outlineColor =etsMap._etsMap.Color.YELLOW;
            // entities[i].polygon.outlineColor =etsMap._etsMap.Color.fromCssColorString("#42b2eb");
            entities[i].polygon.outlineColor = etsMap._etsMap.Color.fromCssColorString("#71edff");
        }

    })
}
function loadchinaData(){
    $.getJSON('./mapData/china_geo.json', function (result) {

        for (var index in result) {
            const obj = result[index];
        }
    })
}
function loadChina(etsMap) {
    var viewer = etsMap.getViewer();   
    // 可以在此网站取自己想要的http://geojson.io/
    // const promise = viewer.dataSources.add(etsMap._etsMap.GeoJsonDataSource.load('./mapData/china_geo.json'));//默认是黄色
    // const promise = viewer.dataSources.add(etsMap._etsMap.GeoJsonDataSource.load('./mapData/china_geo.json'));//默认是黄色
    const promise =  viewer.dataSources.add(etsMap._etsMap.GeoJsonDataSource.load('./mapData/china_geo.json', {
        stroke: etsMap._etsMap.Color.GREEN,
        fill: etsMap._etsMap.Color.RED.withAlpha(1.0),

        strokeWidth: 30,
        markerSymbol: '?'
      }));
      promise.then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        // viewer.flyTo(entities);
        const colorHash = {};
        const labelEntities = [];
        const operation = {
            showColor: function () { //显示颜色
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    let color = colorHash[entity.name];
                    if (!color) {
                        color = etsMap._etsMap.Color.fromRandom({
                            alpha: 1
                        });
                        //    color =  etsMap._etsMap.Color.fromCssColorString('#0f3986');
                        color = etsMap._etsMap.Color.fromCssColorString('#005db2');//省份颜色
                        
                        //    color =  etsMap._etsMap.Color.fromCssColorString('#ff0000');
                        //    color.alpha = 0.9;
                        //    color =  etsMap._etsMap.Color.BLUE.withAlpha(0.9);
                        colorHash[name] = color;
                    }
                    entity.type = "china";
                    color = etsMap._etsMap.Color.RED;
                    entity.polygon.material = color;
                    // entity.polygon.material = "./img/province.png";
                }
            }
            , disShowColor: function () {  //初始化 的时候  不显示随机颜色 不显示边框
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity.polygon.material = etsMap._etsMap.Color.YELLOW.withAlpha(0.1);
                    entity.polygon.outlineColor = etsMap._etsMap.Color.YELLOW;
                    entity.beOf = "中国地图";
                }
            }
            , showLabel: function () {//显示标签
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    const name = entity.name;// console.log(name);
                    const location = entity.properties.cp.getValue();
                    const labelEntity = viewer.entities.add({
                        position: etsMap._etsMap.Cartesian3.fromDegrees(location[0], location[1], extrudedHeight + 100000),
                        label: {
                            text: name,
                            font: '14px Helvetica',
                            scale: 0.8,
                            //                                color : etsMap._etsMap.Color.fromCssColorString('#000'),
                            fillColor: etsMap._etsMap.Color.fromCssColorString('#fff'),
                        }
                    });
                    labelEntities.push(labelEntity);
                }
            }
            , disShowLabel: function () {//不显示标签
                for (let i = 0; i < labelEntities.length; i++) {
                    viewer.entities.remove(labelEntities[i]);
                }
            }
            , showBorder: function () {//显示边框
                for (let i = 0; i < entities.length; i++) {
                    entities[i].polygon.outline = true;
                    entities[i].polygon.outlineWidth = 5;
                    // entities[i].polygon.outlineColor =etsMap._etsMap.Color.YELLOW;
                    // entities[i].polygon.outlineColor =etsMap._etsMap.Color.fromCssColorString("#42b2eb");
                    entities[i].polygon.outlineColor = etsMap._etsMap.Color.fromCssColorString("#71edff");
                }
            }
            , disShowBorder: function () {//不显示边框
                for (let i = 0; i < entities.length; i++) {
                    entities[i].polygon.outline = false;
                }
            }
            , showHeight: function () {//显示随机高度
                for (let i = 0; i < entities.length; i++) {
                    entities[i].polygon.extrudedHeight = extrudedHeight;
                    // entities[i].polygon.extrudedHeight= 500000*Math.random();
                }
            }
            , disShowHeight: function () {//不显示随机高度
                for (let i = 0; i < entities.length; i++) {
                    entities[i].polygon.extrudedHeight = 0;
                }
            }
        };

        operation.showColor();
        operation.showBorder();
        operation.showHeight();
        operation.showLabel();



        //点击事件 点击改变区域颜色
        function addClick() {
            const handler = new etsMap._etsMap.ScreenSpaceEventHandler(viewer.scene.canvas);
            const temp = [];
            handler.setInputAction(function (e) {
                const pickedObject = viewer.scene.pick(e.position);
                if (etsMap._etsMap.defined(pickedObject) && pickedObject.id.beOf == "中国地图") {  //pickedObject.id，是指这个实体,pickedObject.id._id,是指这个实体的id
                    if (temp.length == 0) {
                        temp.push({ a: pickedObject.id, b: pickedObject.id.polygon.material });
                        pickedObject.id.polygon.material = etsMap._etsMap.Color.RED.withAlpha(1.0);
                    } else {
                        for (let i = 0; i < temp.length; i++) {
                            if (temp[i].a == pickedObject.id) {
                                // temp[i].a.polygon.material=temp[i].b;
                                // temp.splice(i,1);//删除这个 temp.splice(i,1);// 如果想要删除 已经点击过的，还原其本来颜色 可以加上这两句
                                break;
                            }
                            //已经是遍历完了。都没找到；说明不是之前那个；
                            if (i = temp.length) {
                                temp[i - 1].a.polygon.material = temp[i - 1].b;
                                temp.splice(i - 1, 1);//如果不是 我也要删除，删除就删除之前那一个；
                                temp.push({ a: pickedObject.id, b: pickedObject.id.polygon.material });
                                pickedObject.id.polygon.material = etsMap._etsMap.Color.RED.withAlpha(1.0);
                            }
                        }
                    }

                    alert(pickedObject.id._name);
                }
            }, etsMap._etsMap.ScreenSpaceEventType.LEFT_CLICK);
        }
        // addClick();

        /* *****操作  //点击按钮展示/隐藏效果 ****************/
        $(".op-btn").click(function () {
            if ($(this).index() == 0) {
                if ($(this).attr("attrid") == 0) {
                    operation.showColor();
                } else {
                    operation.disShowColor();
                }

            } else if ($(this).index() == 1) {
                if ($(this).attr("attrid") == 0) {
                    operation.showHeight();

                } else {
                    operation.disShowHeight();
                }
            } else if ($(this).index() == 2) {
                if ($(this).attr("attrid") == 0) {
                    operation.showBorder();
                } else {
                    operation.disShowBorder();
                }
            } else if ($(this).index() == 3) {
                if ($(this).attr("attrid") == 0) {
                    operation.showLabel();
                } else {
                    operation.disShowLabel();
                }
            }

            //改变状态
            if ($(this).attr("attrid") == "0") {
                $(this).attr("attrid", "1").addClass("on")
            } else {
                $(this).attr("attrid", "0").removeClass("on")
            }
        });

    })
   /* .otherwise(function(error){
        //Display any errrors encountered while loading.
        window.alert(error);
    }) */;
    /*  viewer.camera.flyTo({
         destination : etsMap._etsMap.Cartesian3.fromDegrees(116.16, 32.71, 6000000.0)
     });
  */
    viewer.camera.setView({
        destination: etsMap._etsMap.Cartesian3.fromDegrees(103.84, 34.16, 7850000),
        orientation: {
            heading: etsMap._etsMap.Math.toRadians(348.4202942851978),
            pitch: etsMap._etsMap.Math.toRadians(-89.74026687972041),
            roll: etsMap._etsMap.Math.toRadians(0),
        },
        complete: function callback() {
            // 定位完成之后的回调函数
        },
    })

}
function loadData(){
    let data =  [96.82683695,
        42.7133276,

        95.90702598,
        43.38548069
        ,

        95.75372543,
        44.16034234
        ,

        94.68061623,
        44.37988914
        ,

        93.53085643,
        44.92516315
        ,

        91.07804026,
        45.14183704
        ,

        90.54148028,
        45.73346149
        ,

        91.15468653,
        45.89373673
        ,

        91.07803467,
        46.47746913
        ,

        91.07803332,
        46.79325656
        ,

        90.61812855,
        47.31547657
        ,

        90.31152229,
        47.88401539
        ,

        89.39171042,
        48.03800163
        ,

        88.54855403,
        48.14040159
        ,

        88.24194751,
        48.64935215
        ,

        87.78204389,
        48.80104698
        ,

        87.93534644,
        49.20332827
        ,

        86.78558606,
        49.25338417
        ,

        86.78559066,
        48.49720302
        ,

        85.55917589,
        48.44638504
        ,

        85.63583648,
        47.62635393
        ,

        85.25258772,
        46.95045966
        ,

        83.18301595,
        47.21144172
        ,

        82.95307625,
        46.42465846
        ,

        82.49317385,
        45.62635439
        ,

        82.72312959,
        44.97940672
        ,

        81.72667058,
        45.30380387
        ,

        80.73021222,
        45.14183704
        ,

        80.11700966,
        44.97940672
        ,

        80.42362033,
        44.05026406
        ,

        80.8835282,
        43.2739673
        ,

        80.34697838,
        42.7133276
        ,

        80.34698226,
        42.20438021
        ,

        78.66067778,
        41.74851589
        ,

        78.20077795,
        41.17409984
        ,

        76.97437338,
        41.00078402
        ,

        76.514475,
        40.30295323
        ,

        75.74797175,
        40.18593769
        ,

        75.6713178,
        40.71090836
        ,

        74.75151517,
        40.36138457
        ,

        74.36826629,
        40.01003924
        ,

        74.06166802,
        39.83368523
        ,

        73.52512069,
        39.1831723
        ,

        74.13833047,
        38.40655169
        ,

        75.05813617,
        38.34646376
        ,

        74.59824188,
        37.2563366
        ,

        75.59470456,
        36.58225626
        ,

        76.13125868,
        36.08828578
        ,

        77.20437031,
        35.3414776
        ,

        78.0475211,
        35.52883704
        ,

        78.20082986,
        34.52457678
        ,

        78.81403389,
        34.20822468
        ,

        78.73739032,
        33.44412905
        ,

        79.42725014,
        32.54410505
        ,

        78.96734967,
        32.15558439
        ,

        78.27749696,
        32.47946839
        ,

        78.73740463,
        31.43898144
        ,

        79.65721138,
        30.91434541
        ,

        80.96027008,
        30.18825436
        ,

        81.88006962,
        30.25448571
        ,

        83.25977952,
        29.52348936
        ,

        84.33288305,
        28.98850688
        ,

        85.17603671,
        28.38333196
        ,

        86.86234596,
        27.84248044
        ,

        88.70195018,
        27.91023483
        ,

        89.08520428,
        27.02613176
        ,

        89.9283505,
        28.11324325
        ,

        91.15475275,
        27.77467853
        ,

        91.92125557,
        27.29891636
        ,

        92.15121052,
        26.54716035
        ,

        92.91771068,
        26.88948885
        ,

        93.76086063,
        26.95782972
        ,

        94.68065818,
        27.6389583
        ,

        95.75376002,
        28.2483744
        ,

        96.98016175,
        27.91023483
        ,

        97.67001351,
        28.38333196
        ,

        98.51316519,
        27.36701017
        ,

        98.81976814,
        26.20380699
        ,

        98.05326836,
        25.23704411
        ,

        97.51672122,
        24.4719989
        ,

        97.67001988,
        23.84256687
        ,

        98.89641926,
        24.12269776
        ,

        98.97306922,
        23.0690998
        ,

        99.04972492,
        22.07823195
        ,

        100.04617166,
        22.00718605
        ,

        100.50607104,
        21.22333956
        ,

        101.04262437,
        21.58016039
        ,

        101.80912456,
        21.00882892
        ,

        101.57917184,
        22.36206292
        ,

        103.11217229,
        22.57455361
        ,

        104.03197614,
        22.64531667
        ,

        105.10507221,
        23.21006697
        ,

        105.94822707,
        22.92798208
        ,

        106.86802497,
        22.7867226
        ,

        106.63807147,
        21.79383228
        ,

        108.17107103,
        21.36617017
        ,

        109.78072586,
        21.43753606
        ,

        109.85737276,
        20.43530132
        ,

        108.70762152,
        19.49876924
        ,

        108.63097078,
        18.26587467
        ,

        110.31726647,
        17.9744865
        ,

        111.00711927,
        18.99220549
        ,

        110.85381791,
        19.93170596
        ,

        110.9304751,
        21.08036782
        ,

        113.22997657,
        21.65141864
        ,

        114.53302732,
        22.57455361
        ,

        117.21578131,
        23.35088558
        ,

        118.67213729,
        24.26253407
        ,

        119.97519599,
        26.34127125
        ,

        120.81835473,
        28.04561888
        ,

        122.27471201,
        28.6527294
        ,

        122.50467093,
        29.72338276
        ,

        121.20161972,
        30.71685999
        ,

        122.12142715,
        30.98008274
        ,

        121.96812881,
        31.96069719
        ,

        120.97168391,
        32.80219116
        ,

        120.74173744,
        34.0178415
        ,

        119.36204143,
        35.0909918
        ,

        121.04835211,
        36.2120725
        ,

        122.65801247,
        36.9506758
        ,

        121.20165864,
        37.62149905
        ,

        120.3585065,
        37.74282392
        ,

        119.51534943,
        36.9506758
        ,

        119.13210214,
        37.80340961
        ,

        117.82905115,
        38.40655169
        ,

        117.9057033,
        39.00470223
        ,

        119.28540853,
        39.30189828
        ,

        119.89861743,
        39.89251849
        ,

        121.43163159,
        40.82701015
        ,

        122.42808702,
        40.41976531
        ,

        121.66157721,
        39.53875264
        ,

        121.04836486,
        38.40655169
        ,

        122.8879826,
        39.53875264
        ,

        124.11438923,
        39.71586293
        ,

        124.88089766,
        40.30295323
        ,

        126.41391402,
        41.28939042
        ,

        126.87382164,
        42.03381445
        ,

        128.0235719,
        41.23177055
        ,

        128.56013058,
        41.46194385
        ,

        128.8667353095608,
        42.317838136897876
        ,

        130.09315191,
        42.76961974
        ,

        130.55304725,
        42.09072143
        ,

        131.24291206,
        43.05032325
        ,

        131.24292968,
        44.81651807
        ,

        132.00943968,
        45.24986482
        ,

        133.38914328,
        44.97940672
        ,

        134.30897195,
        47.1072009
        ,

        134.92218726,
        47.78110547
        ,

        134.92219285,
        48.24260063
        ,

        133.3891788,
        48.14040159
        ,

        132.00946512,
        47.62635393
        ,

        131.16630466,
        47.729573
        ,

        131.01302399,
        48.34459443
        ,

        130.78306235,
        48.75053368
        ,

        129.5566592,
        49.35334576
        ,

        127.64039326,
        49.45310463
        ,

        127.56374951,
        50.04740372
        ,

        127.33380268,
        50.8285031
        ,

        127.02721105,
        51.50141692
        ,

        126.26071364,
        52.53909375
        ,

        124.95765256,
        53.14098862
        ,

        122.888087,
        53.55281121
        ,

        121.27841837,
        53.18694388
        ,

        120.35860227,
        52.77157954
        ,

        120.81849844,
        51.78680912
        ,

        120.28194281,
        51.4058875
        ,

        119.51542894,
        50.43956515
        ,

        118.44231329,
        49.70161468
        ,

        117.52250682,
        49.60236213
        ,

        116.5260464,
        49.75116461
        ,

        116.14278699,
        48.59868825
        ,

        115.68288198,
        48.14040159
        ,

        116.21943152,
        47.62635393
        ,

        117.36919175,
        47.78110547
        ,

        118.51895243,
        47.98672421
        ,

        119.2088055,
        47.3674161
        ,

        119.89865925,
        46.89811012
        ,

        118.21234678,
        46.63559343
        ,

        116.90928201,
        46.42465846
        ,

        116.14277324,
        45.84036256
        ,

        114.83971321,
        45.24986482
        ,

        113.84325166,
        44.76211862
        ,

        111.92698890360396,
        45.033602117138535
        ,

        111.92698480389767,
        43.774167510173434
        ,

        110.70057519,
        42.88205604
        ,

        109.24421384,
        42.54413812
        ,

        105.79494121,
        41.86278865
        ,

        104.64518386,
        41.40447654
        ,

        103.87867952,
        41.97685647
        ,

        102.34567005,
        42.26113523
        ,

        100.58271236,
        42.48763838
        ,

        98.20654238,
        42.6569822
        ,
        96.82683695,
        42.7133276
    ];
    let arrData = [];
    for(let i = 0;i<data.length;i=i+2){
        arrData.push(data[i]);
        arrData.push(data[i+1]);
        arrData.push(extrudedHeight);

    }
    return arrData;
}