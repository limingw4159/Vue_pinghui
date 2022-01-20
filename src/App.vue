<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 在Home,Search显示的, 在登陆,注册隐藏,直接用v-show不是解决方案-->
    <!-- <Footer
      v-show="$route.path == '/home' || $route.path == '/search'"
    ></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";

import Footer from "./components/Footer/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知Vuex发请求,获取数据, 存储与仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
