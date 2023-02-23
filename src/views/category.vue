<template>
  <div id="list" v-loading="state.loading">
    <el-row :gutter="12">
      <el-col v-for="item in state.data" :xl="8" :lg="8" :md="8" :sm="12" :xs="24">
        <div class="my-dark animate radius-6 p-12 box-bg card">
          <div class="cardImg radius-6" :class="{top:item.is_top==='1'}">
            <img :src="item.cover" :alt="item.content">
            <h3><router-link :to="'/article?id='+item.id">{{item.title}}</router-link></h3>
          </div>
          <ul>
            <li><i class="iconfont icon-yongyan"></i><span>作者: {{item.author}}</span></li>
            <li><i class="iconfont icon-shijian"></i><span>时间: {{item.create_time}}</span></li>
            <li><i class="iconfont icon-zu"></i><span>文章分类: {{item.category}}</span></li>
            <li><i class="iconfont icon-icon-"></i><span>浏览量: {{item.page_views}}</span></li>
            <li><i class="iconfont icon-31pinglun"></i><span>文章评论: {{item.commentCount}}</span></li>
          </ul>
          <p>摘要：{{item.content}}</p>
          <div class="read"><router-link :to="'article?id='+item.id"><el-button type="primary">阅读</el-button></router-link></div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="page">
    <el-pagination
        v-model:currentPage="state.currentPage"
        :hide-on-single-page="state.last_page===1"
        :page-size="state.per_page"
        background
        layout="prev, pager, next"
        :total="state.total"
        @current-change="methods.handleCurrentChange"
    />
  </div>
</template>

<script>
import {reactive} from "vue";
import {getCategoryArticle} from "../api/article.js";
import router from "../router/index.js";
export default {
  name: "category",
  setup(){
    const state=reactive({
      data:'',
      currentPage: 0,
      total: 0,
      per_page: 0,
      last_page: 0,
      loading:true,
      id:router.currentRoute.value.query.id
    })
    const methods={
      handleCurrentChange: (page) => {
        getList(page);
      },
    }
    function getList(page){
      getCategoryArticle({
          page,
          id:state.id
        }).then(res=>{
          if(res.data.status){
            state.loading=false;
            state.data=res.data.data.data;
            state.currentPage = res.data.data.current_page;
            state.total = res.data.data.total;
            state.per_page = res.data.data.per_page;
            state.last_page = res.data.data.last_page;
          }
        })
    }
    getList();
    return {
      state,
      methods
    }
  }
}
</script>

<style lang="less">
#list{
  margin-top:12px;
  min-height:100px;
  overflow: hidden;
  .el-col{
    margin-bottom:12px;
  }
}
.card{
  position:relative;
  padding-bottom:56px;
  height:100%;
  .cardImg{
    position:relative;
  }
  .cardImg:hover img{
    transform: scale(1.2);
  }
  .top::after{
    content:'';
    display:block;
    border-color:#3D7EFF #3D7EFF transparent transparent;
    border-width:25px;
    border-style: solid;
    position:absolute;
    top:0;
    right:0;
    z-index:9;
  }
  .top::before{
    position:absolute;
    top:10px;right:5px;
    z-index: 10;
    content:'置顶';
    color:#fff;
    transform: rotate(45deg);
  }
  h3{
    position:absolute;
    top:0;
    left:0;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height:100%;
    color:#fff;
    background-color:rgba(0,0,0,.5);
    font-size:16px;
    a{
      width:80%;
      text-align:center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  img{
    transition:.5s;
    width:100%;
    vertical-align: middle;
  }
  ul{
    padding:12px 0;
    display: flex;
    flex-wrap:wrap;
    li{
      line-height:22px;
      i,span{
        font-size:14px;
        vertical-align: top;
      }
      span{
        margin-left:3px;
        margin-right:6px;
      }
    }
  }
  .read{
    position:absolute;
    right:12px;
    bottom:12px;
  }
}
.page{
  display: flex;
  justify-content: right;
  margin:12px 0;
}
</style>