import axios from "axios";
import { ActionTree } from "vuex";
import { RootStateTypes } from "./types";

const actions: ActionTree<RootStateTypes, any> = {
  GET_BLOGMENU({ commit }) {
    axios.get("http://localhost/www/yayablog/getMenuList.php").then(res => {
      const { data } = res;
      commit("GET_BLOGMENU", data);
    });
  },
  GET_ARTICLES_LIST({ commit }, params) {
    axios
      .get("http://localhost/www/yayablog/getArticlesList.php", { params })
      .then(res => {
        const { data } = res;
        commit("GET_ARTICLES_LIST", data.status === 0 ? [] : data);
      });
  },
  ADD_ARTICLE({}, params: any) {
    return axios.post("http://localhost/www/yayablog/addArticle.php", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      } //加上这个
    });
  },
  UPLOAD_IMG({}, params: any) {
    return axios.post(
      "http://localhost/www/yayablog/addBeautifulMoment.php",
      params,
      {
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        // } //加上这个
      }
    );
  }
};
export default actions;
