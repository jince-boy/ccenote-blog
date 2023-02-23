<template>
  <div id="box" v-if="state.pageShow">
    <div id="login_box" class="my-dark animate">
      <h2><i class="r-y-g"></i><span>用户登录</span></h2>
      <el-form size="large" :model="state.ruleForm" :rules="state.rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="state.ruleForm.username" placeholder="用户名" :prefix-icon="Avatar" clearable/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="state.ruleForm.password"
              type="password"
              show-password
              placeholder="密码"
              :prefix-icon="Key"
          />
        </el-form-item>
        <div id="code">
          <el-form-item prop="verifycode">
            <el-input v-model="state.ruleForm.code" placeholder="验证码" :prefix-icon="Key" clearable maxlength="4"/>
            <el-image
                :src="state.img"
                fit="contain"
                @click="methods.getVerify"
            ></el-image>
          </el-form-item>
        </div>
        <el-button type="primary" class="w-100" @click="methods.login('ruleForm')">登录</el-button>
      </el-form>
      <ul>
        <li>
          <router-link to="reset">忘记密码</router-link>
        </li>
        <li>
          <router-link to="register">立即注册</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Avatar, Message, Key} from '@element-plus/icons-vue'
import {reactive, getCurrentInstance} from 'vue'
import {getVerifyCode,login} from "../api/user.js";
import {ElMessage} from "element-plus"
import router from "../router"
import {getToken, setToken} from "../utils/auth";

export default {
  name: "login",
  setup() {
    const {proxy} = getCurrentInstance();
    const state = reactive({
      pageShow:false,
      ruleForm: {
        username: '',
        password: '',
        code: '',
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
      img: ''
    })
    const methods = {
      getVerify() {
        getVerifyCode().then(res=>{
          state.img = res.data.data.base64
        })
      },
      login(formName) {
        proxy.$refs[formName].validate((valid) => {
          if (valid) {
            login({
              username: state.ruleForm.username,
              password: state.ruleForm.password,
              code: state.ruleForm.code
            }).then(res => {
              if (res.data.status) {
                ElMessage({
                  message: '登录成功，请勿关闭或刷新页面，3秒后自动跳转',
                  type: 'success'
                })
                setToken(res.data.data.token);
                setTimeout(()=>{
                  router.replace('/');
                },3000);
              } else {
                ElMessage({
                  message: res.data.message,
                  type: 'warning'
                })
                methods.getVerify()
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
    if(getToken()){
      router.replace({path:'/'})
    }else{
      state.pageShow=true;
    }
    methods.getVerify()

    return {
      Avatar,
      Message,
      Key,
      state,
      methods
    }
  }
}
</script>

<style lang="less">
body {
  height: 100%;
}
#app {
  height: 100%;
}

#box {
  background: linear-gradient(45deg,rgb(206 212 218),rgb(0 123 255));
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
#box::before {
  content: '';
  display: block;
}

#login_box {
  width: 400px;
  padding: 12px;
  margin:12px;
  background-color: #fff;
  border-radius: 4px;

  h2 {
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i{
      vertical-align: middle;
    }
    span{
      vertical-align: middle;
      margin-left:12px;
    }
  }

  .el-form-item--large {
    margin-bottom: 16px;
  }

  ul {
    margin-top: 12px;
    text-align: center;
  }

  ul li {
    display: inline;
    padding: 0 12px;
    font-size: 12px;
  }

  ul li + li {
    border-left: 1px solid #5e676f;
  }
}

.el-link--inner {
  line-height: 40px;
  margin-right: 12px;
}


.el-form-item__content {
  justify-content: space-between;
}

#code .el-input {
  width: 58%;
  margin-bottom: 0 !important;
  vertical-align: middle;
}

 .el-image {
     vertical-align: middle;
     height: 40px;
     width:40%;
 }
 .el-image__inner{
     height:40px;
     object-fit: none !important;
 }
</style>
