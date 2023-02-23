<template>
  <div id="master" class="radius-6 my-dark animate p-horizontal-12 box-bg" v-if="state.name!==''">
    <Title>博主信息</Title>
    <div class="masterAvatar p-vertical-12" v-if="state.avatar">
        <img :src="state.avatar" alt="avatar">
        <ul>
          <li>{{state.name}}</li>
          <li>{{state.email}}</li>
          <li>{{state.profile}}</li>
        </ul>
    </div>
  </div>

</template>

<script>
import Title from "./CCETitle.vue";
import {reactive} from "vue";
import {getMaster} from "../api/config.js";

export default {
  name: "CCEMaster",
  components: {Title},
  setup() {
    const state = reactive({
      name:'',
      email:'',
      url:'',
      profile:'',
      avatar:''
    });
    getMaster().then(res=>{
      if(res.data.status){
        state.name=res.data.data.name;
        state.email=res.data.data.email;
        state.url=res.data.data.url;
        state.profile=res.data.data.profile;
        state.avatar=res.data.data.avatar;
      }
    })
    return {
      state
    }
  }
}
</script>

<style lang="less">
#master {
  .masterAvatar{
    text-align: center;
    font-size:12px;
    img{
      width:80px;
      height:80px;
      border-radius:8px;
    }
    li{
      word-break: break-word;
      line-height:32px;
    }
  }
}

</style>