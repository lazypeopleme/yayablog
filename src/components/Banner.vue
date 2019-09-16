<!-- 博客的广告组件 -->
<template>
    <div class="blog-banner">
        Banner
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Banner extends Vue {
   
}
</script>

<style>
.blog-banner{
    margin-top:150px; 
}
</style>