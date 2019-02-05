<template>
    <v-container dark class="white--text primary lighten-2 fluid" id="pricing">
        <v-container>
            <v-layout row wrap>
                <v-flex sm4>
                    <v-card>
                        <h3>Purchase</h3>
                    </v-card>
                </v-flex>
                <v-flex sm4>
                    <v-card>
                        <h3>Purchase</h3>
                    </v-card>
                </v-flex>
                <v-flex sm4>
                    <v-card>
                        <h3>Purchase</h3>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component } from "vue-property-decorator";

    @Component({})
    export default class PricingView extends Vue {

    }
</script>
