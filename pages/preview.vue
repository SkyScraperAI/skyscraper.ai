<template>
  <v-container
fluid pa-0
ma-0 fill-height
>
    <v-layout
row wrap
fill-height
>
      <v-dialog
        v-model="dialog"
        max-width="1000px"
        full-width=""
        dark
        transition="dialog-bottom-transition"
      >
        <v-card
light color="grey lighten-4"
>
          <v-toolbar
dark color="primary"
>
            <v-btn
icon dark
@click="dialog = false"
>
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title
class="mx-auto" style="padding-right: 36px;"
>
              <span class="headline">
                <a href="/"> <strong>Sky</strong>Scraper </a>
                <span class="muted font-weight-thin">Spire</span>
              </span>
            </v-toolbar-title>
          </v-toolbar>
          <v-layout
row wrap
fill-height
>
            <v-flex md4>
              <v-card-text
class="px-3 py-4" color="primary"
>
                <p
class="subheading" style="line-height: 1.5em;"
>
                  <strong>SkyScraper</strong>, true to its namesake, started
                  with months of architecting and low-level work. It's time to
                  tear down the scaffolding and revealing what we've built
                  underneath.
                </p>
                <p
class="subheading" style="line-height: 1.5em;"
>
                  <strong>Spire</strong> is the control interface powering our
                  next-generation hardware. It's the last and most important
                  piece of this puzzle. Below you will find the bleeding-edge
                  release.
                </p>
                <p>
                  Note: Spire runs embeded on our testing units,
                  <i>and may go offline from time to time.</i> Features will
                  become available as we test them, and some will be disabled
                  due to this being a public-facing node.
                </p>
              </v-card-text>
            </v-flex>
            <v-flex md8>
              <v-card-text class="py-0">
                <v-timeline
light dense
>
                  <v-timeline-item
                    v-for="(event, idx) in timeline"
                    :key="'tl' + idx"
                    :color="event.color || 'success'"
                    large
                  >
                    <template v-slot:icon>
                      <v-icon color="white">
                        {{ event.icon }}
                      </v-icon>
                    </template>
                    <v-card class="elevation-2">
                      <v-card-title
                        class="title"
                        style="padding: 10px 16px;"
                        v-text="event.title"
                      />
                      <v-card-text
                        class="text-xs-justify"
                        style="padding: 10px 16px;"
                        v-text="event.subtitle"
                      />
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
      <v-flex
xs12 fill-height
id="embed-wrapper"
>
        <iframe
          id="edge-embed"
          fill-height
          style="width: 100%; height: 100%;"
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
        timeline: [
          {
            icon: "mdi-camera-gopro",
            color: "green darken-2",
            title: "✔ Hardware",
            subtitle:
              "Meticulously compiled, configured and tested future-proof hardware.",
          },
          {
            icon: "mdi-radio",
            color: "green",
            title: "✔ Software",
            subtitle:
              "The first unified data and management layer for RF capture and analysis applications. A toolset designed for painless RF research.",
          },
          {
            icon: "mdi-shape",
            color: "green lighten-1",

            title: "✔ Infrastructure",
            subtitle:
              "Remote access, fault tollerant cloud data transfer, state of the art inter-device communication, delta application updates and an immutable software stack.",
          },
          {
            icon: "mdi-office-building",
            color: "amber darken-1",
            title: "Spire",
            subtitle:
              "The management interface powering the entire system, and SkyScraper's final layer. The most recent release is deployed here.",
          },
        ],
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
  export default class Preview extends Vue {
    protected mounted() {}
  }
</script>

<style>
  iframe {
    border-width: 0;
  }
</style>
