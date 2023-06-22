<template>
    <div class="powerDeployment">
        <div class="top_header">
            <span class="text" @click="toSituation">业&nbsp;务&nbsp;管&nbsp;理</span>
        </div>
        <div class="content_main">
            <iframe :src="srcUrl" frameborder="0" width="100%" height="100%"></iframe>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            srcUrl:window.roterYwglUrl.srcUrl
        }
    }
}
</script>
<style lang='scss' scoped>
.powerDeployment {
    background-image: url("../../../assets/image/homePage/mainBg.png");
    margin: 0;
    height: 100%;
}
.top_header {
    font-size: 30px;
    text-align: center;
    height: 70px;
    padding-top: 20px;
    line-height: 25px;
    background-image: url("../../../assets/image/top_header/titleBg.svg");
    background-size: cover;
    background-position: center;
}
.text {
    font-weight: bold;
    background-image: -webkit-linear-gradient(bottom, #fff, #00e9ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(2px 2px 3px #002153);
}
.content_main {
    height: calc(100% - 70px);
    display: flex;
    justify-content: space-between;
}

</style>