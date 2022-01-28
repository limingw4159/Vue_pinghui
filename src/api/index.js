//当前的这个模块:api进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest";
//三级联动的接口

// /api/product/getBaseCategoryList get 无参数
//发请求:axios发请求返回结果Promise对象

export const reqCategoryList = () => {
  return requests({ url: "/product/getBaseCategoryList", method: "get" });
};

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get("/banner");

//获取floor组件的数据

export const reqFloorList = () => mockRequests.get("floor");

//获取搜索模块的数据 地址:/api/list 请求方式是:POST
//参数列表:
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }

//当前这个函数需不需要接受外部传递参数
//当前这个接口, 给服务器传递参数params, 至少是一个空对象,
export const reqGetSearchInfo = (params) =>
  requests({
    url: "/list",
    method: "post",
    data: params,
  });

//获取产品详情接口 URL:/api/item/{skuId} 请求方式:get
export const reqGoodsInfo = (skuid) => {
  return requests({ url: `/item/${skuid}`, method: "get" });
};

//将产品添加到购物车中(获取更新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

//获取购物车列表数据接口
//URL :/api/cart/cartList method:get
export const reqCarList = () =>
  requests({ url: "/cart/cartList", method: "get" });

//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId} method: DETELE
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });

//切换商品选中的状态
//URL:/api/cart/checkCart/{skuId}/{isChecked} method:get

export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });
