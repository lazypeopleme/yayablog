<!-- 文章明细 -->
<template>
  <el-main>
    <h3>{{title}}</h3>
    <p v-if="menuId==='4'" v-html="text"></p>
    <div v-else-if="menuId==='5'">
      <p v-html="text"></p>
      <img
        class="img-tyle"
        v-for="{p_id,p_url} in currentArticleImgList"
        :key="p_id"
        :src="`http://localhost/www/yayablog/${p_url}`"
        alt
      />
    </div>
    <div v-else>
      <mark-down @on-save="save" ref="md" :initialValue="text" />
      <el-button circle type="info" class="submit-btn" icon="el-icon-check"></el-button>
    </div>
  </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import MarkDown from "vue-meditor";

import { notification } from "../util";

@Component({
  components: { MarkDown }
})
export default class ModuleDetails extends Vue {
  @State menuId!: string; // 当前模块的key对应的id
  @State currentArticleDetails!: {
    [key: string]: any;
  };
  @State currentArticleImgList!: [];

  private id: number;
  private title: string;
  private text: string;

  constructor() {
    super();
    this.title = "";
    this.text = "";
    this.id = 0;
  }

  mounted() {
    const { art_Id, art_title, art_text } = this.currentArticleDetails;
    this.title = art_title;
    this.text = art_text;
    this.id = art_Id;
  }

  /**
   * 返回
   */
  goBack() {
    const { type } = this.$route.params;
    this.$router.push(`/blog/${type}`);
  }

  /**
   * markDown的保存回调
   */
  save(content: { html: string }) {
    // const { id } = this;
    // this.$store
    //   .dispatch("UPDATE_ARTICLE", { id, text: content.html })
    //   .then((res: any) => {
    //     const { status, message } = res.data;
    //     if (status === 1) {
    //       notification();
    //     } else notification("warning", message);
    //   });
  }

  /**
   * 保存编辑后的markDown内容
   */
  handleSave() {
    const md: any = this.$refs["md"];
    md.handleSave();
  }
}
</script>

<style scoped>
.img-tyle {
  width: 80%;
}
</style>
