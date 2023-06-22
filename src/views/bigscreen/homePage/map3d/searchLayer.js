import { getDetail } from "./getPointInfo";
let EtsMap = null;
let extrudedHeight = 0;
let temmarkerLayer = null;
let hover = false;
let tempHig = null;
let dynamicHalo = null;
let markerLayer = null;
//添加5类点位
export function searchPointLayer(EtsMaps, extrudedHeights, optionData) {
    EtsMap = EtsMaps;
    extrudedHeight = extrudedHeights;
    if (optionData.length > 0) {
        optionData.forEach((element) => {
            if (!markerLayer) {
                markerLayer = new EtsMap.MarkerLayer();
            }
            let url = icon(element.type, "");
            addPoint(
                markerLayer,
                url,
                element.result,
                element.type,
                element.typeName
            );
        });
    }
}

function addPoint(markerLayer, url, result, type, typeName) {
    for (var index in result) {
        const point = result[index];
        const temp = point.position.split(",");
        const position = [Number(temp[0]), Number(temp[1])];
        const obj = {
            options: point.options,
            position,
        };
        const param = {
            markerLayer,
            obj,
            type,
            typeName,
            url,
            scale: 0.5,
        };
        addIcon(param);
    }
}
function addIcon(param) {
    let scale = param.scale;
    const markerLayer = param.markerLayer;
    const obj = param.obj;
    const type = param.type;
    const url = param.url;
    // obj.scale = 1.0;
    obj.type = type;
    obj.typeName = param.typeName;
    var item = {
        id: (param.id ? param.id : obj.options.id) + "search",
        longitude: obj.position[0],
        latitude: obj.position[1],
        height: extrudedHeight,
        scale: scale,
        url: url,
        attr: obj,
    };
    //圆盘动画
    // loadScan(etsMap, Number(obj.position[0]), Number(obj.position[1]), extrudedHeight + 10000)
    markerLayer.addIcon(item);
    markerLayer.onClick({}, clickCallback);
    // function mouseOutCallback(value) {
    //     if (hover) {
    //         $("#moveTips").hide();
    //         removeHrightLight()
    //         hover = false
    //     }
    //     document.getElementsByClassName("mapContent")[0].style.cursor = "default"

    // }
    function clickCallback(obj, position, attributes) {
        $("#moveTips").hide();
        removeHrightLight();
        document.getElementsByClassName("mapContent")[0].style.cursor =
            "default";
        obj.billboard.scale = scale;
        const object = obj._attributes.attr;

        document.getElementsByClassName("mapContent")[0].style.cursor =
            "pointer";
        getDetail(object.options.id, (data) => {
            let html = "";
            html = tooltipHtml(data);
            html += "<div class='point_tooltip'></div><div ></div>";
            $("#moveTipsMain").html(html);
            html = $("#moveTips").html();
            let offsetX =
                ($(window).width() - $("#etsMapContainer").width()) / 2;
            let offsetY = $(".mapContent").position().top + 20 + 10;
            let etsTips = new EtsMap.EtsTips();
            etsTips.create({
                id: "moveTips",
                longitude: object.position[0],
                latitude: object.position[1],
                height: extrudedHeight,
                offsetX: -(offsetX + 20),
                offsetY: -offsetY || -140,
                html: "<div>" + html + "</div>",
                horizontalOrigin: "LEFT",
            });
            $(".tooltip_close").on("click", () => {
                $("#moveTips").hide();
                removeHrightLight();
                document.getElementsByClassName("mapContent")[0].style.cursor =
                    "default";
            });
            PointHeightLight(object.options.id);
        });
    }
}
function tooltipHtml(object) {
    const options = object;
    const type = object.type;
    let name = '';
    let html = "<div><ul class='tooltip_html_ul'>";
    switch (type) {
        case "gongchang":
            name = "工厂提货点";
            html +=
                "<li><label>工厂名称：</label>" +
                (options.name || "--") +
                "</li>" +
                "<li><label>工作地址：</label>" +
                (options.addr || "--") +
                "</li>";
            break;
        case "zhantai":
            name = "站台提货点";
            html +=
                "<li><label>存储收发能力：</label>" +
                options.storage +
                "件</li>";
            break;
        case "cangku":
            name = "仓库提货点";
            html +=
                "<li><label>地方仓库名称：</label>" +
                (options.localWarehouseName || "--") +
                "</li>" +
                "<li><label>军方仓库名称：</label>" +
                (options.militaryWarehouseName || "--") +
                "</li>" +
                "<li><label>仓库地址：</label>" +
                (options.warehouseAddress || "--") +
                "</li>" +
                "<li><label>计划保障件数：</label>" +
                (options.plannedSupportNum || "--") +
                "</li>" +
                "<li><label>保障单位个数：</label>" +
                (options.supportUnitNum || "--") +
                "</li>" +
                "<li><label>库存数量：</label>" +
                (options.inventoryQuantity || "--") +
                "</li>";
            break;
        case "wuliu":
            name = "物流仓库";
            html +=
                "<li><label>地方仓库名称：</label>" +
                (options.localWarehouseName || "--") +
                "</li>" +
                "<li><label>军方仓库名称：</label>" +
                (options.militaryWarehouseName || "--") +
                "</li>" +
                "<li><label>计划保障件数：</label>" +
                (options.plannedSupportNum || "--") +
                "</li>" +
                "<li><label>保障单位个数：</label>" +
                (options.supportUnitNum || "--") +
                "</li>" +
                "<li><label>入库数：</label>" +
                (options.warehouseReceipt || "--") +
                "</li>" +
                "<li><label>分拣数：</label>" +
                (options.sortingCount || "--") +
                "</li>" +
                "<li><label>出库数：</label>" +
                (options.warehouseIssue || "--") +
                "</li>" +
                "<li><label>库存数：</label>" +
                (options.inventoryCount || "--") +
                "</li>";
            break;
        case "danwei":
            name = "受供单位";
            html +=
                "<li><label>受供单位：</label>" +
                (options.supplier || "--") +
                "</li>" +
                "<li><label>地址：</label>" +
                (options.address || "--") +
                "</li>" +
                "<li><label>配送物资数：</label>" +
                (options.distributionQuantity || "--") +
                "</li>";
            break;
    }
    const title =
        "<div class='tooltip_title'>" +
        name +
        "</div><div class='tooltip_close'><i class='iconfont icon-close'></i></div>";
    $("#moveTIpsTitle").html(title);
    html += "</ul></div>";
    return html;
}
function loadScan(etsMap, lon, lat, height) {
    let viewer = etsMap.getViewer();
    let CimMap = etsMap._etsMap;
    if (dynamicHalo) {
        dynamicHalo.removeCone();
    } else {
        dynamicHalo = new EtsMap.DynamicHalo();
    }
    let bottomRadius = 50000;
    let length = 150000.0;
    let isAddCone = false;

    /*   color = CimMap.Color.fromRandom().withAlpha(0.7);
      var autoCircleColor = CimMap.Color.fromRandom().withAlpha(0.7);
      var staticCircleColor = CimMap.Color.fromRandom().withAlpha(0.7); */
    //36b9fd  6ecfff 0453db
    let color = CimMap.Color.fromCssColorString("#00ff00");
    var autoCircleColor = CimMap.Color.fromCssColorString("#00e5ff");
    autoCircleColor.alpha = 0;
    var staticCircleColor = CimMap.Color.fromCssColorString("#00e5ff");
    //   staticCircleColor.alpha=0.7;

    dynamicHalo.addDynamicHalo({
        center: [lon, lat],
        radius: bottomRadius,
        coneLength: length,
        coneColor: color,
        autoCircleColor,
        staticCircleColor: staticCircleColor,
        height: height,
        isShowCylinder: false,
    });
}
//移除
export function searchremoveLayer() {
    $("#moveTips").hide();
    if (markerLayer) {
        markerLayer.remove();
    }
    removeHrightLight();
}
export function PointHeightLight(id) {
    let marker = null;
    if (temmarkerLayer) {
        removeHrightLight();
    } else {
        temmarkerLayer = new EtsMap.MarkerLayer();
    }
    if (id) {
        marker = markerLayer.get(id);
        if (marker) {
            let type = marker.attributes.attr.type;
            const url = icon(type, "_hover");
            const param = {
                id: id + "searcgHeightlight",
                old: id,
                oldMarkerLayer: markerLayer,
                markerLayer: temmarkerLayer,
                obj: marker.attributes.attr,
                type: type,
                url,
                scale: 0.5,
            };
            tempHig = param;
            const extMap = window.etsMap;
            addIcon(param);
            loadScan(
                extMap,
                Number(param.obj.position[0]),
                Number(param.obj.position[1]),
                extrudedHeight + 10000
            );
        }
    }
}

function removeHrightLight() {
    if (temmarkerLayer) {
        temmarkerLayer.remove();
    }
    if (dynamicHalo) {
        dynamicHalo.removeCone();
    }
}

function icon(type, hight) {
    let url = "";
    switch (type) {
        case "gongchang":
            url = `./map/img/icon_gongchang${hight}.png`;
            break;
        case "站台提货点":
            url = `./map/img/icon_zhantai${hight}.png`;
            break;
        case "cangku":
            url = `./map/img/icon_cangku${hight}.png`;
            break;
        case "wuliu":
            url = `./map/img/icon_wuliu${hight}.png`;
            break;
        case "danwei":
            url = `./map/img/icon_danwei${hight}.png`;
            break;
    }
    return url;
}
