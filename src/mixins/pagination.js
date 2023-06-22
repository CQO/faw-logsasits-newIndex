export default {
    data() {
        return {
            loading: false,
            fetchMethodName: 'fetchList',
            sort: null,
            order: null,
            pagination: {
                pageNum: 1,
                pageSize: 10,
                total: 0,
                sizes: [10, 20, 50, 100],
                layout: 'total, sizes, ->, prev, pager, next, jumper'
            }
        }
    },
    methods: {
        getParams(params = {}) {
            console.log('this', this.pagination)
            const baseParams = {
                // from: (this.pagination.page - 1) * this.pagination.pageSize,
                // limit: this.pagination.pageSize
                pageNum: this.pagination.pageNum,
                pageSize: this.pagination.pageSize
            }
            if (this.sort && this.order) {
                baseParams.sort = this.sort
                baseParams.order = this.order
            }
            Object.assign(baseParams, params)
            return baseParams
        },
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize
            this.handleFetchMethod();
        },
        handleCurrentChange(page) {
            this.pagination.pageNum = page
            this.handleFetchMethod();
        },
        onSortChange(params) {
            if (params.order) {
                this.sort = params.prop
                this.order = params.order === 'ascending' ? 'asc' : 'desc'
            } else {
                this.sort = null
                this.order = null
            }
            this.handleFetchMethod();
        },
        handleFetchMethod() {
            if (!this.fetchMethodName) {
                this.fetchMethodName = 'fetchList'
            }
            if (!Object.keys(this.$options.methods).includes(this.fetchMethodName)) {
                console.error('未找到 分页混入器 -> 获取方法 函数.');
                return;
            }
            this.$options.methods[this.fetchMethodName].call(this);
        }
    }
}
