<!-- 丫丫随笔 -->
<template>
  <el-main>
    <h2># 记录今天的心情呀 #</h2>
    <editor-bar v-model="editor.info" :isClear="isClear" @change="change" />
  </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import EditorBar from "../components/WangEditor.vue";

@Component({
  components: { EditorBar }
})
export default class InformalEssay extends Vue {
  private editor: { info: string };
  private isClear: boolean;

  constructor() {
    super();
    this.editor = { info: "<p>开心与不开心都值得回忆......</p>" };
    this.isClear = false;
  }

  created(){
    
  }
  
  mounted() {
    // 修改当前模块的activeKey
    this.$store.commit("GET_CURRENT_ACTIVE_KEY", "informal-essay");
  }

  change(val: any) {
    console.log(val);
  }
}
</script>

<style scoped>
h2 {
    color: #bbb;
}
</style>