import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const IntroView = () => import("./views/IntroView.vue");
const CaptureView = () => import("./views/CaptureView.vue");
import ApplicationsView from "./views/ApplicationsView.vue";

export default new Router({
    routes: [
        {
            path: "/",
            component: IntroView,
            name: "intro"
        },
        {
            path: "/rf-capture",
            component: CaptureView,
            name: "capture"
        },
        {
            path: "/applications",
            component: ApplicationsView,
            name: "applications"
        }
    ],
});
