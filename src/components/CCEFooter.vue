<template>
  <footer class="my-dark animate box-bg">
    <p><a href="/">{{ store.getters.getConfig.copyright }}</a></p>
    <p><a href="https://beian.miit.gov.cn/" target="_blank">{{ store.getters.getConfig.record }}</a></p>
  </footer>
</template>

<script>
import store from "../store/index.js";

export default {
  name: "CCEFooter",
  computed: {
    store() {
      return store
    }
  }
}
</script>

<style lang="less">
footer{
  position:fixed;
  left:0;
  bottom:0;
  width:100%;
  height:60px;
  padding:12px 0;
  text-align:center;
  line-height:18px;
  font-size:12px;
  p:hover{
    color:#3D7EFF;
  }
}

</style>