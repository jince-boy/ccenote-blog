<template>
  <router-view :class="{grey:!(state.grey==='0')}" v-if="state.site_status==='1'"></router-view>
  <div class="site_status" v-else>
    <p>{{ state.close_reason }}</p>
    <p>{{state.copyright}}</p>
  </div>
</template>

<script>
import {onMounted, reactive, watch} from "vue";
import store from "./store/index.js";

export default {
  name:'App',
  setup(){
    const state=reactive({
      grey:'0',
      site_status:'1',
      close_reason:'',
      copyright:''
    })
    onMounted(()=>{
      document.documentElement.addEventListener(
          "touchstart",
          function (event) {
            if (event.touches.length > 1) {
              event.preventDefault();
            }
          },{ passive: false }
      )
    });
    watch(()=>store.getters.getConfig,newValue=>{
      state.grey=newValue.grey;
      state.site_status=newValue.site_status;
      state.close_reason=newValue.close_reason;
      state.copyright=newValue.copyright;
    })
    return {
      state
    }
  }
}
</script>

<style lang="less">
.grey{
  filter:grayscale(100%);
  -moz-filter:grayscale(100%);
  -o-filter:grayscale(100%);
  filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter:grayscale(1)
}
.site_status{
  height:100%;
  width:100%;
  background-color:#fff;
  text-align:center;
  font-size:18px;
  line-height:150px;
}
</style>
