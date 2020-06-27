<template>
  <v-app
id="sibyl" class="grey lighten-3"
>
    <v-toolbar
      id="navbar"
      app
      scroll-off-screen
      dense
      clipped-right
      class="grey lighten-4 elevation-1"
      style="z-index: 100;"
    >
      <v-layout
align-center justify-space-between
row fill-height
>
        <v-flex grow>
          <v-toolbar-title class="text-xs-center">
            <span class="headline">
              <a href="/"> <strong>Sky</strong>Scraper </a>
              <span class="muted font-weight-thin">Preview</span>
            </span>
          </v-toolbar-title>
        </v-flex>
        <v-flex
shrink fill-height
hidden-sm-and-down
>
          <v-toolbar-items
            v-if="$route.path == '/'"
            id="toolbar-menu"
            class="d-flex"
            justify-end
          />
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import "vuetify/src/stylus/app.styl";

  @Component({})
  export default class App extends Vue {
    protected mounted() {
      this.$store.commit("SET_NAV_VISIBLE", true);
    }

    get navVisible() {
      return this.$store.getters.NAV_VISIBLE;
    }
  }
</script>

<style lang="scss">
  .v-toolbar__title {
    a {
      &:active {
        color: #f44336 !important;
      }

      color: #f44336 !important;
      text-decoration: none !important;
    }
  }

  h1 {
    font-size: 21px !important;

    .headline {
      .muted {
        color: #585656;
      }
    }
  }

  #toolbar-menu {
    .active {
      position: relative;

      &::before {
        background-color: currentColor;
      }
    }
  }
</style>
