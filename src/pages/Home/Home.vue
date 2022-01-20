<template>
  <div>
    <!-- 三级联动全局组件,三级联动已经注册为全局组件, 所以不需要引入 -->
    <NavCategory></NavCategory>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank />
    <Like />
    <Floor />
    <Floor />
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
};
</script>

<style></style>
