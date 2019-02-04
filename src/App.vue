<template>
  <v-app id="inspire">
    <v-toolbar fixed app>
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
          :input-value="slide.active && isActiveSlide(slide)"
        >{{slide.name}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <component
      v-for="slide in slides"
      :is="slide.component"
      :key="'slide' + slide.id"
      v-observe-visibility="visibilityChanged"
    ></component>
    <Footer v-observe-visibility="{ callback: visibilityChanged }"></Footer>
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
        visible: false,
        active: false
      },
      {
        component: CaptureView,
        name: "RF Capture",
        id: "rf-capture",
        visible: false,
        active: false
      },
      {
        component: ApplicationsView,
        name: "Applications",
        id: "applications",
        visible: false,
        active: false
      },
      {
        component: PricingView,
        name: "Pricing",
        id: "pricing",
        visible: false,
        active: false
      },
      {
        component: AboutView,
        id: "about",
        name: "About",
        visible: false,
        active: false
      }
    ]
  }),
  components: {
    Footer,
    AboutView,
    PricingView,
    ApplicationsView,
    IntroView,
    CaptureView
  }
})
export default class App extends Vue {
  public slides: ISlide[] = [];

  private isActiveSlide(slide: ISlide) {
    const active = this.slides.filter((s) => {
      return s.active;
    });
    if (active.length === 1) {
      return true;
    } else {
      return active[1].id === slide.id;
    }
  }

  private visibilityChanged(isVisible: boolean, entry: { target: Element }) {
    const slide = this.slides.find((value, index) => {
      return entry.target.id === value.id;
    });
    if (slide) {
      slide.visible = isVisible;

      slide.active = isVisible;
    }
  }
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
</style>

