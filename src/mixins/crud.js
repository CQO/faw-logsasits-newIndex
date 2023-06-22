export default {
    data() {
        return {
            action: {
                fetchList: (search) => {}
            },
            // 表格数据
            table: {
                datas: []
            },
            // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
            // sort: ['id,desc'],
            pagination: {
                pageNum: 1,
                pageSize: 10,
                total: 0,
                sizes: [10, 20, 50, 100],
                layout: 'total, sizes, ->, prev, pager, next, jumper'
            },
            // 请求数据的url
            url: '',
            // 查询数据的参数
            params: {},
            // 待查询的对象
            query: {},
            // 等待时间
            time: 50,
            // 是否为新增类型的表单
            isAdd: false,
            // 导出的 Loading
            downloadLoading: false,
            // 表格 Loading 属性
            loading: true,
            // 删除 Loading 属性
            delLoading: false,
            delAllLoading: false,
            // 弹窗属性
            dialog: false,
            // Form 表单
            form: {},
            // 重置表单
            resetForm: {},
            // 标题
            title: ''
        }
    },
    methods: {
        async init() {
            if (!await this.beforeInit()) {
                return
            }
            if (!await this.beforeParams()) {
                return
            }
            return new Promise((resolve, reject) => {
                this.loading = true
                console.log('this.getQueryParame()', this.getQueryParame());
                // 请求数据
                this.action.fetchList(this.getQueryParame()).then(data => {
                    if (data.data && data.data.code) {
                        this.pagination.total = data.data.total || 0
                        this.table.datas = data.data.rows || []
                    } else {
                        this.pagination.total = data.total || 0
                        this.table.datas = data.rows || data.data
                    }
                    // time 毫秒后显示表格
                    setTimeout(() => {
                        this.loading = false
                    }, this.time)
                    resolve(data)
                }).catch(err => {
                    this.loading = false
                    reject(err)
                })
            })
        },
        beforeInit() {
            return true
        },
        beforeParams() {
            return true
        },
        getQueryParame: function () {
            return {
                pageNum: this.pagination.pageNum,
                pageSize: this.pagination.pageSize,
                // sort: this.sort,
                ...this.search,
                ...this.params
            }
        },
        // 改变页码
        handleCurrentChange(pageNum) {
            this.pagination.pageNum = pageNum
            this.init()
        },
        // 改变每页显示数
        handleSizeChange(size) {
            this.pagination.pageNum = 1
            this.pagination.pageSize = size
            this.init()
        },
        // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
        delChangePage(size) {
            if (size === undefined) {
                size = 1
            }
            if (this.table.datas.length === size && this.pagination.pageNum !== 1) {
                this.pagination.pageNum = this.pagination.pageNum
            }
        },
        // 查询方法
        toCurrQuery() {
            this.init()
        },
        // 查询方法
        toQuery() {
            this.pagination.pageNum = 1
            this.init()
        },
        /**
         * 通用的提示封装
         */
        submitSuccessNotify() {
            this.$notify({
                title: '提交成功',
                type: 'success',
                duration: 2500
            })
        },
        addSuccessNotify() {
            this.$notify({
                title: '新增成功',
                type: 'success',
                duration: 2500
            })
        },
        editSuccessNotify() {
            this.$notify({
                title: '编辑成功',
                type: 'success',
                duration: 2500
            })
        },
        delSuccessNotify() {
            this.$notify({
                title: '删除成功',
                type: 'success',
                duration: 2500
            })
        },
        notify(title, type) {
            this.$notify({
                title: title,
                type: type,
                duration: 2500
            })
        },
        /**
         * 删除前可以调用 beforeDelMethod 做一些操作
         */
        beforeDelMethod() {
            return true
        },
        /**
         * 通用的删除
         */
        delMethod(id) {
            if (!this.beforeDelMethod()) {
                return
            }
            this.delLoading = true
            this.$confirm('是否确定要删除当前选中的数据?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        const ids = [ id ]
                        return this.crudMethod.del({ ids: ids.join(',') }).then(() => {
                            this.dleChangePage()
                            this.delSuccessNotify()
                            this.afterDelMethod()
                            this.init()
                            done(true);
                        }).catch(() => {
                            this.delLoading = false
                            done(false);
                        }).finally(() => {
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 50);
                        })
                    } else {
                        done();
                    }
                }
            }).catch(() => { });
        },
        afterDelMethod() {},
        /**
         * 多选删除提示
         */
        beforeDelAllMethod() {
            this.$confirm('你确定删除选中的数据吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delAllMethod()
            })
        },
        /**
         * 多选删除
         */
        delAllMethod() {
            this.delAllLoading = true
            const data = this.$refs.table.selection
            const ids = []
            for (let i = 0; i < data.length; i++) {
                ids.push(data[i].id)
            }
            this.crudMethod.delAll(ids).then(() => {
                this.delAllLoading = false
                this.dleChangePage(ids.length)
                this.init()
                this.$notify({
                    title: '删除成功',
                    type: 'success',
                    duration: 2500
                })
            }).catch(() => {
                this.delAllLoading = false
            })
        },
        /**
         * 显示新增弹窗前可以调用该方法
         */
        beforeShowAddForm() {},
        /**
         * 显示新增弹窗
         */
        showAddFormDialog() {
            this.isAdd = true
            this.resetForm = JSON.parse(JSON.stringify(this.form))
            this.beforeShowAddForm()
            this.dialog = true
        },
        /**
         * 显示编辑弹窗前可以调用该方法
         */
        beforeShowEditForm(data) {},
        /**
         * 显示编辑弹窗
         */
        showEditFormDialog(data = '') {
            this.isAdd = false
            if (data) {
                this.resetForm = JSON.parse(JSON.stringify(this.form))
                this.form = JSON.parse(JSON.stringify(data))
            }
            this.beforeShowEditForm(data)
            this.dialog = true
        },
        /**
         * 新增方法
         */
        addMethod() {
            this.crudMethod.add(this.form).then(() => {
                this.addSuccessNotify()
                this.loading = false
                this.afterAddMethod()
                this.cancel()
                this.init()
            }).catch(() => {
                this.loading = false
                this.afterAddErrorMethod()
            })
        },
        /**
         * 新增后可以调用该方法
         */
        afterAddMethod() {},
        /**
         * 新增失败后调用该方法
         */
        afterAddErrorMethod() {},
        /**
         * 通用的编辑方法
         */
        editMethod() {
            this.crudMethod.edit(this.form).then(() => {
                this.editSuccessNotify()
                this.loading = false
                this.afterEditMethod()
                this.cancel()
                this.init()
            }).catch(() => {
                this.loading = false
            })
        },
        /**
         * 编辑后可以调用该方法
         */
        afterEditMethod() {},
        /**
         * 提交前可以调用该方法
         */
        beforeSubmitMethod() {
            return true
        },
        /**
         * 提交
         */
        submitMethod() {
            if (!this.beforeSubmitMethod()) {
                return
            }
            if (this.$refs['form']) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        if (this.isAdd) {
                            this.addMethod()
                        } else this.editMethod()
                    }
                })
            }
        },
        /**
         * 隐藏弹窗
         */
        cancel() {
            this.dialog = false
            if (this.$refs['form']) {
                this.$refs['form'].clearValidate()
                this.form = this.resetForm
            }
        },
        /**
         * 获取弹窗的标题
         */
        getFormTitle() {
            return this.isAdd ? `新增${this.title}` : `编辑${this.title}`
        },
        /**
         * 通用导出
         */
        downloadMethod() {
            this.beforeInit()
            this.downloadLoading = true
            download(this.url + '/download', this.params).then(result => {
                this.downloadFile(result, this.title + '数据', 'xlsx')
                this.downloadLoading = false
            }).catch(() => {
                this.downloadLoading = false
            })
        }
    }
}
