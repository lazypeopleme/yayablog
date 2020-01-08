<!-- 文章明细 -->
<template>
  <el-main>
    <h3>{{title}}</h3>
    <p v-if="menuId==='4'">{{text}}</p>
    <div v-else-if="menuId==='5'">
      <p>{{text}}</p>
      <img
        class="img-tyle"
        v-for="{p_id,p_url} in currentArticleImgList"
        :key="p_id"
        :src="`http://localhost/www/yayablog/${p_url}`"
        alt
      />
    </div>
    <div v-else>
      <mark-down @on-save="save" ref="md" />
      <el-button
        circle
        type="info"
        class="submit-btn"
        icon="el-icon-check"
        @click="$ref.md.handleSave"
      ></el-button>
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
    art_title: string;
    art_text: string;
    art_Id: number;
  };
  @State currentArticleImgList!: [];

  private id: number; //
  private title: string; //
  private text: string; //

  constructor() {
    super();
    const {
      art_Id,
      art_title,
      art_text
    } = this.$store.state.currentArticleDetails;
    this.title = art_title;
    this.text = art_text;
    this.id = art_Id;
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
}
</script>

<style scoped>
.img-tyle {
  width: 80%;
  height: 100px;
}
</style>
