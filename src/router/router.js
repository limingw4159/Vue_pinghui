//configure the router
import Vue from "vue";
import VueRouter from "vue-router";

//use plugin
Vue.use(VueRouter);

//config route

//声明式导航的push 问题以及怎么解决:
//先把VueRouter原型对象的push, 先保存一份
// let originPush = Vue.prototype.push;
// let originReplace = VueRouter.prototype.replace;
// //重写push|replace, 参数1:告诉原来push方法, 往哪里跳转(传递哪些参数)
// //参数而:成功的回调
// //参数三:失败的回调
// VueRouter.prototype.push = function (location, resolve, reject) {
//   if (resolve && reject) {
//     //call||apply区别:相同点,都可以调用函数一次,都可以篡改函数的上下文一次
//     //不同点:call与apply传递参数:call传递参数用逗号隔开, apply方法执行, 传递数组
//     originPush.call(this, location, resolve, reject);
//   } else {
//     originPush.call(
//       this,
//       location,
//       () => {},
//       () => {}
//     );
//   }
// };
// VueRouter.prototype.replace = function (location, resolve, reject) {
//   if (resolve && reject) {
//     originReplace.call(this, location, resolve, reject);
//   } else {
//     originReplace.call(
//       this,
//       location,
//       () => {},
//       () => {}
//     );
//   }
// };

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题, 网上的代码
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
import routes from "./routes";
export default new VueRouter({
  routes,
  scrollBehavior() {
    // 返回的这个y=0,代表的滚动条在最上方
    return { y: 100 };
  },
});
