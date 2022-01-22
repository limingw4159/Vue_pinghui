//search模块的小仓库
import Vue from "vue";

import Vuex from "vuex";

import { reqGetSearchInfo } from "@/api";

//需要使用插件一次
Vue.use(Vuex);

//sate:仓库存储数据的地方
const state = {
  //仓库初始状态
  searchList: {},
};

// //mutations: 修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};

// //action:处理action, 可以书写自己的业务逻辑, 也可以处理异步
const actions = {
  //获取search模块数据
  async getSearchList({ commit }, params = {}) {
    //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候, 至少传递一个参数(空对象)
    //params形参:适当用户派发action的时候, 第二个参数传递过来的, 至少是一个空对象
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};

// //getters:理解为计算属性, 用于简化仓库数据, 让组件获取仓库的数据更加方便
const getters = {
  //getter里面的参数state方法都指向当前search里的state,并非大仓库里面的state
  //注意此处有一个问题, 如果state.searchList.goodsList没有发送请求, 此时searchList是一个空对象, 里面的goodsList不存在,就会抱undefined 的错误
  //用mapGetters来处理

  goodsList(state) {
    //此处如果网速慢,state.searchList.goodsList应该返回的是undefined,
    //需要给别人返回一个空数组, 所以在后面加一个||[]
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    //此处如果网速慢,state.searchList.goodsList应该返回的是undefined,
    //需要给别人返回一个空数组, 所以在后面加一个||[]
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    //此处如果网速慢,state.searchList.goodsList应该返回的是undefined,
    //需要给别人返回一个空数组, 所以在后面加一个||[]
    return state.searchList.attrsList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
