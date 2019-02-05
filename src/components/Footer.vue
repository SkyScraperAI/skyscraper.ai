<template>
    <v-container fluid pa-0>
        <v-footer
                color="primary lighten-1"
                height="auto"
        >
            <v-layout
                    justify-center
                    row
                    wrap
            >
                <v-flex
                        darken-2
                        primary
                        py-3
                        text-xs-center
                        white--text
                        xs12
                >
                    &copy; {{year}} — Sibyl Vision
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
    })
    export default class Footer extends Vue {
         get year() {
            return new Date().getFullYear();
        }
    }
</script>
