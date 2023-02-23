<template>
  <div id="box" v-if="state.pageShow">
    <div id="login_box" class="my-dark animate">
      <h2><i class="r-y-g"></i><span>用户注册</span></h2>
      <el-form size="large" :model="state.ruleForm" :rules="state.rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="state.ruleForm.username" placeholder="用户名" :prefix-icon="Avatar" clearable/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="state.ruleForm.password" type="password" show-password placeholder="密码"
                    :prefix-icon="Key"/>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="state.ruleForm.email" placeholder="邮箱" :prefix-icon="Message" clearable/>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="state.ruleForm.code" :prefix-icon="Key" clearable maxlength="6" placeholder="邮箱验证码">
            <template #suffix>
              <el-link type="primary" :underline="false" @click="methods.emailVerify" :disabled="state.emailstate">
                {{ state.emailtime }}
              </el-link>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="w-100" @click="methods.register('ruleForm')">注册</el-button>
      </el-form>
      <ul>
        <li>
          <router-link to="login">已有账号，去登录</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Avatar, Message, Key} from '@element-plus/icons-vue'
import {reactive, getCurrentInstance} from 'vue'
import {ElMessage} from "element-plus";
import index from "../router";
import {getMailCode,register} from "../api/user"
import {getToken, setToken} from "../utils/auth";
import router from "../router";

export default {
  name: "register",
  setup() {
    const {proxy} = getCurrentInstance();
    const state = reactive({
      pageShow:false,
      ruleForm: {
        username: '',
        password: '',
        email: '',
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
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change']},
        ],
        code: [
          {required: true, message: '请输入邮箱验证码', trigger: 'blur'}
        ]
      },
      emailtime: '获取验证码',
      emailstate: false
    })
    const methods = {
      VerifyTime(num) {
        state.emailstate = true;
        state.emailtime = num;
        let time = setInterval(() => {
          if (state.emailtime === 1) {
            state.emailstate = false;
            state.emailtime = '获取验证码'
            clearInterval(time);
          } else {
            state.emailtime--;
          }
        }, 1000)
      },
      emailVerify() {
        getMailCode({email: state.ruleForm.email, type: 'register'}).then(res => {
          if (res.data.status) {
            ElMessage({
              message: '验证码已发送至邮箱',
              type: 'success',
            })
            methods.VerifyTime(59);
          } else {
            if (res.data.error) {
              ElMessage({
                message: res.data.error,
                type: 'warning',
              })
              if (res.data.data.verifyTime) {
                methods.VerifyTime(res.data.data.verifyTime)
              }
            }
          }
        })
      },
      register(formName) {
        proxy.$refs[formName].validate(valid => {
          if (valid) {
            register({
              username: state.ruleForm.username,
              password: state.ruleForm.password,
              email: state.ruleForm.email,
              code: state.ruleForm.code
            }).then(res => {
              if (res.data.status) {
                ElMessage({
                  message: '注册成功，请勿关闭或刷新页面，3秒后自动跳转',
                  type: 'success'
                })
                setToken(res.data.data.token);
                setTimeout(()=>{
                  index.replace('/');
                },3000)
              } else {
                ElMessage({
                  message: res.data.error,
                  type: 'warning'
                })
              }
            })
          } else {
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
  background: linear-gradient(45deg,rgb(206 212 218),rgb(0 123 255));
  height: 100%;
}

#app {
  height: 100%;
}

#box {
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
</style>