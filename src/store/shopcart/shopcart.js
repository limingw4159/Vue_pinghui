/* eslint-disable no-unused-vars */
import { reqCarList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};

const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCarList();
    //测试是否能够获取个人购物车数据
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //删除全部勾选的产品,
  //下面的小括号里面原本的参数是context, 我们通常会用解构出来的dispatch, getters,state,commit
  deleteAllCheckedCart({ dispatch, getters }) {
    //context:小仓库,commit[提交mutations修改state], getters[计算属性], dispatch[派发action], state[当前的仓库数据]
    //获取购物车中全部的产品(是一个数组)
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      //判断是否是checked,然后数组便利删除item
      let result =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      //将每一次返回的Promise 添加到数组当中(因为要连续发送多个请求, 所以其中一个失败就会导致失败, 就把其所有的promise 放在一个数组当中)
      promiseAll.push(result);
    });
    //只要全部的都成功,返回即成功,.如果一个失败, 返回即为失败
    return Promise.all(promiseAll);
  },
  //修改全部产品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    //返回最终结果
    return Promise.all(promiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || [];
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
