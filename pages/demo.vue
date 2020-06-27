<template>
  <v-container
id="demo" fluid
pa-0 ma-0 fill-height
>
    <v-layout
row wrap
fill-height
>
      <v-flex
id="embed-wrapper" xs12
fill-height
>
        <iframe
          id="edge-embed"
          style="width: 100%; height: 100%; overflow: hidden;"
          src="https://edge.sibyl.vision"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({
    data() {
      return {
        dialog: true,
        notifications: false,
        sound: true,
        widgets: false,
      };
    },
    layout: "preview",
    head: {
      title: "SkyScraper Preview",
    },
    computed: {
      overlay() {
        return this.$store.getters[""];
      },
    },
  })
  export default class Demo extends Vue {}
</script>

<style lang="scss" scoped>
  html {
    height: 100vh;
    overflow: hidden;
  }

  #map-mask {
    height: 300px;
    width: 300px;
  }

  #map {
  }

  @keyframes shadow-pulse {
    0% {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.2);
    }
    30% {
      box-shadow: 0 0 0 10px rgb(0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 55px rgba(0, 0, 0, 0);
    }
  }

  iframe {
    border-width: 0;
  }
</style>
