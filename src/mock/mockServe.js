//先引入mockjs模块
import Mock from "mockjs";
//把Json数据格式引入进来,以下两个json 根本都没有对外暴漏, 但是可以直接引进
//webpack默认对外暴露的资源有:图片, JSON数据格式

import banner from "./banner.json";
import floor from "./floor.json";
//mock数据:第一个参数请求地址, 第二个参数:请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }); //模拟首页的大的轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });
