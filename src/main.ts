import Vue from "vue";
import App from "./App.vue";
import "./plugins/scrollto";
import "./plugins/visibility";
import { socketAndStore } from "./plugins/socketio";

import "./plugins/vuetify";
import "./registerServiceWorker";
import store from "./store";

// socketAndStore(store);

Vue.config.productionTip = false;


new Vue({
    store,
    render: (h) => h(App),
}).$mount("#app");
