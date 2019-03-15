import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify, {
  theme: {
    primary: "#2c303a",
  },
  customProperties: true,
  iconfont: "mdi"
});
