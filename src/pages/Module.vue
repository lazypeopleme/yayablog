<!-- 博客的首页 -->
<template>
  <el-main>
    <section>
      <el-row>
        <el-col :span="24">
          <el-card :body-style="{ padding: '0px' }">
            <img src />
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="look-more-btn">操作按钮</el-button>
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
  @State articlesList!: [] ; // 文章列表
  @State menuList!: [] ; // 系统菜单

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

  addArticle() {
    const { type } = this.$route.params;
    // 跳转到发布文章
    this.$router.push(`/${type}`);
  }
}
</script>

<style>
.look-more-btn {
  padding: 0;
  float: right;
}
.add-article {
  position: fixed;
  bottom: 10%;
  right: 2%;
}
</style>