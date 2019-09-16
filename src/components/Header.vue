<!-- 博客的头部组件 -->
<template>
    <header class="blog-header" :style="headerStyle">
        <el-row :gutter='24'>
            <el-col :span='4' :offset='2'>
                <el-avatar :size='120' src="../../src/assets/images/logo.jpg" alt='是丫丫呀！'></el-avatar>
            </el-col>
            <el-col :span='18'>
                <el-menu :default-active="'1'" 
                class="el-menu-demo" 
                mode="horizontal" 
                
                active-text-color="#ffd04b"
                >
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">技术笔记</el-menu-item>
                    <el-menu-item index="2">一窍不通</el-menu-item>
                    <el-menu-item index="3">丫丫随笔</el-menu-item>
                    <el-menu-item index="4">美好瞬间</el-menu-item>
                </el-menu> 
            </el-col>
        </el-row>
    </header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class Header extends Vue {
   get headerStyle(){
        return {
            'background':'url(../../src/assets/images/bg_2.jpg) top left no-repeat',
            'background-size':'100%'
            }
    }
}
</script>

<style scoped>
.blog-header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-size:100%;
    /* height: 150px;
    line-height: 150px; */
}
</style>