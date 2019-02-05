<template>
  <v-container dark fill-height fluid class="pa-0 primary home-slide" id="rf-capture">
    <v-layout wrap column justify-space-between>
      <v-flex>
        <v-tabs dark grow icons-and-text slider-color="white" color="grey darken-3" v-model="servicesModel">
          <v-tab
            v-for="(category, idx) in capture"
            active-class="error--text"
            :key="'cat' + idx"
            :id="'cat'+idx"
            :href="'#cat' + idx"
            v-scroll-to="'#rf-capture'"
            :disabled="idx > 0"
          >
            <span class="hidden-sm-and-down">{{ category.title }}</span>
            <v-icon>{{ category.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </v-flex>
      <v-layout>
        <v-flex md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3 xs12>
          <v-tabs-items v-model="servicesModel">
            <v-tab-item v-for="(cat, i) in capture" :value="`cat${i}`" :key="'cat-detail'+i">
              <v-card v-if="cat.detail" dark style="z-index: 1;">
                <v-card-title class="red darken-3 headline">{{cat.detail.title || ""}}</v-card-title>
                <v-layout wrap>
                  <v-flex md8 xs12>
                    <v-card-text v-if="cat.detail.subtitle" color="primary">
                      <p>{{cat.detail.subtitle}}</p>
                    </v-card-text>
                  </v-flex>
                  <v-flex md4 xs12 v-if="cat.detail.list">
                    <v-list subheader dense class="mt-2">
                      <v-subheader>{{cat.detail.list.title}}</v-subheader>
                      <v-list-tile
                        v-for="(item, i) in cat.detail.list.items"
                        :key="cat + i + item.title"
                      >
                        <v-list-tile-title v-text="item.text"></v-list-tile-title>
                        <v-btn :href="item.link" target="_blank" flat icon>
                          <v-icon small>mdi-open-in-new</v-icon>
                        </v-btn>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
      <div id="box">
        <Box></Box>
      </div>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { jsPlumbInstance } from "jsplumb";
import { throttle } from "lodash";
import Vue from "vue";
import Component from "vue-class-component";
import Box from "../components/Box.vue";

require("jsplumb");

@Component({
  components: {
    Box
  },
  data() {
    return {
      servicesModel: "cat0",
      capture: [
        {
          title: "Voice",
          selected: true,
          icon: "mdi-radio-handheld",
          detail: {
            title: "Voice System Analysis",
            subtitle: `Monitor and record trunked and analog voice systems
            while simultaneosly transcribing audio. Trigger events and notifications
            based on detected keywords or aggregated call metrics.`,
            list: {
              title: "Supported Protocols",
              items: [
                {
                  text: "P25 Phase 1 & 2",
                  link: "//en.wikipedia.org/wiki/Project_25#P25_phases"
                },
                {
                  text: "Motorola SmartNet",
                  link: "//en.wikipedia.org/wiki/Motorola_Type_II"
                },
                {
                  text: "Conventional P25",
                  link:
                    "//en.wikipedia.org/wiki/Project_25#Conventional_implementation"
                },
                {
                  text: "Analog Systems",
                  link:
                    "//en.wikipedia.org/wiki/Two-way_radio#Analog_versus_digital"
                }
              ]
            }
          }
        },
        {
          title: "Vehicle Telemetry",
          selected: false,
          icon: "mdi-airplane"
        },
        {
          title: "Surveilence Detection",
          selected: false,
          icon: "mdi-bug-check"
        },
        {
          title: "Satellite Downlink",
          selected: false,
          icon: "mdi-satellite-variant"
        },
        {
          title: "Spectrum Monitoring",
          selected: false,
          icon: "mdi-current-ac"
        }
      ]
    };
  }
})
export default class CaptureView extends Vue {
  private capture: any[] = [];
  private plumb = (window as any).jsPlumb as jsPlumbInstance;

  protected mounted() {
    this.plumb.ready(() => {
      this.plumb.setContainer("inspire");
      this.connectPlumbing();
    });
    window.addEventListener(
      "resize",
      throttle(this.connectPlumbing, 100, { leading: true, trailing: true })
    );
  }

  private connectPlumbing() {
    this.plumb.deleteEveryEndpoint();

    this.capture.forEach((v, i, a) => {
      this.plumb.connect({
        source: "cat" + i,
        target: "box-target",
        connector:
          Math.floor(a.length / 2) === i
            ? ["Straight", {}]
            : ["Bezier", { curviness: 190 }],
        anchors: [["BottomCenter", []], ["Continuous", [0.5, 0, 0, -1]]],
        endpoint: "Blank"
      });
    });
  }
}
</script>

<style lang="scss">
.jtk-connector {
  path {
    stroke: #fff;
    stroke-width: 3px;
  }
}
</style>
