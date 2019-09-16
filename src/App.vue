<template>
  <div>
      <Header></Header>
      <Banner></Banner>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Banner from "./components/Banner.vue";

@Component({
    components:{Header,Banner}
})
export default class App extends Vue{
  
 
}
</script>

<style>

</style>