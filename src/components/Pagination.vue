<!-- 分页组件 -->
<template>
  <div class="block">
    <el-pagination
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :current-page="pagination.current"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Pagination",
  props: ["pagination", "change"],
  data() {
    return {
      currentPage: 1 // 当前页数
    };
  },
  computed: {},
  mounted() {},
  methods: {
    // 更换页码
    handleCurrentChange(val: number) {
      this.change({ page: val });
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