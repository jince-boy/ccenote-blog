<template>
  <div id="search" class="my-dark animate radius-6 p-horizontal-12 box-bg">
    <CCETitle>文章搜索</CCETitle>
    <div class="p-vertical-12">
      <el-input
          v-model="state.search"
          placeholder="请输入搜索内容"
          class="input-with-select radius-6"
      >
        <template #append>
          <el-button :icon="Search" @click="methods.search" />
        </template>
      </el-input>
    </div>

  </div>
</template>

<script>
import CCETitle from "./CCETitle.vue";
import {Search} from "@element-plus/icons-vue";
import {reactive, watch} from "vue";
import router from "../router/index.js";

export default {
  name: "CCESearch",
  components: {CCETitle},
  setup(){
    const state=reactive({
      search:router.currentRoute.value.query.search,
    })
    const methods={
      search:()=>{
        if(state.search===''){
          router.push({path:'/'})
        }else{
          router.push({path:'/',query:{
              'search':state.search
            }})
        }
      }
    }
    watch(()=>router.currentRoute.value.query.search,newValue=>{
      if(newValue===undefined){
        state.search='';
      }
    })
    return {
      state,
      methods,
      Search
    }
  }
}
</script>

<style lang="less">
#search{
  .el-input__wrapper{
    box-shadow:none;
  }
  .el-button{
    background:#3D7EFF;
    color:#fff;
    border-radius:0;
  }
  .el-input{
    border:1px solid #3D7EFF;
  }
}
</style>