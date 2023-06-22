<template>
    <div class="acountEchart">
        <div class="echartItem">
            <span class="echartSpa">保障批次监控</span>
            <batchMonitoring></batchMonitoring>
        </div>
        <div class="echartItem">
            <span class="echartSpa">计划监控</span>
            <planMonitoring></planMonitoring>
        </div>
        <div class="echartItem">
            <span class="echartSpa">运单监控</span>
            <corderMonitor></corderMonitor>
        </div>
    </div>
</template>
<script>
import batchMonitoring from "./batchMonitoring"
import planMonitoring from "./planMonitoring";
import corderMonitor from "./corderMonitor"


export default{
    components:{
        batchMonitoring,
        corderMonitor,
        planMonitoring
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
.acountEchart{
    display:flex
}
.echartItem{
    width:100%;
    margin-left:10px
}
.echartSpa{
    color:#fff;
    text-align:center
}
</style>