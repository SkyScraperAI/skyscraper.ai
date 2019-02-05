import Vue from "vue";
import Vuetify from "vuetify";

import "../stylus/app.styl";

Vue.use(Vuetify, {
  theme: {
    primary: "#2c303a",
  },
  customProperties: true,
  iconfont: "mdi"
});
