import Vue from 'vue'

/**
 * CRUD配置
 * @param {*} options <br>
 * @return crud instance.
 */
function CRUD(options) {

    /**
     * 默认option
     */
    const defaultOptions = {
        // 标题
        title: '',
        // 表格数据
        data: [],
        // 选择项
        selections: [],
        // 待查询的对象
        search: {},
        // 查询数据的参数
        params: {},
        // Form 表单
        form: {},
        // 重置表单
        defaultForm: () => {},
        // 排序规则，默认 id 降序， 支持多字段排序 ['id,desc', 'createTime,asc']
        sort: ['id,desc'],
        // 等待时间
        time: 50,
        // CRUD Method
        crudMethod: {
          add: (form) => {},
          delete: (ids) => {},
          edit: (form) => {},
          get: (id) => {}
        },
        // 自定义一些扩展属性
        props: {},
        // 调试开关
        debug: false
    }
    /**
     * 合并参数
     */
    options = mergeOptions(defaultOptions, options)

    const data = {
        ...options,
        // 记录数据状态
        dataStatus: {},
        status: {
            add: CRUD.STATUS.NORMAL,
            edit: CRUD.STATUS.NORMAL,
            // 添加或编辑状态
            get cu() {
            if (this.add === CRUD.STATUS.NORMAL && this.edit === CRUD.STATUS.NORMAL) {
                return CRUD.STATUS.NORMAL
            } else if (this.add === CRUD.STATUS.PREPARED || this.edit === CRUD.STATUS.PREPARED) {
                return CRUD.STATUS.PREPARED
            } else if (this.add === CRUD.STATUS.PROCESSING || this.edit === CRUD.STATUS.PROCESSING) {
                return CRUD.STATUS.PROCESSING
            }
            throw new Error('wrong crud\'s cu status')
            },
            // 标题
            get title() {
            return this.add > CRUD.STATUS.NORMAL ? `新增${crud.title}` : this.edit > CRUD.STATUS.NORMAL ? `编辑${crud.title}` : crud.title
            }
        },
        msg: {
            submit: '提交成功',
            add: '新增成功',
            edit: '编辑成功',
            del: '删除成功'
        },
        pagination: {
            // 页码
            pageNum: 0,
            // 每页数据条数
            pageSize: 10,
            // 总数据条数
            total: 0
        },
        // 整体loading
        loading: true,
        // 导出的 Loading
        downloadLoading: false,
        // 删除的 Loading
        delAllLoading: false
    }
    const methods = {
        delSuccessNotify() {
            crud.notify(crud.msg.del, CRUD.NOTIFICATION_TYPE.SUCCESS)
        },
        // 搜索
        toQuery() {
            crud.pagination.pageNum = 1
            crud.refresh()
        },
        // 刷新
        refresh() {
            if (!callVmHook(crud, CRUD.HOOK.beforeRefresh)) {
                return
            }
            return new Promise((resolve, reject) => {
                crud.loading = true
                // 请求数据
                crud.crudMethod.initData(crud.getQueryParams()).then(data => {
                    crud.pagination.total = data.total || 0
                    crud.data = data.rows || data
                    crud.resetDataStatus()
                    // time 毫秒后显示表格
                    setTimeout(() => {
                        crud.loading = false
                        callVmHook(crud, CRUD.HOOK.afterRefresh)
                    }, crud.time)
                    resolve(data)
                }).catch(err => {
                    crud.loading = false
                    reject(err)
                })
            })
        },
        /**
         * 启动删除
         * @param {*} data 数据项
         */
        toDelete(data) {
            crud.getDataStatus(data.id).delete = CRUD.STATUS.PREPARED
        },
        /**
         * 执行删除
         * @param {*} data 数据项
         */
        doDeleteAction(data) {
            let _this = crud.vms[0].vm;
            _this.$confirm('是否确定要删除当前选中的数据?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        let dataStatus
                        const ids = []
                        if (data instanceof Array) {
                            data.forEach(val => {
                                ids.push(val.id)
                            })
                        } else {
                            ids.push(data.id)
                            dataStatus = crud.getDataStatus(data.id)
                        }
                        if (!callVmHook(crud, CRUD.HOOK.beforeDelete, data)) {
                            return
                        }
                        dataStatus.delete = CRUD.STATUS.PROCESSING
                        return crud.crudMethod.del({ ids: ids.join(',') }).then(() => {
                            dataStatus.delete = CRUD.STATUS.PREPARED
                            // crud.delChangePage(1)
                            crud.delSuccessNotify()
                            callVmHook(crud, CRUD.HOOK.afterDelete, data)
                            // crud.refresh()
                            done(true);
                        }).catch(() => {
                            dataStatus.delete = CRUD.STATUS.PREPARED
                            done(false);
                        }).finally(() => {
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 100);
                        })
                    } else {
                        done();
                    }
                }
            }).catch(() => { });


            // let delAll = false
            // let dataStatus
            // const ids = []
            // if (data instanceof Array) {
            //     delAll = true
            //     data.forEach(val => {
            //         ids.push(val.id)
            //     })
            // } else {
            //     ids.push(data.id)
            //     dataStatus = crud.getDataStatus(data.id)
            // }
            // if (!callVmHook(crud, CRUD.HOOK.beforeDelete, data)) {
            //     return
            // }
            // if (!delAll) {
            //     dataStatus.delete = CRUD.STATUS.PROCESSING
            // }
            // return crud.crudMethod.del(ids).then(() => {
            //     if (delAll) {
            //         crud.delAllLoading = false
            //     } else dataStatus.delete = CRUD.STATUS.PREPARED
            //     crud.dleChangePage(1)
            //     crud.delSuccessNotify()
            //     callVmHook(crud, CRUD.HOOK.afterDelete, data)
            //     crud.refresh()
            // }).catch(() => {
            //     if (delAll) {
            //         crud.delAllLoading = false
            //     } else dataStatus.delete = CRUD.STATUS.PREPARED
            // })
        },
        /**
         * 获取查询参数
         */
        getQueryParams: function() {
            return {
                pageNum: crud.pagination.pageNum - 1,
                pageSize: crud.pagination.pageSize,
                sort: crud.sort,
                ...crud.search,
                ...crud.params
            }
        },
        // 当前页改变
        pageChangeHandler(e) {
            crud.pagination.pageNum = e
            crud.refresh()
        },
        // 每页条数改变
        sizeChangeHandler(e) {
            crud.pagination.pageSize = e
            crud.pagination.pageNum = 1
            crud.refresh()
        },
        // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
        delChangePage(size) {
            if (crud.data.length === size && crud.pagination.pageNum !== 1) {
                crud.pagination.pageNum -= 1
            }
        },
        /**
         * 重置数据状态
         */
        resetDataStatus(datas = []) {
            const dataStatus = {}
            function resetStatus(datas) {
                datas.forEach(e => {
                    dataStatus[e.id] = {
                        delete: 0,
                        edit: 0
                    }
                    if (e.children) {
                        resetStatus(e.children)
                    }
                })
            }
            resetStatus(datas || crud.data)
            crud.dataStatus = dataStatus
        },
        /**
         * 重置表单
         * @param {Array} data 数据
         */
        resetForm(data) {
            const form = data || (typeof crud.defaultForm === 'object' ? JSON.parse(JSON.stringify(crud.defaultForm)) : crud.defaultForm())
            const crudFrom = crud.form
            for (const key in form) {
                if (crudFrom.hasOwnProperty(key)) {
                    crudFrom[key] = form[key]
                } else {
                    Vue.set(crudFrom, key, form[key])
                }
            }
        },
        /**
         * 获取数据状态
         * @param {Number | String} id 数据项id
         */
        getDataStatus(id) {
            return crud.dataStatus[id]
        },
        findVM(type) {
            return crud.vms.find(vm => vm && vm.type === type).vm
        },
        notify(title, type = CRUD.NOTIFICATION_TYPE.INFO) {
            crud.vms[0].vm.$notify({
                title,
                type,
                duration: 2500
            })
        },
        updateProp(name, value) {
            Vue.set(crud.props, name, value)
        }
    }
    const crud = Object.assign({}, data)
    // 可观测化
    Vue.observable(crud)
    // 附加方法
    Object.assign(crud, methods)
    // 记录初始默认的查询参数，后续重置查询时使用
    Object.assign(crud, {
        defaultQuery: JSON.parse(JSON.stringify(data.search)),
        // 预留4位存储：组件 主页、头部、分页、表单，调试查看也方便找
        vms: Array(4),
        /**
         * 注册组件实例
         * @param {String} type 类型
         * @param {*} vm 组件实例
         * @param {Number} index 该参数内部使用
         */
        registerVM(type, vm, index = -1) {
            const vmObj = {
                type,
                vm: vm
            }
            if (index < 0) {
                this.vms.push(vmObj)
                return
            }
            this.vms.length = Math.max(this.vms.length, index)
            this.vms.splice(index, 1, vmObj)
        },
        /**
         * 取消注册组件实例
         * @param {*} vm 组件实例
         */
        unregisterVM(vm) {
            this.vms.splice(this.vms.findIndex(e => e && e.vm === vm), 1)
        }
    })
    // 冻结处理，需要扩展数据的话，使用crud.updateProp(name, value)，以crud.props.name形式访问，这个是响应式的，可以做数据绑定
    Object.freeze(crud)
    return crud
}

// hook VM
function callVmHook(crud, hook) {
    if (crud.debug) {
        console.log('callVmHook: ' + hook)
    }
    let ret = true
    const nargs = [crud]
    for (let i = 2; i < arguments.length; ++i) {
        nargs.push(arguments[i])
    }
    // 有些组件扮演了多个角色，调用钩子时，需要去重
    const vmSet = new Set()
    crud.vms.forEach(vm => vm && vmSet.add(vm.vm))
    vmSet.forEach(vm => {
        if (vm[hook]) {
            ret = vm[hook].apply(vm, nargs) !== false && ret
        }
    })
    return ret
}

function mergeOptions(src, opts) {
    const optsRet = {
        ...src
    }
    for (const key in src) {
        if (opts.hasOwnProperty(key)) {
            optsRet[key] = opts[key]
        }
    }
    return optsRet
}

/**
 * crud主页
 */
function presenter(crud) {
    function obColumns(columns) {
        return {
            visible(col) {
                return !columns || !columns[col] ? true : columns[col].visible
            }
        }
    }
    return {
        inject: ['crud'],
        beforeCreate() {
            // 由于initInjections在initProvide之前执行，如果该组件自己就需要crud，需要在initInjections前准备好crud
            this._provided = {
                crud,
                'crud.query': crud.search,
                'crud.pagination': crud.pagination,
                'crud.form': crud.form
            }
        },
        data() {
            return {
                searchToggle: true,
                columns: obColumns()
            }
        },
        methods: {
            // parseTime
        },
        created() {
            this.crud.registerVM('presenter', this, 0)
            if (crud.queryOnPresenterCreated) {
                crud.toQuery()
            }
        },
        beforeDestroy() {
            this.crud.unregisterVM(this)
        },
        mounted() {
            const columns = {}
            this.$refs.table.columns.forEach(e => {
                if (!e.property || e.type !== 'default') {
                    return
                }
                columns[e.property] = {
                    label: e.label,
                    visible: true
                }
            })
            this.columns = obColumns(columns)
            this.crud.updateProp('tableColumns', columns)
        }
    }
}

/**
 * 头部
 */
function header() {
    return {
        inject: {
            crud: {
                from: 'crud'
            },
            query: {
                from: 'crud.search'
            }
        },
        created() {
            this.crud.registerVM('header', this, 1)
        },
        beforeDestroy() {
            this.crud.unregisterVM(this)
        }
    }
}

/**
 * 分页
 */
function pagination() {
    return {
        inject: {
            crud: {
                from: 'crud'
            },
            pagination: {
                from: 'crud.pagination'
            }
        },
        created() {
            this.crud.registerVM('pagination', this, 2)
        },
        beforeDestroy() {
            this.crud.unregisterVM(this)
        }
    }
}

/**
 * 表单
 */
function form(defaultForm) {
    return {
        inject: {
            crud: {
                from: 'crud'
            },
            form: {
                from: 'crud.form'
            }
        },
        created() {
            this.crud.registerVM('form', this, 3)
            this.crud.defaultForm = defaultForm
            this.crud.resetForm()
        },
        beforeDestroy() {
            this.crud.unregisterVM(this)
        }
    }
}

/**
 * crud
 */
function crud(options = {}) {
    const defaultOptions = {
        type: undefined
    }
    options = mergeOptions(defaultOptions, options)
    return {
        inject: {
            crud: {
                from: 'crud'
            }
        },
        created() {
            this.crud.registerVM(options.type, this)
        },
        beforeDestroy() {
            this.crud.unregisterVM(this)
        }
    }
}

/**
 * CRUD钩子
 */
CRUD.HOOK = {
    /** 刷新 - 之前 */
    beforeRefresh: 'beforeCrudRefresh',
    /** 刷新 - 之后 */
    afterRefresh: 'afterCrudRefresh',
    /** 删除 - 之前 */
    beforeDelete: 'beforeCrudDelete',
    /** 删除 - 之后 */
    afterDelete: 'afterCrudDelete',
    /** 删除取消 - 之前 */
    beforeDeleteCancel: 'beforeCrudDeleteCancel',
    /** 删除取消 - 之后 */
    afterDeleteCancel: 'afterCrudDeleteCancel',
    /** 新建 - 之前 */
    beforeToAdd: 'beforeCrudToAdd',
    /** 新建 - 之后 */
    afterToAdd: 'afterCrudToAdd',
    /** 编辑 - 之前 */
    beforeToEdit: 'beforeCrudToEdit',
    /** 编辑 - 之后 */
    afterToEdit: 'afterCrudToEdit',
    /** 开始 "新建/编辑" - 之前 */
    beforeToCU: 'beforeCrudToCU',
    /** 开始 "新建/编辑" - 之后 */
    afterToCU: 'afterCrudToCU',
    /** "新建/编辑" 验证 - 之前 */
    beforeValidateCU: 'beforeCrudValidateCU',
    /** "新建/编辑" 验证 - 之后 */
    afterValidateCU: 'afterCrudValidateCU',
    /** 添加取消 - 之前 */
    beforeAddCancel: 'beforeCrudAddCancel',
    /** 添加取消 - 之后 */
    afterAddCancel: 'afterCrudAddCancel',
    /** 编辑取消 - 之前 */
    beforeEditCancel: 'beforeCrudEditCancel',
    /** 编辑取消 - 之后 */
    afterEditCancel: 'afterCrudEditCancel',
    /** 提交 - 之前 */
    beforeSubmit: 'beforeCrudSubmitCU',
    /** 提交 - 之后 */
    afterSubmit: 'afterCrudSubmitCU',
    afterAddError: 'afterCrudAddError',
    afterEditError: 'afterCrudEditError'
    }

/**
 * CRUD状态
 */
CRUD.STATUS = {
    NORMAL: 0,
    PREPARED: 1,
    PROCESSING: 2
}

/**
 * CRUD通知类型
 */
CRUD.NOTIFICATION_TYPE = {
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info',
    ERROR: 'error'
}

export default CRUD

export {
    presenter,
    header,
    form,
    pagination,
    crud
}