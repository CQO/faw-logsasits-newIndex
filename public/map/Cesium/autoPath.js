
var material = null;
var isAdd = false;
var obliqueLineEntities = [];

/**
 * 流纹纹理线
 * color 颜色
 * duration 持续时间 毫秒
 */
function PolylineTrailLinkMaterialProperty(color, duration) {
    var CimMap = Cesium;
    this._definitionChanged = new CimMap.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = color;
    this.duration = duration;
    this._time = (new Date()).getTime();
}

function BindMaterialProperty(CimMap, viewer){
    if(material !=null)
        return;
    Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
        isConstant: {
            get: function () {
                return false;
            }
        },
        definitionChanged: {
            get: function () {
                return this._definitionChanged;
            }
        },
        color: CimMap.createPropertyDescriptor('color')
    });

    PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
        return 'PolylineTrailLink';
    }

    PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
        if (!CimMap.defined(result)) {
            result = {};
        }
        result.color = CimMap.Property.getValueOrClonedDefault(this._color, time, CimMap.Color.WHITE, result.color);
        result.image = CimMap.Material.PolylineTrailLinkImage;
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
        return result;
    }

    PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
        return this === other ||
            (other instanceof PolylineTrailLinkMaterialProperty &&
                Property.equals(this._color, other._color))
    }

    CimMap.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
    CimMap.Material.PolylineTrailLinkType = 'PolylineTrailLink';
    CimMap.Material.PolylineTrailLinkImage = "./images/colors7.png";
    CimMap.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                      {\n\
                                                           czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                           vec2 st = materialInput.st;\n\
                                                           vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                           material.alpha = colorImage.a * color.a;\n\
                                                           material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                           return material;\n\
                                                       }";
    CimMap.Material._materialCache.addMaterial(CimMap.Material.PolylineTrailLinkType, {
        fabric: {
            type: CimMap.Material.PolylineTrailLinkType,
            uniforms: {
                color: new CimMap.Color(1.0, 0.0, 0.0, 0.5),
                image: CimMap.Material.PolylineTrailLinkImage,
                time: 0
            },
            source: CimMap.Material.PolylineTrailLinkSource
        },
        translucent: function (material) {
            return true;
        }
    });

    //MouseClickEvent(CimMap, viewer);
}

function obliqueLineEquation(options,resultOut){
    // var startH = options.startH;
    // var endH = options.endH;

    var startH = options.pt1.height;
    var endH = options.pt2.height;
    var L = Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat) ? Math.abs(options.pt1.lon - options.pt2.lon) : Math.abs(options.pt1.lat - options.pt2.lat);
    var num = options.num && options.num > 50 ? options.num : 50;
    var result = [];
    var dlt = L / num;
    var stepL = (startH-endH)/num;

    if (Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat)) {//以lon为基准
        var delLat = (options.pt2.lat - options.pt1.lat) / num;
        if (options.pt1.lon - options.pt2.lon > 0) {
            dlt = -dlt;
        }
        for (var i = 0; i < num; i++) {
            var tempH = startH - stepL*i;
            var lon = options.pt1.lon + dlt * i;
            var lat = options.pt1.lat + delLat * i;
            result.push([lon, lat, tempH]);
        }
    } else {//以lat为基准
        var delLon = (options.pt2.lon - options.pt1.lon) / num;
        if (options.pt1.lat - options.pt2.lat > 0) {
            dlt = -dlt;
        }
        for (var i = 0; i < num; i++) {
            var tempH = startH - stepL*i;
            var lon = options.pt1.lon + delLon * i;
            var lat = options.pt1.lat + dlt * i;
            result.push([lon, lat, tempH]);
        }
    }
    if (resultOut != undefined) {
        resultOut = result;
    }
    return result;
}

function AddObliqueLine(CimMap, viewer, lines){
    // if(isAdd) return;

    if(material != null){

    }else{
        material = new CimMap.PolylineTrailLinkMaterialProperty(CimMap.Color.WHITE, 2000);
    }

    for(var j = 0; j < lines.length; j++){
        var points = obliqueLineEquation({pt1:lines[j].start, pt2:lines[j].end,  startH:50, endH: 50, num: 1000});
        var pointArr = [];
        for(var i= 0; i < points.length; i++){
            pointArr.push(points[i][0], points[i][1], points[i][2]);
        }

        var entity = viewer.entities.add({
            name: 'PolylineTrailLink' + j,
            polyline: {
                positions: CimMap.Cartesian3.fromDegreesArrayHeights(pointArr),
                width: 2,
                material: material
            }
        });

        obliqueLineEntities.push(entity);
    }
    // isAdd = true;
}

function LoadHighLightLine(CimMap, viewer, startPoint, endPoint,speed){

    BindMaterialProperty(CimMap, viewer);
    var line = {"start":{"lon":startPoint[0],"lat":startPoint[1], "height":startPoint[2]},
        "end":{"lon":endPoint[0],"lat":endPoint[1], "height":endPoint[2]}};

    var lines = [];
    lines.push(line);
    AddObliqueLine(CimMap,viewer,lines);
}