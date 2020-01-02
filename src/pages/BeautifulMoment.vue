<!-- 美好瞬间 -->
<template>
  <el-main>
    <header>
      <h2># 留下你的美好瞬间吧 #</h2>
      <el-button circle type="info" class="submit-btn" icon="el-icon-check" @click="submitForm"></el-button>
    </header>
    <el-form :model="formData" :rules="rules" ref="momentForm">
      <el-form-item prop="title" label="文章标题">
        <el-input clearable show-word-limit v-model="formData.title" :style="{width:'30%'}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="8">
          <el-form-item ref="uploadValidator" prop="file">
            <el-upload
              class="upload"
              drag
              action
              multiple
              ref="upload"
              name="fileList"
              list-type="picture"
              accept=".jpg, .jpeg, .png, .gif"
              :auto-upload="false"
              :file-list="imgList"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :on-error="handleUploadError"
              :on-change="handlUploadChange"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-form-item class="text-area" prop="description">
            <el-input
              resize="none"
              type="textarea"
              placeholder="说说照片背后的故事吧！"
              maxlength="200"
              show-word-limit
              v-model="formData.description"
              :rows="8"
            ></el-input>
            <i v-if="formData.description" class="el-icon-close" @click="resetForm"></i>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="upload-tip">
      注：最多上传
      <mark>4张</mark>照片，且照片格式只能是jpg/jpeg/png/gif。
    </div>
    <ul class="img-list">
      <li v-for="{name,url} in imgList" :key="url">
        <img :src="url" />
        <i class="el-icon-close" @click="remove(name)"></i>
      </li>
    </ul>
  </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";

import { notification } from "../util";

@Component
export default class BeautifulMoment extends Vue {
  @State menuId!: string; // 当前模块的key对应的id

  private formData: { title: string; description: string; file: any }; // 表单对象{description:照片描述}
  private rules: { title: {}; description: {}; file: {} }; // 表单校验规则
  private imgList: Array<{ [index: string]: any }>; // 照片列表
  private artId: any; // 上传图片所带的参数
  private fileNum: number; // 上传的图片的数量

  constructor() {
    super();
    this.formData = { title: "", description: "", file: null };
    this.imgList = [];
    this.fileNum = 0;
    this.artId = 0;
    this.rules = {
      title: [
        { required: true, message: "请填写文章标题", trigger: "change" },
        { max: 18, message: "标题长度不超过18个字符", trigger: "blur" }
      ],
      description: [
        { required: true, message: "请填写照片描述", trigger: "blur" }
      ],
      file: [
        {
          required: true,
          message: "请至少选择一张照片",
          trigger: "change"
        }
      ]
    };
  }

  /**
   * 校验上传操作及预览图片
   */
  handlUploadChange(file: Object, fileList: Array<Object>) {
    const uploadValidator: any = this.$refs.uploadValidator;
    this.imgList = fileList.slice(0, 4);
    this.formData.file = true;
    uploadValidator.clearValidate();
  }

  beforeUpload(file: Blob) {
    let fd = new FormData();
    fd.append("artId", this.artId);
    fd.append("file", file);
    // 手动上传
    this.$store.dispatch("UPLOAD_IMG", fd).then(res => {
      const { status, message } = res.data;
      if (status === 1) {
        this.$router.push(`/blog-detail/beautiful-moment/${this.artId}`);
      } else notification("warning", message);
    });
    return false; // 禁止自动上传
  }

  /**
   * 删除照片
   * @param {string} name - 照片名称
   */
  remove(name: string) {
    const ind = this.imgList.findIndex(n => n.name === name);
    this.imgList.splice(ind, 1);
    if (this.imgList.length <= 0) {
      this.formData.file = null;
    }
  }

  /**
   * 发布文章
   */
  submitForm() {
    const that = this;
    const form: any = this.$refs["momentForm"];
    const upload: any = this.$refs["upload"];
    const { menuId, formData } = this;
    const { title, description } = formData;
    form.validate((valid: boolean): boolean => {
      if (valid) {
        let data = new FormData();
        data.append("title", title);
        data.append("menuId", menuId);
        data.append("text", description);
        that.$store.dispatch("ADD_ARTICLE", data).then((res: any) => {
          if (res && res.data.status === 1) {
            this.artId = res.data.artId;
            upload.submit();
          }
        });
      }
      return valid;
    });
  }

  /**
   * 重置文本框
   */
  resetForm() {
    this.formData.description = "";
  }

  /**
   * 上传失败后的操作
   */
  handleUploadError() {}
}
</script>

<style scoped>
.upload-msg {
  line-height: 0;
  font-size: 12px;
  color: #f56c6c;
}
.img-list > li {
  width: 20%;
  height: 100px;
  float: left;
  margin: 0 1%;
  position: relative;
}
.img-list > li > img {
  width: 100%;
  height: 100%;
}
.img-list > li > i {
  position: absolute;
  right: 0;
  top: 0;
  color: transparent;
}
.img-list > li:hover > i {
  color: #fff;
}
.upload {
  line-height: 0;
}
.upload-tip {
  font-size: 12px;
  color: #606266;
  margin-bottom: 20px;
}
.text-area > .el-form-item__content {
  position: relative;
  margin-left: "20px";
}
.text-area > .el-form-item__content > i {
  position: absolute;
  right: 1%;
  top: 3%;
  color: #606266;
}
</style>