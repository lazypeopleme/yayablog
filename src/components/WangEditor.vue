<!-- 文本编辑器组件 -->
<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar"></div>
    <div ref="editor" class="text"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import E from "wangeditor";

export default Vue.extend({
  name: "EditorBar",
  data() {
    return {
      editor:E,
      info_: this.value,
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: ["value", "isClear"],
  watch: {
    isClear(val: boolean) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = "";
      }
    },
    value(value: string) {
      // 使用 v-model 时，设置初始值
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    }
    // value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig = {
        uploadImgShowBase64: false, // base 64 存储图片
        uploadImgServer: "", // 配置服务器端地址
        uploadImgHeaders: {}, // 自定义 header
        uploadFileName: "file", // 后端接受上传文件的参数名
        uploadImgMaxSize: 2 * 1024 * 1024, // 将图片大小限制为 2M
        uploadImgMaxLength: 6, // 限制一次最多上传 3 张图片
        uploadImgTimeout: 3 * 60 * 1000, // 设置超时时间
        menus: [
          // 配置菜单
          "head", // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          "quote", // 引用
          "emoticon", // 表情
          "image", // 插入图片
          "table", // 表格
          "video", // 插入视频
          "code", // 插入代码
          "undo", // 撤销
          "redo", // 重复
          "fullscreen" // 全屏
        ],
        uploadImgHooks: {
          fail: (xhr: XMLHttpRequest, editor: E, result: {}) => {
            // 插入图片失败回调
          },
          success: (xhr: XMLHttpRequest, editor: E, result: {}) => {
            // 图片上传成功回调
          },
          timeout: (xhr: XMLHttpRequest, editor: E) => {
            // 网络超时的回调
          },
          error: (xhr: XMLHttpRequest, editor: E) => {
            // 图片上传错误的回调
          },
          customInsert: (
            insertImg: (url: string) => void,
            result: { url: string },
            editor: E
          ) => {
            // 图片上传成功，插入图片的回调
            //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
            // console.log(result.data[0].url)
            //insertImg()为插入图片的函数
            //循环插入图片
            // for (let i = 0; i < 1; i++) {
            // console.log(result)
            let url = "http://otp.cdinfotech.top" + result.url;
            insertImg(url);
            // }
          }
        },
        onchange: (html: string) => {
          this.info_ = html; // 绑定当前逐渐地值
          this.$emit("change", this.info_); // 将内容同步到父组件中
        }
      };
      // 创建富文本编辑器
      this.editor.create();
    }
  }
});
</script>

<style scoped>
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>