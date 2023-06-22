<template>
    <div class="loginAP">
        <div class="contdat">
            <div class="topTitl">
                <!-- <span class="ttt">军民融合被装物流监控平台</span> -->
                <!-- <img src="../../../assets/image/login/title.png" alt=""> -->
            </div>
            <div class="loginTit">
                <img src="../../../assets/image/login/bs.png" alt="">
                <span class="loginTxt">登 录</span>
            </div>
            <div class="formLab">
                <el-form label-position="right" label-width="13%" :model="this.form"  :rules="rules" ref="ruleForm" >
                    <!-- <el-row :gutter="24"> -->
                        <!-- <el-col :span="22"> -->
                            <el-form-item label="账号" prop="username">
                                <el-input placeholder="" style="width: 100% !important;" v-model="form.username"></el-input>
                            </el-form-item>
                        <!-- </el-col> -->
                    <!-- </el-row> -->
                    <!-- <el-row :gutter="24"> -->
                        <!-- <el-col :span="6"> -->
                            <el-form-item label="密码" prop="password">
                                <el-input placeholder="" v-model="form.password" show-password></el-input>
                            </el-form-item>
                        <!-- </el-col> -->
                    <!-- </el-row> -->
                </el-form>
                <div class="loginBt" v-if="form.username==''||form.password==''" @click="toHome" :disabled="true">登 录</div>
                <!-- <div class="loginBt" v-if="" @click="toHome" :disabled="true">登 录</div> -->
                <div class="loginBta" v-if="form.username!=''&&form.password!=''" @click="toHome">登 录</div>
                <!-- <div class="loginBta" v-if="form.password!=''" @click="toHome">登 录</div> -->

            </div>
        </div>
    </div>
</template>
<script>
import getPlanMonitorDataApi from '@/api/modules/homePage'

export default {
    data(){
        return {
            form:{
                username:'',
                password:''
            },
            rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
        }
        }
    },
    methods:{
        toHome(formName){
            this.$refs['ruleForm'].validate((valid) => {
                if(valid){
                    let params={
                        m:{
                            username:this.form.username,
                        password:this.form.password
                        }
                    }

                    getPlanMonitorDataApi.getLoginData(params).then(res=>{
                        if(res){
                            this.$message({
                               type: 'success',
                               message: '登录成功!'
                            });
                            this.$router.push({path:'/homePage',query:{res}})
                            this.$store.commit('setTest', res)
                            this.$store.dispatch('user/closeSideBar', res[0])
                        } else {
                            this.$message({
                               type: 'error',
                               message: '登录失败!'
                            });
                            return
                        }
                    })
                    
                }else {
            // console.log('error submit!!');
            return false;
          }
            })
            
        }
    }
}
</script>
<style scoped lang="scss">
.loginAP {
    background-image: url('../../../assets/image/login/12.gif');
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: fixed;
}
.contdat {
    width: 33%;
    height: 45%;
    position: fixed;
    top: 28%;
    left: 36%;
    background-image: url('../../../assets/image/login/dk.png');
    background-size: 100% 100%;
}
.topTitl {
    margin-left: 100px;
    width: 70%;
    margin-top: 50px;
    height: 70px;
    background-image: url('../../../assets/image/login/title.png');
    background-size: 100% 100%;
}
.ttt {
    font-size: 30px;
    background: linear-gradient(to right, #212d31, #004fab, #212d31) !important;
    -webkit-background-clip: text !important;
    color: transparent !important;
    text-align: center;
}
.loginTit {
    margin-top: 10px;
    text-align: center;
    display: flex;
    height: 50px;
    flex-direction: column;
    img {
        margin: auto;
        text-align: center;
        width: 100px;
        height: 50px;
    }
}
.loginTxt {
    color: #01ffff;
    margin-top: 20px;
}
.formLab {
    margin-top: 50px;
    padding: 0 100px;
}
.loginBt {
    height: 50px;
    //background: red;
    text-align: center;
    color: #fff;
    line-height: 50px;
    //background: rgba(0, 47, 81, 0.1);
    //box-shadow: inset 0 0 20px 0 #00d1ff;
    background: #163756;
    border-radius: 5px 5px 5px 5px;
    margin-left: 60px;
    margin-top: 10px;
}
.loginBta {
    height: 50px;
    //background: red;
    text-align: center;
    color: #fff;
    line-height: 50px;
    background: rgba(0, 47, 81, 0.1);
    box-shadow: inset 0 0 20px 0 #00d1ff;
    background: #163756;
    border-radius: 5px 5px 5px 5px;
    margin-left: 60px;
    margin-top: 10px;
}
.el-form-item {
    //display: flex;
}
::v-deep .el-input__inner {
    color: #01ffff !important;
    outline-style: none !important;
    border: 1px solid #163756 !important;
}
::v-deep .el-input__inner:hover {
    //background: red !important;
    //border: 1px solid #01ffff !important;
    border-image: linear-gradient(to right, #016acc, #64ecff, #016acc) 5 5 !important;
}
::v-deep .el-input__inner:focus {
    border-image: linear-gradient(to right, #016acc, #64ecff, #016acc) 5 5 !important;
}
</style>