<template>
  <div id="oneText" class="my-dark animate radius-6 p-horizontal-12 box-bg" v-if="state.text">
    <input type="text" id="copyText" v-model="state.text">
    <p @click="methods.copy">{{ state.text }}</p>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "CCEText",
  setup() {
    const state = reactive({
      text: '',
    })
    const methods={
      copy:()=>{
        document.getElementById("copyText").select();
        document.execCommand("copy");
        ElMessage({
          message: '复制成功',
          type: 'success',
        })
      }
    }
    function getText() {
      axios({
        method: 'GET',
        url: 'https://v1.hitokoto.cn/?c=f&encode=text&min_length=20'
      }).then(res => {
        if (res.status) {
          state.text = res.data;
        }
      });
    }

    getText();
    setInterval(getText, 4000);
    return {
      state,
      methods
    }
  }
}
</script>

<style lang="less">
#oneText {
  height: 40px;
  #copyText {
    position: fixed;
    top: 0;
    left: -9999px;
  }
  p {
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
}
</style>