import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/Home.vue";
import Module from "./pages/Module.vue";
import ModuleDetails from "./pages/ModuleDetails.vue";
import TechnicalNotes from "./pages/TechnicalNotes.vue";
import Language from "./pages/Language.vue";
import InformalEssay from "./pages/InformalEssay.vue";
import BeautifulMoment from "./pages/BeautifulMoment.vue";

Vue.use(VueRouter);

const routes: Array<any> = [
  { path: "/home", name: "h", component: Home },
  { path: "/blog/:type", component: Module },
  { path: "/blog-detail/:type/:articleId", component: ModuleDetails },
  { path: "/technical-notes", component: TechnicalNotes },
  { path: "/language", component: Language },
  { path: "/informal-essay", component: InformalEssay },
  { path: "/beautiful-moment", component: BeautifulMoment },
  { path: "/*", redirect: { name: "h" } }
];
export default new VueRouter({ routes, mode: "history",linkActiveClass:'active' });
