<template>
    <v-container
            style="margin-top: 64px !important; max-width: 1500px;"
            dark
            id="intro"
            class="mb-5"
            fluid
    >
        <v-layout row wrap>
            <v-flex class="text-xs-center" mt-4 mb-5 xs12>
                <h1 class="text--primary">SkyScraper</h1>
                <h3 class="subheading">Be the first to know.</h3>
            </v-flex>
            <v-flex md6 pt-2>
                <p class="headline">
                    Radios power our digital world. The data that surrounds us is <strong>valuable</strong> and untapped.
                </p>
                <p class="subheading">
                    Exploding radio usage and complex protocols make analysis difficult.
                </p>
                <p class="subheading">
                    <strong>SkyScraper</strong> transforms static into priceless data.
                </p>
            </v-flex>
            <v-flex pt-2 md5 offset-md1 class="hidden-sm-and-down">
                <v-card>
                    <v-card-title class="primary white--text" dark>
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
                                    <span>Consume tomorrow's protocols, today.</span>
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
    components: {},
})
export default class IntroView extends Vue {

}
</script>

<style lang="scss">
    canvas {
        display: block;
        vertical-align: top;
        max-height: 100vh;
    }

    #particles-js {
        position: absolute;
        width: 100%;
        height: 100%;
        max-height: calc(100vh - 128px);
    }

</style>
