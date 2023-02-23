<template>
  <div id="recommend" class="my-dark animate radius-6 p-horizontal-12 box-bg" v-if="state.banner.length!==0">
    <CCETitle>推荐</CCETitle>
    <el-carousel :interval="5000" :height="state.height+'px'">
      <el-carousel-item v-for="item in state.banner" :key="item">
        <el-row>
          <el-col :span="24" class="banner_img">
            <a :href="item.url" target="_blank">
              <img :src="item.path" :alt="item.description" ref="bannerHeight" @load="methods.imgLoad">
            </a>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import CCETitle from "./CCETitle.vue";
import {getCurrentInstance, nextTick, onMounted, reactive} from "vue";
import {getBannerList} from "../api/banner.js";

export default {
  name: "CCERecommend",
  components: {CCETitle},
  setup() {
    const {proxy}=getCurrentInstance();
    const state = reactive({
      banner: [],
      height: ''
    });
    const methods={
      imgLoad:()=>{
        nextTick(()=>{
          state.height=proxy.$refs["bannerHeight"][0].height;
        })
      }
    }
    onMounted(()=>{
      window.addEventListener('resize',()=>{
        state.height=proxy.$refs["bannerHeight"][0].height;
      })
    })
    getBannerList().then(res => {
      if (res.data.status) {
        state.banner = res.data.data;
      }
    })
    return {
      state,
      methods
    }
  }
}
</script>

<style lang="less">
#recommend {
  .el-carousel {
    padding: 12px 0;

    .el-carousel__container {
      width: 100%;
      //height:calc(100vw - 100px)
    }

    .el-carousel__indicators--horizontal {
      bottom: 12px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>