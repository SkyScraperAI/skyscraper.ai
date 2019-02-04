<template>
  <v-container fluid grid-list-md dark class="home-slide grey darken-3 fluid" id="applications">
    <div id="building-top-container" style="z-index: 10;">
      <img id="building-top" src="../../public/img/skyscraper-top.svg">
    </div>
    <v-layout row wrap id="applications-wrapper">
      <v-flex v-for="app in applications" :key="app.name">
        <v-card>
          <v-container fill-height fluid pa-2>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox :id="app.id">
                <span class="black--text" v-text="app.name"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { throttle } from "lodash";
import { Component } from "vue-property-decorator";
import Vue from "vue";
import { jsPlumbInstance } from "jsplumb";

require("jsplumb");

interface IApplication {
  name: string;
  id: string;
}

@Component({
  data() {
    return {
      applications: [
        {
          name: "Intelligent Alerting",
          id: "alerts"
        },
        {
          name: "Passive Monitoring",
          id: "transcriptions"
        },
        {
          name: "Translation",
          id: "translation"
        },
        {
          name: "Machine Learning",
          id: "ml"
        },
        {
          name: "NodeRED",
          id: "red"
        },
        {
          name: "Remote Transmissions",
          id: "tx"
        }
      ]
    };
  }
})
export default class ApplicationsView extends Vue {
  private applications: IApplication[] = [];

  private plumb = (window as any).jsPlumb.getInstance() as jsPlumbInstance;

  protected mounted() {
    this.plumb.ready(() => {
      this.plumb.setContainer("applications");
      this.connectPlumbing();
    });
    window.addEventListener(
      "resize",
      throttle(this.connectPlumbing, 100, { leading: true, trailing: true })
    );
  }

  private connectPlumbing() {
    this.plumb.deleteEveryEndpoint();

    this.applications.forEach((v, i, a) => {
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

<style lang="scss">
#applications {
}
#applications-wrapper {
  margin-top: 30px;
}
#building-top-container {
  #building-top {
    position: relative;
    height: 200px;
    top: -35px;
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

