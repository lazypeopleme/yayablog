<!-- 博客的首页 -->
<template>
  <el-main>
    <section>
      <el-row :gutter="24">
        <el-col
          :span="menuId==='4'||menuId==='5'?12:24"
          v-for="item in articlesList"
          :key="item.art_id"
          :style="{marginBottom:'20px'}"
          @click.native="()=>beforeRedirect(item)"
        >
          <el-card v-if="menuId==='4'" :body-style="bodyStyle">
            <img
              class="img-essay"
              :src="require(`../../src/assets/images/essay/essay_bg_${Math.ceil(Math.random(1,29)*10)}.jpg`)"
            />
            <div class="essay-text">
              <h4 class="text-title">{{item.art_title}}</h4>
              <p v-html="textRows(item.art_text)"></p>
              <span v-if="showEllipsis(item.art_text)">......</span>
              <p class="time">
                <i>{{item.art_publish_date.slice(0,10)}}</i>
              </p>
            </div>
          </el-card>
          <el-card v-else-if="menuId==='5'" :body-style="bodyStyle">
            <img
              v-if="item.p_url"
              class="img-icon"
              :src="`http://localhost/www/yayablog/${item.p_url}`"
            />
            <div class="moment-text">
              <h4 class="text-title">{{item.art_title}}</h4>
              <p class="time">
                <i>{{item.art_publish_date.slice(0,10)}}</i>
              </p>
            </div>
          </el-card>
          <el-card v-else :body-style="bodyStyle">
            <div style="padding: 15px;" class="text">
              <h4 class="text-title">{{item.art_title}}</h4>
              <p class="time">
                <i>{{item.art_publish_date.slice(0,10)}}</i>
              </p>
              <p class="ellipsis">{{removeHTMLTag(item.art_text)}}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <Pagination :pagination="pagination" :change="init" />
      <el-button class="add-article" type="primary" icon="el-icon-edit" circle @click="addArticle"></el-button>
    </section>
  </el-main>
</template>

<script lang="ts">
declare function require(img: string): string;

import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { Route } from "vue-router";

import Pagination from "../components/Pagination.vue";

@Component({
  components: { Pagination }
})
export default class Module extends Vue {
  @State articlesList!: []; // 文章列表
  @State menuList!: []; // 系统菜单
  @State menuId!: string; // 系统菜单
  @State pagination!: {}; // 分页信息

  private bodyStyle: {};

  constructor() {
    super();
    this.bodyStyle = { padding: "5px", position: "relative" };
  }

  mounted() {
    this.init();
  }

  /**
   * 初始化数据
   */
  init(page?: {}) {
    const { type } = this.$route.params;
    const filterList = (this.menuList || []).filter(
      item => item["menu_name"] === type
    );
    if (filterList.length >= 1) {
      // 获取当前菜单下文章列表
      const menuId = filterList[0]["menu_id"];
      this.$store.dispatch("GET_ARTICLES_LIST", {
        menuId,
        ...page
      });
    }
    // 修改当前模块的activeKey
    this.$store.commit("GET_CURRENT_ACTIVE_KEY", type);
  }

  /**
   * 监听路由
   */
  @Watch("$route", { immediate: true })
  routeChange(newVal: Route) {
    this.init();
  }

  /**
   * 判断内容是否超过三行，超过则需处理文本
   */
  textRows(text: string = "") {
    // 判断行里的<p></p>是否大于三个
    const rows = text.split("<p>");
    const rowsText = `<p>${rows[1]}<p>${rows[2]}`;
    if (rows.length > 4 && rowsText.length <= 57) {
      return rowsText;
    } else return text.slice(0, 57);
  }

  /**
   * 判断内容是否超过三行，超过则显示省略号
   */
  showEllipsis(text: string = "") {
    return text.split("<p>").length > 4 || text.length > 56;
  }

  /**
   * 过滤文章内容
   */
  removeHTMLTag(str: string) {
    str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, "\n"); //去除多余空行
    str = str.replace(/&nbsp;/gi, ""); //去掉&nbsp;
    return str;
  }

  /**
   * 跳转页面前的判断
   */
  beforeRedirect(details: { art_id: number }) {
    const { type } = this.$route.params;
    if (type === "beautiful-moment") {
      this.$store
        .dispatch("SELECT_IMG", { artId: details.art_id })
        .then((res: any) => {
          const list = res.data.length ? res.data : [];
          this.redirectToDetails(details, list);
        });
    } else this.redirectToDetails(details, []);
  }

  /**
   * 跳转页面
   */
  redirectToDetails(details: { art_id: number }, list: []) {
    const { type } = this.$route.params;
    this.$store.commit("ARTICLE_DETAILS", { details, list });
    this.$router.push(`/blog-detail/${type}/${details.art_id}`);
  }

  /**
   * 跳转到发布文章
   */
  addArticle() {
    const { type } = this.$route.params;
    this.$router.push(`/${type}`);
  }
}
</script>

<style scoped>
.look-more-btn {
  padding: 0;
  float: right;
}
.add-article {
  position: fixed;
  bottom: 10%;
  right: 2%;
}
.img-icon {
  width: 80%;
  padding: 10px 10% 0;
}
.img-essay {
  width: 90%;
  padding: 20px 5% 0;
}
.moment-text,
.text {
  padding: 15px;
}
.essay-text {
  padding: 15% 20%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
}
.text-title {
  margin: 0 0 8px;
}
.time {
  font-size: 14px;
  color: #666;
  text-align: right;
  margin: 0;
}
.ellipsis {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>