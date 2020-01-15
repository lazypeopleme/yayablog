import { MutationTree } from "vuex";
import { RootStateTypes } from "./types";

const mutations: MutationTree<RootStateTypes> = {
  // 获取菜单列表
  GET_BLOGMENU(state: RootStateTypes, payload: Array<any>) {
    state["menuList"] = payload;
  },
  // 获取当前模块文章列表
  GET_ARTICLES_LIST(state: RootStateTypes, payload: { content: []; pageInfo: {} }) {
    const { content, pageInfo } = payload;
    state["articlesList"] = content;
    state["pagination"] = pageInfo;
  },
  // 修改当前模块的activeKey
  GET_CURRENT_ACTIVE_KEY(state: RootStateTypes, payload: string) {
    const { menuList } = state;
    state["currentModuleKey"] = payload;
    const activeList = menuList.filter(m => m["menu_name"] === payload);
    if (activeList.length === 1) {
      state["menuId"] = activeList[0]["menu_id"];
    }
  },
  // 当前查看的文章的详情
  ARTICLE_DETAILS(state: RootStateTypes, payload: { details: {}; list: [] }) {
    state["currentArticleDetails"] = payload.details;
    state["currentArticleImgList"] = payload.list;
  }
};

export default mutations;
