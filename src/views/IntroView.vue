<template>
  <v-container
    style="margin-top: 64px !important"
    fluid
    dark
    class="home-slide grey lighten-2"
    id="intro"
  >
    <v-layout>
      <v-flex></v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";

@Component({
  components: {}
})
export default class IntroView extends Vue {}
</script>
