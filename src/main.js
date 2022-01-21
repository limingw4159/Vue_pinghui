import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router";
Vue.config.productionTip = false;

//注册全局组件
import NavCategory from "@/components/NavCategory/NavCategory";

//引入仓库
import store from "@/store";

//Vue Component 是可以获取全局组件的方法, NavCategory 可以拿到组件的名字
Vue.component(NavCategory.name, NavCategory);

//测试发送api
// import { reqCategoryList } from "@/api";
// reqCategoryList();

//引入MockServer.js-----mock数据
import "@/mock/mockServe";

//在main 里面引入swiper样式

// Import Swiper styles
import "swiper/css/swiper.css";

new Vue({
  render: (h) => h(App),
  //注册路由, 由于KV一致,省略V
  router,

  //注册仓库:组件实例的身上会多一个属性$store属性
  store,
}).$mount("#app");
