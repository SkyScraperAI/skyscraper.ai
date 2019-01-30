<template>
  <v-app id="inspire">
    <v-toolbar fixed app>
      <v-toolbar-title>
        <span class="red--text darken-4">Sibyl Vision</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>SkyScraper</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <div id="fullpage">
        <div class="section" id="heroWrapper">
          <Hero></Hero>
        </div>
        <div class="section">
          <v-container fill-height color="pink">
            <v-layout fill-height color="pink">
              <h3>Peter Kazazes</h3>
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
      scrollOverflow: true
    });
  }

  get fullpage(): any {
    return (window as any).fullpage;
  }
}
</script>

<style>
</style>

