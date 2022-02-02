import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router";
Vue.config.productionTip = false;

//引入仓库
import store from "@/store";

//Vue Component 是可以获取全局组件的方法, NavCategory 可以拿到组件的名字
//注册全局组件
import NavCategory from "@/components/NavCategory/NavCategory";
Vue.component(NavCategory.name, NavCategory);

import Carousel from "@/components/Carousel/Carousel";
Vue.component(Carousel.name, Carousel);

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Pagination from "@/components/Pagination/Pagination";
Vue.component(Pagination.name, Pagination);
/* add icons to the library */
library.add(faUserSecret);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

//测试发送api
// import { reqCategoryList } from "@/api";
// reqCategoryList();

//引入MockServer.js-----mock数据
import "@/mock/mockServe";

//在main 里面引入swiper样式

// Import Swiper styles
import "swiper/css/swiper.css";

//统一引入API
import * as API from "@/api";
import { MessageBox } from "element-ui";
//element ui 注册组件可以挂在原型上,需要先引入
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
new Vue({
  render: (h) => h(App),
  //注册路由, 由于KV一致,省略V
  router,
  //注册仓库:组件实例的身上会多一个属性$store属性
  store,
  //配置全局总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
    //把Vue的原型对象, 直接加一个API的属性, 把所有的api 直接挂载在原型对象身上, 可以让其他的组件直接使用
    Vue.prototype.$API = API;
  },
}).$mount("#app");
