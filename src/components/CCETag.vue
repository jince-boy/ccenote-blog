<template>
  <div id="tag" class="my-dark animate radius-6 p-horizontal-12 box-bg" v-if="state.data.length!==0">
    <CCETitle>标签</CCETitle>
    <ul class="p-vertical-12">
      <li v-for="item in state.data"><router-link :to="'/tag?id='+item.id">{{item.name}}</router-link></li>
    </ul>
  </div>
</template>

<script>
import CCETitle from "./CCETitle.vue";
import {reactive} from "vue";
import {getTagAll} from "../api/tag.js";

export default {
  name: "CCETag",
  components: {CCETitle},
  setup(){
    const state=reactive({
      data:[]
    })
    getTagAll().then(res=>{
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
#tag {
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      background-color:#3D7EFF;
      color:#fff;
      margin-top:6px;
      margin-right:6px;
      padding:2px 12px;
      border-radius:4px;
    }
  }
}
</style>