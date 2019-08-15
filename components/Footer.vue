<template>
  <v-footer height="auto" color="red lighten-1" class="pb-1" id="footer">
    <v-layout justify-center row wrap class="py-1 text-xs-center">
      <div v-for="link in links" :key="link.label">
        <v-btn color="white" flat round :href="link.url ? link.url : '#'">
          <span class="white--text monospaced">{{ link.label }}</span>
        </v-btn>
      </div>
      <v-flex xs12 class="white--text monospaced py-2"
        >&copy; SkyScraper 2019</v-flex
      >
    </v-layout>
  </v-footer>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "Footer",
  data() {
    return {
      links: [
        {
          label: "(415) 967-5238",
          url: "tel:+14159807090",
        },
        {
          label: "hello@skyscraper.ai",
          url: "mailto:hello@skyscraper.ai",
        },
        {
          label: "@SkyScraperRF",
          url: "//twitter.com/SkyScraperRF",
        },
      ],
    };
  },
})
export default class Footer extends Vue {
  get year() {
    return new Date().getFullYear();
  }
}
</script>

<style lang="scss">
footer {
  margin-top: -4px;
  //noinspection ALL
  .v-btn {
    text-transform: none;
  }
}
</style>
