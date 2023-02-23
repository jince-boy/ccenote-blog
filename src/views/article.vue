<template>
  <div id="article" class="my-dark animate box-bg radius-6" v-if="state.data">
    <div class="baseData">
      <h2>{{ state.data.title }}</h2>
      <ul>
        <li><i class="iconfont icon-yongyan"></i><span>{{ state.data.author }}</span></li>
        <li><i class="iconfont icon-icon-"></i><span>{{ state.data.page_views }}</span></li>
        <li><i class="iconfont icon-31pinglun"></i><span>{{ state.data.comment_num }}</span></li>
        <li><i class="iconfont icon-app"></i><span>{{ state.data.category }}</span></li>
        <li><i class="iconfont icon-shijian"></i><span>{{ state.data.date }}</span></li>
      </ul>
    </div>
    <div v-html="state.data.content" class="articleContent"></div>
    <div class="footerData">
      <ul>
        <li class="tagTitle">标签：</li>
        <li v-for="item in state.data.tag">
          <router-link :to="'/tag?id='+item.id">{{ item.name }}</router-link>
        </li>
      </ul>
      <p class="reprint" @click="methods.reprintCopy">{{ methods.reprint() }}<input
          type="text" id="reprintCopy" v-model="state.reprint"></p>
    </div>
    <div class="comment">
      <p class="commentTitle">评论:</p>
      <ul v-if="state.commentData">
        <li v-for="item in state.commentData">
          <div class="commentHeader">
            <div class="commentUser">
              <img :src="item.user.user_avatar" alt="avatar" class="commentAvatar" @click="methods.toUser(item.user.username,item.user.user_mark)">
              <div>
                <p class="commentName"><span @click="methods.toUser(item.user.username,item.user.user_mark)" class="userLink">{{ item.user.username }}</span><span
                    v-if="item.user.user_mark==='back'&&item.user.user_id===item.article.author_id" class="author">作者</span></p>
                <p class="commentTime">{{ item.time }}</p>
              </div>
            </div>
            <span @click="methods.toCommentBox(item.id,item.user.username)">回复</span>
          </div>
          <p>{{ item.content }}</p>
          <ul v-if="item.children.length!==0" class="childComment">
            <li v-for="childItem in item.children">
              <div class="commentHeader">
                <div class="commentUser">
                  <img :src="childItem.user.user_avatar" alt="avatar" class="commentAvatar" @click="methods.toUser(childItem.user.username,childItem.user.user_mark)">
                  <div>
                    <p class="commentName"><span @click="methods.toUser(childItem.user.username,childItem.user.user_mark)" class="userLink">{{ childItem.user.username }}</span><span
                        v-if="childItem.user.user_mark==='back'&&childItem.user.user_id===childItem.article.author_id" class="author">作者</span>
                    </p>
                    <p class="commentTime">{{ childItem.time }}</p>
                  </div>
                </div>
                <span @click="methods.toCommentBox(childItem.id,childItem.user.username)">回复</span>
              </div>
              <p>回复<span @click="methods.toUser(childItem.reply,childItem.reply_mark)" class="userLink">@{{ childItem.reply }}</span>: {{ childItem.content }}</p>
            </li>
          </ul>
        </li>
      </ul>
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
      <div class="commentBox" v-if="store.getters.getName" id="commentBox">
        <p>发表评论:</p>
        <div>
          <img :src="store.getters.getAvatar" alt="avatar">
          <el-input
              v-model="state.commentContent"
              type="textarea"
              :placeholder="state.reply"
              rows="3"
          />
        </div>
        <div class="commentButton">
          <el-button type="primary" size="small" @click="methods.addComment">发布</el-button>
          <el-button type="info" size="small" @click="state.commentContent='';state.parent_id='';state.reply='写下你的评论'">取消</el-button>
        </div>
      </div>
      <p v-else style="text-align:center;padding:12px 0;color:#3D7EFF;">登录之后才可以评论哦~</p>
    </div>
  </div>

</template>

<script>
import {reactive} from "vue";
import router from "../router/index.js";
import {addComment, getArticle, getCommentList} from "../api/article.js";
import Prism from 'prismjs';
import "../assets/css/prism-gruvbox-dark.css"
import store from "../store/index.js";
import {ElMessage} from "element-plus";

export default {
  name: "article.vue",
  setup() {
    const state = reactive({
      data: '',
      id: router.currentRoute.value.query.id,
      reprint: '',
      commentData:[],
      currentPage: 0,
      total: 0,
      per_page: 0,
      last_page: 0,
      childCommentList: [],
      commentContent: '',
      parent_id:'',
      reply:'写下你的评论',
    })
    const methods = {
      handleCurrentChange: (page) => {
        getComment(page);
      },
      toCommentBox:(id,name)=>{
        if(store.getters.getName){
          state.reply='回复：@'+name;
          state.parent_id=id;
          document.getElementById("commentBox").scrollIntoView({behavior:"smooth"});
        }else{
          ElMessage({
            message: "请先登录",
            type: 'warning'
          })
        }

      },
      addComment:()=>{
        addComment({
          article_id:state.id,
          parent_id:state.parent_id,
          content:state.commentContent
        }).then(res=>{
          if(res.data.status){
            state.commentContent='';
            state.reply='写下你的评论';
            state.parent_id='';
            getComment(state.currentPage);
            ElMessage({
              message: '发布成功',
              type: 'success'
            })
          }else{
            ElMessage({
              message: res.data.error,
              type: 'warning'
            })
          }
        })
      },
      getChildComment:(childArr)=>{
        childArr.filter(item => {
          state.childCommentList.push(item);
          if (item.children && item.children.length) {
            methods.getChildComment(item.children);
          }
        })
        return state.childCommentList;
      },
      getPath: () => {
        return window.location.href;
      },
      reprint: () => {
        let data = '本文来自' + state.data.author + '的原创文章，转载请注明内容来源' + store.getters.getConfig.title + '(' + methods.getPath() + ')';
        state.reprint = data;
        return data;
      },
      reprintCopy: () => {
        document.getElementById("reprintCopy").select();
        document.execCommand("copy");
        ElMessage({
          message: '复制成功',
          type: 'success'
        })
      },
      toUser:(username,type)=>{
        router.push({path:'/user',query:{username,type}})
      }
    }

    async function getData() {
      await getArticle({
        id: state.id
      }).then(res => {
        if (res.data.status) {
          state.data = res.data.data;
        }
      })
      Prism.highlightAll();
    }

    getData();

    function getComment(page) {
      getCommentList({
        article_id: state.id,
        page,
      }).then(res => {
        if (res.data.status) {
          state.commentData = res.data.data.data;
          if(res.data.data.data!==""){
            state.commentData.forEach(item=>{
              state.childCommentList=[];
              item.children=methods.getChildComment(item.children);
            })
          }
          state.currentPage = res.data.data.current_page;
          state.total = res.data.data.total;
          state.per_page = res.data.data.per_page;
          state.last_page = res.data.data.last_page;
        }
      })
    }

    getComment();
    return {
      state,
      Prism,
      methods,
      store,
      router
    }
  }
}
</script>

<style lang="less">
#article {
  padding: 12px 24px;
  margin-top: 12px;
  overflow-x: hidden;

  .baseData {
    padding: 12px 0;
    border-bottom: 1px solid #d8d8d8;

    h2 {
      font-size: 24px;
    }

    ul {
      list-style: none !important;
      margin: 12px 0 0 0 !important;
      display: flex !important;
      padding: 0;

      li {
        margin-right: 12px;
        line-height: 1 !important;
      }

      .iconfont {
        font-size: 14px;
        margin-right: 6px;
      }
    }
  }

  .articleContent {
    padding: 12px 0;
  }

  .footerData {
    padding: 12px 0;
    border-top: 1px solid #d8d8d8;

    ul {
      display: flex;
      align-items: center;

      li + li {
        background-color: #3D7EFF;
        color: #fff;
        padding: 4px 12px;
        border-radius: 6px;
        margin-right: 12px;
      }
    }

    .reprint {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin-top: 12px;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      cursor: pointer;

      #reprintCopy {
        position: fixed;
        top: 0;
        left: -9999px;
      }
    }

    .reprint:hover {
      color: #3D7EFF;
    }
  }

  .comment {
    margin-bottom: 12px;

    .page {
      display: flex;
      justify-content: right;
      margin: 12px 0;
    }

    .commentTitle {
      padding: 12px 0;
      border-top: 1px solid #d8d8d8;
    }
    .userLink:hover{
      cursor: pointer;
      color:#3D7EFF;
      transition:.2s;
    }
    .commentHeader {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;

      > span {
        cursor: pointer;
      }
    }

    .commentUser {
      display: flex;
      align-items: center;

      div {
        margin-left: 10px;
        line-height: 18px;

        .author {
          background: #3D7EFF;
          color: #fff;
          margin: 0 12px;
          padding: 1px 12px;
          font-size: 12px;
          border-radius: 4px;
        }
      }
    }

    ul > li > p {
      padding: 12px 0;
      margin-left: 46px;
      line-height: 20px;
      word-break: break-word;
      border-bottom: 1px solid #d8d8d8;

      a:hover {
        color: #3D7EFF;
      }
    }

    .childComment {
      margin-left: 46px;

      li {
        margin-top: 12px;
      }
    }

    .commentAvatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  }

  .commentBox > div {
    display: flex;
    margin-top:12px;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    .el-textarea {
      margin-left: 12px;
    }
  }
  .commentButton {
    margin-top: 12px;
    display: flex;
    justify-content: right;
  }

}

.articleContent {
  a {
    color: #3D7EFF;
    text-decoration: underline;
  }

  p, li {
    //white-space:pre-wrap;
    line-height: 2;
  }

  blockquote {
    border-left: 8px solid #3D7EFF;
    padding: 10px;
    margin: 10px 0;
  }

  code {
    padding: 10px;
  }

  code * {
    font-family: Consolas, Monaco, "Andale Mono", monospace !important;
  }

  pre::-webkit-scrollbar {
    height: 4px;
  }

  table {
    border-collapse: collapse;
  }

  td, th {
    border: 1px solid #ccc;
    min-width: 50px;
    height: 32px;
  }

  th {
    background-color: #ddd;
  }

  ul {
    list-style: square;
  }

  ol {
    list-style: auto;
  }

  ul, ol {
    margin: 12px 0;
    padding-left: 20px;
  }

  input {
    vertical-align: -2px;
    margin-right: 6px;
  }

  video {
    width: 100%;
    border: 1px solid #2A2A2A;
    border-radius: 6px;
    overflow: hidden;
  }

  div[data-w-e-type="todo"] {
    margin: 12px 0;
  }
}

html.dark .articleContent th {
  background-color: #2D2D2D;
}

html.dark .footerData.reprint {
  //background-color:#1d2021;
}

//.editor-content-view ul,
//.editor-content-view ol {
//  padding-left: 20px;
//}
//
//.editor-content-view input[type="checkbox"] {
//  margin-right: 5px;
//}
</style>