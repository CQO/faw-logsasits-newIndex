<template>
    <el-dialog :title="reqForm.id ? '编辑' : '新增'" width="600px" :visible.sync="visible" :modal-append-to-body="false" :close-on-click-modal="false" @close="close">
        <el-form ref="reqForm"  :model="reqForm" :rules="reqFormRules" label-width="110px" size="small">
            <el-row :gutter="20" class="block-row">
                <el-col :md="24">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="reqForm.username" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :md="24">
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="reqForm.password" :placeholder="reqForm.id ? '请输入密码, 如填写则为修改密码' : '请输入密码, 默认为: 123456'" />
                    </el-form-item>
                </el-col>
                <el-col :md="24">
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input v-model="reqForm.realName" placeholder="请输入" />
                    </el-form-item>
                </el-col>
                <el-col :md="24">
                    <el-form-item label="是否禁用" prop="disableFlag">
                        <!-- <el-input type="number" v-model="reqForm.disableFlag" placeholder="请输入" /> -->
                        <el-select v-model="reqForm.disableFlag" placeholder="请选择" style="width: 100%;">
                            <el-option label="启用" :value="0" ></el-option>
                            <el-option label="禁用" :value="1" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- <el-col :md="24">
                    <el-form-item label="是否为管理员" prop="isAdmin">
                        <el-select v-model="reqForm.isAdmin" placeholder="请选择" style="width: 100%;">
                            <el-option label="否" :value="0" ></el-option>
                            <el-option label="是" :value="1" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> -->
                <!-- <el-col :md="24">
                    <el-form-item label="过期时间" prop="expiredTime">
                        <el-input v-model="reqForm.expiredTime" placeholder="请输入" />
                    </el-form-item>
                </el-col> -->
                <el-col :md="24">
                    <el-form-item label="描述" prop="description">
                        <el-input type="textarea" :rows="5" v-model="reqForm.description" placeholder="请输入" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer">
            <el-button size="small" @click="close">取消</el-button>
            <el-button size="small" type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import SystemAPI from '@/api/modules/system'
export default {
    components: {

    },
    data() {
        return {
            visible: false,
            loading: false,
            reqForm: {
                id: undefined,
            },
            reqFormRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' }
                ],
            }
        }
    },
    mounted() {
    },
    methods: {
        show(row) {
            this.reqForm = row;
            this.visible = true
        },
        close() {
            Object.assign(this.$data.reqForm, this.$options.data().reqForm);
            this.$refs.reqForm.resetFields();
            this.visible = false
        },
        handleSubmit() {
            this.$refs.reqForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    let _params = JSON.parse(JSON.stringify(this.reqForm))
                    _params['isJson'] = true;
                    let _api = this.reqForm.id ? SystemAPI.execEdit : SystemAPI.execAdd;
                    _api(_params).then(res => {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.$emit('on-refresh')
                        this.close();
                    }).finally(() => {
                        this.loading = false
                    });
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>
