<template>
  <v-container fluid pa-0 fill-height primary id="not-found" style="margin-top: 64px !important;">
    <v-layout wrap align-center justify-center>
      <v-flex md6 lg5>
        <img src="../../public/img/wow.png" alt="Wow!" style="width: 100%;">
      </v-flex>

      <svg id="radar-circle">
        <circle
          cx="50%"
          cy="50%"
          r="0"
          fill-opacity="0"
          :stroke="radar.stroke"
          :stroke-width="radar.maxWidth * .9"
          stroke-opacity="0.4"
        >
          <animate
            attributeName="r"
            from="0"
            to="1220"
            :dur="radar.duration"
            repeatCount="indefinite"
            begin="0.25s"
          ></animate>
        </circle>

        <circle
          cx="50%"
          cy="50%"
          r="0"
          fill-opacity="0"
          :stroke="radar.stroke"
          :stroke-width="radar.maxWidth * .8"
          stroke-opacity="0.4"
        >
          <animate
            attributeName="r"
            from="0"
            to="1220"
            :dur="radar.duration"
            repeatCount="indefinite"
            begin="1.25s"
          ></animate>
        </circle>

        <circle
          cx="50%"
          cy="50%"
          r="0"
          fill-opacity="0"
          :stroke="radar.stroke"
          :stroke-width="radar.maxWidth * .5"
          stroke-opacity="0.4"
        >
          <animate
            attributeName="r"
            from="0"
            to="1220"
            :dur="radar.duration"
            repeatCount="indefinite"
            begin="2.25s"
          ></animate>
        </circle>

        <circle
          cx="50%"
          cy="50%"
          r="0"
          fill-opacity="0"
          :stroke="radar.stroke"
          :stroke-width="radar.maxWidth * .3"
          stroke-opacity="0.4"
        >
          <animate
            attributeName="r"
            from="0"
            to="1220"
            :dur="radar.duration"
            repeatCount="indefinite"
            begin="3.25s"
          ></animate>
        </circle>

        <circle
          cx="50%"
          cy="50%"
          r="0"
          fill-opacity="0"
          :stroke="radar.stroke"
          :stroke-width="radar.maxWidth * .1"
          stroke-opacity="0.4"
        >
          <animate
            attributeName="r"
            from="0"
            to="1220"
            :dur="radar.duration"
            repeatCount="indefinite"
            begin="4.25s"
          ></animate>
        </circle>
      </svg>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "NotFound",
  data() {
    return {
      radar: {
        duration: "8s",
        stroke: "red",
        maxWidth: "10px",
      }
    };
  }
})
export default class NotFoundView extends Vue {

}
</script>
<style lang="scss">
#not-found {
  position: absolte;
  min-height: calc(100vh - 64px - 53px);
  margin-top: 10px;
}

svg {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  opacity: 0.8;
}
</style>
