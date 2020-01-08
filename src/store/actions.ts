import axios from "axios";
import { ActionTree } from "vuex";
import { RootStateTypes } from "./types";

const actions: ActionTree<RootStateTypes, any> = {
  GET_BLOGMENU({ commit }) { // 获取博客菜单
    axios.get("http://localhost/www/yayablog/getMenuList.php").then(res => {
      const { data } = res;
      commit("GET_BLOGMENU", data);
    });
  },
  GET_ARTICLES_LIST({ commit }, params) { // 获取文章列表
    axios
      .get("http://localhost/www/yayablog/getArticlesList.php", { params })
      .then(res => {
        const { data } = res;
        commit("GET_ARTICLES_LIST", data.status === 0 ? [] : data);
      });
  },
  ADD_ARTICLE({}, params: any) { // 发布文章
    return axios.post("http://localhost/www/yayablog/addArticle.php", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      } //加上这个
    });
  },
  UPLOAD_IMG({}, params: any) { // 上传图片
    return axios.post(
      "http://localhost/www/yayablog/addBeautifulMoment.php",
      params
    );
  },
  SELECT_IMG({}, params: any) {  // 查询图片列表
    return axios.get(
      "http://localhost/www/yayablog/getImgList.php",
      {params}
    );
  },
  UPDATE_ARTICLE({}, params: any) { // 修改文章内容
    return axios.post(
      "http://localhost/www/yayablog/updateArticle.php",
      params,
      {
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        // } //加上这个
      }
    );
  },
  DELETE_ARTICLE({}, params: any) { // 删除文章
    return axios.delete("http://localhost/www/yayablog/delArticle.php", params);
  }
};
export default actions;
