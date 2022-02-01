// 对axios 进行二次封装
import axios from "axios";

//在当前模块中引入store
import store from "@/store";
//引入进度条
import nProgress from "nprogress";
//引入进度条样式
//start:进度条开始 done:进度条结束
import "nprogress/nprogress.css";

//1. 利用axios 对象的方法create, 去创建一个axios 实例
//2. request就是axios, 只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径,发请求的时候, 路径当中会初选api
  baseURL: "/api",
  //代表请求超时的时间10s
  // timeout: 10000,
});
//请求拦截器:再发请求之前, 请求拦截器可以检测到, 可以在请求发出去之前做一些事情

requests.interceptors.request.use((config) => {
  //config:配置对象, 对象里面有一个属性很重要, header请求头
  //判断uuid
  if (store.state.detail.uuid_token) {
    console.log(store.state.detail.uuid_token);
    console.log(store.state.user.token);
    //请求头添加一个字段(userTempId):和后台老师商量好了,并不是想加什么就加什么
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  //需要携带token给服务器
  if (localStorage.getItem("TOKEN")) {
    config.headers.token = localStorage.getItem("TOKEN");
  }
  //进度条开始动配置在拦截器里面

  nProgress.start();
  return config;
});

//响应拦截器
requests.interceptors.response.use(
  //响应成功的回调函数
  (res) => {
    //在响应的request 里面加上,进度条结束
    nProgress.done();

    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error(error));
  }
);

export default requests;
