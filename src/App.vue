<!--suppress ALL -->
<template>
  <v-app id="sibyl" class="grey lighten-3">
    <v-toolbar absolute app clipped-right class="grey lighten-4 elevation-1" style="z-index: 100;" id="navbar">
      <v-layout align-center justify-space-between row fill-height>
        <v-flex md4>
          <v-toolbar-title>
            <h1 class="red--text darken-4 headline">Sibyl Vision</h1>
          </v-toolbar-title>
        </v-flex>
        <v-flex md4>
          <v-toolbar-title class="text-md-center text-xs-right hidden-md-and-up">
            <h1 class="primary--text" style="font-size: 1.8rem;">SkyScraper</h1>
          </v-toolbar-title>
        </v-flex>
        <v-flex md4 fill-height hidden-sm-and-down>
          <!--suppress XmlDuplicatedId -->
          <v-toolbar-items id="toolbar-menu" class="d-flex" justify-end v-if="$route.path !== '/'">
            <v-btn
              v-for="slide in slides.filter((slide) => slide.name)"
              href="/"
              :key="'nav' + slide.id"
            >{{slide.name}}</v-btn>
          </v-toolbar-items>
          <v-toolbar-items v-else id="toolbar-menu" class="d-flex" justify-end>
            <v-btn
              v-for="slide in slides.filter((slide) => slide.name)"
              flat
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
import Footer from "./components/Footer.vue";
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
</style>

