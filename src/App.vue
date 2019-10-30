<template>
  <div>
    <el-container>
      <Sider class="blog-sider" :menuList="menuList" :currentKey="currentModuleKey"></Sider>
      <router-view class="blog-main" />
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";
import Sider from "./components/Sider.vue";
import { log } from "util";

import { State, Mutation } from "vuex-class";

@Component({
  components: { Sider }
})
export default class App extends Vue {
  @State menuList!: []; // 系统菜单
  @State currentModuleKey!: string; // 当前菜单的key

  mounted() {
    // 获取菜单列表
    this.$store.dispatch("GET_BLOGMENU");
  }
}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #000;
}
a:hover {
  color: #fff;
}
.blog-sider {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 25%;
  left: 0;
}
.blog-main {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 73%;
  margin-left: 2%;
}
</style>