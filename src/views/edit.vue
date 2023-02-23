<template>
  <div class="userdata my-dark animate box-bg radius-6">
    <div class="leftBox">
      <el-form label-position="top" :model="state.form" :rules="state.rules">
        <div class="leftBox">
          <el-form-item label="用户头像：">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="点击上传头像"
                placement="right"
            >
              <el-upload
                  ref="upload"
                  class="avatar-uploader"
                  action="#"
                  :multiple="false"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="methods.fileChange"
                  :http-request="methods.updateAvatar"
              >
                <img :src="state.avatar" class="avatar" alt="avatar">
                <el-icon class="avatar-uploader-icon">
                  <Plus/>
                </el-icon>
              </el-upload>
            </el-tooltip>
          </el-form-item>
          <el-button size="small" type="primary" @click="methods.submitUpload" class="uploadButton">修改头像</el-button>
        </div>
      </el-form>
      <el-form label-position="top" :model="state.form" :rules="state.rules" ref="updatePw" class="updatePw">
        <el-form-item prop="old_password" label="旧密码">
          <el-input v-model="state.form.old_password" :prefix-icon="Key" placeholder="旧密码" type="password"
                    show-password/>
        </el-form-item>
        <el-form-item prop="new_password" label="新密码">
          <el-input v-model="state.form.new_password" type="password" show-password placeholder="新密码"
                    :prefix-icon="Key"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="check_password">
          <el-input
              v-model="state.form.check_password"
              type="password"
              show-password placeholder="确认密码"
              :prefix-icon="Key"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="methods.updatePassword">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-form label-position="top" :model="state.form" :rules="state.rules" ref="form"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="state.form.username" disabled/>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="state.form.email" disabled/>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="state.form.name" placeholder="请输入姓名" clearable/>
        </el-form-item>
        <el-form-item label="个人链接：" prop="url">
          <el-input v-model="state.form.url" placeholder="请输入个人链接" clearable/>
        </el-form-item>
        <el-form-item label="个人简介：" prop="profile">
          <el-input
              v-model="state.form.profile"
              resize="none"
              type="textarea"
              placeholder="请输入个人简介"
              clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="methods.UserDataSubmit">修改资料</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {Plus,Key} from '@element-plus/icons-vue'
import {reactive, getCurrentInstance} from 'vue'
import {ElMessage} from "element-plus"
import store from "../store"
import index from "../router";
import {getMyData, updateMyAvatar, updateMyData, updatePassword} from "../api/user.js";

export default {
  name: 'edit',
  components: {
    Plus
  },
  setup() {
    const {proxy} = getCurrentInstance();
    const state = reactive({
      avatar:'',
      form: {
        username: '',
        role: '',
        name: '',
        email: '',
        url:'',
        profile:'',
        old_password: '',
        new_password: '',
        check_password: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        url:[
          {type:'url',message:'请输入正确的url格式',trigger:'blur'}
        ],
        profile: [
          {min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur'}
        ],
        old_password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ],
        new_password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ],
        check_password: [
          {
            required: true, validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
                // password 是表单上绑定的字段
              } else if (value !== state.form.new_password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          },
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ]
      },
    })
    getMyData().then(res => {
      state.avatar=res.data.data.avatar;
      state.form.username = res.data.data.username;
      state.form.name = res.data.data.name;
      state.form.email = res.data.data.email;
      state.form.url=res.data.data.url;
      state.form.profile=res.data.data.profile;
    })
    const methods = {
      fileChange(file, fileList) {
        fileList.splice(fileList.length - 2, fileList.length - 1);
        const type = file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png'|| file.raw.type === 'image/webp';
        const isLt2M = file.size / 1024 > 1 && file.size / 1024 < 5120
        if (!type) {
          ElMessage({
            message: '图片格式不正确!(只能包含jpg，png,webp)',
            type: 'error'
          })
          return;
        }
        if (!isLt2M) {
          ElMessage({
            message: '上传图片大小在10kb~5M之间!',
            type: 'error'
          })
          return;
        }
        if (type && isLt2M) {
          state.avatar = URL.createObjectURL(file.raw);
        } else {
          fileList.splice(-1, 1);
        }
      },
      updateAvatar(param) {
        const formData = new FormData();
        //防止浏览器图片缓存问题
        let getCacheTime=new Date().getTime();
        formData.append('avatar', param.file);

        updateMyAvatar(formData).then(res => {
          if (res.data.status) {
            store.commit('setAvatar', res.data.data.avatar+'?cache='+getCacheTime);
            ElMessage({
              message: "上传成功",
              type: 'success'
            })
          } else {
            ElMessage({
              message: "上传失败",
              type: 'error'
            })
          }
        })
      },
      submitUpload() {
        proxy.$refs['upload'].submit();
      },
      UserDataSubmit() {
        proxy.$refs['form'].validate((valid) => {
          if (valid) {
            updateMyData({
              name: state.form.name,
              url:state.form.url,
              profile:state.form.profile
            }).then(res => {
              if (res.data.status) {
                store.commit('setName', state.form.name);
                ElMessage({
                  message: res.data.message,
                  type: 'success'
                })
              } else {
                ElMessage({
                  message: res.data.error,
                  type: 'error'
                })
              }
            })
          }
        })
      },
      updatePassword() {
        proxy.$refs['updatePw'].validate(valid => {
          if (valid) {
            updatePassword({
              old_password: state.form.old_password,
              new_password: state.form.new_password
            }).then(res => {
              if (res.data.status) {
                state.dialogFormVisible = false;
                store.commit('delToken');
                ElMessage({
                  message: res.data.message,
                  type: 'success'
                })
                setTimeout(() => {
                  index.replace({path: '/login'})
                }, 1500);
              } else {
                ElMessage({
                  message: res.data.error,
                  type: 'error'
                })
              }
            })
          }
        })
      }
    }
    return {
      state,
      methods,
      Key
    }
  }
}
</script>

<style lang="less">
.leftBox{
  .el-form-item__content {
    justify-content: center;
  }
}


.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 200px;

}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: .2s;
}

.avatar-uploader-icon:hover {
  color: #fff;
  background: rgba(255, 255, 255, .5);
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
}

.leftBox {
  > .el-form-item {
    margin-bottom: 0;
  }

  .updatePw {
    margin-top: 50px;
    padding-top: 18px;
    border-top: 1px solid rgb(222, 229, 231);
  }
}

.userdata {
  padding:12px;
  display: flex;
  //width: 80%;
  margin: 12px auto;
  justify-content: space-between;

  > div {
    border: 1px solid rgb(222, 229, 231);
    border-radius: 4px;
    padding: 12px;
  }

  > div:nth-of-type(1) {
    width: 30%;
    margin-right: 18px;
  }

  > div:nth-of-type(2) {
    width: 70%;
  }
  .el-textarea__inner{
    height:126px;
  }
}

.uploadButton {
  display: block;
  width: 200px;
  margin: 0 auto;
}
</style>