<!-- 博客的首页 -->
<template>
    <el-main>
        home
    </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Home extends Vue {
   mounted(){
       // 修改当前模块的activeKey
    this.$store.commit("GET_CURRENT_ACTIVE_KEY", 'home');
   }
}
</script>

<style>
</style>