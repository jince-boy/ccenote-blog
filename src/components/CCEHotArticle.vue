<template>
<div id="hotArticle" class="my-dark animate radius-6 p-horizontal-12 box-bg" v-if="state.data.length!==0">
  <CCETitle>近期热文</CCETitle>
  <ul class="p-vertical-12">
    <li v-for="item in state.data">
      <img :src="item.cover" alt="cover" class="radius-6">
      <div>
        <p class="hotArticleTitle"><router-link :to="'/article?id='+item.id">{{item.title}}</router-link></p>
        <p>{{item.page_views}}次浏览</p>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import CCETitle from "./CCETitle.vue";
import {reactive} from "vue";
import {hotArticle} from "../api/article.js";

export default {
  name: "CCEHotArticle",
  components: {CCETitle},
  setup(){
    const state=reactive({
      data:[],
    })
    hotArticle().then(res=>{
      if(res.data.status){
        state.data=res.data.data;
      }
    })
    return {
      state
    }
  }
}
</script>

<style lang="less">
  #hotArticle{
    li+li{
      margin-top:12px;
    }

    li{
      display: flex;
      line-height:18px;
      transition:.5s;
      div{
        width:calc(100% - 48px);
      }
      img{
        margin-right:12px;
        width:36px;
        height:36px;
      }
      p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .hotArticleTitle:hover{
        color:#3D7EFF;
      }
    }
  }
</style>