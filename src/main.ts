import "./registerServiceWorker";
import Vue from "vue";
import App from "./App.vue";
import "./plugins/scrollto";
import "./plugins/vuetify";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
