<!-- 丫丫随笔 -->
<template>
  <el-main>
    <header>
      <h2># 记录今天的心情呀 #</h2>
      <el-button circle type="info" class="submit-btn" icon="el-icon-check" @click="realse"></el-button>
    </header>
    <el-form :model="formData" :rules="rules" ref="essayForm">
      <el-form-item prop="title" label="文章标题">
        <el-input clearable show-word-limit v-model="formData.title" :style="{ width: '30%' }"></el-input>
      </el-form-item>
      <el-form-item>
        <editor-bar v-model="text" :isClear="isClear" @change="change" />
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";

import { notification } from "../util";
import EditorBar from "../components/WangEditor.vue";

@Component({
  components: { EditorBar }
})
export default class InformalEssay extends Vue {
  @State menuId!: string; // 当前模块的key对应的id

  private text: string; // 文本
  private isClear: boolean; // 是否清除文本
  private isTextChange: boolean; // 文本编辑器是否填写了新内容
  private formData: { title: string }; // 表单对象
  private rules: { title: {} }; // 表单校验规则

  constructor() {
    super();
    this.isClear = false;
    this.isTextChange = false;
    this.text = "<p>开心与不开心都值得回忆......</p>";
    this.formData = { title: "" };
    this.rules = {
      title: [
        { required: true, message: "请填写文章标题", trigger: "change" },
        { max: 18, message: "标题长度不超过18个字符", trigger: "blur" }
      ]
    };
  }

  mounted() {
    // 修改当前模块的activeKey
    this.$store.commit("GET_CURRENT_ACTIVE_KEY", "informal-essay");
  }

  /**
   * 发布文章
   */
  realse() {
    const { menuId, text, formData, isTextChange } = this;
    const form: any = this.$refs["essayForm"];
    form.validate((valid: boolean): boolean => {
      if (valid) {
        if (isTextChange) {
          let data = new FormData();
          data.append("menuId", menuId);
          data.append("title", formData.title);
          data.append("text", text);
          this.$store.dispatch("ADD_ARTICLE", data).then((res: any) => {
            const { status, message } = res.data;
            if (status === 1) {
              notification();
              this.$router.push(
                `/blog-detail/informal-essay/${res.data.artId}`
              );
            } else notification("warning", message);
          });
        } else notification("info", "您还没有编辑您的日记呢");
      }
      return valid;
    });
  }

  change(val: string) {
    this.isTextChange = val !== "";
  }
}
</script>

<style scoped></style>
