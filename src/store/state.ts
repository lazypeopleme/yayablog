import { RootStateTypes } from "./types";

const state: RootStateTypes = {
  menuList: [], // 菜单列表
  articlesList: [], // 当前模块的文章列表
  currentModuleKey: "home", // 当前模块的key
  menuId: "", // 当前模块的key对应的id
  currentArticleDetails: {}, // 当前查看的文章的详情
  currentArticleImgList: [], // 美好瞬间类型文章的图片列表
  pagination: {
    total: 0, // 总条数
    current: 1, // 当前页数
    pageSize: 6 // 每页条数
  } // 分页信息
};
export default state;
