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

import store from "@/store/index";

let router = new VueRouter({
  routes,
  scrollBehavior() {
    // 返回的这个y=0,代表的滚动条在最上方
    return { y: 100 };
  },
});
//全局首位:前置守卫(在理由跳转至简进行判断)
router.beforeEach(async (to, from, next) => {
  //to:可以获取到你要跳转到那个路由的信息
  // console.log(to);
  //from:可以获取到你从哪个路由而来的信息
  // console.log(from);
  //next():放行的函数, next(path)放行到指定的路由 , next(false):可以终止当前的导航并且重置到from的路径
  //next('/login')
  //测试用先全都放行
  //用户登陆了,才会有token, 未登陆一定不会有token
  let token = store.state.user.token;
  //不停的捞用户信息, 所以就得把用户信息放在这里面
  let name = store.state.user.userInfo.name;

  //用户已经登陆了, 还想去login 不行
  if (token) {
    if (to.path == "/login" || to.path == "/register") {
      next("/home");
    } else {
      //登陆了,但是去的不是login[home|search|detail|shopcart]
      //如果用户名已有
      if (name) {
        next();
      } else {
        try {
          //没有用户信息,派发action让仓库存储用户信息再跳转
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //如果走到此处,说明token在服务器端过期了, 需要重新登陆,清除token
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    //未登陆不能去交易相关,不能去支付相关[pay/paysuccess],不能去个人中心
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      //把为登陆的时候想去而没有去成的信息, 存储与地址栏中[路由]
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});
export default router;
