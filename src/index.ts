import Vue from "vue";
import Element from 'element-ui';
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Element);


new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});