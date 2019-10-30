<!-- 一窍不通 -->
<template>
    <el-main>
        <h2># 多少你得开点窍嘛 #</h2>
        <mark-down />
    </el-main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import MarkDown from "vue-meditor";

@Component({
  components: { MarkDown }
})
export default class Language extends Vue {
   
}
</script>

<style scoped>
h2 {
    color: #bbb;
}
</style>