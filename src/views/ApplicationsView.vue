<template>
    <v-container fluid grid-list-md dark class="primary darken-1" id="analyze" pb-5>
        <div id="building-top-container" style="z-index: 10;">
            <img id="building-top" src="../../public/img/skyscraper-top.svg">
        </div>
        <v-layout row wrap id="applications-wrapper" style="max-width: 1500px; margin: 0 auto;">
            <v-flex v-for="app in applications" :key="app.name" md4 sm12 xs12 px-4>
                <v-card class="grey lighten-3" style="z-index: 1; height: 100%;" :id="app.id">
                    <v-card-title class="red darken-2">
                        <span class="white--text subheading mx-auto" v-text="app.name"></span>
                    </v-card-title>
                    <v-card-text>
                        <p v-html="app.description"></p>
                        <v-list v-if="app.list" subheader dense class="mt-2 px-0 mx-0 transparent">
                            <v-subheader class="px-0">{{app.list.title}}</v-subheader>
                            <v-list-tile
                                    v-for="(item, i) in app.list.items"
                                    :key="app + i + item"
                                    class="px-0"
                            >
                                <v-list-tile-title v-text="item" class="px-0 ma-0"></v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
    import { jsPlumbInstance } from "jsplumb";
    import { throttle } from "lodash";
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

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
                        name: "Alert",
                        id: "alert",
                        description: "Intelligent alerting for the airwaves. Monitor spoken keywords, specific " +
                            "frequencies, system volume, tail numbers, WiFi networks and more.",
                        list: {
                            title: "Integrations",
                            items: [
                                "SMS",
                                "Email",
                                "Pingdom",
                                "Slack",
                                "WebHooks"
                            ]
                        }
                    },
                    {
                        name: "Transcribe",
                        id: "transcribe",
                        description: "Transcribe and translate captured samples on the edge or in the cloud.",
                        list: {
                            title: "Language Support",
                            items: [
                                "English",
                                "Spanish",
                                "Russian",
                                "Arabic"
                            ]
                        }
                    },
                    {
                        name: "Extend",
                        id: "ml",
                        description: `Unleash the power of your new dataset by passing it to your existing systems,
                            IBM Watson or any other system using
                            <a target="_blank" href="https://flows.nodered.org/?sort=downloads">Node-Red</a> flows.`
                    },
                ],
            };
        },
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
                throttle(this.connectPlumbing, 100, { leading: true, trailing: true }),
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
                    endpoint: "Blank",
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

