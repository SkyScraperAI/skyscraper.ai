<template>
  <div>
    <svg id="radar-circle">
      <circle
        cx="50%"
        cy="50%"
        r="0"
        fill-opacity="0"
        stroke="white"
        stroke-width="13px"
        stroke-opacity="0.4"
      >
        <animate
          attributeName="r"
          from="0"
          to="1220"
          dur="6s"
          repeatCount="indefinite"
          begin="0.25s"
        />
      </circle>

      <circle
        cx="50%"
        cy="50%"
        r="0"
        fill-opacity="0"
        stroke="white"
        stroke-width="12px"
        stroke-opacity="0.4"
      >
        <animate
          attributeName="r"
          from="0"
          to="1220"
          dur="6s"
          repeatCount="indefinite"
          begin="1.25s"
        />
      </circle>

      <circle
        cx="50%"
        cy="50%"
        r="0"
        fill-opacity="0"
        stroke="white"
        stroke-width="8px"
        stroke-opacity="0.4"
      >
        <animate
          attributeName="r"
          from="0"
          to="1220"
          dur="6s"
          repeatCount="indefinite"
          begin="2.25s"
        />
      </circle>

      <circle
        cx="50%"
        cy="50%"
        r="0"
        fill-opacity="0"
        stroke="white"
        stroke-width="4px"
        stroke-opacity="0.4"
      >
        <animate
          attributeName="r"
          from="0"
          to="1220"
          dur="6s"
          repeatCount="indefinite"
          begin="3.25s"
        />
      </circle>

      <circle
        cx="50%"
        cy="50%"
        r="0"
        fill-opacity="0"
        stroke="white"
        stroke-width="2px"
        stroke-opacity="0.4"
      >
        <animate
          attributeName="r"
          from="0"
          to="1220"
          dur="6s"
          repeatCount="indefinite"
          begin="4.25s"
        />
      </circle>
    </svg>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  export default class RadioEmitter extends Vue {}
</script>

<style>
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: auto;
    top: 0;
    left: 0;
  }
</style>
