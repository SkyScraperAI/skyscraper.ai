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
import { Component } from "vue-property-decorator";

if (process.client) {
  require("jsplumb/dist/js/jsplumb.min.js");
}

interface ISlide {
  component: Vue;
  id: string;
  name?: string;
  visible: boolean;
  active: boolean;
}

@Component({
  name: "home",
  components: {
    AboutView,
    PricingView,
    ApplicationsView,
    IntroView,
    CaptureView,
  },
})
export default class HomeView extends Vue {
  public slides: ISlide[] = [];

  protected mounted() {
    this.$store.commit("SET_NAV_VISIBLE", true);
  }
}
</script>
