<template>
    <div class="user-page">

        <!-- <page-main style="margin: 0;">
            <search-bar>
                <el-form :model="search" size="small" label-width="100px" label-suffix="：">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="物品编码">
                                <el-input v-model="search.in.item" placeholder="请输入物品编码" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="工厂">
                                <el-input v-model="search.in.werks" placeholder="请输入工厂" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" style="text-align: right;">
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="toQuery">查询</el-button>
                                <el-button type="primary" icon="el-icon-coffee" plain @click="handleResetForm">清空</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </search-bar>
        </page-main> -->

        <page-main style="margin: 0;">
            <div class="operator-btns">
                <el-button type="primary" icon="el-icon-download" size="small" @click="$refs.editComponent.show({})">新增</el-button>
            </div>
            <el-table ref="table" class="list-table" :data="table.datas" border stripe highlight-current-row>
                <el-table-column type="index" width="50" align="center" />
                <el-table-column prop="username" label="用户名" width="200" align="center" />
                <el-table-column prop="realName" label="真实姓名" width="200" align="center" />
                <el-table-column prop="disableFlag" label="是否禁用" width="120" align="center" >
                    <template slot-scope="{ row }">
                        <span v-if="row.disableFlag === 0">启用</span>
                        <span v-else-if="row.disableFlag === 1">禁用</span>
                    </template>
                </el-table-column>
                <el-table-column prop="isAdmin" label="是否为管理员" width="200" align="center" >
                    <template slot-scope="{ row }">
                        <span v-if="row.isAdmin === 0">普通用户(小程序/大屏)</span>
                        <span v-else-if="row.isAdmin === 1">管理员</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述" show-overflow-tooltip align="center" />
                <el-table-column prop="createTime" label="创建时间" width="160" align="center" >
                    <template slot-scope="{ row }">
                        <span v-if="row.createTime">{{ $dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="expiredTime" label="过期时间" width="150" align="center" >
                    <template slot-scope="{ row }">
                        <span v-if="row.expiredTime">{{ $dayjs(row.expiredTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </template>
                </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="200" align="center">
                    <template slot-scope="{ row }">
                        <el-button type="primary" size="mini" plain @click="handleShowEditAction(row)">编辑</el-button>
                        <el-button type="danger" size="mini" plain @click="handleDeleteAction(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="pagination.pageNum" :total="pagination.total" :page-size="pagination.pageSize" layout="total, sizes, ->, prev, pager, next, jumper" :hide-on-single-page="false" class="pagination"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </page-main>

        <EditComponent ref="editComponent" @on-refresh="toCurrQuery"></EditComponent>
    </div>
</template>

<script>
import EditComponent from '@/views/user/edit'
import SystemAPI from '@/api/modules/system'
import CrudMixin from '@/mixins/crud.js'
import { exportFile } from '@/util/export.file'
import { baseURL } from '@/api/index'

export default {
    mixins: [ CrudMixin ],
    components: {
        EditComponent
    },
    data() {
        return {
            baseURL,
            search: {
            },
            fullLoading: undefined
        }
    },
    mounted() {
        this.toQuery()
    },
    methods: {
        handleResetForm() {
            Object.assign(this.$data.search, this.$options.data().search);
            this.toQuery();
        },
        beforeInit() {
            this.action.fetchList = SystemAPI.fetchList;
            return true;
        },
        handleDownloadTemplate() {
            let a = document.createElement('a')
            a.href = 'http://10.0.40.94:10047/template/download/集团工时维护上传模板.xlsx'
            a.click();
        },
        handleExportTable(id) {
            exportFile('/data-query/export', '集团工时维护 - 数据导出.xlsx', 'POST', {
                ...this.search,
                exports: [
                    { enName: 'item', cnName: '物品编码' },
                    { enName: 'werks', cnName: '工厂' },
                    { enName: 'ope', cnName: '工序号' },
                    { enName: 'ope_desc', cnName: '工艺' },
                    { enName: 'res', cnName: '输入/输出物品/资源' },
                    { enName: 'runtime', cnName: '单位输入/输出量/额定工时' },
                ]
            });
        },
        handleShowEditAction(row) {
            this.$refs.editComponent.show({ ...row });
        },
        handleDeleteAction(row) {
            this.$confirm('是否确定要删除当前选中的数据?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        SystemAPI.execDel({ id: row.id }).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.toCurrQuery();
                            done(true);
                        }).catch(() => {
                            done(false);
                        }).finally(() => {
                            instance.confirmButtonLoading = false;
                        });
                    } else {
                        done();
                    }
                }
            }).catch(() => { });
        }
    }
}
</script>
