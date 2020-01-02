<!-- 技术分享 -->
<template>
  <el-main>
    <header>
      <h2># 又是进步的一天呢 #</h2>
      <el-button
        circle
        type="info"
        class="submit-btn"
        icon="el-icon-check"
        :disabled="isRealse"
        @click="realse"
      ></el-button>
    </header>
    <el-form :model="formData" :rules="rules" ref="languageForm">
      <el-form-item prop="title" label="文章标题">
        <el-input clearable show-word-limit v-model="formData.title" :style="{width:'30%'}"></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <mark-down />
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import MarkDown from "vue-meditor";

@Component({
  components: { MarkDown }
})
export default class TechnicalNotes extends Vue {
  private isRealse: boolean; // 发布文章标识
  private formData: { title: string; content: string }; // 表单对象{description:照片描述}
  private rules: { title: {}; content: {} }; // 表单校验规则

  constructor() {
    super();
    this.isRealse = true;
    this.formData = { title: "", content: "" };
    this.rules = {
      title: [
        { required: true, message: "请填写文章标题", trigger: "change" },
        { max: 18, message: "标题长度不超过18个字符", trigger: "blur" }
      ],
      content: [{ required: true, message: "请留下你的笔记", trigger: "blur" }]
    };
  }

  /**
   * 发布文章
   */
  realse() {}
}
</script>

<style scoped>
h2 {
  color: #bbb;
}
</style>