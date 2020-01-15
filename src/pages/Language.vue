<!-- 一窍不通 -->
<template>
  <el-main>
    <header>
      <h2># 多少你得开点窍嘛 #</h2>
      <el-button circle type="info" class="submit-btn" icon="el-icon-check" @click="realse"></el-button>
    </header>
    <el-form :model="formData" :rules="rules" ref="languageForm">
      <el-form-item prop="title" label="文章标题">
        <el-input clearable show-word-limit v-model="formData.title" :style="{width:'30%'}"></el-input>
      </el-form-item>
      <el-form-item>
        <mark-down @on-save="save" ref="md"/>
      </el-form-item>
    </el-form>
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
export default class Language extends Vue {
  @State menuId!: string; // 当前模块的key对应的id

  private formData: { title: string }; // 表单对象
  private rules: { title: {} }; // 表单校验规则

  constructor() {
    super();
    this.formData = { title: "" };
    this.rules = {
      title: [
        { required: true, message: "请填写文章标题", trigger: "change" },
        { max: 18, message: "标题长度不超过18个字符", trigger: "blur" }
      ]
    };
  }

  /**
   * markDown的保存回调
   */
  save(content: { html: string }) {
    const { menuId, formData } = this;
    let data = new FormData();
    data.append("menuId", menuId);
    data.append("title", formData.title);
    data.append("text", content.html);
    this.$store.dispatch("ADD_ARTICLE", data).then((res: any) => {
      const { status, message } = res.data;
      if (status === 1) {
        notification();
        this.$router.push(`/blog-detail/informal-essay/${res.data.artId}`);
      } else notification("warning", message);
    });
  }

  /**
   * 发布文章
   */
  realse() {
    const { menuId, formData } = this;
    const form: any = this.$refs["languageForm"];
    const md: any = this.$refs["md"];
    form.validate((valid: boolean): boolean => {
      if (valid) md.handleSave();
      return valid;
    });
  }
}
</script>

<style scoped>
h2 {
  color: #bbb;
}
</style>