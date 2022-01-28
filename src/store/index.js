import Vue from "vue";

import Vuex from "vuex";
//引入其他的模块
import home from "./home/home";
import search from "./search/search";
import shopcart from "./shopcart/shopcart";

Vue.use(Vuex);
//对外暴露store类的一个实例

import detail from "./detail/detail";
export default new Vuex.Store({
  //实现Vuex仓库模式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
  },
});
