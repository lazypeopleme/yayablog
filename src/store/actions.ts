import axios from "axios";
import { ActionTree } from "vuex";
import { RootStateTypes } from "./types";

const actions: ActionTree<RootStateTypes, any> = {
  // GET_BLOGMENU({ commit, state: RootStateTypes }, params: string) {
  //   commit("GET_BLOGMENU", params);
  // },
  GET_BLOGMENU({ commit }) {
    axios.get("http://localhost/www/yayablog/getMenuList.php").then(res => {
      const { data } = res;
      commit("GET_BLOGMENU", data);
    });
  },
  GET_ARTICLES_LIST({ commit }, params: object) {
    axios
      .get("http://localhost/www/yayablog/getArticlesList.php", {params})
      .then(res => {
        const { data } = res;
        commit("GET_ARTICLES_LIST", data);
      });
  }
};
export default actions;
