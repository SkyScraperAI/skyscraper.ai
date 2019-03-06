import PitchView from "@/views/PitchView.vue";
import Vue, { VueConstructor } from "vue";
import Router from "vue-router";

Vue.use(Router);

const HomeView = () => import("@/views/HomeView.vue");

function loadView(view: string) {
    return (): Promise<VueConstructor> => import(/* webpackChunkName: "view-[request]" */ `@/views/${ view }.vue`);
}

export default new Router({
    mode: process.env.NODE_ENV === "production" ? "history" : "hash",
    routes: [
        {
            path: "/",
            component: HomeView,
            name: "home",
        },
        { path: "/404", alias: "*", component: loadView("NotFoundView"), name: "404" },
        { path: "*", redirect: "/404" },
        { path: "/pitch", component: loadView("PitchView"), name: "pitch" },
    ],
});
