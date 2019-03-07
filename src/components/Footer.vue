<template>
  <v-footer height="auto" color="red lighten-1" class="pb-1">
    <v-layout justify-center row wrap class="py-3">
      <div v-for="link in links" :key="link.label">
        <v-btn color="white" flat round :href="link.url ? link.url : '#'">
          <span class="white--text monospaced">{{ link.label }}</span>
        </v-btn>
      </div>
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
          url: "tel:+14159675238"
        },
        {
          label: "hello@sibylvision.com",
          url: "mailto:support@skyscraper.ai"
        },
        {
          label: "@SkyScraperRF",
          url: "//twitter.com/SkyScraperRF"
        }
      ]
    };
  }
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
  .v-btn {
    text-transform: none;
  }
}
</style>
