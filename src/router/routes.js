import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Detail from "@/pages/Detail/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess/AddCartSuccess";
import ShopCart from "@/pages/ShopCart/ShopCart";
import Trade from "@/pages/Trade/Trade";
import Pay from "@/pages/Pay/Pay";
//配置路由组件
export default [
  {
    path: "/pay",
    component: Pay,
    name: "pay",
    meta: { show: true },
  },
  {
    path: "/Trade",
    component: Trade,
    name: "trade",
    meta: { show: true },
  },
  {
    path: "/ShopCart",
    component: ShopCart,
    name: "shopcart",
    meta: { show: true },
  },

  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    name: "addcartsuccess",
    meta: { show: true },
  },
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: { show: true },
  },
  {
    path: "/home",
    component: Home,
    // meta用来配置组件是否显示
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
    name: "search",
    //路由组件可不可以传props?
    //可以需要用在另外一边用props接
    //布尔值写法: params,
    // props: true,
    //对象写法:
    // props: { a: 1, b: 2 },
    //函数写法: 可以传递params参数, query参数, 通过props传递给路由组件
    //已经在路由这边处理好了, 调用的时候直接用 props接具体的参数
    props: ($route) => {
      return { keyword: $route.params.keyword, k: $route.query.k };
    },
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },
  {
    path: "/Register",
    component: Register,
    meta: { show: true },
  },
  //重定向,在项目跑起来的时候, 立马让他定位到首页
  {
    path: "*",
    redirect: "/home",
  },
];
