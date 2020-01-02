export interface RootStateTypes {
  menuList: Array<any>; // 菜单列表
  articlesList: Array<any>; // 当前模块的文章列表
  currentModuleKey: string; // 当前模块的key
  menuId: string; // 当前模块的key对应的id
  currentArticleDetails: {}; // 当前查看的文章的详情
}
