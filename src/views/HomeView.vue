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
import Vue from "vue";
import AboutView from "@/views/AboutView.vue";
import ApplicationsView from "@/views/ApplicationsView.vue";
import PricingView from "@/views/HardwareView.vue";
import IntroView from "@/views/IntroView.vue";
import Component from "vue-class-component";
import CaptureView from "@/views/CaptureView.vue";

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
  }
})
export default class HomeView extends Vue {
  public slides: ISlide[] = [];
}
</script>

