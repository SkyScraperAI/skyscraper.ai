<template>
  <v-app id="inspire">
    <v-toolbar fixed app>
      <v-toolbar-title>
        <span class="red--text darken-4">Sibyl Vision</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items id="toolbar-menu">
        <v-btn flat data-menuanchor="skyscraper">SkyScraper</v-btn>
        <v-btn flat data-menuanchor="rfCapture">RF Capture</v-btn>
        <v-btn flat data-menuanchor="industries">Applications</v-btn>
        <v-btn flat data-menuanchor="pricing">Pricing</v-btn>
        <v-btn flat data-menuanchor="about">About</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <div id="fullpage">
        <div class="section">
          <h3>Intro to SDR & SkyScraper</h3>
        </div>
        <div class="section" id="heroWrapper">
          <Hero></Hero>
        </div>
        <div class="section">
          <v-container fill-height color="pink">
            <v-layout fill-height color="pink">
              <h3>Applications</h3>
            </v-layout>
          </v-container>
        </div>
        <div class="section">
          <v-container fill-height color="pink">
            <v-layout fill-height color="pink">
              <h3>Pricing</h3>
            </v-layout>
          </v-container>
        </div>
        <div class="section">
          <v-container fill-height color="pink">
            <v-layout fill-height color="pink">
              <h3>About Us</h3>
            </v-layout>
          </v-container>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Hero from "./views/Hero.vue";
import Box from "./components/Box.vue";

@Component({
  data: () => ({
    drawer: null
  }),
  components: {
    Hero
  }
})
export default class App extends Vue {
  private mounted() {
    const a = new this.fullpage("#fullpage", {
      navigation: true,
      menu: "#toolbar-menu",
      anchors: ["skyscraper", "rfCapture", "industries", "pricing", "about"]
    });
  }

  get fullpage(): any {
    return (window as any).fullpage;
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
</style>

