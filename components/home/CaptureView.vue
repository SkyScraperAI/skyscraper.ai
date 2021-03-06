<template>
  <v-container
    id="rf-capture"
    dark
    fluid
    class="px-0 py-0 home-slide"
    :class="{
      'mt-5 pt-2': isMounted && $vuetify.breakpoint.smAndDown,
      'mt-5 pt-3': isMounted && $vuetify.breakpoint.mdAndUp,
    }"
  >
    <v-layout
wrap align-end
id="cap" class="primary pb-3"
>
      <v-flex xs12>
        <v-tabs
          v-model="servicesModel"
          dark
          grow
          icons-and-text
          slider-color="white"
          color="grey darken-3"
        >
          <v-tab
            v-for="(category, idx) in capture"
            :id="'cat' + idx"
            :key="'cat' + idx"
            v-scroll-to="'#cap'"
            active-class="error--text"
            :href="'#cat' + idx"
            :disabled="idx > 0"
          >
            <span class="hidden-sm-and-down">{{ category.title }}</span>
            <v-icon>{{ category.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </v-flex>
      <v-flex
        xs12
        :class="{
          'my-0': isMounted && $vuetify.breakpoint.smAndDown,
          'my-5': isMounted && $vuetify.breakpoint.mdAndUp,
        }"
      >
        <v-tabs-items v-model="servicesModel">
          <v-tab-item
            v-for="(cat, i) in capture"
            :key="'cat-detail' + i"
            :value="`cat${i}`"
          >
            <v-container grid-list-xl>
              <v-layout
align-start wrap
v-if="cat.detail"
>
                <v-flex
fill-height sm12
md4 xs12
>
                  <v-layout
column fill-height
>
                    <v-flex xs12>
                      <v-card>
                        <v-card-title class="red darken-2 white--text">
                          <h1 class="headline">
                            {{ cat.detail.title || "" }}
                          </h1>
                        </v-card-title>
                        <v-card-text
v-if="cat.detail.subtitle" color="primary"
>
                          <p>{{ cat.detail.subtitle }}</p>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex
xs12 class="hidden-sm-and-down"
>
                      <v-card>
                        <v-card-title class="red darken-2 white--text">
                          <h2 class="subheading">
                            {{ cat.detail.list.title }}
                          </h2>
                        </v-card-title>
                        <v-card-text>
                          <v-list
                            v-if="cat.detail.list"
                            subheader
                            dense
                            class="mt-2"
                            style="max-width: 300px;"
                          >
                            <v-list-tile
                              v-for="(item, i) in cat.detail.list.items"
                              :key="cat + i + item.title"
                            >
                              <v-list-tile-title v-text="item.text" />
                              <v-btn
                                :href="item.link"
                                target="_blank"
                                rel="noopener"
                                flat
                                icon
                              >
                                <v-icon small>
                                  mdi-open-in-new
                                </v-icon>
                              </v-btn>
                            </v-list-tile>
                          </v-list>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
md8 sm12
>
                  <component :is="cat.demoComponent" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
      <v-flex ref="box"
hidden-sm-and-down id="box" xs12 class="py-0">
        <Box />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script lang="ts">
  import OpenMHzPlayer from "@/components/OpenMHzPlayer.vue";
  import { jsPlumbInstance } from "jsplumb";
  import Vue from "vue";
  import Component from "vue-class-component";
  import Box from "~/components/Box.vue";

  @Component({
    components: {
      OpenMHzPlayer,
      Box,
    },
    data() {
      return {
        servicesModel: "cat0",
        capture: [
          {
            title: "Voice",
            selected: true,
            icon: "mdi-radio-handheld",
            demoComponent: OpenMHzPlayer,
            detail: {
              title: "Voice Systems",
              subtitle: `Monitor and record trunked and analog voice systems
              while simultaneously transcribing audio. Trigger events and notifications
              based on detected keywords or aggregated call metrics.`,
              list: {
                title: "Supported Protocols",
                items: [
                  {
                    text: "P25 Phase 1 & 2",
                    link: "//en.wikipedia.org/wiki/Project_25#P25_phases",
                  },
                  {
                    text: "Motorola SmartNet",
                    link: "//en.wikipedia.org/wiki/Motorola_Type_II",
                  },
                  {
                    text: "Conventional P25",
                    link:
                      "//en.wikipedia.org/wiki/Project_25#Conventional_implementation",
                  },
                  {
                    text: "Analog Systems",
                    link:
                      "//en.wikipedia.org/wiki/Two-way_radio#Analog_versus_digital",
                  },
                ],
              },
            },
          },
          {
            title: "Vehicle Telemetry",
            selected: false,
            icon: "mdi-airplane",
          },
          {
            title: "Surveillance Detection",
            selected: false,
            icon: "mdi-bug-check",
          },
          {
            title: "Satellite Downlink",
            selected: false,
            icon: "mdi-satellite-variant",
          },
          {
            title: "Spectrum Monitoring",
            selected: false,
            icon: "mdi-current-ac",
          },
          {
            title: "And More",
            selected: false,
            icon: "mdi-plus",
          },
        ],
      };
    },
  })
  export default class CaptureView extends Vue {
    public servicesModel = "cat0";
    public plumb: any;
    public isMounted = false;
    private capture: any[] = [];

    public mounted() {
      this.isMounted = true;
      window.addEventListener("load", () => {
        this.plumb = (window as any).jsPlumb.getInstance() as jsPlumbInstance;
        window.addEventListener("resize", this.redrawLines);
        this.plumb.ready(() => {
          this.plumb.deleteEveryConnection();
          this.plumb.deleteEveryEndpoint();
          this.plumb.setContainer("rf-capture");
          this.connectPlumbing();
        });
      });
    }

    public updated() {
      this.redrawLines();
    }

    private redrawLines() {
      if (this.plumb) {
        this.$nextTick(() => {
          this.connectPlumbing();
        });
      }
    }

    private connectPlumbing() {
      window.requestAnimationFrame(() => {
        this.plumb.deleteEveryEndpoint();

        if ((this.$refs.box as Element).clientHeight > 0) {
          this.capture.forEach((_, i) => {
            this.plumb.connect({
              source: "cat" + i,
              target: "box-target",
              connector: ["Bezier", { curviness: 190 }],
              anchors: [
                ["BottomCenter", []],
                ["Continuous", [0.5, 0, 0, -1]],
              ],
              endpoint: "Blank",
            });
          });
        }
      });
    }
  }
</script>

<!--suppress CssUnusedSymbol -->
<style lang="scss">
  #rf-capture {
    .jtk-connector {
      path {
        stroke: #fff;
        stroke-opacity: 0.75;
        stroke-width: 3px;
      }
    }

    table.v-table thead td:not(:nth-child(1)),
    table.v-table tbody td:not(:nth-child(1)),
    table.v-table thead th:not(:nth-child(1)),
    table.v-table tbody th:not(:nth-child(1)),
    table.v-table thead td:first-child,
    table.v-table tbody td:first-child,
    table.v-table thead th:first-child,
    table.v-table tbody th:first-child {
      padding: 15px;
    }

    .container.grid-list-xl .layout .flex {
      z-index: 10;
    }

    .theme--light.v-datatable .v-datatable__actions {
      display: none;
    }
  }
</style>
