<template>
  <div id="newComment" class="my-dark animate radius-6 p-horizontal-12 box-bg" v-if="state.data.length!==0">
    <CCETitle>最新评论</CCETitle>
    <ul class="p-vertical-12">
      <li v-for="(item,index) in state.data">
        <p class="newCommentTitle"><router-link :to="'/article?id='+item.article_id">{{index+1}}.{{item.article_title}}</router-link></p>
        <div class="radius-6"><router-link :to="'/article?id='+item.article_id">{{item.content}}</router-link></div>
        <p class="newCommentData"><span>{{item.created_at}}</span><span>—{{item.comment_user_name}}</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
import CCETitle from "./CCETitle.vue";
import {reactive} from "vue";
import {newCommentList} from "../api/article";

export default {
  name: "CCENewComment",
  components: {CCETitle},
  setup(){
    const state=reactive({
      data:[],
    })
    newCommentList().then(res=>{
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
#newComment{

  li+li{
    //margin-top:12px;
  }
  .newCommentTitle{
    transition:.5s;
    padding:6px 12px;
  }
  .newCommentTitle:hover{
    color:#3D7EFF;
  }
  .newCommentData{
    display: flex;
    font-size:12px;
    justify-content: space-between;
    padding:12px;
  }
  li{
    div{
      padding:12px;
      background-color:#eee;
    }
  }
}
html.dark #newComment li div{
  background:#2A2A2A;
}
</style>