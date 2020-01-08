<!-- 博客的首页 -->
<template>
  <el-main>
    <section>
      <el-row :gutter="24">
        <el-col
          :span="12"
          v-for="item in articlesList"
          :key="item.art_id"
          :style="{marginBottom:'20px'}"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              v-if="menuId==='4'"
              class="img-icon"
              :src="`../../src/assets/images/essay/essay_bg_${Math.ceil(Math.random(1,29)*10)}.jpg`"
            />
            <img
              v-if="item.p_url"
              class="img-icon"
              :src="`http://localhost/www/yayablog/${item.p_url}`"
            />
            <div style="padding: 14px;">
              <span>{{item.art_title}}</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="look-more-btn" @click="()=>beforeRedirect(item)">查看全文</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-button class="add-article" type="primary" icon="el-icon-plus" circle @click="addArticle"></el-button>
    </section>
  </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { Route } from "vue-router";

@Component
export default class Module extends Vue {
  @State articlesList!: []; // 文章列表
  @State menuList!: []; // 系统菜单
  @State menuId!: string; // 系统菜单

  mounted() {
    const { type } = this.$route.params;
    this.init(type);
  }

  /**
   * 初始化数据
   */
  init(type: string) {
    const filterList = (this.menuList || []).filter(
      item => item["menu_name"] === type
    );
    if (filterList.length >= 1) {
      // 获取当前菜单下文章列表
      const menuId = filterList[0]["menu_id"];
      this.$store.dispatch("GET_ARTICLES_LIST", {
        menuId
      });
    }
    // 修改当前模块的activeKey
    this.$store.commit("GET_CURRENT_ACTIVE_KEY", type);
  }

  @Watch("$route", { immediate: true })
  routeChange(newVal: Route) {
    const { type } = newVal.params;
    this.init(type);
  }

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

  redirectToDetails(details: { art_id: number }, list: []) {
    const { type } = this.$route.params;
    this.$store.commit("ARTICLE_DETAILS", { details, list });
    this.$router.push(`/blog-detail/${type}/${details.art_id}`);
  }

  addArticle() {
    const { type } = this.$route.params;
    // 跳转到发布文章
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
</style>