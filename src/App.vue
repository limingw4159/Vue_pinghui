<template>
  <div id="app">
    <Header></Header>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  mounted() {
    //通知Vuex发请求,获取数据, 存储与仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
