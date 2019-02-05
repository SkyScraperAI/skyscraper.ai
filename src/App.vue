<template>
  <v-app id="sibyl" class="grey lighten-3">
    <v-toolbar fixed app clipped-right class="grey lighten-4">
      <v-layout align-center justify-space-between row fill-height>
        <v-flex md4>
          <v-toolbar-title>
            <span class="red--text darken-4">Sibyl Vision</span>
          </v-toolbar-title>
        </v-flex>
        <v-flex md4>
          <v-toolbar-title class="text-md-center text-xs-right hidden-md-and-up">
            <h1 class="primary--text" style="font-size: 1.8rem;">SkyScraper</h1>
          </v-toolbar-title>
        </v-flex>
        <v-flex md4 fill-height hidden-sm-and-down>
          <v-toolbar-items id="toolbar-menu" class="d-flex" justify-end>
            <v-btn
              v-for="slide in slides.filter((slide) => slide.name)"
              flat
              :href="'#' + slide.id"
              v-scroll-to="'#' + slide.id"
              :key="'nav' + slide.id"
            >{{slide.name}}</v-btn>
          </v-toolbar-items>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <router-view></router-view>
    <Footer></Footer>
  </v-app>
</template>

<script lang="ts">
import Footer from "@/components/Footer.vue";
import Vue from "vue";
import Component from "vue-class-component";
require("jsplumb");
interface ISlide {
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
        id: "intro"
      },
      {
        name: "Capture",
        id: "rf-capture"
      },
      {
        name: "Analyze",
        id: "analyze"
      },
      {
        name: "Hardware",
        id: "hardware"
      },
      {
        id: "team",
        name: "Team"
      }
    ]
  }),
  components: {
    Footer
  }
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
}
</style>

