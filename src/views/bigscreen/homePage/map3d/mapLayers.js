export default class MapLayers {
  constructor(mapid) {
    this.map = null
    this.pointLayer = null
    this.polygonLayer = null
    this.diffHeight = 20000
    this.arrColor = ["#4AB8FF"]
    this.points = []
    this.index = 0
    this.creatMap(mapid)
  }
  creatMap(mapid) {

    const mapOptions = {
      scene: {
        center: { lat: 2.969426, lng: 108.603628, alt: 6259762, heading: 354, pitch: -72 },
        showSkyAtmosphere: false,
        showSkyBox: false,
        backgroundColor: "#001e6500",
        globe: {
          show: false,
          baseColor: "#001e6500", // 地球地面背景色
          showGroundAtmosphere: false,
          enableLighting: false
        }
      },
      control: {
        // homeButton: true,
        clockAnimate: true, // 时钟动画控制(左下角)
        // compass: { top: "calc(60% - 57px)", left: "calc(25% + 10px)" }
      },
      basemaps: [],
      layers: [
        {
          id: 1987,
          name: "中心点数据",
          type: "3dtiles",
          url: "./3dmap/json/centerData.json",
          position: { lng: 108.603628, lat: 31.844015, alt: 31.2 },
          maximumScreenSpaceError: 16,
          maximumMemoryUsage: 1024,
          show: true
        }
      ]
    }
    this.map = new mars3d.Map(mapid, mapOptions)
    this.map.unbindContextMenu()
    this.keybord(this.map)
    this.changeButton(this.map)
  }
  changeButton(map) {

    let hasSelected = false
    const toolButton = new mars3d.control.ToolButton({
      title: "初始化地图",
      icon: "./3dmap/img/goback.svg",
      insertIndex: 1, // 插入的位置顺序, 1是home按钮后面
      click: () => {
        map.flyHome();
      }
    })
    map.addControl(toolButton)
  }
  keybord(map) {

    // 开启键盘漫游
    map.keyboardRoam.enabled = true

    map.keyboardRoam.minHeight = 80

    map.keyboardRoam.setOptions({
      moveStep: 10, // 平移步长 (米)。
      dirStep: 25, // 相机原地旋转步长，值越大步长越小。
      rotateStep: 1.0, // 相机围绕目标点旋转速率，0.3-2.0
      minPitch: 0.1, // 最小仰角  0-1
      maxPitch: 0.95 // 最大仰角  0-1
    })
  }
  /**
   * 初始化地图业务，生命周期钩子函数（必须）
   * 框架在地图初始化完成后自动调用该函数
   */
  onMounted(point) {
    this.points = point
    var map = this.map // 记录map
    map.basemap = 2017 // 蓝色底图

    // 添加矢量图层
    var graphicLayer = new mars3d.layer.GraphicLayer()
    map.addLayer(graphicLayer)

    this.pointLayer = new mars3d.layer.GraphicLayer()
    map.addLayer(this.pointLayer)

    this.markIfoLayer = new mars3d.layer.GraphicLayer()
    map.addLayer(this.markIfoLayer)
    // 添加对象
    this.addAnhui(graphicLayer)
    this.points.forEach((point) => {
      this.addCenterCity(graphicLayer, point)
    })
    // this.addOutCircle(graphicLayer)

  }

  /**
   * 释放当前地图业务的生命周期函数
   * @returns {void} 无
   */
  onUnmounted() {
    this.map = null
  }

  // 添加中国国界和省边界
  addAnhui(graphicLayer) {
    const that = this
    // 中国边界线墙
    var anhuiWall = new mars3d.layer.GeoJsonLayer({
      name: "中国边界线",
      url: "./3dmap/json/bounder.json",
      symbol: {
        type: "wallP",
        styleOptions: {
          setHeight: -(that.diffHeight + 100000),
          diffHeight: that.diffHeight + 100000, // 墙高
          materialType: mars3d.MaterialType.Image2,
          materialOptions: {
            image: "./3dmap/img/fence-wall-3.png",
            color: "#00ffff"
          }
        }
      }
    })
    that.map.addLayer(anhuiWall)


    // 省边界线和名称
    var shiLayer = new mars3d.layer.GeoJsonLayer({
      name: " 省边边界线",
      url: "./3dmap/json/province.json",
      symbol: {
        type: "polygon",
        styleOptions: {
          fill: true,
          outline: true,
          outlineWidth: 1,
          opacity: 0.1,
          outlineColor: "#6591B5",
          // clampToGround: true,
          materialOptions: {
            color: "#009CFF",
            opacity: 0.5,
            alphaPower: 1.3
          },
          // 面中心点，显示文字的配置
          label: {
            text: "{name}",
            position: "{center}", // 省会位置center
            font_size: 16,
            font_family: "宋体",
            font_weight: "bold",
            opacity: 1,
            color: "#ffffff",
            outline: true,
            clampToGround: true,
            outlineColor: "#ffffff",
            scaleByDistance: true,
            scaleByDistance_far: 60000000,
            scaleByDistance_farValue: 0.2,
            scaleByDistance_near: 1000000,
            scaleByDistance_nearValue: 1,
            distanceDisplayCondition: true,
            distanceDisplayCondition_far: 10000000,
            distanceDisplayCondition_near: 100000,
            setHeight: 10000
          },
          highlight: {
            type: "click",
            outline: true,
            outlineWidth: 3,
            outlineColor: "#00ffff",
            materialOptions: {
              opacity: 0.9,
            }
          }
        }
        // callback: function (attr, styleOpt) {
        //   const randomHeight = (attr.childrenNum || 1) * 600 // 测试的高度

        //   return {
        //     materialOptions: {
        //       color: that.getColor()
        //     },
        //     // height: 0,
        //     // diffHeight: randomHeight,
        //   }
        // }
      }
    })
    that.map.addLayer(shiLayer)
    // const that=this
    shiLayer.on(mars3d.EventType.click, function (event) {
      that.markIfoLayer.clear()
    })
  }
  getColor() {
    return this.arrColor[0]
  }

  // 添加城市的相关对象
  addCenterCity(graphicLayer, pointobj) {
    const that = this
    var point = pointobj.position

    const graphic = new mars3d.graphic.BillboardEntity({
      attr: pointobj.options,
      position: point,
      style: {
        image: "./3dmap/img/point-orange.png",
        scale: 1.0,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        clampToGround: true,
        label: { text: "", pixelOffsetY: -50 },
        // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
        highlight: {
          scale: 1.5
        }
      },
    })
    this.pointLayer.addGraphic(graphic)
    // 圆形动态扩散图
    var cicle = new mars3d.graphic.CirclePrimitive({
      position: point,
      style: {
        radius: 100000,
        diffHeight: 50,
        // outline:true,
        // clampToGround: true,
        width: 55,
        materialType: mars3d.MaterialType.CircleWave,
        materialOptions: {
          color: "#00ffff",
          count: 3,
          speed: 10,
          gradient: 0.5
        }
      },
      debugShowShadowVolume: true
    })
    graphicLayer.addGraphic(cicle)

    this.pointLayer.on(mars3d.EventType.click, function (event) {
      that.markInfor(event.graphic.options)
      console.log("监听layer，单击了矢量对象", event)
    })
  }
  // 详情框信息 可修改
  markInfor(event) {
    this.markIfoLayer.clear()
    // divgraphic标注
    var divgraphic = new mars3d.graphic.DivGraphic({
      position: event.position,
      style: {
        clampToGround: true,
        html: `<div class="marsBlackPanel">
                <div class="marsBlackPanel-text">`
          + event.attr.name +
          `</div>
                <div class="marsBlackPanel-cont">
                  <div>储存收发能力：`+ event.attr.storage + `件</div>
                </div>
            </div>`,
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // 横向定位
        verticalOrigin: Cesium.VerticalOrigin.CENTER // 垂直定位
      }
    })
    this.markIfoLayer.addGraphic(divgraphic)
  }
  // 在图层绑定Popup弹窗
  bindLayerPopup(graphicLayer) {
    graphicLayer.bindPopup(function (event) {
      const attr = event.graphic.attr || {}
      const obj = {}
      obj["类型"] = event.graphic.type
      obj["来源"] = "我是layer上绑定的Popup"
      obj["备注"] = "我支持鼠标交互"

      return mars3d.Util.getTemplateHtml({ title: attr.name, template: "all", attr: obj })
    })
  }
  bindHtmlLayerTooltip(graphicLayer) {
    function getInnerHtml(event) {
      // let attr = event.graphic.attr
      const inthtml = `<table style="width:280px;">
                  <tr><th scope="col" colspan="4"  style="text-align:center;font-size:15px;">graphic.bindTooltip</th></tr>
                  <tr><td >说明：</td><td >Tooltip鼠标移入信息弹窗 </td></tr>
                  <tr><td >方式：</td><td >可以绑定任意html </td></tr>
                  <tr><td >备注：</td><td >我是graphic上绑定的Tooltip</td></tr>
                </table> `
      // const inthtml = `<div class="marsBlackPanel">
      //           <div class="marsBlackPanel-text">示范城市</div>
      //       </div>`
      return inthtml
    }

    // 绑定Tooltip
    graphicLayer.bindTooltip(getInnerHtml, { direction: "right" }).openTooltip()

  }
  bindLayerTooltip(graphicLayer) {
    graphicLayer.bindTooltip(function (event) {
      const attr = event.graphic.attr || {}
      const obj = {}
      obj["类型"] = event.graphic.type
      obj["来源"] = "我是layer上绑定的Popup"
      obj["备注"] = "我支持鼠标交互"

      return mars3d.Util.getTemplateHtml({ title: attr.name, template: "all", attr: obj })

    })
  }

  // 添加周边的圆圈刻度尺等对象
  addOutCircle(graphicLayer) {
    var arrImg = [
      {
        // 刻度
        image: "./3dmap/img/calib.png",
        positions: [
          [73.064329, 65.054741],
          [140.402219, 10.044016]
        ]
      },
      {
        // 刻度尺
        image: "./3dmap/img/calib-value.png",
        positions: [
          [73.062597, 10.056489],
          [140.016593, 65.055444]
        ]
      },
      {
        // 方向
        image: "./3dmap/img/calib-dir.png",
        positions: [
          [76.162597, 12.256489],
          [139.216593, 61.055444]
        ]
      }
    ]

    for (var i = 0; i < arrImg.length; i++) {
      var item = arrImg[i]
      var graphic = new mars3d.graphic.RectanglePrimitive({
        positions: item.positions,
        style: {
          materialType: mars3d.MaterialType.Image2,
          materialOptions: {
            image: item.image,
            opacity: 0.4
          }
        }
      })
      graphicLayer.addGraphic(graphic)
    }
  }

}