<template>
  <v-container
    style="margin-top: 64px !important; max-width: 1500px;"
    dark
    id="intro"
    :class="{'pb-5': $vuetify.breakpoint.smAndDown, 'pb-5 pt-2': $vuetify.breakpoint.mdAndUp}"
    fluid
  >
    <v-layout row wrap>
      <v-flex class="text-xs-center" mt-4 mb-5 xs12 hidden-sm-and-down>
        <h1 class="text--primary">SkyScraper</h1>
        <h3 class="subheading">Be the first to know.</h3>
      </v-flex>
      <v-flex md6 pt-2>
        <p class="headline">
          Radios power our digital world. The data that surrounds us is
          <strong>valuable</strong> and untapped.
        </p>
        <p class="subheading">Exploding radio usage and complex protocols make analysis difficult.</p>
        <p class="subheading">
          <strong>SkyScraper</strong> transforms static into priceless data.
        </p>
      </v-flex>
      <v-flex pt-2 md5 offset-md1 class="hidden-sm-and-down">
        <v-card>
          <v-card-title class="red darken-3 white--text" dark>
            <span class="subheading mx-auto">One box. 15 protocols. 6GHz range.</span>
          </v-card-title>
          <v-card-text class="body-2">
            <v-list>
              <v-list-tile>
                <v-list-tile-content>
                  <span>Capture the transmissions you need.</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <span>Transcribe voice, analyze data.</span>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <span>Consume tomorrow's protocols today.</span>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class IntroView extends Vue { }
</script>