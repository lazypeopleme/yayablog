<!-- 技术分享 -->
<template>
    <el-main>
        <h2># 又是进步的一天呢 #</h2>
        <mark-down />
    </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import MarkDown from "vue-meditor";

@Component({
  components: { MarkDown }
})
export default class TechnicalNotes extends Vue {
   
}
</script>

<style scoped>
h2 {
    color: #bbb;
}
</style>