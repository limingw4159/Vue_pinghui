import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Detail from "@/pages/Detail/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess/AddCartSuccess";
import ShopCart from "@/pages/ShopCart/ShopCart";
import Trade from "@/pages/Trade/Trade";
import Pay from "@/pages/Pay/Pay";
import PaySuccess from "@/pages/PaySuccess/PaySuccess";
import Center from "@/pages/Center/Center";
//引入二级路由组件
import MyOrder from "@/pages/Center/MyOrder/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder/GroupOrder";
//配置路由组件

export default [
  {
    path: "/center",
    component: Center,
    meta: { show: true },
    //二级路由组件
    children: [
      {
        //path要么写全要么不写
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "/center",
        redirect: "myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    name: "PaySuccess",
    meta: { show: true },
  },
  {
    path: "/pay",
    component: Pay,
    name: "pay",
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/Trade",
    component: Trade,
    name: "trade",
    meta: { show: true },
    //路由独享首位
    beforeEnter: (to, from, next) => {
      //去交易页面,必须是从购物车而来
      if (from.path == "/shopcart") {
        next();
      } else {
        //其他的路由组件而来, 只能回哪去
        next(false);
      }
    },
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
