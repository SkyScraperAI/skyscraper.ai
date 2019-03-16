<template>
    <v-container
            dark
            id="intro"
            :class="{'pb-4 mt-5 pt-4': isMounted && $vuetify.breakpoint.smAndDown, 'mt-5 pb-5 pt-3': isMounted && $vuetify.breakpoint.mdAndUp}"
            fluid
    >
        <v-container>
            <v-layout row wrap align-center justify-center my-3 pb-3>
                <v-flex xs12 class="text-xs-center">
                    <h2 class="display-2">A higher form of radio.</h2>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center justify-center>
                <v-flex md6 pt-1>
                    <p class="headline">
                        Radios power the digital world. The data that surrounds us is
                        <strong>valuable</strong> and untapped.
                    </p>
                    <p class="subheading">Exploding radio usage and complex protocols make analysis difficult.</p>
                    <p class="subheading">
                        <strong>SkyScraper</strong> transforms static into priceless data.
                    </p>
                </v-flex>
                <v-flex pt-2 md5 offset-md1 class="hidden-sm-and-down">
                    <v-card>
                        <v-card-title class="red darken-1 white--text" dark>
                            <span class="subheading mx-auto">One box. 15 protocols. 6GHz range.</span>
                        </v-card-title>
                        <v-card-text class="body-2">
                            <v-list class="mx-auto">
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
    </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";

  @Component({
    components: {}
  })
  export default class IntroView extends Vue {
    public isMounted = false;

    protected mounted() {
      this.isMounted = true;
    }
  }
</script>
