<template>
  <header class="my-dark animate">
    <div class="r-y-g"></div>
    <el-tooltip
        effect="dark"
        content="点击返回"
        placement="bottom"
    >
      <p class="logo" @click="methods.back"><img :src="store.getters.getConfig.logo" alt="logo"></p>
    </el-tooltip>
    <div class="menu">
      <i class="iconfont" :class="[state.drawer?'icon-shousuocaidan-copy':'icon-shousuocaidan']"
         @click="state.drawer=!state.drawer"></i>
      <el-switch v-model="state.isDark" :active-icon="Moon" inline-prompt :inactive-icon="Sunny" size="small"
                 style="--el-switch-on-color:#3D3D3D;--el-switch-border-color:#ccc8db;"/>
      <div id="mask" :class="{maskShow:state.drawer}" @click="state.drawer=false"></div>
      <div id="sideMenu" class="my-dark animate" :class="{sideMenuShow:state.drawer}">
        <div class="user" @click="methods.user">
          <div>
            <el-avatar :icon="UserFilled" shape="square" :src="store.getters.getAvatar" size="small"/>
            <p>{{ store.getters.getName ? store.getters.getName : "未登录..." }}</p>
          </div>
          <i class="iconfont icon-youjiantou1"></i>
        </div>
        <el-scrollbar style="height: calc(100% - 100px)">
          <el-menu router :default-active="$route.fullPath" unique-opened @select="methods.menuSelect">
            <el-menu-item index="/">
              <i class="iconfont icon-home"></i>
              <span>首页</span>
            </el-menu-item>
            <template v-for="item in store.getters.getMenu">
              <el-sub-menu v-if="item.children.length>0" :key="item.id" :index="'/category?id='+item.id">
                <template #title>
                  <i :class="['iconfont',item.icon]"></i>
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="childItem in item.children" :key="childItem.id"
                              :index="'/category?id='+childItem.id">
                  <template #title>
                    <i :class="['iconfont',childItem.icon]"></i>
                    <span>{{ childItem.name }}</span>
                  </template>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :key="item.id" :index="'/category?id='+item.id">
                <i :class="['iconfont',item.icon]"></i>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
        <div id="exit" v-if="getToken()">
          <p @click="methods.logout"><i class="iconfont icon-tuichu"></i><span>退出登录</span></p>
        </div>
        <p style="text-align:center">版本: {{store.getters.getConfig.edition}}</p>
      </div>
    </div>
  </header>

</template>

<script>
import {reactive} from "vue";
import {useDark} from '@vueuse/core'
import {Sunny, Moon, UserFilled} from "@element-plus/icons-vue";
import store from "../store";
import {getMyData, logout} from "../api/user.js";
import {delData, getToken, setData} from "../utils/auth.js";
import router from "../router/index.js";
import {ElMessageBox} from "element-plus";

export default {
  name: "CCEHeader",
  methods: {
    getToken() {
      return getToken
    }
  },
  setup() {
    const state = reactive({
      isDark: useDark(),
      drawer: false,
      avatar: ''
    })
    const methods = {
      menuSelect: (val) => {
        if (val) {
          state.drawer = false;
        }
      },
      user: () => {
        if (getToken()) {
          router.push({path: '/user',query:{username:store.getters.getName,type:'front'}})
        } else {
          router.push({path: '/login'})
        }
        state.drawer = false;
      },
      logout:()=>{
        ElMessageBox.confirm('确定要退出吗？', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
          logout().then(res=>{
            delData();
            router.replace({path:'/'})
          })
        }).catch(() => {
        })
      },
      back:()=>{
        if(router.currentRoute.value.fullPath==='/'){
          router.go(0);
        }else{
          router.back(-1)
        }
      }
    }

    function getUserData() {
      if (getToken()) {
        getMyData().then(res => {
          if (res.data.status) {
            setData(res.data.data.username, res.data.data.avatar);
          } else {
            delData();
          }
        })
      }
    }

    getUserData();
    return {
      state,
      store,
      Sunny,
      Moon,
      UserFilled,
      methods,
      getToken
    }
  }
}
</script>

<style lang="less">
header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100%;
  height: 40px;
  padding: 0 2%;
  //line-height: 40px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  user-select: none;

  .logo {
    text-align: center;
    padding: 0 24px;
    letter-spacing: 2px;
    cursor:pointer;
    img {
      height: 28px;
      vertical-align: middle;
    }
  }

  .menu {
    width: 60px;
  }

  .iconfont {
    cursor: pointer;
    vertical-align: middle;
  }

  .el-switch {
    -webkit-tap-highlight-color: transparent !important;
    margin-left: 14px;
  }

  #mask {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: calc(100% - 40px);
    background-color: rgba(0, 0, 0, .2);
  }

  #sideMenu {
    position: fixed;
    right: -250px;
    top:40px;
    z-index: 999;
    width: 250px;
    padding: 12px;
    height: calc(100% - 40px);
    background-color: #f5f5f5;
    box-shadow: 0 12px 10px 0 rgb(0 0 0 / 10%);
    //.sideTitle{
    //  height:12px;
    //  background-color:#eee;
    //}
    .user {
      display: flex;
      margin: 12px 0;
      font-size: 14px;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      > div {
        display: flex;
        align-items: center;
      }

      p {
        margin-left: 12px;
      }

      .iconfont {
        font-size: 14px;
      }
    }
  }

  .maskShow {
    display: block !important;
  }

  .sideMenuShow {
    right: 0 !important;
  }

  .el-menu {
    border: none;
    background: none;
    margin-top: 12px;

    .el-menu-item.is-active {
      color: #f5f5f5 !important;
      background: #409EFF;
      border-radius: 8px;
      overflow: hidden;
    }

    .iconfont {
      margin: 0 12px;
      font-size: 14px;
      width: 18px;
      text-align: center;
    }

    .el-sub-menu__title, > .el-menu-item {
      height: 40px;
      line-height: 40px;
      color: #525252;
      background: none;
      padding: 0 12px !important;
      border-radius: 8px;
      overflow: hidden;
    }

    .el-sub-menu__title:hover, > .el-menu-item:hover {
      color: #525252 !important;
      background: #eee;
    }

    .el-menu--inline {
      .el-menu-item {
        padding: 0 40px !important;
      }
    }
  }

  #exit{
    text-align: center;
    cursor: pointer;
    color:#FC625D;
    line-height:40px;
    .iconfont{
      margin-right:6px;
      vertical-align: -1px;
    }
  }
}

html.dark {
  .el-menu {
    .el-sub-menu__title, .el-menu-item {
      color: #B3B3B3;
    }

    .el-sub-menu__title:hover, > .el-menu-item:hover {
      color: #B3B3B3 !important;
      background-color: #2A2A2A;
    }
  }
}
</style>