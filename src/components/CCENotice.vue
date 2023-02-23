<template>
<div id="notice" class="my-dark animate radius-6 p-horizontal-12 box-bg" v-if="store.getters.getConfig.notice">
  <CCETitle>网站公告</CCETitle>
  <p class="p-vertical-12" :style="{color:colorValue}">{{ store.getters.getConfig.notice}}</p>
</div>
</template>

<script>
import CCETitle from "./CCETitle.vue";
import store from "../store/index.js";
import {ref} from "vue";

export default {
  name: "CCENotice",
  components: {CCETitle},
  setup(){
    const colorValue=ref('');
    setInterval(function(){
      colorValue.value="#" + Math.floor(Math.random() * 16777216).toString(16);
    },1000)
    return{
      colorValue,
      store
    }
  }
}
</script>

<style lang="less">
#notice{
  p{
    transition:.5s;
    font-weight: bold;
    text-align:center;
  }
}
</style>