<template>
    <div class="chart-legend-component" >
        <div v-for="(item, index) in records" :key="index" >
            <div :class="{ 'square-item': item.type === 'square', 'line-item': item.type === 'line' }" :style="{
                background: item.background
            }"></div>
            {{ item.text }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChartLegend',
    props: {
        records: {
            type: Array,
            default: () => {
                return [];
            }
        },
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.chart-legend-component {
    display: flex;
    flex-direction: row;
    position: relative;
    color: #d9d9d9;
    font-size: 8px;
    .item {
        display: inline-block;
        background: #20ced7;
        border-radius: 1px;
        width: 12px;
        margin-right: 4px;
        vertical-align: middle;
        margin-left: 6px;
    }
    .line-item {
        @extend .item;

        width: 16px;
        height: 3px;
    }
    .square-item {
        @extend .item;

        border-radius: 2px;
        width: 12px;
        height: 12px;
    }
}
</style>
