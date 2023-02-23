<template>
  <div id="partner" class="my-dark animate radius-6 p-horizontal-12 box-bg" v-if="state.data.length!==0">
    <CCETitle>友情链接</CCETitle>
    <ul class="p-vertical-12">
      <li v-for="item in state.data"><i class="iconfont icon-taiyang-copy"></i><a :href="item.url" target="_blank">{{item.title}}</a></li>
    </ul>
  </div>
</template>

<script>
import CCETitle from "./CCETitle.vue";
import {reactive} from "vue";
import {getPartner} from "../api/config.js";

export default {
  name: "CCEPartner",
  components: {CCETitle},
  setup() {
    const state = reactive({
      data: []
    })
    getPartner().then(res=>{
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
#partner {
  ul{
    display: flex;
    li{
      margin-right:12px;
      margin-top:6px;
    }
    .iconfont{
      font-size:12px;
      font-weight: bold;
      margin-right:6px;
    }
    span{
      vertical-align: middle;
    }
  }
}
</style>