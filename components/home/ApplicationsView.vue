<template>
    <v-container
            dark
            class="primary lighten-2 pb-5"
            id="analyze"
            fluid
    >
        <div id="building-top-container" style="z-index: 10;">
            <img alt="SkyScraper Drawing" id="building-top" src="~/assets/img/skyscraper-top.svg">
        </div>
        <v-container grid-list-lg px-0>
            <v-layout row wrap id="applications-wrapper" style="max-width: 1500px; margin: 0 auto;">
                <v-flex
                        v-for="app in applications"
                        :key="app.name"
                        md4
                        sm4
                        xs12
                >
                    <v-card class="grey lighten-3" tile style="z-index: 1; height: 100%;" :id="app.id">
                        <v-card-title class="red darken-2">
                            <h3 class="white--text display-1 mx-auto" v-text="app.name"></h3>
                        </v-card-title>
                        <v-card-text>
                            <p class="subheading" v-html="app.description"></p>
                            <v-list v-if="app.list" subheader dense class="transparent">
                                <v-subheader>{{app.list.title}}</v-subheader>
                                <v-list-tile v-for="(item, i) in app.list.items" :key="app + i + item">
                                    <v-list-tile-title v-text="item"></v-list-tile-title>
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
  import {jsPlumbInstance} from "jsplumb";
  import Vue from "vue";
  import {Component} from "vue-property-decorator";

  interface IApplication {
    name: string;
    id: string;
  }

  @Component({
    data() {
      return {
        applications: [
          {
            name: "Alert",
            id: "alert",
            description:
                    "Intelligent alerting for the airwaves. Monitor spoken keywords, specific " +
                    "frequencies, system volume, tail numbers, WiFi networks and more.",
            list: {
              title: "Integrations",
              items: ["SMS", "Email", "Pingdom", "Slack", "WebHooks"]
            }
          },
          {
            name: "Transcribe",
            id: "transcribe",
            description:
                    "Transcribe and translate captured samples on the edge or in the cloud.",
            list: {
              title: "Language Support",
              items: ["English", "Spanish", "Russian", "Arabic"]
            }
          },
          {
            name: "Learn",
            id: "ml",
            description: `Unleash the power of your new dataset by passing it to your existing systems,
                            IBM Watson or any other system using
                            <a target="_blank" rel="noopener" href="https://flows.nodered.org/?sort=downloads">
                            Node-Red</a> flows.`
          }
        ]
      };
    }
  })
  export default class ApplicationsView extends Vue {
    private applications: IApplication[] = [];
    private plumb: any;

    protected mounted() {
      window.addEventListener("load", () => {
        this.plumb = (window as any).jsPlumb.getInstance() as jsPlumbInstance;
        this.plumb.ready(() => {
          this.plumb.setContainer("applications-wrapper");
          this.connectPlumbing();
        });
      });
      window.addEventListener("resize", () => {
        window.requestAnimationFrame(() => {
          this.connectPlumbing();
        });
      });
    }

    private connectPlumbing() {
      this.plumb.deleteEveryEndpoint();
      this.applications.forEach((v) => {
        this.plumb.connect({
          source: "building-top",
          target: v.id,
          connector: ["Flowchart", {}],
          anchors: [["Bottom", []], ["Continuous", [0.5, 0, 0, -1]]],
          endpoint: "Blank"
        });
      });
    }
  }
</script>

<!--suppress CssUnusedSymbol -->
<style lang="scss">
    #applications-wrapper {
        margin-top: 30px;
    }

    #building-top-container {
        #building-top {
            position: relative;
            height: 200px;
            top: -55px;
            display: block;
            margin: 0 auto;
        }
    }

    .jtk-connector {
        path {
            stroke: #fff;
            stroke-width: 3px;
        }
    }
</style>

