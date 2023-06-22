<template>
    <div class="layout">
        <div id="app-main">
            <transition name="header">
                <!-- <header v-if="$store.state.settings.mode == 'pc' && $store.state.settings.showHeader">
                    <div class="header-container">
                        <div class="main">
                            <Logo />
                            <div v-if="$store.state.menu.routes.length > 1" class="nav">
                                <template v-for="(item, index) in $store.state.menu.routes">
                                    <div v-if="item.children && item.children.length !== 0" :key="index" :class="{
                                        'item': true,
                                        'active': index == $store.state.menu.headerActived
                                    }" @click="switchMenu(index)"
                                    >
                                        <svg-icon v-if="item.meta.icon" :name="item.meta.icon" class="icon" />
                                        <span v-if="item.meta.title">{{ item.meta.title }}</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <UserMenu />
                    </div>
                </header> -->
                <VisualiseHeader />
            </transition>
            <div class="wrapper">
                <div class="main-container" :style="{'padding-bottom': $route.meta.paddingBottom}">
                    <div class="main">
                        <transition name="main" mode="out-in">
                            <keep-alive v-if="isRouterAlive" :include="$store.state.keepAlive.list">
                                <RouterView :key="$route.path" />
                            </keep-alive>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import VisualiseHeader from './components/VisualiseHeader'
export default {
    name: 'VisualiseLayout',
    components: {
        VisualiseHeader
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true,
            routePath: '',
            sidebarScrollTop: 0,
            scrollTop: 0
        }
    },
    watch: {
        $route: 'routeChange',
        '$store.state.settings.sidebarCollapse'(val) {
            if (this.$store.state.settings.mode == 'mobile') {
                if (!val) {
                    document.querySelector('body').classList.add('hidden')
                } else {
                    document.querySelector('body').classList.remove('hidden')
                }
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        reload(type = 1) {
            if (this.$store.state.settings.enableTabbar) {
                let path = this.$route.meta.activeMenu || this.$route.fullPath
                let name
                this.$store.state.tabbar.list.map(v => {
                    if (v.path == path) {
                        name = v.name
                    }
                })
                if (name) {
                    this.$store.commit('keepAlive/remove', name)
                    this.$router.push({
                        name: 'reload'
                    })
                    this.$nextTick(() => {
                        this.$store.commit('keepAlive/add', name)
                    })
                }
            } else {
                if (type == 1) {
                    this.isRouterAlive = false
                    this.$nextTick(() => (this.isRouterAlive = true))
                } else {
                    this.$router.push({
                        name: 'reload'
                    })
                }
            }
        },
        routeChange(newVal, oldVal) {
            if (newVal.name == oldVal.name) {
                this.reload()
            }
        },
        onSidebarScroll(e) {
            this.sidebarScrollTop = e.target.scrollTop
        },
        onScroll() {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        }
    }
}
</script>

<style lang="scss" scoped>
[data-layout=adaption] {
    #app-main {
        width: 100%;
        height: 100vh;
        // background: url('/images/common/all-bg.png') repeat;
        background: #041224;
    }
}
[data-layout=adaption-min-width] {
    #app-main {
        min-width: $g-app-width;
    }
}
[data-layout=center] {
    #app-main {
        width: $g-app-width;
    }
}
[data-layout=center-max-width] {
    #app-main {
        width: $g-app-width;
        max-width: 100%;
    }
}
.layout {
    height: 100%;
}
#app-main {
    height: 100%;
    margin: 0 auto;
    transition: all 0.2s;
}
header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: $g-header-height;
    @include themeify {
        color: themed('g-header-color');
        background-color: themed('g-header-bg');
    }
    .header-container {
        width: $g-header-width;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .main {
            display: flex;
            align-items: center;
        }
    }
    @media screen and (max-width: $g-header-width) {
        .header-container {
            width: 100%;
        }
    }
    ::v-deep .title {
        position: relative;
        width: inherit;
        height: inherit;
        padding: inherit;
        background-color: inherit;
        .logo {
            width: 50px;
            height: 50px;
        }
        span {
            font-size: 24px;
            letter-spacing: 1px;
            @include themeify {
                color: themed('g-header-color');
            }
        }
    }
    .nav {
        display: flex;
        margin-left: 50px;
        .item {
            margin: 0 10px;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s;
            @include themeify {
                background-color: themed('g-header-bg');
                color: themed('g-header-menu-color');
            }
            &:hover {
                @include themeify {
                    color: themed('g-header-menu-hover-color');
                    background-color: themed('g-header-menu-hover-bg');
                }
            }
            &.active {
                @include themeify {
                    color: themed('g-header-menu-active-color');
                    background-color: themed('g-header-menu-active-bg');
                }
            }
            .icon {
                font-size: 20px;
                vertical-align: middle;
                & + span {
                    margin-left: 5px;
                    vertical-align: middle;
                }
            }
        }
    }
    ::v-deep .user {
        padding: 0;
        .tools [class^=ri-] {
            @include themeify {
                color: themed('g-header-color');
            }
        }
        .user-container {
            font-size: 16px;
            @include themeify {
                color: themed('g-header-color');
            }
        }
    }
}
.wrapper {
    position: relative;
    width: 100%;
    height: calc(100%);
    .sidebar-container {
        position: fixed;
        z-index: 1010;
        top: 0;
        bottom: 0;
        display: flex;
        transition: transform 0.3s;
        transform: transition3d(0, 0, 0);
        @include themeify {
            box-shadow: -1px 0 0 0 darken(themed('g-main-bg'), 10);
        }
    }
    .sidebar-mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.5);
        backdrop-filter: blur(2px);
        transition: all 0.2s;
        transform: translateZ(0);
        opacity: 0;
        visibility: hidden;
        &.show {
            opacity: 1;
            visibility: visible;
        }
    }
    .main-sidebar-container,
    .sub-sidebar-container {
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        // firefox隐藏滚动条
        scrollbar-width: none;
        // chrome隐藏滚动条
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .main-sidebar-container {
        position: relative;
        z-index: 1;
        width: $g-main-sidebar-width;
        @include themeify {
            color: themed('g-main-sidebar-menu-color');
            background-color: themed('g-main-sidebar-bg');
        }
        .sidebar-logo {
            transition: 0.3s;
            @include themeify {
                background-color: themed('g-main-sidebar-bg');
            }
        }
        .nav {
            width: inherit;
            padding-top: $g-sidebar-logo-height;
            .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                height: 60px;
                padding: 0 5px;
                cursor: pointer;
                transition: color 0.3s, background-color 0.3s;
                &:hover {
                    @include themeify {
                        color: themed('g-main-sidebar-menu-hover-color');
                        background-color: themed('g-main-sidebar-menu-hover-bg');
                    }
                }
                &.active {
                    @include themeify {
                        color: themed('g-main-sidebar-menu-active-color');
                        background-color: themed('g-main-sidebar-menu-active-bg');
                    }
                }
                .icon {
                    margin: 0 auto;
                    font-size: 20px;
                }
                span {
                    text-align: center;
                    font-size: 14px;
                    @include text-overflow;
                }
            }
        }
    }
    .sub-sidebar-container {
        width: $g-sub-sidebar-width;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        transition: 0.3s;
        @include themeify {
            background-color: themed('g-sub-sidebar-bg');
            box-shadow: 10px 0 10px -10px darken(themed('g-sub-sidebar-bg'), 20);
        }
        &.is-collapse {
            width: 64px;
            .sidebar-logo {
                &:not(.sidebar-logo-bg) {
                    display: none;
                }
                ::v-deep span {
                    display: none;
                }
            }
        }
        .sidebar-logo {
            transition: box-shadow 0.2s, background-color 0.3s, color 0.3s;
            @include themeify {
                background-color: themed('g-sub-sidebar-bg');
            }
            &:not(.sidebar-logo-bg) {
                ::v-deep span {
                    @include themeify {
                        color: themed('g-sub-sidebar-menu-color');
                    }
                }
            }
            &.sidebar-logo-bg {
                @include themeify {
                    background-color: themed('g-main-sidebar-bg');
                }
            }
            &.shadow {
                @include themeify {
                    box-shadow: 0 10px 10px -10px darken(themed('g-sub-sidebar-bg'), 20);
                }
            }
        }
        .el-menu {
            border-right: 0;
            padding-top: $g-sidebar-logo-height;
            transition: border-color 0.3s, background-color 0.3s, color 0.3s;
            @include themeify {
                background-color: themed('g-sub-sidebar-bg');
            }
            &:not(.el-menu--collapse) {
                width: inherit;
            }
            &.is-collapse-without-logo {
                padding-top: 0;
            }
            &.el-menu--collapse {
                ::v-deep .icon {
                    margin-right: 0;
                }
                ::v-deep .el-menu-item,
                ::v-deep .el-submenu__title {
                    span {
                        display: none;
                    }
                    i {
                        right: 7px;
                        margin-top: -5px;
                    }
                }
            }
        }
    }
    .main-sidebar-container + .sub-sidebar-container {
        left: $g-main-sidebar-width;
    }
    .main-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: margin-left 0.3s;
        @include themeify {
            // background-color: themed('g-main-bg');
            box-shadow: 1px 0 0 0 darken(themed('g-main-bg'), 10);
        }
        .tabbar-container + .topbar-container {
            top: $g-tabbar-height;
            z-index: 998;
        }
        .topbar-container + .tabbar-container {
            top: $g-topbar-height;
        }
        .main {
            height: 100%;
            flex: auto;
            position: relative;
            padding: $g-topbar-height 0 0;
            overflow: hidden;
            transition: 0.3s;
        }
        .topbar-container + .main {
            padding: calc(#{$g-topbar-height}) 0 0;
        }
        .tabbar-container + .topbar-container + .main,
        .topbar-container + .tabbar-container + .main {
            padding: calc(#{$g-tabbar-height} + #{$g-topbar-height}) 0 0;
        }
    }
}
header + .wrapper {
    padding-top: $g-header-height;
    .sidebar-container {
        top: $g-header-height;
        .sidebar-logo {
            display: none;
        }
        .el-menu {
            padding-top: 0;
        }
    }
    .main-container {
        .tabbar-container {
            top: $g-header-height;
        }
        .topbar-container {
            top: $g-header-height;
            ::v-deep .user {
                display: none;
            }
        }
        .tabbar-container + .topbar-container {
            top: calc(#{$g-header-height} + #{$g-tabbar-height});
        }
    }
}

// 主内容区动画
.main-enter-active {
    transition: 0.2s;
}
.main-leave-active {
    transition: 0.15s;
}
.main-enter {
    opacity: 0;
    margin-left: -20px;
}
.main-leave-to {
    opacity: 0;
    margin-left: 20px;
}
</style>
