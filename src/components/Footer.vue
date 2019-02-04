<template>
    <v-container fluid pa-0>
        <v-footer
                color="red lighten-1"
                height="auto"
        >
            <v-layout
                    justify-center
                    row
                    wrap
            >
                <v-btn
                        :key="link"
                        color="white"
                        flat
                        round
                        v-for="link in links"
                >
                    {{ link }}
                </v-btn>
                <v-flex
                        darken-4
                        red
                        py-3
                        text-xs-center
                        white--text
                        xs12
                >
                    &copy; {{year}} — <strong>Sibyl Vision</strong>
                </v-flex>
            </v-layout>
        </v-footer>
    </v-container>
</template>

<script>
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component({
        name: "Footer",
        data: () => ({
            links: [
                "Home",
                "About Us",
                "Team",
                "Services",
                "Blog",
                "Contact Us",
            ],
        }),
    })
    export default class Footer extends Vue {
         get year() {
            return new Date().getFullYear();
        }
    }
</script>
content_copy

