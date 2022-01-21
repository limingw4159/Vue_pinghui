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
