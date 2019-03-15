@@ -1,69 +0,0 @@
<template>
  <v-container fluid pa-0 ma-0>
    <v-layout row wrap>
      <IntroView></IntroView>
      <CaptureView></CaptureView>
      <ApplicationsView></ApplicationsView>
      <PricingView></PricingView>
      <AboutView></AboutView>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import AboutView from "@/components/home/AboutView.vue";
  import ApplicationsView from "@/components/home/ApplicationsView.vue";
  import CaptureView from "@/components/home/CaptureView.vue";
  import PricingView from "@/components/home/HardwareView.vue";
  import IntroView from "@/components/home/IntroView.vue";
  import Vue from "vue";
  import Component from "vue-class-component";

  interface ISlide {
    component: Vue;
    id: string;
    name?: string;
    visible: boolean;
    active: boolean;
  }

  @Component({
    data: () => ({}),
    components: {
      AboutView,
      PricingView,
      ApplicationsView,
      IntroView,
      CaptureView
    },
    metaInfo() {
      return {
        titleTemplate: "SkyScraper | Taking Back The Airwaves",
        htmlAttrs: {
          lang: "en"
        },
        meta: [
          { name: "og:image", content: "/img/og-banner.png" },
          { name: "canonical", href: "https://skyscraper.ai/", id: "canonical" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          {
            name: "description",
            content: `Radios got smarter, computers got faster, and now SkyScraper
      . Meet the Swiss-army knife of radio capture and analysis.`
          },
          { name: "Content-Type", content: "text/html; charset=utf-8" }
        ],
        script: [
          // { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', async: true, defer: true }
        ]
      };
    }
  })
  export default class HomeView extends Vue {
    public slides: ISlide[] = [];
    protected mounted() {
      this.$store.commit("SET_NAV_VISIBLE", true);
    }
  }
</script>
