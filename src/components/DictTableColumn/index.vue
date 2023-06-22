<template>
    <el-table-column :prop="prop" :label="label" :width="width" :align="align" >
        <template slot-scope="scope">
            <span v-if="$store.state.dict[dictField]">{{ $store.state.dict[dictField][scope.row[scope.column.property]] }}</span>
            <span v-else>{{ scope.row[scope.column.property] }}</span>
        </template>
    </el-table-column>
</template>

<script>
export default {
    name: 'DictTableColumn',
    props: {
        label: String,
        prop: String,
        width: {},
        align: {
            type: String,
            default: 'center'
        },
        dictField: String,
    },
    data() {
        return {
        }
    },
    // computed: {
    //     dict() {
    //         return typeof this.width == 'string' ? this.width : `${this.width}px`
    //     }
    // },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.el-image {
    border-radius: 5px;
    background-color: #ebeef5;
    box-shadow: 0 0 5px 1px #ccc;
    ::v-deep .el-image__inner {
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
        }
    }
    ::v-deep .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #909399;
        font-size: 30px;
    }
}
</style>
