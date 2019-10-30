import { MutationTree } from "vuex";
import { RootStateTypes } from "./types";

const mutations: MutationTree<RootStateTypes> = {
  // 获取菜单列表
  GET_BLOGMENU(state: RootStateTypes,payload: Array<any>) {
    state.menuList=payload;
  },
  // 获取当前模块文章列表
  GET_ARTICLES_LIST(state: RootStateTypes,payload: Array<any>) {
    state.articlesList=payload;
  },
  // 修改当前模块的activeKey
  GET_CURRENT_ACTIVE_KEY(state: RootStateTypes,payload: string) {
    state.currentModuleKey=payload;
  }
};

export default mutations;
