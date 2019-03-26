<template>
  <v-container fluid pa-0 ma-0 fill-height="">
    <v-layout row wrap fill-height>
      <v-flex xs12 fill-height>
        <iframe fill-height style="width: 100%; height: 100%;" src="https://edge.sibyl.vision"></iframe>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({
    layout: "preview",
    head: {
      title: "SkyScraper Preview"
    }
  })
  export default class Preview extends Vue {}
</script>

<style>
iframe {
  border-width: 0;
}
</style>
