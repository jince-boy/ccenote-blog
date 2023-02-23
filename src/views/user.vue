<template>
  <div id="user" class="my-dark animate box-bg radius-6" v-if="state.data">
    <div class="userData">
      <img :src="state.data.avatar" alt="avatar" class="avatar radius-6">
      <div>
        <h3>{{ state.data.username }}</h3>
        <p>名称: <span>{{ state.data.name }}</span></p>
        <p>邮箱: <span>{{ state.data.email }}</span></p>
        <p>个人网站: <a v-if="state.data.url" :href="state.data.url">{{ state.data.url }}</a><span v-else>无</span></p>
        <p>个人简介: <span v-if="state.data.profile">{{ state.data.profile }}</span><span v-else>无</span></p>
        <p></p>
      </div>
    </div>
    <span v-if="store.getters.getName===state.data.username" @click="router.replace({path:'/user/edit'})">编辑</span>
  </div>
</template>

<script>
import {reactive} from "vue";
import {getUserData} from "../api/user.js";
import {ElMessage} from "element-plus";
import router from "../router/index.js";
import store from "../store/index.js";

export default {
  name: "user",
  setup() {
    const state = reactive({
      data: ''
    })

    function getUsersData() {
      getUserData({
        username: router.currentRoute.value.query.username,
        type: router.currentRoute.value.query.type,
      }).then(res => {
        if (res.data.status) {
          state.data = res.data.data;
        } else {
          ElMessage({
            message: res.data.message,
            type: 'warning'
          })
        }
      })
    }

    getUsersData()
    return {
      state,
      store,
      router
    }
  }
}
</script>

<style lang="less">
#user {
  margin-top: 12px;
  overflow-x: hidden;
  background: url('../assets/images/userbg.png') top center no-repeat #F5F5F5;
  display: flex;
  justify-content: space-between;

  > span {
    cursor:pointer;
    margin-top: 300px;
    color:#3D7EFF;
    border:1px solid #3D7EFF;
    height:20px;
    width:50px;
    border-radius:4px;
    text-align:center;
    line-height:20px;
    margin-right:24px;
  }

  .userData {
    display: flex;
    align-items: center;
    margin: 300px 24px 12px 24px;

    div {
      //padding-top:40px;
      margin-left: 12px;
    }

    p {
      line-height: 32px;
    }

    h3 {
      font-size: 22px;
    }
  }

  .avatar {
    border: 2px solid #fff;
    width: 150px;
    height: 150px;
  }
}
</style>