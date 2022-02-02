import {
  reqGetCode,
  reqLogout,
  reqUserInfo,
  reqUserLogin,
  reqUserRegister,
} from "@/api";
import { setToken, removeToken } from "@/utils/token";
//登陆与注册的模块
const state = {
  code: "",
  token: localStorage.getItem("TOKEN"),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    //把仓库中用户信息清空
    state.token = "";
    state.userInfo = {};
    //本地存书数据清空
    removeToken();
  },
};
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //获取验证码的这个接口, 把验证码返回, 但是正常情况, 后台把验证码发到哟哦那个户手机上
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  async userRegister({ commit }, user) {
    console.log(commit);
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //登陆业务[token]
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      //服务器下发token, 某一个用户的唯一标识符
      //将来经常通过带token找服务器要用户的信息进行展示
      commit("USERLOGIN", result.data.token);
      //持久化存储token
      // localStorage.setItem("TOKEN", result.data.token);
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //退出登陆
  async userLogout({ commit }) {
    //只是想服务器发起一次请求, 通知服务器清除token
    let result = await reqLogout();
    //action里面不能操作state,提交mutation修改state
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
