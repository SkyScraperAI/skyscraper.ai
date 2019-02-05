import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import HomeView from "@/views/HomeView.vue";

export default new Router({
  routes: [
    {
      path: "/",
      component: HomeView,
      name: "home",
    },
  ],
});
