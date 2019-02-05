<template>
    <v-app id="inspire" class=" grey lighten-3">
        <v-toolbar fixed app class="grey lighten-4">
            <v-toolbar-title>
                <span class="red--text darken-4">Sibyl Vision</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items id="toolbar-menu" class="hidden-sm-and-down">
                <v-btn
                        v-for="slide in slides.filter((slide) => slide.name)"
                        flat
                        :href="'#' + slide.id"
                        v-scroll-to="'#' + slide.id"
                        :key="'nav' + slide.id"
                >{{slide.name}}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <component
                v-for="slide in slides"
                :is="slide.component"
                :key="'slide' + slide.id"
        ></component>
        <Footer></Footer>
    </v-app>
</template>

<script lang="ts">
    import Footer from "@/components/Footer.vue";
    import AboutView from "@/views/AboutView.vue";
    import ApplicationsView from "@/views/ApplicationsView.vue";
    import IntroView from "@/views/IntroView.vue";
    import PricingView from "@/views/PricingView.vue";
    import Vue from "vue";
    import Component from "vue-class-component";
    import CaptureView from "./views/CaptureView.vue";

    require("../public/vendor/segment");
    require("../public/vendor/chatlio");


    interface ISlide {
        component: Vue;
        id: string;
        name?: string;
        visible: boolean;
        active: boolean;
    }

    @Component({
        data: () => ({
            drawer: null,
            slides: [
                {
                    component: IntroView,
                    id: "intro",
                },
                {
                    component: CaptureView,
                    name: "Capture",
                    id: "rf-capture",
                },
                {
                    component: ApplicationsView,
                    name: "Analyze",
                    id: "analyze",
                },
                {
                    component: PricingView,
                    name: "Hardware",
                    id: "hardware",
                },
                {
                    component: AboutView,
                    id: "team",
                    name: "About",
                },
            ],
        }),
        components: {
            Footer,
            AboutView,
            PricingView,
            ApplicationsView,
            IntroView,
            CaptureView,
        },
    })
    export default class App extends Vue {
        public slides: ISlide[] = [];
    }
</script>

<style lang="scss">
    #toolbar-menu {
        .active {
            position: relative;

            &::before {
                background-color: currentColor;
            }
        }
    }
    .chatlio-widget.chatlio-closed .chatlio-title-bar.chatlio-title-bar-button {
        background-image: url("../public/img/icons/chrome/chrome-installprocess-128-128.png") !important;
        background-size: contain !important;
        svg {

        }
    }
</style>

