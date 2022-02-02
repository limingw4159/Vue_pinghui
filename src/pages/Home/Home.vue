<template>
  <div>
    <!-- 三级联动全局组件,三级联动已经注册为全局组件, 所以不需要引入 -->
    <NavCategory></NavCategory>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank />
    <Like />
    <!-- //注意v-for之间的空格 -->
    <!-- floor这个组件:自己在组件内部是没有发送请求的, 数据是父组件给的 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import NavCategory from "@/components/NavCategory/NavCategory.vue";
//引入其余的组件
import ListContainer from "@/pages/Home/ListContainer/ListContainer.vue";
import Recommend from "@/pages/Home/Recommend/Recommend.vue";
import Rank from "@/pages/Home/Rank/Rank.vue";
import Like from "@/pages/Home/Like/Like.vue";
import Floor from "@/pages/Home/Floor/Floor.vue";
import Brand from "@/pages/Home/Brand/Brand.vue";
import { mapState } from "vuex";

export default {
  components: {
    NavCategory,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action,获取floor组件的数据
    this.$store.dispatch("getFloorList");
    //获取用户信息在首页展示
    this.$store.dispatch("getUserInfo");
  },
  watch: {},
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style></style>
