import axios from "axios";
import Vue from "vue";

import App from "./App.vue";
import "./plugins";

import { socketAndStore } from "./plugins/socketio";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

declare global {
  interface Window {
    AudioContext: AudioContext;
  }
}

socketAndStore(store);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
