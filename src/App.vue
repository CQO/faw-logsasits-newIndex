<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <RouterView />
        </transition>
        
    </div>
</template>

<script>
export default {
    provide() {
        return {
            generateI18nTitle: this.generateI18nTitle
        }
    },
    data() {
        return {
        }
    },
    watch: {
        $route: {
            handler: 'routeChange',
            immediate: true
        },
        '$store.state.keepAlive.list'(val) {
            process.env.NODE_ENV == 'development' && console.log(`[ keepAliveList ] ${val}`)
        },
        '$store.state.settings.mode': {
            handler() {
                if (this.$store.state.settings.mode == 'pc') {
                    this.$store.commit('settings/updateThemeSetting', {
                        'sidebarCollapse': this.$store.state.settings.sidebarCollapseLastStatus
                    })
                } else if (this.$store.state.settings.mode == 'mobile') {
                    this.$store.commit('settings/updateThemeSetting', {
                        'sidebarCollapse': true
                    })
                }
                document.body.setAttribute('data-mode', this.$store.state.settings.mode)
            },
            immediate: true
        },
        '$store.state.settings.layout': {
            handler() {
                document.body.setAttribute('data-layout', this.$store.state.settings.layout)
            },
            immediate: true
        },
        '$store.state.settings.theme': {
            handler() {
                document.body.setAttribute('data-theme', this.$store.state.settings.theme)
            },
            immediate: true
        },
        '$store.state.settings.showHeader': {
            handler() {
                document.body.removeAttribute('data-no-main-sidebar')
                if (this.$store.state.settings.showHeader || (this.$store.state.menu.routes.length <= 1 && !this.$store.state.settings.alwaysShowMainSidebar)) {
                    document.body.setAttribute('data-no-main-sidebar', '')
                }
            },
            immediate: true
        },
        '$store.state.menu.routes': {
            handler() {
                document.body.removeAttribute('data-no-main-sidebar')
                if (this.$store.state.settings.showHeader || (this.$store.state.menu.routes.length <= 1 && !this.$store.state.settings.alwaysShowMainSidebar)) {
                    document.body.setAttribute('data-no-main-sidebar', '')
                }
            },
            immediate: true,
            deep: true
        },
        '$store.state.settings.sidebarCollapse': {
            handler() {
                document.body.removeAttribute('data-sidebar-no-collapse')
                document.body.removeAttribute('data-sidebar-collapse')
                if (this.$store.state.settings.sidebarCollapse) {
                    document.body.setAttribute('data-sidebar-collapse', '')
                } else {
                    document.body.setAttribute('data-sidebar-no-collapse', '')
                }
            },
            immediate: true
        }
    },
    mounted() {
        console.log(process.env.NODE_ENV,'环境12366666666');
        console.log(process.env.VUE_APP_API_ROOT,'接口IP7777777');
        window.onresize = () => {
            this.$store.commit('settings/setMode', document.body.clientWidth)
            if (window.resetRem) {
                window.resetRem();
            }
        }
        window.onresize()
    },
    created(){
        if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    },
    methods: {
        // 路由 title 转国际化，如果没有配置则默认显示 title
        generateI18nTitle(key, defaultTitle) {
            let title
            if (this.$te(key)) {
                title = this.$t(key)
            } else {
                title = defaultTitle
            }
            return title
        },
        // 监听路由变化，更新页面 title
        routeChange() {
            this.$route.meta.title && this.$store.commit('settings/setTitle', this.generateI18nTitle(this.$route.meta.i18n, this.$route.meta.title))
        },
        close() {
            console.log('socket已经关闭')
        }
    },
    metaInfo() {
        return {
            title: this.$store.state.settings.enableDynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    }
}
</script>

<style scoped>
body { overflow: hidden; }
::v-deep ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background-color: #00162b !important;
}
::v-deep ::-webkit-scrollbar:hover {
    width: 6px;
    height: 8px;
    background-color: #00162b !important;
}
::v-deep ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #023776 !important;
}
::v-deep ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    //background: green !important;
}
::v-deep .el-table::before {
    background: none !important;
}
::v-deep .el-table__fixed-right::before {
    background: none !important;
}
::v-deep .el-table__fixed::before {
    background: none !important;
}
#app {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    background-image: url('./assets/image/homePage/mainBg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: fixed;
}
</style>
<style lang="scss">
.btnSty {
    width: 123px;
    height: 40px;
    background: rgba(0, 47, 81, 0.1);
    box-shadow: none !important;
    border-radius: 5px 5px 5px 5px;
    opacity: 1;
    border: 1px solid #36aaff;
    color: #fff;
    text-align: center;
    line-height: 40px;

    &:hover{
    box-shadow: inset 0 0 20px 0 #00d1ff !important;
    }
}
.el-table__header {
    th {
        background: #fafafa;
    }
}
.operator-btns {
    padding-bottom: 20px;
}
.el-pagination {
    margin-left: 20px;
    margin-top: 20px;
    width: 80%;
}
.el-col-md-6 {
    width: 20%;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
    background: #021d6d !important;
    color: rgba(255, 255, 255, 0.5) !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    color: #01ffff !important;
}
.el-input__inner {
    background: rgba(0, 34, 75, 0.5) !important;
    //box-shadow: 0 0 10px #386fcf inset;
    border: 1px solid #0072ff !important;
    color: #fff !important;
}
.el-form-item__label {
    color: #fff !important;
    font-size: 16px;
}
.el-pagination__jump {
    color: rgba(255, 255, 255, 0.5) !important;
}
.fade-enter {
    opacity: 0;
}
.fade-leave {
    opacity: 1;
}
.fade-enter-active {
    transition: opacity 0.5s;
}
.fade-leave-active {
    opacity: 0;
    transition: opacity 0.5s;
}

/* 自定义切换动画 */

/* 元素刚进入的状态 */
.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}

/* 被激活时 */
.v-enter-active {
    transition: all 0.5s;
}

/* 元素完全进入后的状态 */
.v-enter-to,
.v-leave {
    opacity: 1;
    transform: translateX(0);
}

/* 元素离开前的状态 */
.v-leave {
    transform: translateX(0);
    opacity: 1;
}
.v-leave-active {
    transition: all 0.3s;
}

/* 元素离开后的状态 */
.v-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
::v-deep .el-table th.el-table__cell {
    background: #054480;
    color: #fff;
    border-bottom: 5px solid #112d82;
}
::v-deep .el-table td.el-table__cell {
    background: #094185;
    color: #fff;
    border-bottom: 1px solid #112d82;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
    border-top: 1px solid #01ffff;
    border-bottom: 1px solid #01ffff;
    background: #094185 !important;
    //box-shadow: 0 0 15px #386fcf inset;

    /* color: #f19944; */

    /* 设置文字颜色，可以选择不设置 */
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td:first-child {
    border-left: 1px solid #01ffff;

    /* color: #f19944; */

    /* 设置文字颜色，可以选择不设置 */
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover {
    box-shadow: 0 0 15px #386fcf !important;
    //border-image: linear-gradient(to right bottom, #4636ff, #00e0ff) 1 10;
    & > td {
        background-color: #094185 !important;
    }
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td:last-child {
    border-right: 1px solid #01ffff;

    /* color: #f19944; */

    /* 设置文字颜色，可以选择不设置 */
}
::v-deep .el-table::before {
    background: none !important;
}
.el-table__body-wrapper::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #ebeef5;
}
::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ebeef5;
}
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: rgba(255, 255, 255, 1);
}
::v-deep .cim-animation-point span{
    display: none !important;
}
</style>
