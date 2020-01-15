<!-- 博客的首页 -->
<template>
  <el-main>
  </el-main>
</template>

<script lang="ts">
declare function require(img: string): string;

import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  mounted() {
    // 修改当前模块的activeKey
    this.$store.commit("GET_CURRENT_ACTIVE_KEY", "home");
  }
}
</script>

<style>
</style>