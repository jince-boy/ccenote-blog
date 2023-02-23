<template>
  <div id="wrapper">
    <CCEHeader/>
    <div id="content">
      <div id="leftBox">
        <CCEMaster/>
        <CCECount/>
        <CCETag/>
        <CCEPartner/>
      </div>
      <div id="contentBox">
        <CCEText/>
        <router-view :key="router.currentRoute.value.fullPath"></router-view>
        <el-backtop target="#contentBox" :right="50" :bottom="150" />
      </div>
      <div id="rightBox">
        <CCENotice/>
        <CCESearch/>
        <CCERecommend/>
        <CCEHotArticle/>
        <CCENewComment/>
      </div>
    </div>

    <CCEFooter/>
  </div>
</template>

<script>
import CCEHeader from "../components/CCEHeader.vue";
import CCEMaster from "../components/CCEMaster.vue";
import CCECount from "../components/CCECount.vue";
import CCETag from "../components/CCETag.vue";
import CCEPartner from "../components/CCEPartner.vue";
import CCEText from "../components/CCEText.vue";
import CCESearch from "../components/CCESearch.vue";
import CCENotice from "../components/CCENotice.vue";
import CCERecommend from "../components/CCERecommend.vue";
import CCENewComment from "../components/CCENewComment.vue";
import CCEHotArticle from "../components/CCEHotArticle.vue";
import CCEFooter from "../components/CCEFooter.vue";
import router from "../router/index.js";

export default {
  name: "index",
  components: {
    CCEFooter,
    CCEHotArticle,
    CCENewComment,
    CCERecommend,
    CCENotice,
    CCESearch,
    CCEText,
    CCEPartner,
    CCETag,
    CCECount,
    CCEMaster,
    CCEHeader,
  },
  setup(){
    return {
      router
    }
  }
}
</script>

<style lang="less">
#app, body {
  height: 100%;
}

#wrapper {
  height: 100%;
  padding-top: 40px;
}

#content {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 72px);
  width: 100%;
  padding: 12px 2% 0 2%;
  overflow: hidden;
}

#leftBox, #rightBox, #contentBox {
  overflow: auto;
}

#leftBox::-webkit-scrollbar, #rightBox::-webkit-scrollbar, #contentBox::-webkit-scrollbar {
  width: 0;
}

#leftBox, #rightBox {
  width: 18%;
}

#contentBox {
  width: 64%;
  margin: 0 12px;
}

#leftBox > div + div {
  margin-top: 12px;
}

#rightBox > div + div {
  margin-top: 12px;
}
@media screen and (max-width:1200px) {
  #rightBox{
    display: none;
  }
  #leftBox{
    width:28%;
  }
  #contentBox{
    width:72%;
  }
}
@media screen and (max-width:768px){
  #leftBox{
    display: none;
  }
  #contentBox{
    width:100%;
  }
  footer{
    height:80px;
  }
}
</style>