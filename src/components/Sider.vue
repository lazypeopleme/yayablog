<!-- 侧边栏组件 -->
<template>
  <el-aside width="25%">
    <el-menu
      :default-active="'home'"
      class="el-menu-demo"
      mode="vertical"
      active-text-color="#ffffff"
    >
      <el-menu-item v-for="{menu_id,menu_name,menu_meaning} in menuList" :key="menu_name">
        <router-link
          :class="currentKey===menu_name?'active':''"
          :to="`/${menu_id==='1'?'':'blog/'}${menu_name}`"
        >{{menu_meaning}}</router-link>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Sider",
  props: ["menuList", "currentKey"],
  data() {
    return {};
  },
  methods: {
    increment() {},
    decrement() {}
  },
  computed: {
    exclamationMarks(): string {
      return '';
    }
  }
});
</script>

<style scoped>
.el-aside {
  background: url(../../src/assets/images/bg.jpg) center center no-repeat;
  background-size: cover;
}
.el-menu-demo {
  position: absolute;
  top: 25%;
  left: 0;
  background-color: transparent;
  border: none;
}
.el-menu-item:hover {
  background-color: transparent;
}
a.active {
  color: #fff;
}
</style>