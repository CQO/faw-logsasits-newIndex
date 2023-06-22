<template>
    <div class="map3d_container_parents">
    
        <div id="etsMapContainer" class="map3d_container" style="background-image: url(/map/img/bg2.png);"></div>
        <div id="moveTips" class="cimMap-popup" style="display: none;">
            <!--<a id="cimMapContainerpopup_16-popup-close" data-id="cimMapContainerpopup_16"
                class="cimMap-popup-close-button cimMap-popup-color">×</a>-->
            <div class="cimMap-popup-content-wrapper cimMap-popup-background">
                <div class="cimMap-popup-content cimMap-popup-color">
                    <div class="mars-popup-titile" id="moveTIpsTitle">设备</div>
                    <div class="mars-popup-content" id="moveTipsMain">

                    </div>
                </div>
            </div>
            <div class="cimMap-popup-tip-container">
                <div class="cimMap-popup-tip cimMap-popup-background"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import mapLayer from './mapLayer'
    import { mapState } from 'vuex'
    // import textpoint from "../../../../../public/3dmap/json/Testpoint.json"

    export default {
        name: "map3d",
        props:['pointLayerData','searchPointData'],
        components: {
        },
        data() {
            return {
                add3dmap:null
            }
        },
        computed: {
            ...mapState({
                mapCkthdData: function (state) {
                    return state.map3D.mapCkthdData
                },
                mapWlckData: function (state) {
                    return state.map3D.mapWlckData
                },
                mapSgdwData: function (state) {
                    return state.map3D.mapSgdwData
                },
                mapLineData: function (state) {
                    return state.map3D.mapLineData
                },
                mapGcthData: function (state) {
                    return state.map3D.mapGcthData
                },
                searchCkthdData: function (state) {
                    return state.map3D.searchCkthdData
                },
                searchWlckData: function (state) {
                    return state.map3D.searchWlckData
                },
                searchSgdwData: function (state) {
                    return state.map3D.searchSgdwData
                },
                searchpLineData: function (state) {
                    return state.map3D.searchLineData
                },
                searchGcthData: function (state) {
                    return state.map3D.searchGcthData
                }
            })
        },
       watch:{ 
            pointLayerData:{
                handler(newVal,oled) {
                    if(newVal){
                        this.add3dmap.controlLayer(newVal)
                    }
                },
                deep:true
            },
            mapCkthdData:{
                handler(newVal,oled) {
                    if(newVal.length>0){
                        this.add3dmap.addPoint(newVal)
                    }
                },
                deep:true
            },
            mapWlckData:{
                handler(newVal,oled) {
                    if(newVal.length>0){
                        this.add3dmap.addPoint(newVal)
                    }
                },
                deep:true
            },
            mapSgdwData:{
                handler(newVal,oled) {
                    if(newVal.length>0){
                        this.add3dmap.addPoint(newVal)
                    }
                },
                deep:true
            },
            mapLineData:{
                handler(newVal,oled) {
                    if(newVal){
                        this.add3dmap.addODLine(newVal)
                    }
                },
                deep:true
            },
            mapGcthData:{
                handler(newVal,oled) {
                    if(newVal){
                        this.add3dmap.addPoint(newVal)
                    }
                },
                deep:true
            },
            searchCkthdData:{
                handler(newVal,oled) {
                    if(newVal.length>0){
                        this.add3dmap.addSearcgPoint(newVal)
                    }
                },
                deep:true
            },
            searchWlckData:{
                handler(newVal,oled) {
                    if(newVal.length>0){
                        this.add3dmap.addSearcgPoint(newVal)
                    }
                },
                deep:true
            },
            searchSgdwData:{
                handler(newVal,oled) {
                    if(newVal.length>0){
                        this.add3dmap.addSearcgPoint(newVal)
                    }
                },
                deep:true
            },
            searchLineData:{
                handler(newVal,oled) {
                    if(newVal){
                        this.add3dmap.addSearcgPoint(newVal)
                    }
                },
                deep:true
            },
            searchGcthData:{
                handler(newVal,oled) {
                    if(newVal){
                        this.add3dmap.addSearcgPoint(newVal)
                    }
                },
                deep:true
            },
            searchPointData:{
                handler(newVal,oled) {
                    this.add3dmap.searchPoint(newVal)
                },
                deep:true
            }
        },
        mounted() {
            this.add3DMap()
        },
        created() {

        },
        destroyed() {
            this.clearInter()
        },
        methods: {
            add3DMap(){
                this.add3dmap=new mapLayer();
                this.add3dmap.init();
            }
        },
    };
</script>
<style lang='scss' scoped>
.map3d_container_parents {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .map3d_container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        position: relative;
    }
}

</style>
