<template>
  <div id="count" class="my-dark animate radius-6 p-horizontal-12 box-bg" v-if="state.data!==''">
    <CCETitle>博客信息</CCETitle>
    <ul class="p-vertical-12">
      <li><i class="iconfont icon-icon_shiyongwendang"></i><span>文章总数: {{state.data.article_num}}</span></li>
      <li><i class="iconfont icon-icon-"></i><span>浏览总数: {{state.data.views_num}}</span></li>
      <li><i class="iconfont icon-app"></i><span>分类总数: {{state.data.category_num}}</span></li>
      <li><i class="iconfont icon-zu"></i><span>标签总数: {{state.data.tag_num}}</span></li>
      <li><i class="iconfont icon-31pinglun"></i><span>评论总数: {{state.data.comment_num}}</span></li>
      <li><i class="iconfont icon-rili"></i><span>网站运行时间: {{state.run_time}}</span></li>
    </ul>
  </div>
</template>

<script>
import CCETitle from "./CCETitle.vue";
import {reactive} from "vue";
import {getCount} from "../api/config.js";
import store from "../store/index.js";

export default {
  name: "CCECount",
  components: {CCETitle},
  setup(){
    const state=reactive({
      data:'',
      run_time:''
    })
    getCount().then(res=>{
      if(res.data.status){
        state.data=res.data.data;
      }
    })
    let runTime=new Date(store.getters.getConfig.running_time);
    function showRunTime(){
      let NowDate=new Date();
      let RunDateM = NowDate - runTime;
      let RunDays = Math.floor(RunDateM/(24*3600*1000));
      let RunHours = Math.floor(RunDateM%(24*3600*1000)/(3600*1000));
      let RunMinutes = Math.floor(RunDateM%(24*3600*1000)%(3600*1000)/(60*1000));
      let RunSeconds = Math.round(RunDateM%(24*3600*1000)%(3600*1000)%(60*1000)/1000);
      state.run_time=RunDays + "天" + RunHours + "时" + RunMinutes + "分" + RunSeconds + "秒";
    }
    setInterval(showRunTime,1000);
    return {
      state
    }
  }
}
</script>

<style lang="less">
#count{
  ul{
    line-height:32px;
    .iconfont{
      font-size:14px;
      margin-right:6px;
    }
    span{
      vertical-align: middle;
    }
  }
}
</style>