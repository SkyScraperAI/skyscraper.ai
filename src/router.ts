import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const HomeView = () => import("@/views/HomeView.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");

export default new Router({
  routes: [
    {
      path: "/",
      component: HomeView,
      name: "home",
    },
    { path: "/404", alias: "*", component: NotFoundView, name: "404" },
    { path: "*", redirect: "/404" },
  ],
});
