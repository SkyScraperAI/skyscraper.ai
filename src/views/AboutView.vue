<template>
    <v-container dark class="primary white--text fluid text-xs-center" id="team">

        <h1 class="mb-4">Our Team</h1>
        <v-layout row wrap>
            <v-flex xs12 sm4 class="text-xs-center" v-for="member in team">
                <v-avatar class="accent mb-4" size="150" style="display: block; margin: 0 auto;">
                    <img :alt="member.name" :src="'/img/profiles/' + member.image"/>
                </v-avatar>
                <h3 class="headline mb-2" v-text="member.name"></h3>
                <span class="subheading" v-text="member.subtitle"></span>
                <v-flex class="mt-3">
                    <v-btn fab flat dark :href="link.url" target="_blank" small :color="link.color"
                           v-for="link in member.links">
                        <v-icon dark>{{link.icon}}</v-icon>
                    </v-btn>
                </v-flex>
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
                team: [
                    {
                        name: "Peter Kazazes",
                        subtitle: "Wave Rider",
                        image: "peter.jpg",
                        links: [
                            {
                                icon: "mdi-email",
                                url: "mailto:peter@sibylvision.com",
                                color: "blue-grey lighten-3",
                            },
                            {
                                icon: "mdi-github-circle",
                                url: "https://github.com/kazazes",
                                color: "blue-grey lighten-4",
                            },
                            {
                                icon: "mdi-twitter",
                                url: "https://twitter.com/pkpolls",
                                color: "blue",
                            },
                        ],
                    },
                    {
                        name: "Colin Heilbut",
                        subtitle: "Frequency Modulator",
                        image: "colin.jpg",
                        links: [
                            {
                                icon: "mdi-email",
                                url: "mailto:colin@sibylvision.com",
                                color: "blue-grey lighten-3",
                            },
                            {
                                icon: "mdi-twitter",
                                url: "https://twitter.com/colinheilbut",
                                color: "blue",
                            },
                        ],
                    },
                    {
                        name: "Luke Berndt",
                        subtitle: "Static Squelcher",
                        image: "luke.jpg",
                        links: [
                            {
                                icon: "mdi-email",
                                url: "mailto:luke@sibylvision.com",
                                color: "blue-grey lighten-3",
                            },
                            {
                                icon: "mdi-github-circle",
                                url: "https://github.com/robotastic",
                                color: "blue-grey lighten-4",
                            },
                            {
                                icon: "mdi-twitter",
                                url: "https://twitter.com/lukeberndt",
                                color: "blue",
                            },
                        ],
                    },
                ],
            };
        },
    })
    export default class AboutView extends Vue {

    }
</script>
